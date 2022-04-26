from django.contrib import admin
from .models import Bussed, Companie, Destination, Driver, Origen, Platform, Schedule, Username, Customer, Reserve

arr = [
  Username, 
  Companie, 
  Driver, 
  Platform, 
  Bussed, 
  Destination, 
  Origen, 
  Schedule, 
  Customer, 
  Reserve
]

for i in arr:
  admin.site.register(i)

"""
admin.site.register(Username)
admin.site.register(Companie)
admin.site.register(Driver)
admin.site.register(Platform)
admin.site.register(Bussed)
admin.site.register(Destination)
admin.site.register(Origen)
admin.site.register(Schedule)
admin.site.register(Customer)
admin.site.register(Reserve)
"""