from logging import getLogger

from django.http import Http404
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Shipment
from .serializers import ShipmentSerializer

logger = getLogger("django")


class ShipmentsList(APIView):
    def get(self, request):
        shipments = Shipment.objects.all()
        serializer = ShipmentSerializer(shipments, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ShipmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ShipmentDetail(APIView):
    def get_shipment(self, pk):
        try:
            return Shipment.objects.get(id=pk)
        except Shipment.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        shipment = self.get_shipment(pk)
        serializer = ShipmentSerializer(shipment)
        return Response(data=serializer.data)

    def put(self, request, pk):
        shipment = self.get_shipment(pk)
        serializer = ShipmentSerializer(shipment, data=request.data, partial=True)
        if serializer.is_valid():
            logger.info(serializer)
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        shipment = self.get_shipment(pk)
        shipment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
