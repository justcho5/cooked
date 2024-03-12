from recipe_scrapers import scrape_me, scrape_html
import requests

url = 'https://www.allrecipes.com/recipe/158968/spinach-and-feta-turkey-burgers/'
html = requests.get(url).content
scraper = scrape_html(html=html, org_url=url)

# scraper.host()
# scraper.title()
# scraper.total_time()
# scraper.image()
# print(scraper.ingredients())
# scraper.ingredient_groups()
# print(scraper.instructions()[0])
# print(scraper.instructions_list()[0])
# scraper.yields()
print(scraper)
print(scraper.to_json())