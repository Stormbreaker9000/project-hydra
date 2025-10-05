from selenium import webdriver
from selenium.webdriver.common.by import By

import time

element_list = []


# Basic scraper for google.com

# Set up the Chrome driver
driver = webdriver.Chrome()

try:
    # Navigate to Google
    driver.get("https://www.metal-archives.com")

    # Wait for the page to load
    time.sleep(2)

    # find the div with id 'additional-bands' which contains a table of latest bands
    additional_bands_div = driver.find_element(By.ID, "additionBands")
    bands_table = additional_bands_div.find_element(By.TAG_NAME, "table")
    rows = bands_table.find_elements(By.TAG_NAME, "tr")
    for row in rows:
        print(row.text)
        element_list.append(row.text)

finally:
    driver.quit()
