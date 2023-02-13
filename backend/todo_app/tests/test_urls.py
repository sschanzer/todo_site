from django.test import TestCase, Client
from django.urls import reverse, resolve
from todo_app.views import *

class TestUrls(TestCase):

    def test_home_url_corr_func(self):
        url = reverse('home')
        self.assertEqual(resolve(url).func, home)

    def test_home_url_GET(self):
        client = Client()
        response = client.get(reverse('home'))
        self.assertEqual(response.status_code, 200)

    def test_all_tasks_GET(self):
        response = self.client.get(reverse('all_tasks'))
        self.assertEqual(response.status_code, 200)
    
    def test_all_tasks_func(self):
        url = reverse('all_tasks')
        self.assertEqual(resolve(url).func, all_tasks)

    def test_new_task_POST_proper_input(self):
        response = self.client.post(reverse('new_task'), {'name':'testing'})
        self.assertEqual(response.status_code, 200)

    def test_new_task_POST_improper_input(self):
        response = self.client.post(reverse('new_task'))
        self.assertEqual(response.status_code, 200)

    def test_new_task_func(self):
        url = reverse('new_task')
        self.assertAlmostEqual(resolve(url).func, all_tasks)