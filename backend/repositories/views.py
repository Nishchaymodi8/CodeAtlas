from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

import requests

from github_integration.models import GitHubAccount
from .models import Repository


class ImportRepositoryView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        repo_name = request.data.get("repo_name")

        github_account = GitHubAccount.objects.get(
            user=request.user
        )

        response = requests.get(
            f"https://api.github.com/repos/{github_account.username}/{repo_name}",
            headers={
                "Authorization": f"Bearer {github_account.access_token}"
            }
        )

        repo = response.json()

        repository, created = Repository.objects.update_or_create(
            github_repo_id=repo["id"],
            defaults={
                "user": request.user,
                "name": repo["name"],
                "full_name": repo["full_name"],
                "description": repo["description"],
                "language": repo["language"],
                "default_branch": repo["default_branch"],
                "private": repo["private"],
                "html_url": repo["html_url"],
            }
        )

        return Response({
            "message": "Repository imported successfully",
            "repository": repository.full_name
        })
class RepositoryListView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        repositories = Repository.objects.filter(
            user=request.user
        )

        data = []

        for repo in repositories:
            data.append({
                "github_repo_id": repo.github_repo_id,
                "name": repo.name,
                "full_name": repo.full_name,
                "language": repo.language,
                "private": repo.private,
            })

        return Response(data)