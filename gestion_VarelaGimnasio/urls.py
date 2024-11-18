from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UsuarioViewSet, MembresiaViewSet, ProductoViewSet, TransaccionViewSet

router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet)
router.register(r'membresias', MembresiaViewSet)
router.register(r'productos', ProductoViewSet)
router.register(r'transacciones', TransaccionViewSet)

urlpatterns = [
    path('', include(router.urls)),  # Usa el router para generar las rutas
]
