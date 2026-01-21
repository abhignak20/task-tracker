from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Task, TaskDependency
from .serializers import TaskSerializer, TaskDependencySerializer

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


from .utils import detect_cycle

class TaskDependencyViewSet(viewsets.ModelViewSet):
    queryset = TaskDependency.objects.all()
    serializer_class = TaskDependencySerializer

    def create(self, request, *args, **kwargs):
        task_id = request.data.get('task')
        depends_on_id = request.data.get('depends_on')

        if task_id == depends_on_id:
            return Response(
                {"error": "Task cannot depend on itself"},
                status=status.HTTP_400_BAD_REQUEST
            )

        task = Task.objects.get(id=task_id)
        depends_on = Task.objects.get(id=depends_on_id)

        # Temporary add dependency
        visited = set()
        if detect_cycle(task, depends_on, visited):
            return Response(
                {"error": "Circular dependency detected"},
                status=status.HTTP_400_BAD_REQUEST
            )

        return super().create(request, *args, **kwargs)
