from selenium import webdriver
from selenium.webdriver.common.by import By
import time

def scrape_label(driver: webdriver.Chrome, url: str):
    driver.get(url)
    time.sleep(2)

    # want <div> with id="label_content" which contains <dt> and <dd>

    try:
        label_logo = driver.find_element(By.ID, "label_sidebar")
        label_logo_img = label_logo.find_element(By.TAG_NAME, "img")
        label["logo"] = label_logo_img.get_attribute("src")
    except:
        print("Label logo not found")
        return None

    try:
        label_content = driver.find_element(By.ID, "label_content")
        dt_elements = label_content.find_elements(By.TAG_NAME, "dt")
        dd_elements = label_content.find_elements(By.TAG_NAME, "dd")
    except:
        print("Label content not found")
        return None

    label = {}
    for dt, dd in zip(dt_elements, dd_elements):
        label[dt.text] = dd.text

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
        return None

    url = url_a.get_attribute("href")

    label["email"] = email
    label["url"] = url

    # Current Roster with pagination
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
        return None

    # Historical Roster with pagination
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
        return None

    # Releases with pagination
    # Links
    # Notes

    # Audit Trail
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
        return None

    return label
