
from .api import CardViewSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register('api/cards', CardViewSet, 'cards')

urlpatterns = router.urls
