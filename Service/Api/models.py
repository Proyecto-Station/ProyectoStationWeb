import email
from pyexpat import model
from django.db import models

"""
  Clase Usuarios
"""
class Username(models.Model):
  GROUPS = (
    ('U', 'User'),
    ('C', 'Client'),
    ('S', 'Sub-Client'),
    ('A', 'Administrator'),
  )
  
  SESSIONS = (
    ('0', 'Offline'),
    ('1', 'Online'),
  )
  
  name = models.CharField(max_length = 250)
  last_name = models.CharField(max_length = 250)
  rut = models.CharField(max_length = 12, unique = True)
  email = models.EmailField(max_length = 250)
  password = models.CharField(max_length = 50)
  permission = models.CharField(max_length = 1, choices = GROUPS)
  session = models.IntegerField(default = 0, choices = SESSIONS)

"""
  Clase Empresas
"""
class Company(models.Model):
  SWITCH = {
    ('0', 'Inactive'),
    ('1', 'Active'),
  }

  name = models.CharField(max_length = 250)
  rut = models.CharField(max_length = 12, unique = True)
  email = models.EmailField(max_length = 250)
  address = models.CharField(max_length = 255)
  status = models.IntegerField(default = 0, choices = SWITCH)

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
