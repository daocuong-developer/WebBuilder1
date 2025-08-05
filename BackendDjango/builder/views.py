from django.http import HttpResponse, JsonResponse
from django.utils.timezone import now
from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from rest_framework.views import APIView
# from rest_framework.parsers import JSONParser
from rest_framework.parsers import MultiPartParser
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import json
from django.conf import settings
import os


from .models import Project, Page, Post, PostTemplate, AnonymousProjectSetting
from .serializers import (
    ProjectSerializer,
    PageSerializer,
    PostSerializer,
    PostTemplateSerializer,
    AnonymousProjectSettingSerializer,
)
import zipfile
import io

# --- Project ViewSet ---
class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    @action(detail=True, methods=["get", "post"], url_path="pages")
    def manage_pages(self, request, pk=None):
        project = self.get_object()

        if request.method == "GET":
            pages = project.pages.all()
            serializer = PageSerializer(pages, many=True)
            return Response(serializer.data)

        elif request.method == "POST":
            serializer = PageSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(project=project)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=["get", "post"], url_path="posts")
    def manage_posts(self, request, pk=None):
        project = self.get_object()

        if request.method == "GET":
            posts = project.posts.all()
            serializer = PostSerializer(posts, many=True)
            return Response(serializer.data)

        elif request.method == "POST":
            serializer = PostSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(project=project)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=["post"], url_path="deploy")
    def deploy(self, request, pk=None):
        try:
            project = self.get_object()
            pages = project.pages.all()

            if not pages.exists():
                return Response({"error": "No pages to deploy."}, status=400)

            DEPLOY_ROOT = os.path.join(settings.BASE_DIR, "deployed_sites")
            project_slug = project.name.replace(" ", "_").lower()
            project_dir = os.path.join(DEPLOY_ROOT, project_slug)
            os.makedirs(project_dir, exist_ok=True)

            for page in pages:
                html_content = f"""<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>{page.title}</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    {page.content}
</body>
</html>"""

                page_filename = f"{page.slug or page.title.replace(' ', '_').lower()}.html"
                with open(os.path.join(project_dir, page_filename), "w", encoding="utf-8") as f:
                    f.write(html_content)

            # Ghi CSS default
            style_path = os.path.join(project_dir, "style.css")
            with open(style_path, "w") as f:
                f.write("body { font-family: sans-serif; padding: 40px; }\n")

            project_slug = project.name.replace(" ", "_").lower()
            default_page = pages.first()
            default_filename = f"{default_page.slug or default_page.title.replace(' ', '_').lower()}.html"
            return Response({"url": f"http://localhost:8080/{project_slug}/{default_filename}"})
        except Exception as e:
            return Response({"error": str(e)}, status=500)

# --- Page ViewSet ---
class PageViewSet(viewsets.ModelViewSet):
    queryset = Page.objects.all()
    serializer_class = PageSerializer

# --- Post ViewSet ---
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

# --- PostTemplate ViewSet ---
class PostTemplateViewSet(viewsets.ModelViewSet):
    queryset = PostTemplate.objects.all()
    serializer_class = PostTemplateSerializer

