from django.db import models
from datetime import date, timedelta
from django.utils.timezone import now
from django.db.models.signals import post_save
from django.dispatch import receiver

class Usuario(models.Model):
    nombre = models.CharField(max_length=100)
    correo = models.EmailField(unique=True)
    telefono = models.CharField(max_length=15, blank=True, null=True)

    def __str__(self):
        return self.nombre

class Membresia(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='membresias', null=True)
    tipo = models.CharField(max_length=100, default="Mensual")
    fecha_inicio = models.DateField(default=date.today)
    fecha_expiracion = models.DateField(default=date.today() + timedelta(days=30))
    precio = models.DecimalField(max_digits=10, decimal_places=2, null=True)

class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    categoria = models.CharField(max_length=100)
    cantidad_stock = models.IntegerField()
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.nombre

class Transaccion(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='transacciones')
    monto = models.DecimalField(max_digits=10, decimal_places=2)
    tipo = models.CharField(max_length=100, choices=[("Pago", "Pago"), ("Compra", "Compra")])
    fecha = models.DateTimeField(default=now)

class Factura(models.Model):
    cliente = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    fecha_emision = models.DateTimeField(auto_now_add=True)

class DetalleFactura(models.Model):
    factura = models.ForeignKey(Factura, related_name="detalles", on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField()
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)

# Señal para reducir stock automáticamente
@receiver(post_save, sender=DetalleFactura)
def reducir_stock(sender, instance, **kwargs):
    producto = instance.producto
    print(f"Reduciendo stock para el producto: {producto.nombre}")
    print(f"Stock actual: {producto.cantidad_stock}, Cantidad requerida: {instance.cantidad}")

    if producto.cantidad_stock >= instance.cantidad:
        producto.cantidad_stock -= instance.cantidad
        producto.save()
        print(f"Nuevo stock: {producto.cantidad_stock}")
    else:
        print(f"Error: Stock insuficiente para el producto: {producto.nombre}")
        raise ValueError(f"Stock insuficiente para el producto: {producto.nombre}")

class MovimientoInventario(models.Model):
    TIPO_MOVIMIENTO = [
        ("Entrada", "Entrada"),
        ("Salida", "Salida"),
    ]

    producto = models.ForeignKey(Producto, on_delete=models.CASCADE, related_name="movimientos")
    tipo = models.CharField(max_length=10, choices=TIPO_MOVIMIENTO)
    cantidad = models.PositiveIntegerField()
    fecha = models.DateTimeField(auto_now_add=True)
    comentario = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.tipo} - {self.producto.nombre} - {self.cantidad}"
