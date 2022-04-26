from django.contrib import admin
from .models import Companies, Drivers, Platforms, Username

admin.site.register(Username)
admin.site.register(Companies)
admin.site.register(Platforms)
admin.site.register(Drivers)