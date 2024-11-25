from rest_framework import serializers
from .models import Usuario, Membresia, Producto, Transaccion

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'nombre', 'correo', 'telefono']
        
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
    usuario_nombre = serializers.ReadOnlyField(source='usuario.nombre')  # Nombre del usuario asociado
    fecha = serializers.DateTimeField(format="%Y-%m-%d", input_formats=["%Y-%m-%d", "iso-8601"])
    class Meta:
        model = Transaccion
        fields = '__all__'
