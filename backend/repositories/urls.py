from django.urls import path
from .views import ImportRepositoryView

urlpatterns = [
    path("import/", ImportRepositoryView.as_view()),
]