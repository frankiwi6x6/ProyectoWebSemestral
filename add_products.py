import json
from core.models import Item

def add_products():
    # Open and read the JSON file containing the products
    with open('productos.json', 'r', encoding='utf-8') as file:
        products = json.load(file)

    # Iterate over the products and create Item objects
    for product in products:
        item = Item(
            title=product['nombre'],
            price=product['precio'],
            discount_price=product['precio_oferta'],
            category=product['categoria'],
            label=product['label'],
            slug=product['slug'],
            description=product['description'],
            image=product['rutaImagen']
        )
        item.save()

add_products()