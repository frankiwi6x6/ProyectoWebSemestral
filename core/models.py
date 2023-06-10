from django.db import models
from django.shortcuts import reverse
from django.conf import settings
from django_countries.fields import CountryField

# Create your models here.

CATEGORY_CHOICES = (
    ('A', 'Arboles'),
    ('AR', 'Arbustos'),
    ('M', 'Macetas'),
    ('S', 'Semillas'),
    ('H', 'Herramientas'),
)

LABEL_CHOICES = (
    ('S', 'success'),
    ('D', 'danger'),
    ('W', 'warning')
)

class Item(models.Model):
    title = models.CharField(max_length=100)
    price = models.FloatField()
    discount_price = models.FloatField(blank=True, null=True)
    on_sale = models.BooleanField(default=False)
    category = models.CharField(choices=CATEGORY_CHOICES, max_length=2)
    label = models.CharField(choices=LABEL_CHOICES, max_length=2, blank=True, null=True)
    slug = models.SlugField()
    description = models.TextField()
    image = models.ImageField(default='default.jpg', upload_to='productos')

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse("core:product", kwargs={'slug': self.slug})

    def get_add_to_cart_url(self):
        return reverse("core:add-to-cart", kwargs={'slug': self.slug})

    def get_remove_from_cart_url(self):
        return reverse("core:remove-from-cart", kwargs={'slug': self.slug})

    def get_discount_pencentaje(self):
        return int(((self.price - self.discount_price) / self.price) * 100)

    @property
    def display_price(self):
        if self.on_sale and self.discount_price:
            return self.discount_price
        return self.price

    def save(self, *args, **kwargs):
        if self.on_sale:
                self.label = 'D'
        elif self.on_sale == False and self.label == 'D':
                self.label = None

        super().save(*args, **kwargs)



class OrderItem(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    ordered = models.BooleanField(default=False)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} of {self.item.title}"

    def get_total_item_price(self):
        return self.quantity * self.item.price

    def get_total_discount_item_price(self):
        return self.quantity * self.item.discount_price

    def get_amount_saved(self):
        return self.get_total_item_price() - self.get_total_discount_item_price()

    def get_final_price(self):
        if self.item.discount_price:
            return self.get_total_discount_item_price()
        return self.get_total_item_price()


class Order(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    ref_code = models.CharField(max_length=20, blank=True, null=True)
    items = models.ManyToManyField(OrderItem)
    start_date = models.DateTimeField(auto_now_add=True)
    ordered_date = models.DateTimeField()
    ordered = models.BooleanField(default=False)

    '''
    1. Item added to cart
    2. Adding a billing address
    (Failed checkout)
    3. Payment
    (Preprocessing, processing, packaging etc.)
    4. Being delivered
    5. Received
    6. Refunds
    '''

    def __str__(self):
        return self.user.username

    def get_total(self):
        total = 0
        for order_item in self.items.all():
            total += order_item.get_final_price()
        if self.coupon:
            total -= self.coupon.amount
        return total