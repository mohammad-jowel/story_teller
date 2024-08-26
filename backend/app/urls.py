from django.urls import path
from . import views
urlpatterns = [
    path("", views.index, name="index"),
    path("get_paragraph/<int:id>", views.get_paragraph, name="get_paragraph"),
    path("get_story/<int:id>", views.get_story, name="get_story"),
    path("write_story", views.write_story, name="write_story"),
    path("add_option", views.add_option, name="add_option"),
]