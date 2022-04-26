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
class Companie(models.Model):
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
  Clase Choferes
"""
class Driver(models.Model):
  name = models.CharField(max_length = 250)
  last_name = models.CharField(max_length = 250)
  rut = models.CharField(max_length = 12, unique = True)
  phone = models.CharField(max_length = 15)
  company = models.ForeignKey(Companie, on_delete = models.CASCADE)
  dateinit = models.DateField()
  age = models.IntegerField(default = 0)

"""
  Clase Andenes
"""
class Platform(models.Model):
  name = models.CharField(max_length = 10)

"""
  Clase Buses
"""
class Bussed(models.Model):
  model = models.CharField(max_length = 250)
  plate = models.CharField(max_length = 6, unique = True)
  driver = models.ForeignKey(Driver, on_delete = models.CASCADE)
  company = models.ForeignKey(Companie, on_delete = models.CASCADE)
  sidewalks = models.ForeignKey(Platform, on_delete = models.CASCADE)

"""
  Clase Destinos
"""
class Destination(models.Model):
  name = models.CharField(max_length = 250)

"""
  Clase Origen
"""
class Origen(models.Model):
  name = models.CharField(max_length = 250)

"""
  Clase Horarios
"""
class Schedule(models.Model):
  origen = models.ForeignKey(Origen, on_delete = models.CASCADE)
  destination = models.ForeignKey(Destination, on_delete = models.CASCADE)
  check_out_time = models.TimeField()
  arrival_time = models.TimeField()
  bus = models.ForeignKey(Bussed, on_delete = models.CASCADE)
  company = models.ForeignKey(Companie, on_delete = models.CASCADE)
  sidewalks = models.ForeignKey(Platform, on_delete = models.CASCADE)

"""
  Clase
"""