from django.shortcuts import render
from rest_framework import serializers
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import DetailSerializer
from .models import Detail

# Create your views here.
class DetailApiView(APIView):
  permission_classes = [AllowAny]
  serializer_class = DetailSerializer

  def get(self, request):
    detail = Detail.objects.filter(is_deleted=False)

    keyword = self.request.query_params.get('keyword')
    if keyword is not None:
      detail = detail.filter(symbol__icontains=keyword)
    else:
      detail = []

    serializer = DetailSerializer(detail, many=True)

    if serializer is not None:
      return Response(serializer.data)
    
    return Response(serializer.error, status=status.HTTP_400_BADREQUEST)