from django.db import models


class TimeStampMixin(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Shipment(TimeStampMixin):
    number = models.CharField(max_length=36)
    origin_address = models.TextField()
    destination_address = models.TextField()
