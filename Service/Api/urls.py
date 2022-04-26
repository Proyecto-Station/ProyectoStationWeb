from django.urls import path
from .views import UsernameView, CompanieView

urlpatterns = [
  path('username/', UsernameView.as_view(), name='companies_list'),
  path('username/<int:id>', UsernameView.as_view(), name='companies_process'),

  path('companie/', CompanieView.as_view(), name='companies_list'),
  path('companie/<int:id>', CompanieView.as_view(), name='companies_process'),
]