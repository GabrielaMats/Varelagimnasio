from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UsuarioViewSet, MembresiaViewSet, ProductoViewSet, TransaccionViewSet, FacturaViewSet

router = DefaultRouter()
router.register('usuarios', UsuarioViewSet, basename='usuario')
router.register('membresias', MembresiaViewSet, basename='membresia')
router.register('productos', ProductoViewSet, basename='producto')
router.register('transacciones', TransaccionViewSet, basename='transaccion')
router.register('facturas', FacturaViewSet, basename='factura')

urlpatterns = [
    path('', include(router.urls)),
]
