from django.urls import include, path
from rest_framework import routers
from .views import students_list

urlpatterns = [
  path('user/', students_list, name='list_user'),
]

"""
  path('username/', UsernameView.as_view(), name='username_list'),
  path('username/<int:id>', UsernameView.as_view(), name='username_process'),

  path('companie/', CompanieView.as_view(), name='companie_list'),
  path('companie/<int:id>', CompanieView.as_view(), name='companie_process'),

  path('driver/', DriverView.as_view(), name='driver_list'),
  path('driver/<int:id>', DriverView.as_view(), name='driver_process'),

  path('codriver/', CoDriverView.as_view(), name='codriver_list'),
  path('codriver/<int:id>', CoDriverView.as_view(), name='codriver_process'),

  path('bussed/', BussedView.as_view(), name='bussed_list'),
  path('bussed/<int:id>', BussedView.as_view(), name='bussed_process'),

  path('platform/', PlatformView.as_view(), name='platform_list'),
  path('platform/<int:id>', PlatformView.as_view(), name='platform_process'),

  path('origen/', OrigenView.as_view(), name='origin_list'),
  path('origen/<int:id>', OrigenView.as_view(), name='origin_process'),

  path('destinantion/', DestinationView.as_view(), name='destinantion_list'),
  path('destinantion/<int:id>', DestinationView.as_view(), name='destinantion_process'),
  
  path('schedule/', ScheduleView.as_view(), name='schedule_list'),
  path('schedule/<int:id>', ScheduleView.as_view(), name='schedule_process'),
  
  path('reserve/', ReserveView.as_view(), name='reserve_list'),
  path('reserve/<int:id>', ReserveView.as_view(), name='reserve_process'),
"""