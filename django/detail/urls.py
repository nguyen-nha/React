from django.urls import path
from .views import *

urlpatterns = [
  path('detail/', DetailApiView.as_view(), name='company_detail')
]