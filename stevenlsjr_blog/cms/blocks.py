from rest_framework import serializers

from wagtail.core import blocks
from wagtail.core.templatetags.wagtailcore_tags import richtext
from wagtail.images.blocks import ImageChooserBlock


class RichTextBlock(blocks.RichTextBlock):
    """Richtext with all the features."""

    def get_api_representation(self, value, context=None):
        return richtext(value.source)

    class Meta:  # noqa
        # template = "streams/richtext_block.html"
        icon = "doc-full"