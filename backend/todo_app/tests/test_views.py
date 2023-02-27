from django.test import TestCase, Client
from django.urls import reverse
import json
from todo_app.views import *

class TestViews(TestCase):
    def setUp(self):
        self.client=Client()
    
    def test_get_all_tasks(self):
        response=self.client.get(reverse("allTasks"))
        body=json.loads(response.content)
        self.assertEquals(body, {'tasks':[]})
        
    def test_new_task_body(self):
        response=self.client.post(reverse('newtask'))
        body=json.loads(response.content)
        self.assertDictEqual(body,{'itemCreated':False, 'id':0})
        
    def test_new_task_input_no_data_provided(self):
        response=self.client.post(reverse('newtask'))
        body=json.loads(response.content)
        self.assertFalse(body['itemCreated'])
        
    def test_new_task_with_a_expected_body_and_data_structures(self):
        response=self.client.post(reverse('newtask'),{'name':"testing"})
        body=json.loads(response.content)
        self.assertTrue(body['itemCreated'])
        
    def test_change_status_body(self):
        task=self.client.post(reverse('newtask'),{'name':"testing"})
        body=json.loads(task.content)
        response = self.client.put(reverse("changestatus", args=[body['id']]))
        body=json.loads(response.content)
        self.assertDictEqual(body,{'changed':True})
        
    def test_change_status_expected_body_to_return_true(self):
        task=self.client.post(reverse('newtask'),{'name':"testing"})
        body=json.loads(task.content)
        response = self.client.put(reverse("changestatus", args=[body['id']]))
        body=json.loads(response.content)
        self.assertTrue(body['changed'])
        
    def test_change_status_input_argument_does_not_exist(self):
        response = self.client.put(reverse("changestatus", args=[1]))
        body=json.loads(response.content)
        self.assertFalse(body['changed'])
        
        
    def test_change_multiple_input_selected_value_not_a_list(self):
        response= self.client.put(reverse('multiple'), data={'selected':1}, content_type="application/json")
        body=json.loads(response.content)
        self.assertFalse(body['success'])

    def test_proper_multiple_with_expected_body_and_data_structure(self):
        task1=Task.objects.create(title='test')
        task2=Task.objects.create(title='test')
        task3=Task.objects.create(title='test')
        response=self.client.put(reverse('multiple'), data={'selected':[task1.id, task2.id, task3.id]}, content_type="application/json")
        body=json.loads(response.content)
        self.assertTrue(body['success'])
        
    def test_delete_a_task_with_matching_query_argument(self):
        task1=Task.objects.create(title="test")
        response=self.client.delete(reverse("deletetask", args=[task1.id]))
        body=json.loads(response.content)
        self.assertTrue(body['success'])
    
    def test_delete_a_task_input_argument_does_not_exist(self):
        response=self.client.delete(reverse("deletetask", args=[0]))
        body=json.loads(response.content)
        self.assertFalse(body['success'])
        
    def test_delete_multiple_task_body_containing_valid_arguments(self):
        task1=Task.objects.create(title='test')
        task2=Task.objects.create(title='test')
        task3=Task.objects.create(title='test')
        response=self.client.delete(reverse('deletemult'), data={"selected":[task1.id,task2.id,task3.id]}, content_type="application/json")
        body=json.loads(response.content)
        self.assertTrue(body['success'])
        
    def test_delete_multiple_task_input_argument_does_not_exist(self):
        response=self.client.delete(reverse('deletemult'), data={"selected":[0]}, content_type="application/json")
        body=json.loads(response.content)
        self.assertFalse(body['success'])
        
        
    def test_change_task_title_with_argument_matching_query(self):
        task2=Task.objects.create(title="testing")
        response = self.client.put(reverse("changetitle", args=[task2.id]), {"name":"new title"}, "application/json")
        body = json.loads(response.content)
        with self.subTest():
            self.assertEquals(Task.objects.get(id= task2.id).title, "new title")
        self.assertTrue(body['changed'])
        
    def test_change_task_title_agument_id_does_not_exist(self):
        task1 = Task.objects.create(title= "testing")
        response = self.client.put(reverse("changetitle", args=[1]), {"name":"new title"}, "application/json")
        body = json.loads(response.content)
        with self.subTest():
            self.assertNotEquals(Task.objects.get(id = task1.id).title, "new title")
        self.assertFalse(body['changed'])