from .base import BaseConfig
from configurations import values

class Develop(BaseConfig):
    DEBUG=values.BooleanValue(True)