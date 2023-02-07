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
        my_tasks = list(Task.objects.all().values())
        return JsonResponse({'tasks': my_tasks})
    if request.method == 'POST':
        try:
            new_task = Task.objects.create(title = request.data['name'])
            new_task.save()
            return JsonResponse({'createdItem':True, 'id':new_task.id})
        except:
            return JsonResponse({'createdItem': False, 'id':0})