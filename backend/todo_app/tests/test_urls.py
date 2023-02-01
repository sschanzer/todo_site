from django.test import TestCase, SimpleTestCase, Client
from django.urls import reverse, resolve
from todo_app.views import *

class TestUrls(SimpleTestCase):

    def test_home_url_corr_func(self):
        url = reverse('home')
        self.assertEqual(resolve(url).func, home)

    def test_home_url_GET(self):
        client = Client()
        response = client.get(reverse('home'))
        self.assertEqual(response.status_code, 200)

        