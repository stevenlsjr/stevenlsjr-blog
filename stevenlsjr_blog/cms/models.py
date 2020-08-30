from django.db import models
from wagtail.admin.edit_handlers import FieldPanel, StreamFieldPanel
from wagtail.api import APIField
from wagtail.core import blocks, fields
from wagtail.core.fields import RichTextField
from wagtail.images.fields import ImageField
# Create your models here.
from wagtail.core.models import Page
from wagtail.search import index
from .blocks import RichTextBlock


class BlogIndexPage(Page):
    intro = RichTextField(blank=True)

    content_panels = Page.content_panels + [
        FieldPanel('intro', classname="full")
    ]


DEFAULT_BLOCK_TYPES = [
    ('rich_text', RichTextBlock()),
    ('heading', blocks.CharBlock())
]




class BlogPage(Page):
    intro = models.CharField(max_length=250)
    body = fields.StreamField(DEFAULT_BLOCK_TYPES)

    api_fields = [
        APIField('intro'),
        APIField('body')
    ]

    search_fields = Page.search_fields + [
        index.SearchField('intro'),
        index.SearchField('body'),
    ]

    content_panels = Page.content_panels + [
        FieldPanel('intro'),
        StreamFieldPanel('body'),
    ]
