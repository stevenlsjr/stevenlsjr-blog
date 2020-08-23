from wagtail.core.fields import StreamField, StreamValue
from graphene.types import Scalar

from graphene_django.converter import convert_django_field


class GenericStreamFieldType(Scalar):
    @staticmethod
    def serialize(stream_value: StreamValue):
        block = stream_value.stream_block
        return block.get_api_representation(stream_value.stream_data)


@convert_django_field.register(StreamField)
def convert_stream_field(field: StreamField, registry=None):
    return GenericStreamFieldType(description=field.help_text,
                                  required=not field.null)
