from database.connect import connect
from database.config import load_config
import psycopg
from datetime import datetime
import re

def insert_label(label):
    config = load_config()

    # print label keys
    print(label.keys())

    # clean the founding date because it has a goofy format
    founded_date = label['founding_date']
    founded_date = re.sub(r'(\d+)(st|nd|rd|th)', r'\1', founded_date)
    founded_date = datetime.strptime(founded_date, "%B %d, %Y")
    founded_date = founded_date.strftime("%Y-%m-%d")
    label['founding_date'] = founded_date

    sql_labels_comprehensive = """
        INSERT INTO hydra.labels_comprehensive (
            label_id,
            name,
            specialization,
            status,
            country,
            founded_date,
            location,
            parent_company,
            logo_url,
            email,
            website_url,
            online_shopping,
            added_by,
            added_on,
            modified_by,
            modified_on,
            scraped_at,
            last_updated,
            sub_label)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """

    sql_label_bands = """
        INSERT INTO hydra.label_bands (
            label_id,
            band_id,
            band_name,
            band_url,
            genre,
            country,
            relationship_type,
            num_releases
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    """

    sql_label_releases = """
        INSERT INTO hydra.label_releases (
            label_id,
            release_id,
            release_name,
            release_url,
            band_id,
            release_type,
            release_year,
            catalog,
            format,
            description
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """

    sql_label_links = """
        INSERT INTO hydra.label_links (
            label_id,
            link_name,
            link_url
        ) VALUES (%s, %s, %s)
    """

    sql_label_notes = """
        INSERT INTO hydra.label_notes (
            label_id,
            note_title,
            note_text
        ) VALUES (%s, %s, %s)
    """

    try:
        with psycopg.connect(**config) as conn:
            with conn.cursor() as cur:

                current_date = datetime.now()
                cur.execute(sql_labels_comprehensive, (
                    label['label_id'],
                    label['name'],
                    label['styles/specialties'],
                    label['status'],
                    label['country'],
                    label['founding_date'],
                    label['address'],
                    '',  # parent_company is still left as empty string, update if you have the data
                    label['logo_url'],
                    label['email'],
                    label['url'],
                    label['online_shopping'],
                    label['added_by'],
                    current_date,  # added_on
                    label['modified_by'],
                    current_date,  # modified_on
                    current_date,  # scraped_at
                    current_date,   # last_updated
                    label['sub-labels']
                ))
                print("Label inserted successfully")
                # Get the id of the just-inserted label (label_id)

                print("Label id: " + str(label['label_id']))
                for band in label['current_bands']:
                    cur.execute(sql_label_bands, (
                        label['label_id'],
                        band['band_id'],
                        band['band_name'],
                        band['band_url'],
                        band['genre'],
                        band['country'],
                        'current',
                        None,
                    ))
                print("Current bands inserted successfully")
                for band in label['historical_bands']:
                    cur.execute(sql_label_bands, (
                        label['label_id'],
                        band['band_id'],
                        band['band_name'],
                        band['band_url'],
                        band['genre'],
                        band['country'],
                        'historical',
                        band['num_releases'],
                    ))
                print("Historical bands inserted successfully")
                for release in label['releases']:
                    cur.execute(sql_label_releases, (
                        label['label_id'],
                        release['release_id'],
                        release['release_name'],
                        release['release_url'],
                        release['band_id'],
                        release['release_type'],
                        release['release_year'],
                        release['catalog'],
                        release['format'],
                        release['description'],
                    ))
                print("Releases inserted successfully")
                for link in label['links']:
                    cur.execute(sql_label_links, (
                        label['label_id'],
                        link['link_name'],
                        link['link_url'],
                    ))
                print("Links inserted successfully")
                # Handle notes - it's a dictionary, not a list
                if label['notes'] and isinstance(label['notes'], dict):
                    cur.execute(sql_label_notes, (
                        label['label_id'],
                        label['notes']['title'],
                        label['notes']['text'],
                    ))
                print("Notes inserted successfully")
                conn.commit()
    except (psycopg.DatabaseError, Exception) as e:
        print(f"Error inserting label: {e}")
        return False