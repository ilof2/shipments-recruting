from django.db import models


class TimeStampMixin(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Shipment(TimeStampMixin):
    ADDED_STATUS = "Added"
    SHIPPING_STATUS = "Shipping"
    SHIPPED_STATUS = "Shipped"
    STATUS_CHOICES = [
        (ADDED_STATUS, "Added"),
        (SHIPPING_STATUS, "Shipping"),
        (SHIPPED_STATUS, "Shipped"),
    ]

    number = models.CharField(max_length=36, unique=True)
    origin_address = models.TextField()
    destination_address = models.TextField()
    status = models.CharField(
        max_length=15, choices=STATUS_CHOICES, default=ADDED_STATUS
    )
