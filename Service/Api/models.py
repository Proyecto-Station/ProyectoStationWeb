from django.db import models
from datetime import date

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
    (0, 'Offline'),
    (1, 'Online'),
  )
  
  name = models.CharField(max_length = 250)
  last_name = models.CharField(max_length = 250)
  rut = models.CharField(max_length = 12, unique = True)
  phone = models.CharField(max_length = 15, unique = True, default = None)
  email = models.EmailField(max_length = 250, default = None)
  password = models.CharField(max_length = 50)
  avatar = models.FileField(upload_to = 'upload/', null = True, default = None)
  permission = models.CharField(max_length = 1, choices = GROUPS)
  session = models.IntegerField(choices = SESSIONS)

"""
  Clase Empresas
"""
class Companie(models.Model):
  SWITCH = {
    (0, 'Inactive'),
    (1, 'Active'),
  }

  name = models.CharField(max_length = 250)
  rut = models.CharField(max_length = 12, unique = True)
  email = models.EmailField(max_length = 250)
  phone = models.CharField(max_length = 15, unique = True, default = None)
  address = models.CharField(max_length = 255)
  status = models.IntegerField(default = 0, choices = SWITCH)
  date_init = models.DateField(default = date.today)

"""
  Clase Piloto
"""
class Driver(models.Model):
  name = models.CharField(max_length = 250)
  last_name = models.CharField(max_length = 250)
  rut = models.CharField(max_length = 12, unique = True)
  email = models.EmailField(max_length = 250)
  phone = models.CharField(max_length = 15, unique = True, default = None)
  company = models.ForeignKey(Companie, on_delete = models.CASCADE)
  date_init = models.DateField(default = date.today)
  age_job = models.IntegerField(default = None)

"""
  Clase Copiloto
"""
class CoDriver(models.Model):
  name = models.CharField(max_length = 250)
  last_name = models.CharField(max_length = 250)
  rut = models.CharField(max_length = 12, unique = True)
  phone = models.CharField(max_length = 15, unique = True, default = None)
  company = models.ForeignKey(Companie, on_delete = models.CASCADE)
  date_init = models.DateField(default = date.today)
  age_job = models.IntegerField(default = None)

"""
  Clase Buses
"""
class Bussed(models.Model):
  SECURITY_SYSTEM = {
    (0, 'Basic Level'),
    (1, 'Medium Level'),
    (2, 'High Level'),
    (3, 'Max Level')
  }

  plate = models.CharField(max_length = 6, unique = True)
  driver = models.ForeignKey(Driver, on_delete = models.CASCADE)
  co_driver = models.ForeignKey(CoDriver, on_delete = models.CASCADE, default = None)
  company = models.ForeignKey(Companie, on_delete = models.CASCADE)
  passenger = models.IntegerField(default = None)
  security = models.IntegerField(default = 0, choices = SECURITY_SYSTEM)

"""
  Clase Andenes
"""
class Platform(models.Model):
  name = models.CharField(max_length = 10)

"""
  Clase Origen
"""
class Origen(models.Model):
  name = models.CharField(max_length = 250)

"""
  Clase Destinos
"""
class Destination(models.Model):
  name = models.CharField(max_length = 250)

"""
  Clase Horarios
"""
class Schedule(models.Model):
  code_schedule = models.CharField(max_length = 8, unique = True)
  origen = models.ForeignKey(Origen, on_delete = models.CASCADE)
  destination = models.ForeignKey(Destination, on_delete = models.CASCADE)
  check_out_time = models.TimeField()
  arrival_time = models.TimeField()
  bus = models.ForeignKey(Bussed, on_delete = models.CASCADE)
  company = models.ForeignKey(Companie, on_delete = models.CASCADE)
  sidewalks = models.ForeignKey(Platform, on_delete = models.CASCADE)

"""
  Clase Reserva
"""
class Reserve(models.Model):
  ticket = models.IntegerField(unique = True)
  code_schedule = models.ForeignKey(Schedule, on_delete = models.CASCADE)
  client = models.ForeignKey(Username, on_delete = models.CASCADE)
  date =  models.DateField()
  cost = models.IntegerField()
  description = models.TextField()
