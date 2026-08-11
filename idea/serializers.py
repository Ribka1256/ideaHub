from rest_framework import serializers
from .models import *

class IdeaSerializer(serializers.ModelSerializer):
    owner_username= serializers.CharField(source='owner.username', read_only=True)

    class Meta:
        model = Idea
        fields = ['id' , 'owner_username', 'title', 'summary', 'document', 'status', 'created_at']
        read_only_fields = ['owner']



class IdeaDetailSerializer(serializers.ModelSerializer):
    owner_username= serializers.CharField(source='owner.username',read_only=True)

    class Meta:
        model = Idea
        fields = ['id', 'owner', 'owner_username', 'title', 'summary', 'document', 'status', 'created_at']
        read_only_fields = ['owner']

class AccessRequestSerializer(serializers.ModelSerializer):
    requester_username = serializers.CharField(source='requester.username', read_only=True)

    class Meta:
        model = AccessRequest
        fields = ['id', 'idea', 'requester_username', 'message', 'status', 'created_at', 'responded_at']
        read_only_fields = ['requester']

class CommentSerializer(serializers.ModelSerializer):
    author_username = serializers.CharField(source='author.username', read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'idea', 'author', 'author_username', 'text', 'created_at']
        read_only_fields = ['author']