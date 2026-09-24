from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.db.models import Count, Sum
from django.utils import timezone
from rest_framework import generics, permissions, serializers, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import Category, Order, OrderItem, Product
from .serializers import CategorySerializer, OrderCreateSerializer, OrderSerializer, ProductSerializer, UserSerializer


class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_staff)


class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'email'

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        if email and password:
            user = get_user_model().objects.filter(email__iexact=email).first()
            if user is not None:
                if user.check_password(password):
                    attrs['username'] = user.get_username()
                else:
                    raise serializers.ValidationError('Invalid email or password.')
            else:
                raise serializers.ValidationError('Invalid email or password.')
        return super().validate(attrs)


class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = EmailTokenObtainPairSerializer


class OrderListCreateView(generics.ListCreateAPIView):
    serializer_class = OrderSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            return [permissions.AllowAny()]
        return [IsAdminUser()]

    def get_queryset(self):
        queryset = Order.objects.prefetch_related('items').all()
        status_filter = self.request.query_params.get('status')
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        return queryset.order_by('-created_at')

    def create(self, request, *args, **kwargs):
        serializer = OrderCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        order = serializer.save()
        response = OrderSerializer(order)
        return Response(response.data, status=status.HTTP_201_CREATED)


class OrderDetailView(generics.RetrieveUpdateAPIView):
    queryset = Order.objects.prefetch_related('items').all()
    serializer_class = OrderSerializer
    permission_classes = [IsAdminUser]

    def perform_update(self, serializer):
        order = serializer.instance
        previous_status = order.status
        updated_order = serializer.save()
        if previous_status != updated_order.status:
            updated_order.status_last_changed = timezone.now()
            updated_order.save(update_fields=['status_last_changed'])


class StatusUpdateView(APIView):
    permission_classes = [IsAdminUser]

    def patch(self, request, pk):
        order = Order.objects.get(pk=pk)
        new_status = request.data.get('status')
        if new_status not in dict(Order.STATUS_CHOICES):
            raise serializers.ValidationError({'status': 'Invalid order status'})
        order.status = new_status
        order.status_last_changed = timezone.now()
        order.save()
        return Response(OrderSerializer(order).data)


class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.all().order_by('-created_at')
    serializer_class = ProductSerializer
    permission_classes = [IsAdminUser]


class ProductRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAdminUser]


class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all().order_by('name')
    serializer_class = CategorySerializer
    permission_classes = [IsAdminUser]


class CustomerSummaryListView(generics.ListAPIView):
    permission_classes = [IsAdminUser]

    def get(self, request, *args, **kwargs):
        rows = (
            Order.objects.values('customer_email', 'customer_name', 'customer_phone')
            .annotate(order_count=Count('id'), total_spent=Sum('total_amount'))
            .order_by('-total_spent', '-order_count')
        )
        return Response(list(rows))


class DashboardSummaryView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        total_orders = Order.objects.count()
        total_revenue = Order.objects.aggregate(total=Sum('total_amount'))['total'] or 0
        status_counts = dict(Order.objects.values_list('status').annotate(count=Count('id')))
        recent_orders = OrderSerializer(
            Order.objects.prefetch_related('items').order_by('-created_at')[:10],
            many=True,
        ).data

        return Response({
            'total_orders': total_orders,
            'total_revenue': float(total_revenue),
            'status_counts': status_counts,
            'recent_orders': recent_orders,
        })


class ChangePasswordView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')

        if not request.user.check_password(old_password):
            return Response({'detail': 'Old password is incorrect.'}, status=400)

        try:
            validate_password(new_password, user=request.user)
        except ValidationError as exc:
            return Response({'detail': exc.messages}, status=400)

        request.user.set_password(new_password)
        request.user.save()
        return Response({'detail': 'Password updated successfully.'})


class AdminProfileView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        return Response(UserSerializer(request.user).data)
