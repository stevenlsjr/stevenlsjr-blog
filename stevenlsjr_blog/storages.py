from storages.backends.azure_storage import AzureStorage
from django.conf import settings

class PublicAzureStorage(AzureStorage):
    azure_container = getattr(settings, 'PUBLIC_AZURE_CONTAINER',)
    expiration_secs = None

class PrivateAzureStorage(AzureStorage):
    pass