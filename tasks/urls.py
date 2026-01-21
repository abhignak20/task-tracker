from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, TaskDependencyViewSet

router = DefaultRouter()
router.register(r'tasks', TaskViewSet)
router.register(r'dependencies', TaskDependencyViewSet)

urlpatterns = router.urls
