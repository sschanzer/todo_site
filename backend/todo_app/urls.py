from django.urls import path, include
from . import views
from .views import Task_handler, Multi_task_handler

urlpatterns = [
    path('', views.home, name='home'),
    path('task/', Task_handler.as_view(), name='new_task'),
    path('task/<int:id>', Task_handler.as_view(), name='change_status'),
    path('task/<int:id>/', Task_handler.as_view(), name='delete_task'),
    path('task/<int:id>', Task_handler.as_view(), name='change_title'),
    path('tasks/', Multi_task_handler.as_view(), name='all_tasks'),
    path('tasks/', Multi_task_handler.as_view(), name='multiple'),
    path('tasks/', Multi_task_handler.as_view(), name='delete_mult')
]