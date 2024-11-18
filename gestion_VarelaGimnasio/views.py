from rest_framework import viewsets
from .models import Usuario, Membresia, Producto, Transaccion
from .serializers import UsuarioSerializer, MembresiaSerializer, ProductoSerializer, TransaccionSerializer

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class MembresiaViewSet(viewsets.ModelViewSet):
    queryset = Membresia.objects.all()
    serializer_class = MembresiaSerializer

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

class TransaccionViewSet(viewsets.ModelViewSet):
    queryset = Transaccion.objects.all()
    serializer_class = TransaccionSerializer