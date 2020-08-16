import graphene
from graphene import ObjectType, relay
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField

from stevenlsjr_blog.cms.models import BlogIndexPage, BlogPage


class BlogPageNode(DjangoObjectType):
    class Meta:
        model = BlogPage
        only_fields = ['id', 'title', 'slug', 'date', 'intro', 'body', 'path', 'depth']
        filter_fields=['id', 'title', 'slug', 'intro', 'path', 'depth']
        interfaces = (relay.Node, )

    def get_queryset(cls, queryset, info):
        return queryset.filter(live=True)

class Query(graphene.ObjectType):
    blog_pages = relay.Node.Field(BlogPageNode)
    all_blog_pages = DjangoFilterConnectionField(BlogPageNode)



schema = graphene.Schema(query=Query)
