# github_integration/views.py

from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404,redirect

import requests

from .models import GitHubAccount,OAuthState

class GitHubConnectView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        print("===== GitHubConnectView reached =====")
        print("USER:", request.user)
        print("AUTH:", request.auth)

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
    permission_classes = [AllowAny]

    def get(self, request):

        code = request.GET.get("code")
        state = request.GET.get("state")

        oauth_state = get_object_or_404(
    OAuthState,
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
        if not access_token:
         return Response(
        {"error": "GitHub OAuth failed"},
        status=400
    )
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

        return redirect("http://localhost:3000/repositories")


class GitHubRepositoriesView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        github_account = GitHubAccount.objects.get(
            user=request.user
        )

        response = requests.get(
            "https://api.github.com/user/repos",
            headers={
                "Authorization": f"Bearer {github_account.access_token}"
            }
        )

        repositories = []

        for repo in response.json():

            repositories.append({
                "id": repo["id"],
                "name": repo["name"],
                "full_name": repo["full_name"],
                "private": repo["private"],
                "language": repo["language"],
                "default_branch": repo["default_branch"],
                "html_url": repo["html_url"],
                "description": repo["description"],
"owner": repo["owner"]["login"],
            })

        return Response(repositories)
    
class GitHubStatusView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        connected = GitHubAccount.objects.filter(
            user=request.user
        ).exists()

        github_username = None

        if connected:
            github_username = GitHubAccount.objects.get(
                user=request.user
            ).username

        return Response({
            "connected": connected,
            "username": github_username,
        })