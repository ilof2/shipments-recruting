from django.urls import path
from . import views


urlpatterns = [
    path("", views.ShipmentsList.as_view()),
    path("<int:pk>/", views.ShipmentDetail.as_view()),
]
