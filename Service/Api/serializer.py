from django.contrib.auth.hashers import make_password, check_password
from rest_framework import serializers
from .models import Username

class UsernameSerializer(serializers.ModelSerializer):
  class Meta:
    model = Username
    fields = '__all__'
  
  def create(self, validated_data):
    new_user = Username(**validated_data)
    new_user.password = make_password(validated_data.get('password'))
    new_user.save()
    
    return new_user
    