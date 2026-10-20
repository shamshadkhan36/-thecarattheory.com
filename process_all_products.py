import json
import re

def clean_html(raw_html):
    if not raw_html:
        return ""
    clean = re.sub(r'<.*?>', ' ', raw_html)
    clean = re.sub(r'\s+', ' ', clean).strip()
    clean = clean.replace("Pure Promise", "The Carat Theory")
    clean = clean.replace("pure promise", "The Carat Theory")
    clean = re.sub(r'across India\s*', 'worldwide ', clean, flags=re.IGNORECASE)
    clean = re.sub(r'in India\s*', 'worldwide ', clean, flags=re.IGNORECASE)
    clean = re.sub(r'India\s*', '', clean, flags=re.IGNORECASE)
    clean = re.sub(r'buyback', 'Lifetime Care & Service Guarantee', clean, flags=re.IGNORECASE)
    return clean

def extract_shape(tags, title):
    known_shapes = ['Round', 'Oval', 'Emerald', 'Cushion', 'Pear', 'Princess', 'Marquise', 'Heart', 'Radiant', 'Asscher']
    all_text = " ".join(tags) + " " + title
    for shape in known_shapes:
        if shape.lower() in all_text.lower():
            return shape
    return "Round"

def normalize_category(ptype):
    pt = (ptype or '').strip().lower()
    if 'earring' in pt:
        return 'earrings', 'Earrings'
    elif 'ring' in pt:
        return 'rings', 'Rings'
    elif 'bracelet' in pt:
        return 'bracelets', 'Bracelets'
    elif 'pendant' in pt:
        return 'pendants', 'Pendants'
    elif 'necklace' in pt:
        return 'necklaces', 'Necklaces'
    elif 'nose' in pt:
        return 'nosepins', 'Nose Pins'
    return 'rings', 'Rings'

with open('scraped_purepromise_products.json', encoding='utf-8') as f:
    raw_products = json.load(f)

processed_catalog = []

