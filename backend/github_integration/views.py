# github_integration/views.py

from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

import requests

from .models import GitHubAccount

class GitHubConnectView(APIView):

    def get(self, request):

        github_url = (
            "https://github.com/login/oauth/authorize"
            f"?client_id={settings.GITHUB_CLIENT_ID}"
        )

        return Response({
            "url": github_url
        })

class GitHubCallbackView(APIView):

    def get(self, request):

        code = request.GET.get("code")

        token_response = requests.post(
            "https://github.com/login/oauth/access_token",
            headers={
                "Accept": "application/json"
            },
            data={
                "client_id": settings.GITHUB_CLIENT_ID,
                "client_secret": settings.GITHUB_CLIENT_SECRET,
                "code": code,
            }
        )
        token_data = token_response.json()

        access_token = token_data.get("access_token")
        user_response = requests.get(
               "https://api.github.com/user",
               headers={
                           "Authorization": f"Bearer {access_token}"
              }
        )

        github_user = user_response.json()

  #      GitHubAccount.objects.update_or_create(
  #          github_id=str(github_user["id"]),
  #          defaults={
  #              "username": github_user["login"],
  #              "access_token": access_token,
   #             "user": ???,
   #            }
   #     )
        

        return Response(github_user)    