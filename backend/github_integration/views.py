# github_integration/views.py

from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

import requests

from .models import GitHubAccount,OAuthState

class GitHubConnectView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        OAuthState.objects.filter(user=request.user).delete()

        oauth_state = OAuthState.objects.create(
            user=request.user
        )

        github_url = (
            "https://github.com/login/oauth/authorize"
            f"?client_id={settings.GITHUB_CLIENT_ID}"
            f"&state={oauth_state.state}"
        )

        return Response({
            "url": github_url
        })
    
class GitHubCallbackView(APIView):

    def get(self, request):

        code = request.GET.get("code")
        state = request.GET.get("state")

        oauth_state = OAuthState.objects.get(
        state=state
        )

        user = oauth_state.user

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

        GitHubAccount.objects.update_or_create(
            user=user,
            defaults={
                "github_id": str(github_user["id"]),
                "username": github_user["login"],
                "access_token": access_token,
            }
        )
        oauth_state.delete()

        return Response({
                "message": "GitHub connected successfully",
                "github_username": github_user["login"]
            })