from .models import Shipment
from rest_framework import serializers


class ShipmentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Shipment
        fields = [
            "id",
            "number",
            "origin_address",
            "destination_address",
            "status",
            "created_at",
            "updated_at",
        ]
