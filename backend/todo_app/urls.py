from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('all_tasks/', views.all_tasks)
]