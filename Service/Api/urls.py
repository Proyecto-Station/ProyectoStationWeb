from django.urls import path
from .views import UsernameView

urlpatterns = [
  path('username/', UsernameView.as_view(), name='companies_list'),
  path('username/<int:id>', UsernameView.as_view(), name='companies_process')
]