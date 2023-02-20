from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.views import APIView
from .models import *
from .utilities import *


# Create your views here.


def home(request):
    file = open('static/index.html').read()
    return HttpResponse(file)

class Task_handler(APIView):
    
    def get(self, request):
        return get_all_tasks_sorted_by_id()
    
    def post(self, request):
        try:
            return create_a_new_task(title=request.data['name'])
        except:
            return JsonResponse({'itemCreated': False, 'id':0})
    
    def put(self, request, id=0):
        try:
            return update_tasks_completed_status(id=id)
        except Exception as e:
            print(e)
            return JsonResponse({'changed': False})