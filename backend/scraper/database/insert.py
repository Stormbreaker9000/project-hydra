from database.connect import connect
from database.config import load_config
import psycopg

def insert_label(label):
    config = load_config()

    # print label keys
    print(label.keys())


    sql = """
        INSERT INTO labels_comprehensive (name, specialization, status, country, founded_year, location, parent_company, logo_url, email, website_url, online_shopping, added_by, added_on, modified_by, modified_on, scraped_at, last_updated) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """

    try:
        with psycopg.connect(**config) as conn:
            with conn.cursor() as cur:
                from datetime import datetime
                current_date = datetime.now()
                cur.execute(sql, (
                    label['name'],
                    label['Styles/specialties:'],
                    label['Status:'],
                    label['Country:'],
                    label['Founding date :'].split(" ")[2],
                    label['Address:'],
                    '',  # parent_company is still left as empty string, update if you have the data
                    label['logo_url'],
                    label['email'],
                    label['url'],
                    label['Online shopping:'],
                    label['added_by'],
                    current_date,  # added_on
                    label['modified_by'],
                    current_date,  # modified_on
                    current_date,  # scraped_at
                    current_date   # last_updated
                ))
                conn.commit()
    except (psycopg.DatabaseError, Exception) as e:
        print(f"Error inserting label: {e}")
        return False