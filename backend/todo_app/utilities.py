from .models import *
from django.http import JsonResponse

def get_all_tasks_sorted_by_id():
    my_tasks = list(Task.objects.all().values())
    my_tasks=sorted(my_tasks, key=lambda x:x['id'])
    return JsonResponse({'tasks':my_tasks})

def create_a_new_task(title):
    newTask=Task.objects.create(title=title)
    newTask.save()
    return JsonResponse({'itemCreated':True, 'id': newTask.id})

def change_task_status_by_id(id):
    task = Task.objects.get(id=id)
    task.change_status()

def update_tasks_completed_status(id):
    change_task_status_by_id(id)
    return JsonResponse({'changed':True})

def update_multiple_tasks_completed_status(task_ids):
    [change_task_status_by_id(i) for i in task_ids]
    return JsonResponse({'success': True})
