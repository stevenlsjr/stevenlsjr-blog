import factory
from factory.django import DjangoModelFactory
from django.contrib.auth.models import User, Group
from stevenlsjr_blog.cms.models import *
from datetime import datetime
from faker import Faker
from django.template import Template, Context
from random import shuffle
from wagtail.core.models import Page

blog_body_template = Template("""{% for tag, content in body %}
<{{tag | safe}}>{{content}}</{{tag | safe}}>
{% endfor %}""")

fake = Faker()
class UserFactory(DjangoModelFactory):
    class Meta:
        model = User
        django_get_or_create = ('username',)
    
    username = factory.Faker('user_name')
    email = factory.Faker('email')
    first_name = factory.Faker('first_name')
    last_name = factory.Faker('last_name')


def fake_richtext():
    pragraphs = [('p', i) for i in fake.paragraphs(6)]
    headers = [('h2', i)  for i in fake.sentences(3)]
    body = pragraphs + headers
    shuffle(body)
    return blog_body_template.render(Context({'body': body}))


class BlogPageFactory(DjangoModelFactory):
    class Meta:
        model = BlogPage
        django_get_or_create = ('title',)
    title = factory.Faker('catch_phrase')
    date = factory.LazyFunction(datetime.utcnow)
    intro = factory.Faker('sentence')

    body = factory.LazyFunction(fake_richtext)
    
    @classmethod
    def _create(cls, model_class, *args, parent=None, **kwargs):
        if not parent:
            return Page.objects.get(title='Testing').add_child(instance=cls._build(model_class, *args, **kwargs))
        else:
            return parent.add_child(instance=cls._build(model_class, *args, **kwargs))
