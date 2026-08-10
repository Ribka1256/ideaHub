from django.urls import path
from . import views
from .views import IdeaViewSet, AccessRequestViewSet
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register('ideas', IdeaViewSet, basename='idea')
router.register('access-requests', AccessRequestViewSet, basename='access-request')

urlpatterns = router.urls