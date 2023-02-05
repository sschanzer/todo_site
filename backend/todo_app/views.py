from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from .models import *

# Create your views here.


def home(request):
    file = open('static/index.html').read()
    return HttpResponse(file)

api_view(['GET'])
def all_tasks(request):
    tasks = list(Task.objects.all().values())
    completedTasks = filter(lambda x: x['completed'] == True, tasks)
    pendingTasks = filter(lambda x:x['completed'] == False, tasks)
    completedTasks = list(completedTasks)
    pendingTasks = list(pendingTasks)
    return JsonResponse({'completed': completedTasks, 'pending': pendingTasks})
