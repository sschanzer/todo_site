from django.urls import path, include
from . import views
from .views import Task_handler, Multi_task_handler

urlpatterns = [
    path('', views.home, name='home'),
    path('new_task/', Task_handler.as_view(), name='new_task'),
    path('change_status/<int:id>', Task_handler.as_view(), name='change_status'),
    path('all_tasks/', Multi_task_handler.as_view(), name='all_tasks'),
    path('tasks/', Multi_task_handler.as_view(), name='multiple'),
]