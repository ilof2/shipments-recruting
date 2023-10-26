# Generated by Django 4.2.6 on 2023-10-26 11:06

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Shipment",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("number", models.CharField(max_length=36)),
                ("origin_address", models.TextField()),
                ("destination_address", models.TextField()),
            ],
            options={
                "abstract": False,
            },
        ),
    ]
