import psycopg2
import os
from dotenv import load_dotenv

# Load env
load_dotenv()

# Load database credentials
DB_NAME: str = os.getenv('DB_NAME')
DB_USER: str = os.getenv("DB_USER")
DB_PASSWORD: str = os.getenv("DB_PASSWORD")
DB_HOST: str = os.getenv("DB_HOST")

def connect_db():
    try:
        # connect to the database
        print('Connecting to the PostgreSQL database...')
        connection = psycopg2.connect(
            dbname=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD,
            host=DB_HOST)

        # create a cursor for communication
        cur = connection.cursor()

        # get database version
        print('PostgreSQL database version:')
        cur.execute('SELECT version()')

        # print database version
        db_version = cur.fetchone()
        print(db_version)

        # create tables
        print('Creating tables...')
        with open("schema.sql") as schema:
            cur.execute(schema.read())
            connection.commit()
            print("Successfully created all the tables.")


        # end connection
        cur.close()
        connection.close()
        print('Successfully connected to PostgreSQL database.')
    except (Exception, psycopg2.Error) as error:
        print("Error while connecting to PostgreSQL", error)

def query_db(query: str, params: tuple = None):
    try:
        # Create connection and cursor
        conn = psycopg2.connect(
            dbname=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD,
            host=DB_HOST
        )
        cur = conn.cursor()

        # Execute query
        cur.execute(query, params)
        conn.commit()

        # Close connection
        cur.close()
        conn.close()
    except (Exception, psycopg2.Error) as error:
        print("Error while connecting to PostgreSQL", error)
connect_db()

def select_db(query: str, params: tuple = None):
    try:
        conn = psycopg2.connect(
            dbname=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD,
            host=DB_HOST
        )
        cur = conn.cursor()

        cur.execute(query, params)
        return cur.fetchall()
    except (Exception, psycopg2.Error) as error:
        print("Error while connecting to PostgreSQL", error)
        return []

def insert_db(query: str, params: tuple = None):
    try:
        conn = psycopg2.connect(
            dbname=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD,
            host=DB_HOST
        )
        cur = conn.cursor()

        cur.execute(query, params)
        result = cur.fetchone()
        user_id = result[0] if result else None
        conn.commit()
        return user_id or 0
    except (Exception, psycopg2.errors.UniqueViolation) as error:
        print("Error while connecting to PostgreSQL", error)
        return -1
    except (Exception, psycopg2.Error) as error:
        print("Error while connecting to PostgreSQL", error)
        return -2
