import graphene
from django.apps import apps
from graphene import ObjectType, relay
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField

from stevenlsjr_blog.cms.models import BlogIndexPage, BlogPage

Page = apps.get_model('wagtailcore', 'Page')

class WagtailPageNode(DjangoObjectType):
    class Meta:
        model = Page
        only_fields = [
            'id', 'title', 'slug',
            'content_type',
            'seo_title',
            'show_in_menus'
        ]
        filter_fields = {
            'id': ['exact'],
            'content_type': ['exact'],
            'title': ['exact', 'iexact', 'icontains', 'contains'],
            'slug': ['exact'],
            'show_in_menus': ['exact'],
        }
        interfaces = (relay.Node, )

    @classmethod
    def get_queryset(cls, queryset, info):
        return queryset.filter(live=True)

class BlogPageNode(DjangoObjectType):
    class Meta:
        model = BlogPage
        only_fields = [
            'id', 'title', 'slug', 'date', 'intro', 'body', 'path', 'depth'
        ]
        filter_fields = {
            'id': ['exact'],
            'title': ['exact'],
            'slug': ['exact'],
            'intro': ['exact'],
            'path': ['exact', 'iexact', 'istartswith'],
            'depth': ['exact', 'gt', 'gte']
        }
        interfaces = (relay.Node, )

    @classmethod
    def get_queryset(cls, queryset, info):
        return queryset.filter(live=True)


class Query(graphene.ObjectType):
    blog_pages = relay.Node.Field(BlogPageNode)
    all_blog_pages = DjangoFilterConnectionField(BlogPageNode)

    pages = relay.Node.Field(WagtailPageNode)
    all_pages = DjangoFilterConnectionField(WagtailPageNode)



schema = graphene.Schema(query=Query)
