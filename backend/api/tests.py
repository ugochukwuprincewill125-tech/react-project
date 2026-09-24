from django.contrib.auth import get_user_model
from django.test import TestCase

from .models import Order, OrderItem


class OrderApiTests(TestCase):
    def test_order_model_can_be_created(self):
        user_model = get_user_model()
        admin = user_model.objects.create_user(username='admin', email='admin@example.com', password='secret123')

        order = Order.objects.create(
            customer_name='Jane Doe',
            customer_phone='08012345678',
            customer_email='jane@example.com',
            shipping_address='14 Main Street, Lagos',
            city='Lagos',
            state='Lagos State',
            payment_method='Pay on Delivery',
            total_amount=12500,
            status='Pending',
            created_by=admin,
        )

        OrderItem.objects.create(
            order=order,
            product_name='Wireless Mechanical Keyboard',
            product_id='prod-001',
            quantity=2,
            price=6250,
        )

        self.assertEqual(order.customer_name, 'Jane Doe')
        self.assertEqual(order.items.count(), 1)
        self.assertEqual(Order.objects.count(), 1)
