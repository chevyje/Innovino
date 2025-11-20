import psycopg2
import os
from dotenv import load_dotenv
from pathlib import Path

# Load env
load_dotenv()

# Load database credentials
DB_NAME: str = os.getenv('DB_NAME')
DB_USER: str = os.getenv("DB_USER")
DB_PASSWORD: str = os.getenv("DB_PASSWORD")
DB_HOST: str = os.getenv("DB_HOST")

def connect_db():
    try:
        print('Connecting to the PostgreSQL database...')
        connection = create_connection()
        cur = connection.cursor()

        # get database version
        print('PostgreSQL database version:')
        cur.execute('SELECT version()')
        db_version = cur.fetchone()
        print(db_version)

        # create tables
        print('Creating tables...')
        schema_path = Path(__file__).with_name('schema.sql')
        with open(schema_path, "r") as schema:
            cur.execute(schema.read())
            connection.commit()
            print("Successfully created all the tables.")

        cur.close()
        connection.close()
        print('Successfully connected to PostgreSQL database.')
    except (Exception, psycopg2.Error) as error:
        print("Error while connecting to PostgreSQL", error)

def query_db(query: str, params: tuple = None):
    try:
        conn = create_connection()
        cur = conn.cursor()

        cur.execute(query, params)
        conn.commit()

        cur.close()
        conn.close()
    except (Exception, psycopg2.Error) as error:
        print("Error while connecting to PostgreSQL", error)

def select_db(query: str, params: tuple = None):
    try:
        conn = create_connection()
        cur = conn.cursor()

        cur.execute(query, params)
        return cur.fetchall()
    except (Exception, psycopg2.Error) as error:
        print("Error while connecting to PostgreSQL", error)
        return []

def insert_db(query: str, params: tuple = None):
    try:
        conn = create_connection()
        cur = conn.cursor()

        cur.execute(query, params)
        result = cur.fetchone()
        response = result[0] if result else None
        conn.commit()
        return response or 0
    except (Exception, psycopg2.errors.UniqueViolation) as error:
        print("Error while connecting to PostgreSQL", error)
        return None
    except (Exception, psycopg2.Error) as error:
        print("Error while connecting to PostgreSQL", error)
        return None

def create_connection():
    try:
        return psycopg2.connect(
            dbname=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD,
            host=DB_HOST
        )
    except (Exception, psycopg2.Error) as error:
        print("Error while connecting to PostgreSQL", error)
        return None