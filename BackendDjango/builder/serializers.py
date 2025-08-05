from rest_framework import serializers
from .models import Project, Page, Post, PostTemplate, AnonymousProjectSetting

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

class PageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = '__all__'

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'

class PostTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostTemplate 
        fields = '__all__'

class AnonymousProjectSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnonymousProjectSetting
        fields = ['current_project']