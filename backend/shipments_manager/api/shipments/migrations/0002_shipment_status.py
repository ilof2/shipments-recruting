# Generated by Django 4.2.6 on 2023-10-26 17:45

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("shipments", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="shipment",
            name="status",
            field=models.CharField(
                choices=[
                    ("Added", "Added"),
                    ("Shipping", "Shipping"),
                    ("Shipped", "Shipped"),
                ],
                default="Added",
                max_length=15,
            ),
        ),
    ]