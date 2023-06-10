from django.shortcuts import render, get_object_or_404
from django.views.generic import View, ListView, TemplateView, DetailView

from .models import Item
import random

# Create your views here.
class HomeView(TemplateView):
    template_name = "core/home.html"


class ProductsView(ListView):
    model = Item
    paginate_by = 10
    template_name = "core/products.html"


class ItemDetailView(DetailView):
    model = Item
    template_name = 'core/product.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        item = self.get_object()  # Retrieve the current item
        random_products = Item.objects.exclude(slug=item.slug).order_by('?')[:5]
        context['random_products'] = random_products
        return context

