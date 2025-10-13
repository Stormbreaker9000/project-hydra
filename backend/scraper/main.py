from selenium import webdriver
from selenium.webdriver.common.by import By
from entities.label import scrape_label
from database.connect import connect
from database.config import load_config
import time

element_list = []


# This will orchestrate the main scraping functions

# Set up the Chrome driver
driver = webdriver.Chrome()

# config = load_config()
# conn = connect(config)

try:
    results = scrape_label(driver, "https://www.metal-archives.com/labels/Metal_Blade_Records")
    print(results)
except Exception as e:
    print(f"Error: {e}")

finally:
    driver.quit()
