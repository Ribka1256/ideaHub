from django.contrib import admin
from .models import Idea, AccessRequest, Comment
# from accounts.models import User  # Only needed if you are manually registering User

@admin.register(Idea)
class IdeaAdmin(admin.ModelAdmin):
    list_display = ['title', 'owner', 'status', 'created_at']
    search_fields = ['title'] # Required for other models to use Idea in autocomplete
    autocomplete_fields = ['owner'] 

@admin.register(AccessRequest)
class AccessRequestAdmin(admin.ModelAdmin):
    list_display = ['idea', 'requester', 'status', 'created_at']
    # If requester is a User, the UserAdmin MUST have search_fields defined
    autocomplete_fields = ['idea', 'requester']   

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ['idea', 'author', 'text', 'created_at']
    # FIXED: Changed 'requester' to 'author' (matching your model/list_display)
    autocomplete_fields = ['idea', 'author']