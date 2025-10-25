from selenium import webdriver
from selenium.webdriver.common.by import By
import time

def scrape_label(driver: webdriver.Chrome, url: str):
    driver.get(url)
    time.sleep(2)

    # want <div> with id="label_content" which contains <dt> and <dd>
    print("Scraping label: " + url)

    print("Scraping base information")

    label = {}
    label["label_id"] = 3 # TODO: remove this once we have a way to get the label id
    label["logo_url"] = None
    try:

        label_logo = driver.find_element(By.ID, "label_sidebar")
        label_logo_img = label_logo.find_element(By.TAG_NAME, "img")
        label["logo_url"] = label_logo_img.get_attribute("src")
    except Exception as e:
        print(f"Label logo not found: {e}")
        return {}

    try:
        label_content = driver.find_element(By.ID, "label_content")
        label["name"] = label_content.find_element(By.TAG_NAME, "h1").text
        dt_elements = label_content.find_elements(By.TAG_NAME, "dt")
        dd_elements = label_content.find_elements(By.TAG_NAME, "dd")
    except:
        print("Label content not found")
        return {}


    for dt, dd in zip(dt_elements, dd_elements):
        key = dt.text.replace(":", "").strip().replace(" ", "_").lower()
        label[key] = dd.text
        print("Key: " + key + " Value: " + dd.text)

    # now add the contact information
    # stored in a <p> with id="label_contact" with two <a> tags inside
    # email is <a> id="nospam" and the url has no id
    try:
        contact_info = driver.find_element(By.ID, "label_contact")
        email_a = contact_info.find_element(By.CLASS_NAME, "nospam")
        email = email_a.text

        url_a = contact_info.find_element(By.TAG_NAME, "a")
        url = url_a.get_attribute("href")
    except:
        print("Contact info not found")
        return {}

    label["email"] = email
    label["url"] = url

    # Current Roster with pagination

    print("Scraping current bands")

    try:
        current_bands_tab = driver.find_element(By.ID, "label_tabs_bands")
        # Showing 1 to 100 of 143 entries
        table_info = current_bands_tab.find_element(By.ID, "bandList_info")
        print("Table info: " + table_info.text)
        
        current_bands_table = current_bands_tab.find_element(By.ID, "bandList")

        # There is a header row, so we need to skip the first row
        current_bands_elements = current_bands_table.find_elements(By.TAG_NAME, "tr")
        
        label["current_bands"] = []
        while True:
            for element in current_bands_elements[1:]:
                # each <tr> contains three <td> tags: Band link, Genre, Country
                # Sample link: https://www.metal-archives.com/bands/200_Stab_Wounds/3540465014
                element_tds = element.find_elements(By.TAG_NAME, "td")
                if len(element_tds) != 3:
                    print("Current bands table has unexpected number of columns. Columns: " + str(len(element_tds)))
                    continue

                band_link = element_tds[0].find_element(By.TAG_NAME, "a").get_attribute("href")
                band_id = band_link.split("/")[5]

                band_name = band_link.split("/")[4]
                genre = element_tds[1].text
                country = element_tds[2].text
                label["current_bands"].append({
                    "band_id": band_id,
                    "band_url": band_link,
                    "band_name": band_name,
                    "genre": genre,
                    "country": country
                })

            # Next page
            next_page = current_bands_tab.find_element(By.CLASS_NAME, "next")
            if next_page.is_displayed() and "paginate_button_disabled" not in next_page.get_attribute("class"):
                next_page.click()
                time.sleep(2)
                current_bands_elements = current_bands_table.find_elements(By.TAG_NAME, "tr")
                print("Current bands table has " + str(len(current_bands_elements)) + " rows")
            else:
                break

    except Exception as e:
        print(f"Error: {e}")
        print("Current bands not found")
        return {}

    # click on the past bands tab

    print("Scraping past bands")

    try:
        past_bands_tab = driver.find_element(By.ID, "ui-id-2")
        past_bands_tab.click()
        time.sleep(2)
    except Exception as e:
        print(f"Error: {e}")
        print("Past bands tab not found")
        return {}

    # Historical Roster with pagination
    label["historical_bands"] = []
    try:
        historical_bands_tab = driver.find_element(By.ID, "label_tabs_past")
        historical_bands_table = historical_bands_tab.find_element(By.ID, "bandListPast")
        historical_bands_elements = historical_bands_table.find_elements(By.TAG_NAME, "tr")
        while True:
            for element in historical_bands_elements[1:]:
                element_tds = element.find_elements(By.TAG_NAME, "td")
                if len(element_tds) != 4:
                    print("Historical bands table has unexpected number of columns. Columns: " + str(len(element_tds)))
                    continue

                band_link = element_tds[0].find_element(By.TAG_NAME, "a").get_attribute("href")
                band_id = band_link.split("/")[5]
                band_name = band_link.split("/")[4]
                genre = element_tds[1].text
                country = element_tds[2].text
                num_releases = element_tds[3].text
                label["historical_bands"].append({
                    "band_id": band_id,
                    "band_url": band_link,
                    "band_name": band_name,
                    "genre": genre,
                    "country": country,
                    "num_releases": num_releases
                })

            next_page = historical_bands_tab.find_element(By.CLASS_NAME, "next")
            if next_page.is_displayed() and "paginate_button_disabled" not in next_page.get_attribute("class"):
                next_page.click()
                time.sleep(2)
                historical_bands_elements = historical_bands_table.find_elements(By.TAG_NAME, "tr")
                print("Historical bands table has " + str(len(historical_bands_elements)) + " rows")
            else:
                break

    except Exception as e:
        print(f"Error: {e}")
        print("Historical bands not found")
        return {}

    # Releases with pagination

    print("Scraping releases")

    try:
        releases_tab = driver.find_element(By.ID, "ui-id-3")
        releases_tab.click()
        time.sleep(2)
    except Exception as e:
        print(f"Error: {e}")
        print("Releases tab not found")
        return {}

    label["releases"] = []
    # Column order: Band link, Album link, Album type, Album year, Catalog, Format, Description
    try:
        releases_tab = driver.find_element(By.ID, "label_tabs_albums")
        releases_table = releases_tab.find_element(By.ID, "albumList")
        releases_elements = releases_table.find_elements(By.TAG_NAME, "tr")
        counter = 0
        while True:
            for element in releases_elements[1:]:
                element_tds = element.find_elements(By.TAG_NAME, "td")
                if len(element_tds) != 7:
                    print("Releases table has unexpected number of columns. Columns: " + str(len(element_tds)))
                    continue
                
                band_link = element_tds[0].find_element(By.TAG_NAME, "a").get_attribute("href")
                band_id = band_link.split("/")[5]
                release_link = element_tds[1].find_element(By.TAG_NAME, "a").get_attribute("href")
                release_id = release_link.split("/")[6]
                release_name = release_link.split("/")[5]
                release_type = element_tds[2].text
                release_year = element_tds[3].text

                if release_year == "Unknown":
                    release_year = 0
                else:
                    release_year = int(release_year)

                catalog = element_tds[4].text
                format = element_tds[5].text
                description = element_tds[6].text
                label["releases"].append({
                    "band_id": band_id,
                    "release_id": release_id,
                    "release_url": release_link,
                    "release_name": release_name,
                    "release_type": release_type,
                    "release_year": release_year,
                    "catalog": catalog,
                    "format": format,
                    "description": description
                })

            if counter > 1:
                break

            next_page = releases_tab.find_element(By.CLASS_NAME, "next")
            if next_page.is_displayed() and "paginate_button_disabled" not in next_page.get_attribute("class"):
                next_page.click()
                time.sleep(2)
                releases_elements = releases_table.find_elements(By.TAG_NAME, "tr")
                print("Releases table has " + str(len(releases_elements)) + " rows")
            else:
                break

            counter += 1


    except Exception as e:
        print(f"Error: {e}")
        print("Releases not found")
        return {}
    
    # Links

    print("Scraping links")

    try:
        links_tab = driver.find_element(By.ID, "ui-id-4")
        links_tab.click()
        time.sleep(2)
    except Exception as e:
        print(f"Error: {e}")
        print("Links tab not found")
        return {}

    label["links"] = []
    try:
        links_tab = driver.find_element(By.ID, "ui-tabs-1")
        links_table = links_tab.find_element(By.ID, "linksTablemain")
        links_elements = links_table.find_elements(By.TAG_NAME, "tr")
        
        for element in links_elements:
            if element.get_attribute("id") in ["header_Official", "header_Official_merchandise"]:
                continue
            element_td = element.find_element(By.TAG_NAME, "td")
            print("Element TD: " + element_td.text)

            link_name = element_td.text
            print("Link name: " + link_name)
            link_url = element_td.find_element(By.TAG_NAME, "a").get_attribute("href")
            label["links"].append({
                "link_name": link_name,
                "link_url": link_url
            })
    except Exception as e:
        print(f"Error: {e}")
        print("Links not found")
        return {}
    
    # Notes

    print("Scraping notes")

    try:
        notes_tab = driver.find_element(By.ID, "ui-id-5")
        notes_tab.click()
        time.sleep(2)
    except Exception as e:
        print(f"Error: {e}")
        print("Notes tab not found")
        return {}

    label["notes"] = []
    try:
        notes_tab = driver.find_element(By.ID, "label_tabs_notes")
        note_title = notes_tab.find_element(By.CLASS_NAME, "title_comment")
        note_text = notes_tab.find_element(By.TAG_NAME, "p")
        label["notes"] = {
            "title": note_title.text,
            "text": note_text.text
        }
    except Exception as e:
        print(f"Error: {e}")
        print("Notes not found")
        return {}
    

    # Audit Trail

    print("Scraping audit trail")

    try:
        audit_trail = driver.find_element(By.ID, "auditTrail")
        audit_trail_elements = audit_trail.find_elements(By.TAG_NAME, "td")

        for element in audit_trail_elements:
            parts = element.text.split(":")
            if "Added by" in parts[0]:
                label["added_by"] = parts[1]
            elif "Added on" in parts[0]:
                label["added_on"] = parts[1]
            elif "Modified by" in parts[0]:
                label["modified_by"] = parts[1]
            elif "Modified on" in parts[0]:
                label["modified_on"] = parts[1]
    except:
        print("Audit trail not found")
        return {}

    print("Scraping complete")

    return label
