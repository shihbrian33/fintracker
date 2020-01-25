
from .api import TransactionViewSet, CategoryViewSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register('api/transactions', TransactionViewSet, 'transactions')
router.register('api/categories', CategoryViewSet, 'categories')

urlpatterns = router.urls
