from django.test import TestCase
from rest_framework.test import APIClient
from .models import Shipment


class ShipmentTestCase(TestCase):
    def setUp(self):
        Shipment.objects.create(
            origin_address="Example address, Warsaw, 202020",
            destination_address="Destination address, Lublin, 202000",
            number="1"
        )
        Shipment.objects.create(
            origin_address="Example address, Warsaw, 202020",
            destination_address="Destination address, Lublin, 202000",
            number="2"
        )
        self.client = APIClient()

    def test_get_shipments(self):
        response = self.client.get("/api/shipments/")
        data = response.json()
        self.assertEqual(len(data), 2)
        self.assertEqual(data[0]["id"], 1)
        self.assertEqual(data[1]["number"], "2")

    def test_get_one_shipment(self):
        response = self.client.get("/api/shipments/1/")
        data = response.json()
        self.assertIsInstance(data, dict)
        self.assertEqual(data["id"], 1)

    def test_update_shipment(self):
        new_number = "number2"
        new_destination = "to"
        new_origin = "from"
        data = {
            "number": new_number,
            "destination_address": new_destination,
            "origin_address": new_origin,
        }
        response = self.client.put(path="/api/shipments/2/", data=data)
        response_data = response.json()
        self.assertEqual(response_data["destination_address"], new_destination)
        self.assertEqual(response_data["number"], new_number)
        self.assertEqual(response_data["origin_address"], new_origin)
        shipment = Shipment.objects.get(number="number2")
        self.assertEqual(shipment.destination_address, new_destination)

    def test_create_shipment(self):
        data = {
            "number": "test_new",
            "destination_address": "test_to",
            "origin_address": "test_from",
        }
        shipments_count = Shipment.objects.all().count()
        self.assertEqual(shipments_count, 2)
        response = self.client.post(path="/api/shipments/", data=data)
        response_data = response.json()
        self.assertEqual(response_data["number"], data["number"])
        shipment = Shipment.objects.get(number=data["number"])
        self.assertEqual(shipment.origin_address, data["origin_address"])
        shipments_count = Shipment.objects.all().count()
        self.assertEqual(shipments_count, 3)

    def test_delete_shipment(self):
        shipments_count = Shipment.objects.all().count()
        self.assertEqual(shipments_count, 2)
        response = self.client.delete("/api/shipments/1/")
        self.assertEqual(response.status_code, 204)
        shipments_count = Shipment.objects.all().count()
        self.assertEqual(shipments_count, 1)