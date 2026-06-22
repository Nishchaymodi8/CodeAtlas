from django.urls import path
from .views import *
urlpatterns = [
    path(
        "connect/",
        GitHubConnectView.as_view()
    ),

    path(
        "callback/",
        GitHubCallbackView.as_view()
    ),
]