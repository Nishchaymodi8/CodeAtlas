from django.urls import path
from .views import *

urlpatterns = [
    path("import/", ImportRepositoryView.as_view()),
    path(
        "",
        RepositoryListView.as_view()
    ),
    path(
    "<str:repo_name>/",
    RepositoryDetailView.as_view(),
),
path(
    "<str:repo_name>/clone/",
    CloneRepositoryView.as_view(),
),
path(
    "<str:repo_name>/files/",
    RepositoryFilesView.as_view(),
),
path(
    "<str:repo_name>/file/",
    RepositoryFileContentView.as_view(),
),
path(
    "<str:repo_name>/index/",
    IndexRepositoryView.as_view(),
),
path(
    "<str:repo_name>/chunk/",
    ChunkRepositoryView.as_view(),
),
]