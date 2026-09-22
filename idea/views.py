from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import FileResponse
from django.shortcuts import get_object_or_404
from .models import Idea, AccessRequest, Comment
from .serializers import IdeaSerializer, IdeaDetailSerializer, AccessRequestSerializer, CommentSerializer
from .permissions import IsOwnerOrReadOnly
from django.db.models import Q
from django.contrib.auth import get_user_model
from idea import models
from rest_framework.permissions import IsAuthenticated

# Create your views here.

User = get_user_model()

class IdeaViewSet(viewsets.ModelViewSet):
    serializer_class = IdeaSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        qu = Idea.objects.select_related('owner')
        if self.action == 'list':
            return qu.filter(status='approved')

        return qu

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return IdeaDetailSerializer
        return IdeaSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def retrieve(self, request, *args, **kwargs):
        idea = self.get_object()
        if idea.can_view_full(request.user):
            serializer = IdeaDetailSerializer(idea, context={'request': request})
        else:
            serializer = IdeaSerializer(idea, context={'request': request})
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def my_ideas(self, request):
        idea = Idea.objects.filter(owner=request.user)
        serializer = IdeaSerializer(idea, many=True)
        return Response(serializer.data)

    def get_serializer_context(self):
        return {'request': self.request}

    
    @action(detail=False, methods=['get'], permission_classes=[permissions.AllowAny])
    def featured(self, request):
        ideas = Idea.objects.filter(status='approved', is_featured=True)
        serializer = IdeaSerializer(ideas, many=True)
        return Response(serializer.data)


class AccessRequestViewSet(viewsets.ModelViewSet):
    serializer_class = AccessRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return AccessRequest.objects.filter(
            Q(requester=user) | Q(idea__owner=user)
    )

    def perform_create(self, serializer):
        serializer.save(requester=self.request.user)

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def approve(self, request, pk=None):    
        access_request = self.get_object()
        if access_request.idea.owner != request.user:
            return Response({'detail': 'Not your idea.'}, status=status.HTTP_403_FORBIDDEN)
        access_request.status = 'approved'
        access_request.save()
        return Response(AccessRequestSerializer(access_request).data)    
        

class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    permissions_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        idea_id = self.request.query_params.get('idea')

        qs = Comment.objects.all()
        if idea_id:
            qs = qs.filter(idea_id=idea_id)

        return qs

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


    def get_permission(self):
        if self.action in ['destroy', 'update', 'partial_update']:
            return  [permissions.IsAuthenticated(), permissions.IsCommentAuthor()]
        return super().get_permissions()
