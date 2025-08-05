from django.db import models
from django.contrib.auth.models import User

class Project(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    layout = models.JSONField(default=list)
    created_at = models.DateTimeField(auto_now_add=True)

class Page(models.Model):
    project = models.ForeignKey(Project, related_name='pages', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    content = models.JSONField(default=dict)
    created_at = models.DateTimeField(auto_now_add=True)

class Post(models.Model):
    # Định nghĩa các lựa chọn cho trạng thái bài viết
    STATUS_CHOICES = [
        ('draft', 'Bản nháp'),
        ('published', 'Đã xuất bản'),
        ('scheduled', 'Đã lên lịch'),
        ('archived', 'Đã lưu trữ'),
    ]

    project = models.ForeignKey(Project, related_name='posts', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    content = models.JSONField(default=dict) 
    thumbnail_url = models.URLField(max_length=500, blank=True, null=True, verbose_name="Ảnh đại diện")
    category = models.CharField(max_length=100, blank=True, null=True, verbose_name="Danh mục")
    tags = models.JSONField(default=list, blank=True, null=True, verbose_name="Thẻ (Tags)")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft', verbose_name="Trạng thái")
    scheduled_at = models.DateTimeField(blank=True, null=True, verbose_name="Thời gian lên lịch")

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at'] 

    def __str__(self):
        return self.title

class PostTemplate(models.Model):
    name = models.CharField(max_length=255, unique=True)
    content = models.JSONField(default=dict) 
    category = models.CharField(max_length=100, blank=True, null=True)
    tags = models.JSONField(default=list, blank=True, null=True) 

    def __str__(self):
        return self.name
    
class AnonymousProjectSetting(models.Model):
    session_key = models.CharField(max_length=40, unique=True)
    current_project = models.ForeignKey(Project, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"{self.session_key} - current project"