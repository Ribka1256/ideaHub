from pyexpat import model

from django.db import models

# Create your models here.

class Idea(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('published', 'Published'),
    ]
    owner = models.ForeignKey('accounts.User', on_delete=models.CASCADE, related_name='ideas')
    title = models.CharField(max_length=255)
    summary = models.TextField()
    document = models.FileField(upload_to='idea_docs/')
    status = models.CharField(max_length=50, choices=[('draft', 'Draft'), ('submitted', 'Submitted'), ('approved', 'Approved'), ('rejected', 'Rejected')], default='draft')
    created_at = models.DateTimeField(auto_now_add=True)

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

    class Meta:
        unique_together = ('idea', 'requester')
