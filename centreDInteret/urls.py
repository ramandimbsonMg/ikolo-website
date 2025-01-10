from django.urls import path
from . import views  # Import des vues locales

urlpatterns = [
    path("", views.centreDInteret, name="centreDInteret")
]