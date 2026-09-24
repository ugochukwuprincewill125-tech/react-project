from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    AdminProfileView,
    CategoryListCreateView,
    ChangePasswordView,
    CustomerSummaryListView,
    DashboardSummaryView,
    EmailTokenObtainPairView,
    OrderDetailView,
    OrderListCreateView,
    ProductListCreateView,
    ProductRetrieveUpdateDestroyView,
    StatusUpdateView,
)

urlpatterns = [
    path('auth/login/', EmailTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', AdminProfileView.as_view(), name='admin-profile'),
    path('profile/change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('dashboard/', DashboardSummaryView.as_view(), name='dashboard-summary'),
    path('orders/', OrderListCreateView.as_view(), name='order-list-create'),
    path('orders/<int:pk>/', OrderDetailView.as_view(), name='order-detail'),
    path('orders/<int:pk>/status/', StatusUpdateView.as_view(), name='order-status-update'),
    path('products/', ProductListCreateView.as_view(), name='product-list-create'),
    path('products/<int:pk>/', ProductRetrieveUpdateDestroyView.as_view(), name='product-detail'),
    path('categories/', CategoryListCreateView.as_view(), name='category-list-create'),
    path('customers/', CustomerSummaryListView.as_view(), name='customer-summary-list'),
]
