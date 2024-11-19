from rest_framework import serializers
from .models import Usuario, Membresia, Producto, Transaccion

class UsuarioSerializer(serializers.ModelSerializer):
    membresias = serializers.StringRelatedField(many=True, read_only=True)  # Relación con membresías

    class Meta:
        model = Usuario
        fields = '__all__'

class MembresiaSerializer(serializers.ModelSerializer):
    usuario_nombre = serializers.ReadOnlyField(source='usuario.nombre')  # Nombre del usuario asociado

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
