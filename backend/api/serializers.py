from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import Category, Order, OrderItem, Product


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'created_at']


class ProductSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), required=False, allow_null=True)

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'brand', 'category', 'price', 'old_price', 'description',
            'specifications', 'stock', 'stock_status', 'image', 'images', 'featured', 'deal',
            'created_at', 'updated_at'
        ]


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['id', 'product_name', 'product_id', 'quantity', 'price', 'subtotal']
        read_only_fields = ['id', 'subtotal']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = [
            'id', 'customer_name', 'customer_phone', 'customer_email', 'shipping_address',
            'city', 'state', 'payment_method', 'total_amount', 'status', 'notes',
            'status_last_changed', 'created_at', 'updated_at', 'items'
        ]
        read_only_fields = ['id', 'status_last_changed', 'created_at', 'updated_at', 'items']


class OrderCreateSerializer(serializers.ModelSerializer):
    items = serializers.ListField(child=serializers.DictField(), write_only=True)

    class Meta:
        model = Order
        fields = [
            'customer_name', 'customer_phone', 'customer_email', 'shipping_address',
            'city', 'state', 'payment_method', 'total_amount', 'status', 'notes', 'items'
        ]

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = Order.objects.create(**validated_data)

        for item in items_data:
            OrderItem.objects.create(
                order=order,
                product_name=item.get('product_name', ''),
                product_id=item.get('product_id', ''),
                quantity=item.get('quantity', 1),
                price=item.get('price', 0),
            )
        return order


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'email']
