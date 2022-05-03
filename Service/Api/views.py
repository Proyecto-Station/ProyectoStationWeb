from datetime import date
import json
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from .models import Username, Companie, Driver, CoDriver, Bussed, Platform, Origen, Destination, Schedule, Reserve

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
    usernames = list(Username.objects.filter(id=id).values())

    if len(usernames) > 0:
      Username.objects.filter(id=id).delete()
    else:
      data = {
        'message': 'Success',
      }
    return JsonResponse(data)

class CompanieView(View):
  @method_decorator(csrf_exempt)
  def dispatch(self, request, *args, **kwargs):
    return super().dispatch(request, *args, **kwargs)

  def get(self, request, id = 0):
    if id > 0:
      company = list(Companie.objects.filter(id=id).values())

      if len(company) > 0:
        companies = company[0]

        data = {
          'message': 'Success',
          'Companie': companies,
        }
      else:
        data = {
          'message': 'Companie not found...',
        }
      return JsonResponse(data)
    else:
      company = list(Companie.objects.values())

      if len(company) > 0:
        data = {
          'message': 'Success',
          'Companie': company,
        }
      else:
        data = {
          'message': 'Companie not found...',
        }
      return JsonResponse(data)

  def post(self, request):
    jd = json.load(request.body)

    Companie.objects.create(
      name = jd['name'],
      rut = jd['rut'],
      email = jd['email'],
      phone = jd['phone'],
      address = jd['address'],
      status = jd['status'],
      date_init = date.today
    )

    data = {
      'message': 'Success',
    }

    return JsonResponse(data)

  def put(self, request, id):
    jd = json.load(request.body)
    company = list(Companie.objects.filter(id=id).values())

    if len(company) > 0:
      company = Companie.objects.get(id=id)
      company.name = jd['name']
      company.rut = jd['rut']
      company.email = jd['email']
      company.phone = jd['phone']
      company.address = jd['address']
      company.status = jd['status']
      company.date_init = jd['date_init']
      company.save()

      data = {
        'message': 'Success',
      }
    else:
      data = {
        'message': 'Companie not found...',
      }
    return JsonResponse(data)

  def delete(self, request, id):
    comapany = list(Companie.objects.filter(id=id).values())

    if len(comapany) > 0:
      Companie.objects.filter(id=id).delete()
    else:
      data = {
        'message': 'Success',
      }
    return JsonResponse(data)

class DriverView(View):
  @method_decorator(csrf_exempt)
  def dispatch(self, request, *args, **kwargs):
    return super().dispatch(request, *args, **kwargs)
  
  def get(self, request, id = 0):
    if id > 0:
      drivers = list(Driver.objects.filter(id=id).values())

      if len(drivers) > 0:
        driver = drivers[0]

        data = {
          'message': 'Success',
          'Driver': driver,
        }
      else:
        data = {
          'message': 'Driver not found...',
        }
      return JsonResponse(data)
    else:
      drivers = list(Driver.objects.values())

      if len(drivers) > 0:
        data = {
          'message': 'Success',
          'Driver': drivers,
        }
      else:
        data = {
          'message': 'Driver not found...',
        }
      return JsonResponse(data)
  
  def post(self, request):
    jd = json.load(request.body)

    Driver.objects.create(
      name = jd['name'],
      last_name = jd['last_name'],
      rut = jd['rut'],
      email = jd['email'],
      phone = jd['phone'],
      company = jd['company'],
      date_init = jd['date_init'],
      age_job = jd['age_job']
    )

    data = {
      'message': 'Success',
    }

    return JsonResponse(data)

  def put(self, request, id):
    jd = json.load(request.body)
    driver = list(Driver.objects.filter(id=id).values())

    if len(driver) > 0:
      driver = Driver.objects.get(id=id)
      driver.name = jd['name']
      driver.last_name = jd['last_name']
      driver.rut = jd['rut']
      driver.email = jd['email']
      driver.phone = jd['phone']
      driver.company = jd['company']
      driver.date_init = jd['date_init']
      driver.age_job = jd['age_job']
      driver.save()

      data = {
        'message': 'Success',
      }
    else:
      data = {
        'message': 'Driver not found...',
      }
    return JsonResponse(data)
  
  def delete(self, request, id):
    driver = list(Driver.objects.filter(id=id).values())

    if len(driver) > 0:
      Driver.objects.filter(id=id).delete()
    else:
      data = {
        'message': 'Success',
      }
    return JsonResponse(data)

