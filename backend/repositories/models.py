from django.db import models
from django.conf import settings
import os


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
    
    local_path = models.TextField(
    blank=True,
    null=True
    )

    def __str__(self):
        return self.full_name


class RepositoryFile(models.Model):
    repository = models.ForeignKey(
        Repository,
        on_delete=models.CASCADE,
        related_name="files"
    )

    path = models.CharField(max_length=1000)

    name = models.CharField(max_length=255)

    extension = models.CharField(
        max_length=30,
        blank=True
    )

    language = models.CharField(
        max_length=100,
        blank=True
    )

    size = models.BigIntegerField(default=0)

    last_modified = models.DateTimeField()

    indexed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.path

class CodeChunk(models.Model):
    repository_file = models.ForeignKey(
        RepositoryFile,
        on_delete=models.CASCADE,
        related_name="chunks"
    )

    chunk_index = models.IntegerField()

    start_line = models.IntegerField()

    end_line = models.IntegerField()

    content = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return (
            f"{self.repository_file.path}"
            f" [{self.start_line}-{self.end_line}]"
        )