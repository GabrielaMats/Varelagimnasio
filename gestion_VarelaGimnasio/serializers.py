from rest_framework import serializers
from .models import Usuario, Membresia, Producto, Transaccion

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'

class MembresiaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Membresia
        fields = '__all__'

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'

class TransaccionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaccion
        fields = '__all__'
