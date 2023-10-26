from django.urls import path, include


urlpatterns = [
    path("shipments/", include("api.shipments.urls")),
]
