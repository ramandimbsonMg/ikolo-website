from django.urls import path
from . import views  # Import des vues locales

urlpatterns = [
    path("", views.Experience, name="experience")
]