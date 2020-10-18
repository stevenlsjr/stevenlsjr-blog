"""stevenlsjr_blog URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path, re_path
from graphene_django.views import GraphQLView
from wagtail.admin import urls as wagtailadmin_urls
from wagtail.core import urls as base_wagtail_urls
from wagtail.images.views.serve import ServeView
from wagtail.documents import urls as wagtaildocs_urls
from .routers import api_v1, api_wagtail_v2
from django.views.decorators.csrf import csrf_exempt
from rest_framework_simplejwt.views import (TokenObtainPairView,
                                            TokenRefreshView, TokenVerifyView)

from grapple import urls as grapple_urls

wagtail_urls = [
    re_path(r'^cms/', include(wagtailadmin_urls)),
    re_path(r'^documents/', include(wagtaildocs_urls)),
    re_path(r'^pages/', include(base_wagtail_urls)),
]

urlpatterns = ([
    path('admin/', admin.site.urls),
    path('auth/', include('rest_framework.urls')),
    path('api/wagtail-v2/', api_wagtail_v2.urls),
    path('api/v1/', include(api_v1.urls)),
    path('api/v1/token/',
         TokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('api/v1/token/refresh/',
         TokenRefreshView.as_view(),
         name='token_refresh'),
    path('api/v1/token/verify/',
         TokenVerifyView.as_view(),
         name='token_verify'),
    re_path(r"", include(grapple_urls)),
    re_path(r'^images/([^/]*)/(\d*)/([^/]*)/[^/]*$',
            ServeView.as_view(),
            name='wagtailimages_serve'),
] + wagtail_urls +
               static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT))
