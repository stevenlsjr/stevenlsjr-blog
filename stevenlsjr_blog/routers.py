from rest_framework import routers
from .auth import views as auth_views

api_v1 = routers.DefaultRouter()
api_v1.register(r'users', auth_views.UserViewSet, basename='user')