from selenium import webdriver
from selenium.webdriver.common.by import By
import time

def scrape_label(driver: webdriver.Chrome, url: str):
    driver.get(url)
    time.sleep(2)

    # want <div> with id="label_content" which contains <dt> and <dd>
    label_content = driver.find_element(By.ID, "label_content")
    dt_elements = label_content.find_elements(By.TAG_NAME, "dt")
    dd_elements = label_content.find_elements(By.TAG_NAME, "dd")
    label = {}
    for dt, dd in zip(dt_elements, dd_elements):
        label[dt.text] = dd.text

    # now add the contact information
    # stored in a <p> with id="label_contact" with two <a> tags inside
    # email is <a> id="nospam" and the url has no id
    contact_info = driver.find_element(By.ID, "label_contact")
    email_a = contact_info.find_element(By.CLASS_NAME, "nospam")
    email = email_a.text

    url_a = contact_info.find_element(By.TAG_NAME, "a")
    url = url_a.get_attribute("href")

    label["email"] = email
    label["url"] = url

    # Rosters will come later

    return label
