from django.urls import path
from .views import (HomeView, ItemDetailView, ProductsView)

app_name = 'core'

urlpatterns = [
    path('', HomeView.as_view(), name='core-home'),
    path("products/",ProductsView.as_view(), name="core-products"),
    path('product/<slug>/', ItemDetailView.as_view(), name='product'),
]