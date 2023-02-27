from django.test import TestCase,  Client
from django.urls import reverse, resolve
from todo_app.views import *
from todo_app import views

class TestUrls(TestCase):
    def setUp(self):
        self.client=Client()
    
    def test_home_url_corresponding_func(self):
        url = reverse('home')
        self.assertEquals(resolve(url).func, home)
        
    def test_home_url_GET_status_code_200(self):
        response = self.client.get(reverse('home'))
        self.assertEquals(response.status_code, 200)
        
    def test_allTasks_GET_status_code_200(self):
        response=self.client.get(reverse("allTasks"))
        self.assertEquals(response.status_code, 200)
        
    def test_allTasks_corresponding_func(self):
        url=reverse('allTasks')
        self.assertEqual(resolve(url).func.view_class, Multi_task_handler)
        
    def test_newtask_POST_with_body(self):
        response=self.client.post(reverse('newtask'),{'name':"testing"})
        self.assertEquals(response.status_code, 200)
        
    def test_newtask_POST_without_body(self):
        response=self.client.post(reverse('newtask'))
        self.assertEquals(response.status_code, 200)
        
    def test_new_task_corresponding_func(self):
        url=reverse('newtask')
        self.assertAlmostEqual(resolve(url).func.view_class, Task_handler)
        
    def test_change_status_PUT_where_the_argument_doesnt_exist(self):
        response=self.client.put(reverse('changestatus', args=[1]))
        self.assertEquals(response.status_code, 200)
    
    def test_change_statu_PUT_with_argument_corresponding_to_a_task(self):
        self.client.post(reverse('newtask'),{'name':'testing'})
        response=self.client.put(reverse('changestatus', args=[1]))
        self.assertEquals(response.status_code, 200)
        
    def test_change_status_func(self):
        url =reverse('changestatus', args=[1])
        self.assertEquals(resolve(url).func.view_class, Task_handler)
        
    def test_change_multiple_PUT_with_the_correct_body_and_arguments(self):
        response= self.client.put(reverse('multiple'),{'selected':[1,2,3]})
        self.assertEquals(response.status_code, 200)
        
    def test_change_multiple_PUT_without_a_body(self):
        response= self.client.put(reverse('multiple'))
        self.assertEquals(response.status_code, 200)
        
    def test_change_multiple_PUT_func(self):
        url=reverse('multiple')
        self.assertEquals(resolve(url).func.view_class, Multi_task_handler)
        
    def test_delete_task_DELETE_argument_has_matching_query(self):
        response=self.client.delete(reverse("deletetask", args=[1]))
        self.assertEquals(response.status_code, 200)
        
    def test_delete_task_DELETE_argument_does_not_match_a_task_id(self):
        response=self.client.delete(reverse("deletetask", args=[0]))
        self.assertEquals(response.status_code, 200)
        
    def test_delete_task_func(self):
        url=reverse("deletetask", args=[1])
        self.assertEquals(resolve(url).func.view_class, Task_handler)   
        
    def test_delete_multiple_task_DELETE_body_provided_with_matching_queries(self):
        task1=Task.objects.create(title="test")
        task2=Task.objects.create(title="test")
        response=self.client.delete(reverse("deletemult"),data={"selected":[task1.id,task2.id]}, content_type="application/json")
        self.assertEquals(response.status_code, 200)
        
    def test_delete_multiple_task_DELETE_body_with_incorrect_data_structure(self):
        response=self.client.delete(reverse("deletemult"), {"selected":0}, "application/json")
        self.assertEquals(response.status_code, 200)
    
    def test_delete_multiple_task_func(self):
        url=reverse("deletemult")
        self.assertEquals(resolve(url).func.view_class, Multi_task_handler)
        
    def test_change_task_title_PUT_argument_and_body_provided(self):
        task1 = Task.objects.create(title='test')
        response = self.client.put(reverse("changetitle", args=[task1.id]), {"name":"new title"}, "application/json")
        self.assertEquals(response.status_code, 200)
    
    def test_change_task_title_PUT_argument_id_does_not_exist(self):
        response = self.client.put(reverse("changetitle", args=[1]), {"name": 1}, "application/json")
        self.assertEquals(response.status_code, 200)
        
    def test_change_task_title_func(self):
        url = reverse("changetitle", args=[1])
        self.assertEquals(resolve(url).func.view_class, Task_handler)