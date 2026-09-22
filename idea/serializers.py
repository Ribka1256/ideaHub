from rest_framework import serializers
from .models import *

class IdeaSerializer(serializers.ModelSerializer):
    owner_username= serializers.CharField(source='owner.username',read_only=True)

    class Meta:
        model = Idea
        fields = ['id', 'owner', 'owner_username', 'title', 'summary', 'status', 'created_at', 'cover_image','link']
        read_only_fields = ['owner']

class IdeaDetailSerializer(serializers.ModelSerializer):
    owner_username = serializers.CharField(source='owner.username', read_only=True)
    
    document = serializers.SerializerMethodField()

    class Meta:
        model = Idea
        fields = ['id' , 'owner_username', 'title', 'summary', 'document', 'status', 'created_at', 'cover_image']
        read_only_fields = ['owner']

    def get_document(self, obj):
        request = self.context.get('request')
        user = request.user if request else None
        if obj.can_view_full(user):
            return request.build_absolute_uri(obj.document.url) if obj.document else None
        return None

class AccessRequestSerializer(serializers.ModelSerializer):
    requester_username = serializers.CharField(source='requester.username', read_only=True)
    idea_title = serializers.CharField(source='idea.title', read_only=True)

    class Meta:
        model = AccessRequest
        fields = ['id', 'idea', 'idea_title', 'requester_username', 'message', 'status', 'created_at', 'responded_at']
        read_only_fields = ['requester']

class CommentSerializer(serializers.ModelSerializer):
    author_username = serializers.CharField(source='author.username', read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'idea', 'author', 'author_username', 'text', 'created_at']
        read_only_fields = ['author']