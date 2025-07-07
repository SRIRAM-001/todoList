from django.db import models



class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    usage_frequency = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.name


class Task(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    priority_score = models.IntegerField(default=2)  # 1: Low, 2: Medium, 3: High
    deadline = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=[
        ('Pending', 'Pending'),
        ('Completed', 'Completed'),
        ('InProgress', 'InProgress')
    ], default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class ContextEntry(models.Model):
    SOURCE_CHOICES = [
        ('email', 'Email'),
        ('whatsapp', 'WhatsApp'),
        ('note', 'Note'),
        ('other', 'Other'),
    ]

    content = models.TextField()
    source_type = models.CharField(max_length=20, choices=SOURCE_CHOICES, default='note')
    timestamp = models.DateTimeField(auto_now_add=True)
    processed_insight = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.content[:60]
