# Generated by Django 4.2.3 on 2023-07-25 01:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0010_rename_time_ends_activity_time_end'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='activity',
            options={'ordering': ['time_start']},
        ),
        migrations.AlterModelOptions(
            name='schedule',
            options={'ordering': ['created_at']},
        ),
    ]
