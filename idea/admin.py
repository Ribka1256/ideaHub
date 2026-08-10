from django.contrib import admin
from .models import Idea, AccessRequest
from accounts.models import User

@admin.register(Idea)
class IdeaAdmin(admin.ModelAdmin):
    list_display = ['title', 'owner', 'status', 'created_at']
    search_fields = ['title']
    autocomplete_fields = ['owner']   # ✅ turns the dropdown into a search box

@admin.register(AccessRequest)

class AccessRequestAdmin(admin.ModelAdmin):
    list_display = ['idea', 'requester', 'status', 'created_at']
    autocomplete_fields = ['idea', 'requester']   # ✅ same for both FK fields