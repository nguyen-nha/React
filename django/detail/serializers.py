from django.db.models import fields
from rest_framework import serializers
from .models import Detail

class DetailSerializer(serializers.ModelSerializer):
  
  class Meta:
    model = Detail
    fields = ['company_name', 'type', 'symbol', 'description']