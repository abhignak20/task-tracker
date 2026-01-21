from django.db import models

class Task(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('blocked', 'Blocked'),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
    
def update_status(self):
    dependencies = self.dependencies.all()

    if not dependencies.exists():
        self.status = 'in_progress'
    elif any(dep.depends_on.status == 'blocked' for dep in dependencies):
        self.status = 'blocked'
    elif all(dep.depends_on.status == 'completed' for dep in dependencies):
        self.status = 'in_progress'
    else:
        self.status = 'pending'

    self.save()



class TaskDependency(models.Model):
    task = models.ForeignKey(
        Task,
        related_name='dependencies',
        on_delete=models.CASCADE
    )
    depends_on = models.ForeignKey(
        Task,
        related_name='dependents',
        on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.task} depends on {self.depends_on}"
    
from django.db.models.signals import post_save
from django.dispatch import receiver

@receiver(post_save, sender=Task)
def update_dependents(sender, instance, **kwargs):
    for dep in instance.dependents.all():
        dep.task.update_status()

