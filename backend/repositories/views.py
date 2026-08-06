from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.utils import timezone
from .models import Repository, RepositoryFile, CodeChunk
import requests



from github_integration.models import GitHubAccount
from .models import Repository
import os
from git import Repo


TEXT_EXTENSIONS = {
    ".py",
    ".js",
    ".jsx",
    ".ts",
    ".tsx",
    ".html",
    ".css",
    ".scss",
    ".json",
    ".md",
    ".txt",
    ".env",
    ".gitignore",
    ".yml",
    ".yaml",
    ".xml",
    ".sql",
    ".sh",
    ".bat",
    ".ini",
    ".cfg",
}
TEXT_FILES = {
    "Procfile",
    "Dockerfile",
    "LICENSE",
    "README",
    ".gitignore",
    ".dockerignore",
}

class ImportRepositoryView(APIView):
    

    permission_classes = [IsAuthenticated]

    def post(self, request):
        print("===== IMPORT VIEW HIT =====")

        
        repo_name = request.data.get("repo_name")
        print("Repo Name:", repo_name)
        
        github_account = GitHubAccount.objects.get(
            user=request.user
        )
        print("Username:", github_account.username)
               

        response = requests.get(
            f"https://api.github.com/repos/{github_account.username}/{repo_name}",
            headers={
                "Authorization": f"Bearer {github_account.access_token}"
            }
        )
        print("STATUS:", response.status_code)
        print("URL:", response.url)
        print("BODY:", response.text)
        print("GitHub Username:", github_account.username)
        print("Repo Name:", repo_name)
        print("Access Token:", github_account.access_token[:10], "...")
        if response.status_code != 200:
            return Response(
                {
                    "error": "Failed to fetch repository from GitHub",
                    "github_status": response.status_code,
                    "github_response": response.text,
                },
                status=response.status_code,
            )

        repo = response.json()

        try:
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
                },
            )

            print("Repository saved successfully!")

        except Exception as e:
            import traceback
            traceback.print_exc()

            return Response(
                {"error": str(e)},
                status=500,
            )

        return Response(
            {
                "message": "Repository imported successfully",
                "repository": repository.full_name,
            }
        )
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

class RepositoryDetailView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, repo_name):

        repository = get_object_or_404(
            Repository,
            user=request.user,
            name=repo_name
        )

        return Response({
            "github_repo_id": repository.github_repo_id,
            "name": repository.name,
            "full_name": repository.full_name,
            "description": repository.description,
            "language": repository.language,
            "default_branch": repository.default_branch,
            "private": repository.private,
            "html_url": repository.html_url,
    "local_path": repository.local_path,
        })

class CloneRepositoryView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request, repo_name):

        repository = get_object_or_404(
            Repository,
            user=request.user,
            name=repo_name
        )

        clone_path = os.path.join(
            "C:\\CODEATLAS_STORAGE",
            repository.name
        )

        if os.path.exists(clone_path):
            repository.local_path = clone_path
            repository.save()

            return Response({
                "message": "Repository already cloned.",
                "local_path": clone_path
            })

        Repo.clone_from(
            repository.html_url,
            clone_path
        )

        repository.local_path = clone_path
        repository.save()

        return Response({
            "message": "Repository cloned successfully.",
            "local_path": clone_path
        })

class RepositoryFilesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, repo_name):
        repo = Repository.objects.get(
            user=request.user,
            name=repo_name
        )

        if not repo.local_path:
            return Response(
                {"error": "Repository not cloned"},
                status=400
            )

        # Folder to browse
        path = request.GET.get("path", "")

        current_path = os.path.join(repo.local_path, path)

        if not os.path.exists(current_path):
            return Response(
                {"error": "Folder not found"},
                status=404
            )

        items = []

        for item in os.listdir(current_path):

            if item.startswith("."):
                continue

            if item == "__pycache__":
                continue

            if item.endswith(".pyc"):
                continue

            full_path = os.path.join(current_path, item)

            relative_path = os.path.relpath(
                full_path,
                repo.local_path
            ).replace("\\", "/")

            items.append({
                "name": item,
                "path": relative_path,
                "type": "directory" if os.path.isdir(full_path) else "file",
            })

        items.sort(key=lambda x: (x["type"] == "file", x["name"].lower()))

        tree = build_file_tree(
            repo.local_path,
            repo.local_path
        )

        return Response(tree)

