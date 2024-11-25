from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UsuarioViewSet, MembresiaViewSet, ProductoViewSet, TransaccionViewSet

router = DefaultRouter()
router.register('usuarios', UsuarioViewSet, basename='usuario')
router.register('membresias', MembresiaViewSet, basename='membresia')
router.register('productos', ProductoViewSet, basename='producto')
router.register('transacciones', TransaccionViewSet, basename='transaccion')

urlpatterns = [
    path('', include(router.urls)),
]
