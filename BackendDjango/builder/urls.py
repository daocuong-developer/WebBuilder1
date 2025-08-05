from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProjectViewSet,
    PageViewSet,
    PostViewSet,
    PostTemplateViewSet,
    ProjectExportView,
    current_project_view,
    ProjectImportView,
)

# Khai báo 1 router duy nhất
router = DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'pages', PageViewSet, basename='page')
router.register(r'posts', PostViewSet, basename='post')
router.register(r'post-templates', PostTemplateViewSet, basename='post-template')

# Gộp lại 1 lần urlpatterns
urlpatterns = [
    path('projects/import/', ProjectImportView.as_view(), name='project-import'),
    path('current-project/', current_project_view),
    path('projects/<int:pk>/export/', ProjectExportView.as_view(), name='project-export'),
    path('', include(router.urls)),  # Không cần 'api/' nếu ông đã có API prefix ở `urls.py` cấp cha
]
