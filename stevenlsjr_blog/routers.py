from rest_framework import routers
from .auth import views as auth_views

api_v1 = routers.DefaultRouter()
api_v1.register(r'users', auth_views.UserViewSet, basename='user')

from wagtail.api.v2.views import PagesAPIViewSet
from wagtail.api.v2.router import WagtailAPIRouter
from wagtail.images.api.v2.views import ImagesAPIViewSet
from wagtail.documents.api.v2.views import DocumentsAPIViewSet

# Create the router. "wagtailapi" is the URL namespace
api_wagtail_v2 = WagtailAPIRouter('wagtailapi')

# Add the three endpoints using the "register_endpoint" method.
# The first parameter is the name of the endpoint (eg. pages, images). This
# is used in the URL of the endpoint
# The second parameter is the endpoint class that handles the requests
api_wagtail_v2.register_endpoint('pages', PagesAPIViewSet)
api_wagtail_v2.register_endpoint('images', ImagesAPIViewSet)
api_wagtail_v2.register_endpoint('documents', DocumentsAPIViewSet)