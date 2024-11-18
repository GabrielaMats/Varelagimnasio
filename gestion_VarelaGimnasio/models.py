from django.db import models

class Usuario(models.Model):
    nombre = models.CharField(max_length=100)
    correo = models.EmailField(unique=True)
    fecha_nacimiento = models.DateField(null=True, blank=True)
    fecha_inicio_membresia = models.DateField()
    estado_membresia = models.BooleanField(default=True)  # True = Activa, False = Inactiva

    def __str__(self):
        return self.nombre
class Membresia(models.Model):
    nombre = models.CharField(max_length=50)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    duracion_dias = models.PositiveIntegerField()

    def __str__(self):
        return self.nombre
class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    categoria = models.CharField(max_length=50)  # Opcional: Puedes usar un modelo separado si necesitas más categorías
    cantidad_stock = models.PositiveIntegerField()
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.nombre
class Transaccion(models.Model):
    TIPO_CHOICES = [
        ('Ingreso', 'Ingreso'),
        ('Egreso', 'Egreso'),
    ]
    tipo = models.CharField(max_length=10, choices=TIPO_CHOICES)
    descripcion = models.TextField()
    monto = models.DecimalField(max_digits=10, decimal_places=2)
    fecha = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.tipo} - {self.monto}"