for idx, p in enumerate(raw_products):
    raw_title = p.get('title', '').strip()
    # Clean title: replace "Silver Ring" with "Diamond Ring" for brand prestige, or keep clean
    title = raw_title.replace("Silver Ring", "Diamond Ring")
    title = title.replace("Silver Bracelet", "Diamond Bracelet")
    title = title.replace("Silver Pendant", "Diamond Pendant")
    title = title.replace("Silver Earring", "Diamond Earring")
    title = title.replace("Silver Necklace", "Diamond Necklace")
    title = title.replace("Pure Promise", "The Carat Theory").strip()

    handle = p.get('handle', f"product-{idx}")
    cat_key, cat_label = normalize_category(p.get('product_type'))
    
    tags = p.get('tags', [])
    if isinstance(tags, str):
        tags = [t.strip() for t in tags.split(',')]
    
    shape = extract_shape(tags, raw_title)

    # Process variants and pricing
    variants = p.get('variants', [])
    purity_prices = {}
    base_price_inr = None

    for v in variants:
        try:
            v_price = float(v.get('price', 0))
        except:
            v_price = 0
        if v_price <= 0:
            continue
        
        # Options
        opts = [v.get('option1'), v.get('option2'), v.get('option3')]
        opts_str = " ".join([str(o) for o in opts if o])
        
        # Check purity
        if any(x in opts_str.lower() for x in ['925', 'silver']):
            if '925 Silver' not in purity_prices:
                purity_prices['925 Silver'] = round(v_price / 84.5)
        elif '9k' in opts_str.lower():
            if '9K' not in purity_prices:
                purity_prices['9K'] = round(v_price / 84.5)
        elif '14k' in opts_str.lower():
            if '14K' not in purity_prices:
                purity_prices['14K'] = round(v_price / 84.5)
        elif '18k' in opts_str.lower():
            if '18K' not in purity_prices:
                purity_prices['18K'] = round(v_price / 84.5)

        if base_price_inr is None:
            base_price_inr = v_price

    if not base_price_inr:
        base_price_inr = 30000

    base_usd = round(base_price_inr / 84.5)

    # Fill missing purities with realistic jewelry ratios if needed
    if '925 Silver' not in purity_prices:
        purity_prices['925 Silver'] = base_usd
    if '9K' not in purity_prices:
        purity_prices['9K'] = round(purity_prices['925 Silver'] * 2.3)
    if '14K' not in purity_prices:
        purity_prices['14K'] = round(purity_prices['925 Silver'] * 3.1)
    if '18K' not in purity_prices:
        purity_prices['18K'] = round(purity_prices['925 Silver'] * 3.8)

    # Primary price is 18K price (or base USD)
    primary_price_usd = purity_prices.get('18K', base_usd)

    # Process images
    raw_images = p.get('images', [])
    images_list = []
    for i, img in enumerate(raw_images):
        src = img.get('src')
        if src:
            images_list.append({
                'src': src,
                'alt': f"The Carat Theory {title} - View {i+1}",
                'isVideo': False
            })

    if not images_list:
        images_list = [{
            'src': '/assets/products/tct-three-stone-yellow.jpg',
            'alt': f"The Carat Theory {title}",
            'isVideo': False
        }]

    # Price Breakup
    gold_val = round(primary_price_usd * 0.32)
    diamond_val = round(primary_price_usd * 0.58)
    crafting_val = round(primary_price_usd * 0.07)
    courier_val = primary_price_usd - (gold_val + diamond_val + crafting_val)
    if courier_val <= 0:
        courier_val = 25

    price_breakup = [
        { 'item': 'Gold & Precious Metal Value', 'amount': f"${gold_val}" },
        { 'item': 'Certified Lab Diamonds (DEF / VVS)', 'amount': f"${diamond_val}" },
        { 'item': 'Master Hand-Setting & Craftsmanship', 'amount': f"${crafting_val}" },
        { 'item': 'Insured Armored Express Courier', 'amount': f"${courier_val}" },
        { 'item': 'Total Selling Price', 'amount': f"${primary_price_usd}", 'highlight': True }
    ]

    clean_desc = clean_html(p.get('body_html'))
    if not clean_desc or len(clean_desc) < 30:
        clean_desc = f"{title} brings a touch of modern luxury to your everyday wardrobe, infusing it with optical brilliance. Handcrafted with precision-set certified lab-grown diamonds."

    full_desc = f"{clean_desc} Your order includes bespoke velvet presentation packaging, independent diamond authenticity certificate, and our Lifetime Care & Service Guarantee."

    prod_obj = {
        'id': handle,
        'name': title,
        'handle': handle,
        'sku': f"TCT-{handle[:8].upper()}",
        'category': cat_key,
        'categoryLabel': cat_label,
        'shape': shape,
        'rating': round(4.7 + (idx % 4) * 0.1, 1),
        'reviewsCount': 18 + (idx * 7) % 65,
        'priceUSD': primary_price_usd,
        'pricesByPurity': purity_prices,
        'metals': ['925 Silver', '9K', '14K', '18K'],
        'colors': [
            { 'id': 'yellow', 'name': 'Yellow Gold', 'hex': '#F2C94C', 'imageIndex': 0 },
            { 'id': 'white', 'name': 'White Gold', 'hex': '#C4C4C4', 'imageIndex': min(1, len(images_list)-1) },
            { 'id': 'rose', 'name': 'Rose Gold', 'hex': '#E08E88', 'imageIndex': min(2, len(images_list)-1) }
        ],
        'image': images_list[0]['src'],
        'images': images_list,
        'description': full_desc,
        'details': [
            { 'label': 'Metal Purity', 'value': '18K Solid Gold / 14K / 9K / 925 Sterling Silver' },
            { 'label': 'Diamond Cut & Shape', 'value': f"{shape} Cut · Excellent / Ideal (Hearts & Arrows)" },
            { 'label': 'Diamond Color & Clarity', 'value': 'DEF Color · VVS-VS Clarity' },
            { 'label': 'Certification', 'value': 'IGI / GIA Authenticated Laser Inscribed' },
            { 'label': 'Warranty & Care', 'value': 'Lifetime Care & Service Guarantee' }
        ],
        'priceBreakup': price_breakup,
        'shippingInfo': 'Complimentary insured express delivery in 3-5 business days worldwide. Ships via insured armored transport with discrete tamper-evident luxury presentation packaging. Odd ring sizes (e.g. 6.5) and custom orders are crafted exclusively to order with no cancellations. Covered by our Lifetime Care & Service Guarantee.'
    }

    processed_catalog.append(prod_obj)

print(f"Processed {len(processed_catalog)} products successfully!")

# Write out as JSON
with open('src/data/allProducts.json', 'w', encoding='utf-8') as f:
    json.dump(processed_catalog, f, indent=2)

print("Saved src/data/allProducts.json")
