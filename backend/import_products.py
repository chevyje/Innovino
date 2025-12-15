#!/usr/bin/env python3
"""
import_products.py

Lees `producten.csv`, normaliseert prijs/actief en importeert naar de
`products` tabel in de Innovino database. Gebruikt psycopg2 (binary) en
ondersteunt upsert op `name` (UNIQUE constraint in schema.sql).

Gebruik:
  python import_products.py --file producten.csv

De script leest DB-config uit environment variables (bijv. via .env):
  DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD

"""
import os
import csv
import argparse
import re
from decimal import Decimal, InvalidOperation
from typing import Dict, Tuple, Optional

import psycopg2
from psycopg2.extras import execute_values
from dotenv import load_dotenv


Row = Tuple[str, Optional[str], Decimal, Optional[str], bool, Optional[str]]


def parse_price(s: str) -> Decimal:
    if s is None:
        return Decimal('0.00')
    s = s.strip()
    if s == '':
        return Decimal('0.00')
    # verwijder valuta-symbolen en spaties
    s = re.sub(r'[€$�\s]', '', s)
    # convert 1.234,56 -> 1234.56
    if s.count(',') == 1 and s.count('.') >= 1:
        s = s.replace('.', '')
        s = s.replace(',', '.')
    else:
        s = s.replace(',', '.')
    s = re.sub(r'[^0-9.\-]', '', s)
    if s in ('', '.', '-'):
        return Decimal('0.00')
    try:
        return Decimal(s)
    except InvalidOperation:
        return Decimal('0.00')


def parse_active(s: str) -> bool:
    if s is None:
        return True
    s = s.strip().lower()
    if s in ('1', 'true', 't', 'yes', 'y', 'ja'):
        return True
    if s in ('0', 'false', 'f', 'no', 'n', 'nee'):
        return False
    return s != ''


def rows_from_csv(path, category=None):
    import io

    with open(path, 'r', encoding='utf-8', newline='') as fh:
        text = fh.read()

    if text.startswith('\ufeff'):
        text = text.lstrip('\ufeff')

    text = text.lstrip('\n\r')
    if text.startswith('"\n') or text.startswith("'\n"):
        first_newline = text.find('\n')
        if first_newline != -1:
            text = text[first_newline + 1 :]

    f = io.StringIO(text)
    reader = csv.reader(f, delimiter=';', quotechar='"')

    try:
        headers = next(reader)
    except StopIteration:
        return

    headers = [h.strip() for h in headers]
    while headers and headers[-1] == '':
        headers.pop()

    for row in reader:
        if not any(cell.strip() for cell in row):
            continue

        data = {}
        for i, h in enumerate(headers):
            data[h] = row[i] if i < len(row) else ''

        get = lambda *keys: next((data.get(k) for k in keys if k in data), None)

        name = get('Naam', 'naam', 'name')
        image = get('afbeelding', 'image', 'image_url')
        price_raw = get('prijs', 'Prijs', 'price')
        desc = get('beschrijving', 'beschrijving (nl)', 'description')
        active_raw = get('actief', 'active')

        if not name or name.strip() == '':
            continue

        price = parse_price(price_raw)
        active = parse_active(active_raw)

        yield (
            name.strip().strip('"'),
            image.strip() if image else None,
            price,
            desc.strip() if desc else None,
            active,
            category,
        )


def get_conn_from_env():
    host = os.getenv('DB_HOST', '127.0.0.1')
    port = os.getenv('DB_PORT', '5432')
    dbname = os.getenv('DB_NAME', 'innovino')
    user = os.getenv('DB_USER', 'innovino')
    password = os.getenv('DB_PASSWORD', '')
    return psycopg2.connect(
        host=host, port=port, dbname=dbname, user=user, password=password
    )


def flush_batch(cur, insert_sql, rows_dict: Dict[str, Row]) -> int:
    """Voert een batch insert uit met unieke productnamen."""
    if not rows_dict:
        return 0
    batch = list(rows_dict.values())
    execute_values(cur, insert_sql, batch)
    return len(batch)


def import_products(csv_path, category=None, batch_size=500, dry_run=False):
    load_dotenv()

    if dry_run:
        sample = []
        total = 0
        for tup in rows_from_csv(csv_path, category=category):
            total += 1
            if len(sample) < 5:
                sample.append(tup)
        print(f'Dry run: parsed {total} rows. Sample:')
        for s in sample:
            print(s)
        return

    conn = get_conn_from_env()
    cur = conn.cursor()

    insert_sql = (
        "INSERT INTO products (name, image_url, price, description, active, category)"
        " VALUES %s"
        " ON CONFLICT (name) DO UPDATE SET"
        " image_url = EXCLUDED.image_url,"
        " price = EXCLUDED.price,"
        " description = EXCLUDED.description,"
        " active = EXCLUDED.active,"
        " category = COALESCE(EXCLUDED.category, products.category),"
        " updated_at = now();"
    )

    rows: Dict[str, Row] = {}
    count = 0

    for tup in rows_from_csv(csv_path, category=category):
        name = tup[0]
        rows[name] = tup  # laatste versie overwint duplicaten
        if len(rows) >= batch_size:
            inserted = flush_batch(cur, insert_sql, rows)
            conn.commit()
            count += inserted
            print(f'Imported {count} rows...')
            rows.clear()

    if rows:
        inserted = flush_batch(cur, insert_sql, rows)
        conn.commit()
        count += inserted

    cur.close()
    conn.close()
    print(f'Done. Imported/updated {count} products.')


def main():
    parser = argparse.ArgumentParser(
        description='Import products CSV into products table'
    )
    parser.add_argument('--file', '-f', required=True, help='Path to producten.csv')
    parser.add_argument(
        '--category', '-c', help='Optional category value to set for all imported rows'
    )
    parser.add_argument(
        '--dry-run',
        action='store_true',
        help='Parse CSV and show sample rows without inserting into DB',
    )
    args = parser.parse_args()

    import_products(args.file, category=args.category, dry_run=args.dry_run)


if __name__ == '__main__':
    main()
