from rest_framework import serializers
from .models import Usuario, Membresia, Producto, Transaccion, Factura, DetalleFactura, MovimientoInventario

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'nombre', 'correo', 'telefono']

class MembresiaSerializer(serializers.ModelSerializer):
    usuario_nombre = serializers.ReadOnlyField(source='usuario.nombre')

    class Meta:
        model = Membresia
        fields = '__all__'

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'

class TransaccionSerializer(serializers.ModelSerializer):
    usuario_nombre = serializers.ReadOnlyField(source='usuario.nombre')
    fecha = serializers.DateTimeField(format="%Y-%m-%d", input_formats=["%Y-%m-%d", "iso-8601"])

    class Meta:
        model = Transaccion
        fields = '__all__'

class DetalleFacturaSerializer(serializers.ModelSerializer):
    producto_nombre = serializers.ReadOnlyField(source='producto.nombre')  # Incluye el nombre del producto

    class Meta:
        model = DetalleFactura
        fields = ['producto', 'producto_nombre', 'cantidad', 'precio_unitario', 'subtotal']

class FacturaSerializer(serializers.ModelSerializer):
    detalles = DetalleFacturaSerializer(many=True)
    cliente_nombre = serializers.ReadOnlyField(source='cliente.nombre')  # Agrega el nombre del cliente
    fecha_emision = serializers.DateTimeField(format="%Y-%m-%d", read_only=True)  # Agrega la fecha de emisión

    class Meta:
        model = Factura
        fields = ['id', 'cliente', 'cliente_nombre', 'fecha_emision', 'total', 'detalles']

    def validate(self, data):
        for detalle in data['detalles']:
            producto = Producto.objects.get(id=detalle['producto'].id)
            if detalle['cantidad'] > producto.cantidad_stock:
                raise serializers.ValidationError(
                    f"El stock del producto {producto.nombre} es insuficiente."
                )
        return data

    def create(self, validated_data):
        detalles_data = validated_data.pop('detalles')
        factura = Factura.objects.create(**validated_data)
        for detalle_data in detalles_data:
            DetalleFactura.objects.create(factura=factura, **detalle_data)
        return factura

class MovimientoInventarioSerializer(serializers.ModelSerializer):
    producto_nombre = serializers.ReadOnlyField(source="producto.nombre")

    class Meta:
        model = MovimientoInventario
        fields = ['id', 'producto', 'producto_nombre', 'tipo', 'cantidad', 'fecha', 'comentario']

