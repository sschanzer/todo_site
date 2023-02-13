from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('all_tasks/', views.all_tasks, name='all_tasks'),
    path('new_task/', views.all_tasks, name='new_task')
]