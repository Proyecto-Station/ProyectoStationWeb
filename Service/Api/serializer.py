from django.contrib.auth.hashers import make_password, check_password
from rest_framework import serializers
from .models import Username

class UsernameSerializer(serializers.ModelSerializer):
  class Meta:
    model = Username
    fields = '__all__'
  
  def create(self, validated_data):
    hashPass = Username(**validated_data)
    hashPass.password = validated_data.get('password')
    hashPass.save()
    
    return hashPass
  
  def update(self, instance, validated_data):
    instance.password = validated_data.get('password')
    instance.save()
    
    return instance
