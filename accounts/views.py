from rest_framework.response import Response
from rest_framework import generics, permissions, status
from rest_framework.views import APIView # Added this
from django.contrib.auth import get_user_model # Best practice for importing User
from .serializers import RegisterSerializer, UserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from idea.models import Idea


User = get_user_model()

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

class MeView(generics.RetrieveAPIView):
    """
    Returns the profile of the currently authenticated user.
    """
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user



class UserProfileView(APIView):
    permission_class = [IsAuthenticated]

    def get(self, request, username):
        user = get_object_or_404(User, username=username)
        return Response({
            'username': user.username,
            'date_joined': user.date_joined,
            'ideas_submitted': Idea.objects.filter(owner=user).count(),
            'ideas_approved': Idea.objects.filter(owner=user, status='approved').count(),
        })