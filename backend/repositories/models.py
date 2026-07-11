from django.db import models
from django.conf import settings


class Repository(models.Model):

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )

    github_repo_id = models.BigIntegerField(unique=True)

    name = models.CharField(max_length=255)

    full_name = models.CharField(max_length=255)

    description = models.TextField(
        blank=True,
        null=True
    )

    language = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )

    default_branch = models.CharField(max_length=100)

    private = models.BooleanField(default=False)

    html_url = models.URLField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.full_name