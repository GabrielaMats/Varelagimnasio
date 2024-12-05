from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UsuarioViewSet, MembresiaViewSet, ProductoViewSet, TransaccionViewSet, FacturaViewSet, MovimientoInventarioViewSet

router = DefaultRouter()
router.register('usuarios', UsuarioViewSet, basename='usuario')
router.register('membresias', MembresiaViewSet, basename='membresia')
router.register('productos', ProductoViewSet, basename='producto')
router.register('transacciones', TransaccionViewSet, basename='transaccion')
router.register('facturas', FacturaViewSet, basename='factura')
router.register('movimientos', MovimientoInventarioViewSet, basename='movimiento')


urlpatterns = [
    path('', include(router.urls)),
]
