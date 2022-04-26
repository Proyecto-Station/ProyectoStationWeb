from ast import Delete
import json
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from .models import Bussed, Companie, Destination, Driver, Origen, Platform, Schedule, Username, Customer, Reserve

class UsernameView(View):

  @method_decorator(csrf_exempt)
  def dispatch(self, request, *args, **kwargs):
    return super().dispatch(request, *args, **kwargs)
  
  def get(self, request, id = 0):
    if id > 0:
      usernames = list(Username.objects.filter(id=id).values())

      if len(usernames) > 0:
        user = usernames[0]

        data = {
          'message': 'Success',
          'Username': user,
        }
      else:
        data = {
          'message': 'Username not found...',
        }
      return JsonResponse(data)
    else:
      usernames = list(Username.objects.values())

      if len(usernames) > 0:
        data = {
          'message': 'Success',
          'Username': usernames,
        }
      else:
        data = {
          'message': 'Username not found...',
        }
      return JsonResponse(data)
  
  def post(self, request):
    jd = json.load(request.body)
    Username.objects.create(
      name = jd['name'],
      last_name = jd['last_name'],
      rut = jd['rut'],
      email = jd['email'],
      password = jd['password'],
      permission = jd['permission'],
      session = 0
    )

    data = {
      'message': 'Success',
    }

    return JsonResponse(data)
  
  def put(self, request, id):
    jd = json.load(request.body)
    usernames = list(Username.objects.filter(id=id).values())

    if len(usernames) > 0:
      usernames = Username.objects.get(id=id)
      usernames.name = jd['name']
      usernames.last_name = jd['last_name']
      usernames.rut = jd['rut']
      usernames.email = jd['email']
      usernames.password = jd['password']
      usernames.permission = jd['permission']
      usernames.session = jd['session']
      usernames.save()

      data = {
        'message': 'Success',
      }
    else:
      data = {
        'message': 'Username not found...',
      }
    return JsonResponse(data)
  
  def delete(self, request, id):
    
    pass