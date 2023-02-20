from django.test import TestCase, Client
from django.urls import reverse, resolve
import json
from todo_app.views import *

class TestViews(TestCase):
    def setUp(self): 
        self.client = Client()

    def test_all_tasks_returns_tasks_as_dictionary(self):
        response = self.client.get(reverse('all_tasks'))
        body = json.loads(response.content)
        self.assertEqual(body, {'tasks':[]})

    def test_new_task_body_returns_createdItem_as_dictionary(self):
        response = self.client.post(reverse('new_task'))
        body = json.loads(response.content)
        self.assertDictEqual(body, {'createdItem':False, 'id':0})
    
    def test_new_task_improper_input_returns_False(self):
        response = self.client.post(reverse('new_task'))
        body = json.loads(response.content)
        self.assertFalse(body['createdItem'])

    def test_new_task_proper_input_returns_True(self):
        response = self.client.post(reverse('new_task'), {'name': 'testing'})
        body = json.loads(response.content)
        self.assertTrue(body['createdItem'])