from django.conf import settings
from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=120, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=180)
    brand = models.CharField(max_length=120, blank=True, default='')
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True, related_name='products')
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    old_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    description = models.TextField(blank=True, default='')
    specifications = models.JSONField(default=dict, blank=True)
    stock = models.PositiveIntegerField(default=0)
    stock_status = models.CharField(max_length=40, default='in-stock')
    image = models.URLField(blank=True, default='')
    images = models.JSONField(default=list, blank=True)
    featured = models.BooleanField(default=False)
    deal = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class OrderItem(models.Model):
    product_name = models.CharField(max_length=180)
    product_id = models.CharField(max_length=80, blank=True, default='')
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    order = models.ForeignKey('Order', on_delete=models.CASCADE, related_name='items')

    @property
    def subtotal(self):
        return self.quantity * self.price

    def __str__(self):
        return f'{self.product_name} x {self.quantity}'


class Order(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Processing', 'Processing'),
        ('Shipped', 'Shipped'),
        ('Delivered', 'Delivered'),
        ('Cancelled', 'Cancelled'),
    ]

    customer_name = models.CharField(max_length=150)
    customer_phone = models.CharField(max_length=40)
    customer_email = models.EmailField()
    shipping_address = models.TextField()
    city = models.CharField(max_length=120)
    state = models.CharField(max_length=120)
    payment_method = models.CharField(max_length=80, default='Pay on Delivery')
    total_amount = models.DecimalField(max_digits=12, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    notes = models.TextField(blank=True, default='')
    status_last_changed = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, blank=True, on_delete=models.SET_NULL, related_name='created_orders')

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'Order #{self.id} - {self.customer_name}'