class RepositoryFileContentView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, repo_name):

        repo = Repository.objects.get(
            user=request.user,
            name=repo_name
        )

        path = request.GET.get("path")

        if not path:
            return Response(
                {"error": "Path is required"},
                status=400
            )

        full_path = os.path.join(repo.local_path, path)

        if not os.path.exists(full_path):
            return Response(
                {"error": "File not found"},
                status=404
            )

        if os.path.isdir(full_path):
            return Response(
                {"error": "Cannot open a directory"},
                status=400
            )

        try:
            with open(full_path, "r", encoding="utf-8") as f:
                content = f.read()

        except UnicodeDecodeError:
            return Response(
                {
                    "error": "Binary file cannot be displayed."
                },
                status=400,
            )

        except Exception as e:
            return Response(
                {
                    "error": str(e)
                },
                status=500,
            )

        return Response({
            "path": path,
            "content": content,
        })

IGNORE_NAMES = {
    ".git",
    "__pycache__",
    ".idea",
    ".vscode",
    "node_modules",
}

def build_file_tree(root_path, current_path):
    items = []

    for name in sorted(os.listdir(current_path)):
        if name in IGNORE_NAMES or name.endswith(".pyc"):
            continue

        full_path = os.path.join(current_path, name)

        node = {
            "name": name,
            "path": os.path.relpath(full_path, root_path).replace("\\", "/"),
            "type": "directory" if os.path.isdir(full_path) else "file",
        }

        if os.path.isdir(full_path):
            node["children"] = build_file_tree(root_path, full_path)

        items.append(node)

    return items


class IndexRepositoryView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, repo_name):

        repo = Repository.objects.get(
            user=request.user,
            name=repo_name
        )

        if not repo.local_path:
            return Response(
                {"error": "Repository not cloned"},
                status=400
            )

        # Remove previous index
        RepositoryFile.objects.filter(
            repository=repo
        ).delete()

        language_map = {
            ".py": "Python",
            ".js": "JavaScript",
            ".jsx": "JavaScript",
            ".ts": "TypeScript",
            ".tsx": "TypeScript",
            ".html": "HTML",
            ".css": "CSS",
            ".json": "JSON",
            ".md": "Markdown",
            ".sql": "SQL",
            ".java": "Java",
            ".cpp": "C++",
            ".c": "C",
        }

        ignored = {
            ".git",
            "__pycache__",
            "node_modules",
            ".idea",
            ".vscode",
        }

        count = 0

        for root, dirs, files in os.walk(repo.local_path):

            dirs[:] = [d for d in dirs if d not in ignored]

            for file in files:

                if file.endswith(".pyc"):
                    continue

                full_path = os.path.join(root, file)

                relative_path = os.path.relpath(
                    full_path,
                    repo.local_path
                ).replace("\\", "/")

                extension = os.path.splitext(file)[1].lower()

                RepositoryFile.objects.create(
                    repository=repo,
                    path=relative_path,
                    name=file,
                    extension=extension,
                    language=language_map.get(
                        extension,
                        "Unknown"
                    ),
                    size=os.path.getsize(full_path),
                    last_modified=timezone.make_aware(
                        timezone.datetime.fromtimestamp(
                            os.path.getmtime(full_path)
                        )
                    ),
                )

                count += 1

        return Response({
            "message": "Repository indexed successfully",
            "files_indexed": count,
        })


class ChunkRepositoryView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, repo_name):

        repo = Repository.objects.get(
            user=request.user,
            name=repo_name
        )

        # Remove old chunks
        CodeChunk.objects.filter(
            repository_file__repository=repo
        ).delete()

        chunk_size = 100

        total_chunks = 0

        for file in RepositoryFile.objects.filter(repository=repo):

            full_path = os.path.join(
                repo.local_path,
                file.path
            )

            try:
                with open(
                    full_path,
                    "r",
                    encoding="utf-8"
                ) as f:

                    lines = f.readlines()

            except:
                continue

            chunk_index = 0

            for start in range(
                0,
                len(lines),
                chunk_size
            ):

                end = min(
                    start + chunk_size,
                    len(lines)
                )

                content = "".join(
                    lines[start:end]
                )

                CodeChunk.objects.create(
                    repository_file=file,
                    chunk_index=chunk_index,
                    start_line=start + 1,
                    end_line=end,
                    content=content,
                )

                chunk_index += 1
                total_chunks += 1

        return Response({
            "message": "Repository chunked successfully",
            "chunks_created": total_chunks,
        })