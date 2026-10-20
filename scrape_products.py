import urllib.request
import json
import time

all_products = []
page = 1

while True:
    url = f"https://purepromisediamonds.com/products.json?limit=250&page={page}"
    print(f"Fetching page {page}...")
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            products = data.get('products', [])
            if not products:
                print("No more products found.")
                break
            all_products.extend(products)
            print(f"Page {page}: retrieved {len(products)} products (Total: {len(all_products)})")
            if len(products) < 250:
                break
            page += 1
            time.sleep(1)
    except Exception as e:
        print(f"Error on page {page}: {e}")
        break

print(f"\nTotal products fetched: {len(all_products)}")

# Print summary
types = {}
for p in all_products:
    t = p.get('product_type') or 'Uncategorized'
    types[t] = types.get(t, 0) + 1

print("\nProduct Types:")
for t, count in sorted(types.items(), key=lambda x: -x[1]):
    print(f"  {t}: {count}")

with open('scraped_purepromise_products.json', 'w', encoding='utf-8') as f:
    json.dump(all_products, f, indent=2)

print("\nSaved full dump to scraped_purepromise_products.json")
