import graphene
from django.apps import apps
from graphene import ObjectType, relay
from graphene_django import DjangoObjectType, DjangoListField
from graphene_django.filter import DjangoFilterConnectionField

from stevenlsjr_blog.cms.models import BlogIndexPage, BlogPage
from stevenlsjr_blog.cms.filters import PageFilter
from . import wagtail

Page = apps.get_model('wagtailcore', 'Page')

from graphql.execution.base import ResolveInfo


class WagtailPageNode(DjangoObjectType):

    class Meta:
        model = Page
        fields = [
            'id', 'title', 'seo_title', 'blogpage', 'slug',
            'live', 'first_published_at', 'last_published_at', 'children',
            'url_path'
        ]
        filterset_class = PageFilter
        interfaces = (relay.Node, )

    children = graphene.ConnectionField(lambda *x: PageConnection)
    page_type = graphene.String()
    def resolve_page_type(self, info: ResolveInfo):
        return self.cached_content_type.model_class()._meta.label

    def resolve_children(self, info: ResolveInfo):
        query = Page.objects.child_of(self)
        return query.live().order_by('path').all()

    @classmethod
    def get_queryset(cls, queryset, info):
        return queryset.filter(live=True)


class PageConnection(relay.Connection):
    class Meta:
        node = WagtailPageNode

    class Edge:
        pass


class BlogPageNode(DjangoObjectType):
    class Meta:
        model = BlogPage
        fields = ['id', 'title', 'slug', 'intro', 'page_ptr']
        filter_fields = {
            'id': ['exact'],
            'title': ['exact'],
            'slug': ['exact'],
            'intro': ['exact'],
            'page_ptr': ['exact']
        }
        interfaces = (relay.Node, )

    @classmethod
    def get_queryset(cls, queryset, info):
        return queryset.filter(live=True)


class IndexPageNode(DjangoObjectType):
    class Meta:
        model = BlogIndexPage
        fields = ['id', 'title', 'slug', 'intro', 'page_ptr']
        filter_fields = {
            'id': ['exact'],
            'title': ['exact'],
            'slug': ['exact'],
            'intro': ['exact'],
            'page_ptr': ['exact']
        }
        interfaces = (relay.Node, )

    @classmethod
    def get_queryset(cls, queryset, info):
        return queryset.filter(live=True)


class Query(graphene.ObjectType):
    blog_pages = relay.Node.Field(BlogPageNode)
    all_blog_pages = DjangoFilterConnectionField(BlogPageNode)

    index_pages = relay.Node.Field(IndexPageNode)
    all_index_pages = DjangoFilterConnectionField(IndexPageNode)

    pages = relay.Node.Field(WagtailPageNode)
    all_pages = DjangoFilterConnectionField(WagtailPageNode)


schema = graphene.Schema(query=Query)