# --- Project Export View ---
class ProjectExportView(APIView):
    # permission_classes = [IsAuthenticated] # Bỏ comment nếu cần xác thực

    def get(self, request, pk):
        print(f"DEBUG: ProjectExportView.get called for PK: {pk}")
        print(f"DEBUG: Request GET params: {request.GET}")
        
        format_type = request.GET.get("format", "json")
        print(f"DEBUG: Determined format_type: {format_type}")

        try:
            project = Project.objects.get(pk=pk)
            print(f"DEBUG: Project found: {project.name} (ID: {project.id})")
        except Project.DoesNotExist:
            print(f"DEBUG: Project with PK {pk} NOT FOUND in DB. Returning 404.")
            return Response({"error": "Project not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print(f"DEBUG: An unexpected error occurred while fetching project: {e}")
            return Response({"error": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


        if format_type == "html":
            print("DEBUG: Proceeding to export_html method.")
            return self.export_html(project)

        if format_type == "zip":
            print("DEBUG: Proceeding to export_zip method.")
            return self.export_zip(project)

        # Default: JSON
        print("DEBUG: Proceeding to JSON export (default).")
        pages = project.pages.all()
        posts = project.posts.all()
        templates = PostTemplate.objects.all()

        export_data = {
            "project": {
                "id": project.id,
                "name": project.name,
                "description": project.description,
                "layout": project.layout,
                "created_at": project.created_at.isoformat(),
            },
            "pages": [
                {
                    "id": page.id,
                    "title": page.title,
                    "slug": page.slug,
                    "content": page.content,
                    "created_at": page.created_at.isoformat()
                } for page in pages
            ],
            "posts": [
                {
                    "id": post.id,
                    "title": post.title,
                    "slug": post.slug,
                    "content": post.content,
                    "thumbnail_url": post.thumbnail_url,
                    "category": post.category,
                    "tags": post.tags,
                    "status": post.status,
                    "scheduled_at": post.scheduled_at.isoformat() if post.scheduled_at else None,
                    "created_at": post.created_at.isoformat()
                } for post in posts
            ],
            "post_templates": [
                {
                    "id": template.id,
                    "name": template.name,
                    "content": template.content,
                    "category": template.category,
                    "tags": template.tags
                } for template in templates
            ],
            "exported_at": now().isoformat(),
            "version": "v1"
        }

        return JsonResponse(export_data, json_dumps_params={'indent': 2})


    def export_html(self, project):
        print(f"DEBUG: Inside export_html for project: {project.name}")
        pages = Page.objects.filter(project=project)
        html = "<!DOCTYPE html><html><head><title>{}</title></head><body>".format(project.name)
        for page in pages:
            html += f"<section><h2>{page.title}</h2><div>{page.content}</div></section>"
        html += "</body></html>"

        response = HttpResponse(html, content_type="text/html")
        filename = f"{project.name.replace(' ', '_')}.html"
        response["Content-Disposition"] = f'attachment; filename="{filename}"'
        print(f"DEBUG: Returning HTML response for {filename}")
        return response

    def export_zip(self, project):
        print(f"DEBUG: Inside export_zip for project: {project.name}")
        pages = Page.objects.filter(project=project)
        buffer = io.BytesIO()

        with zipfile.ZipFile(buffer, "w") as zip_file:
            for page in pages:
                html_content = f"""<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>{page.title}</title></head>
<body>{page.content}</body></html>"""
                zip_file.writestr(f"{page.title.replace(' ', '_')}.html", html_content)

        buffer.seek(0)
        response = HttpResponse(buffer, content_type="application/zip")
        filename = f"{project.name.replace(' ', '_')}.zip"
        response["Content-Disposition"] = f'attachment; filename="{filename}"'
        print(f"DEBUG: Returning ZIP response for {filename}")
        return response

# --- Project Import View ---
@method_decorator(csrf_exempt, name='dispatch')
class ProjectImportView(APIView):
    authentication_classes = []
    permission_classes = []
    parser_classes = [MultiPartParser]

    def post(self, request, *args, **kwargs):
        print("DEBUG: ProjectImportView POST request received.")
        file = request.FILES.get("file")

        if not file:
            print("ERROR: No file uploaded.")
            return Response({"error": "No file uploaded."}, status=400)

        try:
            content = file.read().decode("utf-8")
            data = json.loads(content)
        except Exception as e:
            print(f"ERROR: Cannot parse JSON file: {e}")
            return Response({"error": "Invalid JSON file", "detail": str(e)}, status=400)

        # Tiếp tục xử lý dữ liệu như trước
        project_data = data.get('project')
        pages_data = data.get('pages')
        posts_data = data.get('posts')
        post_templates_data = data.get('post_templates')

        print(f"DEBUG: Project name: {project_data.get('name') if project_data else 'N/A'}")
        print(f"DEBUG: Pages: {len(pages_data) if pages_data else 0}")
        print(f"DEBUG: Posts: {len(posts_data) if posts_data else 0}")
        print(f"DEBUG: Templates: {len(post_templates_data) if post_templates_data else 0}")

        try:
            from .serializers import ProjectSerializer, PageSerializer, PostSerializer, PostTemplateSerializer
            serializer = ProjectSerializer(data=project_data)
            if serializer.is_valid():
                imported_project = serializer.save()
                print(f"DEBUG: Project imported: {imported_project.name} (ID: {imported_project.id})")

                # Pages
                if pages_data:
                    for page_item in pages_data:
                        page_item["project"] = imported_project.id
                        page_serializer = PageSerializer(data=page_item)
                        if page_serializer.is_valid():
                            page_serializer.save()
                        else:
                            print(f"ERROR: Invalid page: {page_serializer.errors}")

                # Posts
                if posts_data:
                    for post_item in posts_data:
                        post_item["project"] = imported_project.id
                        post_serializer = PostSerializer(data=post_item)
                        if post_serializer.is_valid():
                            post_serializer.save()
                        else:
                            print(f"ERROR: Invalid post: {post_serializer.errors}")

                # Templates
                if post_templates_data:
                    for template_item in post_templates_data:
                        template_serializer = PostTemplateSerializer(data=template_item)
                        if template_serializer.is_valid():
                            template_serializer.save()
                        else:
                            print(f"ERROR: Invalid template: {template_serializer.errors}")

                return Response({
                    "message": f"Project '{imported_project.name}' and related data imported successfully.",
                    "project_id": imported_project.id
                }, status=201)

            else:
                print(f"ERROR: Invalid project: {serializer.errors}")
                return Response(serializer.errors, status=400)

        except Exception as e:
            print(f"ERROR: Unexpected error: {e}")
            return Response({"error": str(e)}, status=500)

# --- Anonymous Project Setting ---
@api_view(["GET", "POST"])
def current_project_view(request):
    session_key = request.session.session_key
    if not session_key:
        request.session.create()
        session_key = request.session.session_key

    setting, _ = AnonymousProjectSetting.objects.get_or_create(session_key=session_key)

    if request.method == "GET":
        serializer = AnonymousProjectSettingSerializer(setting)
        return Response(serializer.data)

    elif request.method == "POST":
        serializer = AnonymousProjectSettingSerializer(setting, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# --- Root route ---
def home(request):
    return HttpResponse("Welcome to the Django API backend.")