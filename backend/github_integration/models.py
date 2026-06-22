from django.db import models
from django.conf import settings

class GitHubAccount(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )

    github_id = models.CharField(max_length=100)

    username = models.CharField(max_length=255)

    access_token = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.username