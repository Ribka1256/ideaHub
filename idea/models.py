from pyexpat import model
from django.conf import settings
from django.db import models
from .validators import validate_zip_integrity, validate_image_integrity

# Create your models here.

class Idea(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('published', 'Published'),
    ]
    owner = models.ForeignKey('accounts.User', on_delete=models.CASCADE, related_name='ideas')
    title = models.CharField(max_length=255)
    summary = models.TextField()
    document = models.FileField(upload_to='idea_docs/', validators=[validate_zip_integrity])
    status = models.CharField(max_length=50, choices=[('draft', 'Draft'), ('submitted', 'Submitted'), ('approved', 'Approved'), ('rejected', 'Rejected')], default='draft')
    created_at = models.DateTimeField(auto_now_add=True)
    is_featured = models.BooleanField(default=True)
    cover_image = models.ImageField(upload_to='idea_covers/', blank=True, null=True, validators=[validate_image_integrity])
    link = models.URLField(blank=True, null=True)


    def __str__(self):
        return self.title 
    
    def can_view_full(self, user):
        if not user.is_authenticated:
            return False
        if user == self.owner:
            return True
        return self.access_requests.filter(requester=user, status='approved').exists()


class AccessRequest(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('denied', 'Denied'),
    ]
    idea = models.ForeignKey(Idea, on_delete=models.CASCADE, related_name='access_requests')
    requester = models.ForeignKey('accounts.User', on_delete=models.CASCADE, related_name='access_requests')
    message= models.TextField()
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    responded_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.requester} → {self.idea} ({self.status})"

    class Meta:
        unique_together = ('idea', 'requester')


class Comment(models.Model):
    idea = models.ForeignKey(Idea, on_delete=models.CASCADE, related_name='comments')
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='comment')
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
            return f"Comment by {self.author} on {self.idea}"

    class Meta:
        ordering = ['-created_at']
