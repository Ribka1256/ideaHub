from rest_framework.response import Response
from rest_framework import generics, permissions, status
from rest_framework.views import APIView # Added this
from django.contrib.auth import get_user_model # Best practice for importing User
from .serializers import RegisterSerializer, UserSerializer

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
        # Instead of looking for an ID in the URL, 
        # this tells DRF to just use the logged-in user.
        return self.request.user

    # You can remove the "def get" method entirely now! 
    # DRF will automatically use the UserSerializer to return the data.