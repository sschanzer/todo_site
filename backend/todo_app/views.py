from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from .models import *

# Create your views here.


def home(request):
    file = open('static/index.html').read()
    return HttpResponse(file)
    # return HttpResponse("<h1>HOMEPAGE</h1>")

api_view(['GET'])
def all_tasks(request):
    tasks = list(Task.objects.all().values())
    # print(tasks)
    completedTasks = filter(lambda x: x['completed'] == True, tasks)
    pendingTasks = filter(lambda x:x['completed'] == False, tasks)
    completedTasks = list(completedTasks)
    pendingTasks = list(pendingTasks)
    return JsonResponse({'completed': completedTasks, 'pending': pendingTasks})
