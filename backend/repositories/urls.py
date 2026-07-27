from django.urls import path
from .views import *

urlpatterns = [
    path("import/", ImportRepositoryView.as_view()),
    path(
        "",
        RepositoryListView.as_view()
    ),
]