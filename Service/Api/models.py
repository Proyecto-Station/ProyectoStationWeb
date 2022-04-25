from django.db import models

"""
  Clase Usuarios
"""
class Username(models.Model):
  GROUPS = (
    ('U', 'User'),
    ('C', 'Client'),
    ('A', 'Admin'),
  )
  
  name = models.CharField(max_length = 250)
  last_name = models.CharField(max_length = 250)
  rut = models.CharField(max_length = 12)
  email = models.EmailField(max_length = 250)
  password = models.CharField(max_length = 50)
  permission = models.CharField(max_length = 1, choices = GROUPS)
  session = models.IntegerField(default = 0)

"""
  Clase Buses
"""
class Bus(models.Model):
  pass

"""
  Clase Choferes
"""
class Drivers(models.Model):
  pass
