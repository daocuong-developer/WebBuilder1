from django.contrib import admin

# Register your models here.
from .models import Project, Page, Post, AnonymousProjectSetting, PostTemplate # Import tất cả các model bạn muốn quản lý

# Đăng ký các model của bạn với Django Admin
admin.site.register(Project)
admin.site.register(Page)
admin.site.register(Post)
admin.site.register(AnonymousProjectSetting)
admin.site.register(PostTemplate) # Đăng ký PostTemplate model