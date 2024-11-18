from django.contrib import admin
from .models import Usuario, Membresia, Producto, Transaccion

admin.site.register(Usuario)
admin.site.register(Membresia)
admin.site.register(Producto)
admin.site.register(Transaccion)
