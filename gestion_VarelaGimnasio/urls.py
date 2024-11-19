from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UsuarioViewSet, MembresiaViewSet, ProductoViewSet, TransaccionViewSet

router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet, basename='usuario')
router.register(r'membresias', MembresiaViewSet, basename='membresia')
router.register(r'productos', ProductoViewSet, basename='producto')
router.register(r'transacciones', TransaccionViewSet, basename='transaccion')

urlpatterns = [
    path('', include(router.urls)),  # Incluye todas las rutas del router
]
