from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from .models import *

# Create your views here.


def home(request):
    file = open('static/index.html').read()
    return HttpResponse(file)

@api_view(['GET', 'POST'])
def all_tasks(request):
    if request.method == 'GET':
        completedTasks = list(filter(lambda x: x['completed'] == True, Task.objects.all().values()))
        pendingTasks = list(filter(lambda x:x['completed'] == False, Task.objects.all().values()))
        return JsonResponse({'completed': completedTasks, 'pending': pendingTasks})
    if request.method == 'POST':
        new_task = Task.objects.create(title = request.data['name'])
        new_task.save()
        return JsonResponse({'createdItem':True, 'id':new_task.id})

