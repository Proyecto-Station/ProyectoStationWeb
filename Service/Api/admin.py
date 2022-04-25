from django.contrib import admin
from .models import Company, Username

admin.site.register(Username)
admin.site.register(Company)