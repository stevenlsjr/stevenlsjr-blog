import graphene
from graphene_django import DjangoObjectType
from stevenlsjr_blog.cms.models import BlogPage, BlogIndexPage

class ArticleType(DjangoObjectType):
    class Meta:
        model = BlogPage
        only_fields = ['id', 'title', 'date', 'intro', 'body']


class Query(graphene.ObjectType):
    blog_pages = graphene.List(ArticleType)

    @graphene.resolve_only_args
    def resolve_blog_pages(self):
        return BlogPage.objects.live()

schema = graphene.Schema(query=Query)
