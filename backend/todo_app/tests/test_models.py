from django.test import TestCase
from todo_app.models import *
# Create your tests here.


class TestModels(TestCase):
    def setUp(self):
        self.task= Task.objects.create(title="Test out my app")
        self.completed_task=Task.objects.create(title="Test completed", completed=True)
        
    def test_task_creation(self):
        self.assert_(self.task)
        
    def test_completed_task_creation(self):
        self.assert_(self.completed_task)
        
    def test_changing_task_completed_status_from_false_to_true(self):
        self.task.change_status()
        self.assertTrue(self.task.completed)
        
    def test_changing_task_completed_status_from_true_to_false(self):
        self.completed_task.change_status()
        self.assertFalse(self.completed_task.completed)
        
    def test_changing_tasks_title(self):
        self.completed_task.change_title("This is a seperate title")
        self.assertEquals(self.completed_task.title, "This is a seperate title")