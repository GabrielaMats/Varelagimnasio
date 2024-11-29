from django.db import models
from datetime import date, timedelta
from django.utils.timezone import now

class Usuario(models.Model):
    nombre = models.CharField(max_length=100)
    correo = models.EmailField(unique=True)
    telefono = models.CharField(max_length=15, blank=True, null=True)

    def __str__(self):
        return self.nombre

class Membresia(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='membresias', null=True)  # Permite null temporalmente
    tipo = models.CharField(max_length=100, default="Mensual")
    fecha_inicio = models.DateField(default=date.today)
    fecha_expiracion = models.DateField(default=date.today() + timedelta(days=30))
    precio = models.DecimalField(max_digits=10, decimal_places=2, null=True)  # Permite null temporalmente

    
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

class DetalleFactura(models.Model):
    factura = models.ForeignKey('Factura', related_name='detalles', on_delete=models.CASCADE)
    producto = models.ForeignKey('Producto', on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField()
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)

class Factura(models.Model):
    cliente = models.ForeignKey('Cliente', on_delete=models.CASCADE)
    total = models.DecimalField(max_digits=10, decimal_places=2)


