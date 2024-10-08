# Generated by Django 5.0.2 on 2024-08-24 16:05

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0003_rename_next_paragraph_option_curr_paragraph_and_more"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="option",
            name="next_paragraphs",
        ),
        migrations.AddField(
            model_name="option",
            name="next_paragraph",
            field=models.ForeignKey(
                default=2,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="option",
                to="app.paragraph",
            ),
            preserve_default=False,
        ),
    ]