class CoDriverView(View):
  @method_decorator(csrf_exempt)
  def dispatch(self, request, *args, **kwargs):
    return super().dispatch(request, *args, **kwargs)
  
  def get(self, request, id = 0):
    if id > 0:
      codrivers = list(CoDriver.objects.filter(id=id).values())

      if len(codrivers) > 0:
        codriver = codrivers[0]

        data = {
          'message': 'Success',
          'Driver': codriver,
        }
      else:
        data = {
          'message': 'Co-Driver not found...',
        }
      return JsonResponse(data)
    else:
      codrivers = list(CoDriver.objects.values())

      if len(codrivers) > 0:
        data = {
          'message': 'Success',
          'Driver': codrivers,
        }
      else:
        data = {
          'message': 'Co-Driver not found...',
        }
      return JsonResponse(data)
  
  def post(self, request):
    jd = json.load(request.body)

    CoDriver.objects.create(
      name = jd['name'],
      last_name = jd['last_name'],
      rut = jd['rut'],
      email = jd['email'],
      phone = jd['phone'],
      company = jd['company'],
      date_init = jd['date_init'],
      age_job = jd['age_job']
    )

    data = {
      'message': 'Success',
    }

    return JsonResponse(data)

  def put(self, request, id):
    jd = json.load(request.body)
    codriver = list(CoDriver.objects.filter(id=id).values())

    if len(codriver) > 0:
      codriver = CoDriver.objects.get(id=id)
      codriver.name = jd['name']
      codriver.last_name = jd['last_name']
      codriver.rut = jd['rut']
      codriver.email = jd['email']
      codriver.phone = jd['phone']
      codriver.company = jd['company']
      codriver.date_init = jd['date_init']
      codriver.age_job = jd['age_job']
      codriver.save()

      data = {
        'message': 'Success',
      }
    else:
      data = {
        'message': 'Co-Driver not found...',
      }
    return JsonResponse(data)
  
  def delete(self, request, id):
    codriver = list(CoDriver.objects.filter(id=id).values())

    if len(codriver) > 0:
      CoDriver.objects.filter(id=id).delete()
    else:
      data = {
        'message': 'Success',
      }
    return JsonResponse(data)

class BussedView(View):
  @method_decorator(csrf_exempt)
  def dispatch(self, request, *args, **kwargs):
    return super().dispatch(request, *args, **kwargs)
  
  def get(self, request, id = 0):
    if id > 0:
      busseds = list(Bussed.objects.filter(id=id).values())

      if len(busseds) > 0:
        bussed = busseds[0]

        data = {
          'message': 'Success',
          'Bussed': bussed,
        }
      else:
        data = {
          'message': 'Bus not found...',
        }
      return JsonResponse(data)
    else:
      busseds = list(CoDriver.objects.values())

      if len(busseds) > 0:
        data = {
          'message': 'Success',
          'Bussed': busseds,
        }
      else:
        data = {
          'message': 'Bus not found...',
        }
      return JsonResponse(data)
  
  def post(self, request):
    jd = json.load(request.body)

    Bussed.objects.create(
      plate = jd['plate'],
      driver = jd['driver'],
      co_driver = jd['co_driver'],
      company = jd['company'],
      passenger = jd['passenger'],
      security = jd['security']
    )

    data = {
      'message': 'Success',
    }

    return JsonResponse(data)

  def put(self, request, id):
    jd = json.load(request.body)
    busseds = list(Bussed.objects.filter(id=id).values())

    if len(busseds) > 0:
      busseds = Bussed.objects.get(id=id)
      busseds.plate = jd['plate']
      busseds.driver = jd['driver']
      busseds.co_driver = jd['co_driver']
      busseds.company = jd['company']
      busseds.passenger = jd['passenger']
      busseds.security = jd['security']
      busseds.save()

      data = {
        'message': 'Success',
      }
    else:
      data = {
        'message': 'Bus not found...',
      }
    return JsonResponse(data)
  
  def delete(self, request, id):
    busseds = list(Bussed.objects.filter(id=id).values())

    if len(busseds) > 0:
      Bussed.objects.filter(id=id).delete()
    else:
      data = {
        'message': 'Success',
      }
    return JsonResponse(data)

