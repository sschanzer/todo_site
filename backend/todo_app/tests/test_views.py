from django.test import TestCase, Client
from django.urls import reverse, resolve
import json
from todo_app.views import *

class TestViews(TestCase):
    def setUp(self): 
        self.client = Client()

    def test_get_all_tasks(self):
        response = self.client.get(reverse('all_tasks'))
        body = json.loads(response.content)
        self.assertEqual(body, {'tasks':[]})

    def test_new_task_body(self):
        response = self.client.post(reverse('new_task'))
        body = json.loads(response.content)
        self.assertDictEqual(body, {'createdItem':False, 'id':0})
    
    def test_new_task_improper_input(self):
        response = self.client.post(reverse('new_task'))
        body = json.loads(response.content)
        self.assertFalse(body['createdItem'])

    def test_new_task_proper(self):
        response = self.client.post(reverse('new_task'), {'name': 'testing'})
        body = json.loads(response.content)
        self.assertTrue(body['createdItem'])