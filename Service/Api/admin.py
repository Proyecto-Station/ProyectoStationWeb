from django.contrib import admin
from .models import Bussed, Companie, Destination, Driver, Origen, Platform, Schedule, Username

admin.site.register(Username)
admin.site.register(Companie)
admin.site.register(Driver)
admin.site.register(Platform)
admin.site.register(Bussed)
admin.site.register(Destination)
admin.site.register(Origen)
admin.site.register(Schedule)