class PlatformView(View):
  @method_decorator(csrf_exempt)
  def dispatch(self, request, *args, **kwargs):
    return super().dispatch(request, *args, **kwargs)
  
  def get(self, request, id = 0):
    if id > 0:
      platforms = list(Platform.objects.filter(id=id).values())

      if len(platforms) > 0:
        platform = platforms[0]

        data = {
          'message': 'Success',
          'Platform': platform,
        }
      else:
        data = {
          'message': 'Platform not found...',
        }
      return JsonResponse(data)
    else:
      platforms = list(Platform.objects.values())

      if len(platforms) > 0:
        data = {
          'message': 'Success',
          'Platform': platforms,
        }
      else:
        data = {
          'message': 'Platform not found...',
        }
      return JsonResponse(data)
  
  def post(self, request):
    jd = json.load(request.body)

    Bussed.objects.create(
      name = jd['name'],
    )

    data = {
      'message': 'Success',
    }

    return JsonResponse(data)

  def put(self, request, id):
    jd = json.load(request.body)
    platforms = list(Platform.objects.filter(id=id).values())

    if len(platforms) > 0:
      platforms = Platform.objects.get(id=id)
      platforms.name = jd['name']
      platforms.save()

      data = {
        'message': 'Success',
      }
    else:
      data = {
        'message': 'Platform not found...',
      }
    return JsonResponse(data)
  
  def delete(self, request, id):
    platforms = list(Platform.objects.filter(id=id).values())

    if len(platforms) > 0:
      Platform.objects.filter(id=id).delete()
    else:
      data = {
        'message': 'Success',
      }
    return JsonResponse(data)

class OrigenView(View):
  @method_decorator(csrf_exempt)
  def dispatch(self, request, *args, **kwargs):
    return super().dispatch(request, *args, **kwargs)
  
  def get(self, request, id = 0):
    if id > 0:
      origens = list(Origen.objects.filter(id=id).values())

      if len(origens) > 0:
        origen = origens[0]

        data = {
          'message': 'Success',
          'Origen': origen,
        }
      else:
        data = {
          'message': 'Origen not found...',
        }
      return JsonResponse(data)
    else:
      platforms = list(Platform.objects.values())

      if len(platforms) > 0:
        data = {
          'message': 'Success',
          'Platform': platforms,
        }
      else:
        data = {
          'message': 'Platform not found...',
        }
      return JsonResponse(data)
  
  def post(self, request):
    jd = json.load(request.body)

    Origen.objects.create(
      name = jd['name'],
    )

    data = {
      'message': 'Success',
    }

    return JsonResponse(data)

  def put(self, request, id):
    jd = json.load(request.body)
    origens = list(Origen.objects.filter(id=id).values())

    if len(origens) > 0:
      origens = Origen.objects.get(id=id)
      origens.name = jd['name']
      origens.save()

      data = {
        'message': 'Success',
      }
    else:
      data = {
        'message': 'Origen not found...',
      }
    return JsonResponse(data)
  
  def delete(self, request, id):
    origens = list(Origen.objects.filter(id=id).values())

    if len(origens) > 0:
      Origen.objects.filter(id=id).delete()
    else:
      data = {
        'message': 'Success',
      }
    return JsonResponse(data)

class DestinationView(View):
  @method_decorator(csrf_exempt)
  def dispatch(self, request, *args, **kwargs):
    return super().dispatch(request, *args, **kwargs)
  
  def get(self, request, id = 0):
    if id > 0:
      destinations = list(Destination.objects.filter(id=id).values())

      if len(destinations) > 0:
        destination = destinations[0]

        data = {
          'message': 'Success',
          'Destination': destination,
        }
      else:
        data = {
          'message': 'Destination not found...',
        }
      return JsonResponse(data)
    else:
      destinations = list(Destination.objects.values())

      if len(destinations) > 0:
        data = {
          'message': 'Success',
          'Platform': destinations,
        }
      else:
        data = {
          'message': 'Destination not found...',
        }
      return JsonResponse(data)
  
  def post(self, request):
    jd = json.load(request.body)

    Destination.objects.create(
      name = jd['name'],
    )

    data = {
      'message': 'Success',
    }

    return JsonResponse(data)

  def put(self, request, id):
    jd = json.load(request.body)
    destinations = list(Destination.objects.filter(id=id).values())

    if len(destinations) > 0:
      destinations = Platform.objects.get(id=id)
      destinations.name = jd['name']
      destinations.save()

      data = {
        'message': 'Success',
      }
    else:
      data = {
        'message': 'Destination not found...',
      }
    return JsonResponse(data)
  
  def delete(self, request, id):
    destinations = list(Destination.objects.filter(id=id).values())

    if len(destinations) > 0:
      Destination.objects.filter(id=id).delete()
    else:
      data = {
        'message': 'Success',
      }
    return JsonResponse(data)

class ScheduleView(View):
  @method_decorator(csrf_exempt)
  def dispatch(self, request, *args, **kwargs):
    return super().dispatch(request, *args, **kwargs)
  
  def get(self, request, id = 0):
    pass
  
  def post(self, request):
    pass

  def put(self, request, id):
    pass
  
  def delete(self, request, id):
    pass

class ReserveView(View):
  @method_decorator(csrf_exempt)
  def dispatch(self, request, *args, **kwargs):
    return super().dispatch(request, *args, **kwargs)
  
  def get(self, request, id = 0):
    pass
  
  def post(self, request):
    pass

  def put(self, request, id):
    pass
  
  def delete(self, request, id):
    pass
