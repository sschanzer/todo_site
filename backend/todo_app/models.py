from django.db import models

# Create your models here.
class Task(models.Model):
    title = models.CharField(max_length=150)
    completed = models.BooleanField(default=False)

    def change_status(self):
        self.completed = not self.completed
        self.save()

    def change_title(self, name):
        self.title = name
        self.save()

    