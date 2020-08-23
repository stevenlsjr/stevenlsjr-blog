from django.shortcuts import render
from rest_framework import viewsets
from .models import (User)
from .serializers import UserSerializer
# Create your views here.

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer

    queryset = User.objects.all()
    def get_queryset(self):
        if self.request.user.is_anonymous:
            return User.objects.none()
        else:
            return User.objects.filter(id=self.request.user.id)
