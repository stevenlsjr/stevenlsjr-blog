import django_filters
from wagtail.core.models import Page
from wagtail.core.query import PageQuerySet
from django.apps import apps


class PageTypeFilter(django_filters.CharFilter):
    """
    Filters wagtail pages by model type,
    using app_label.model_name format
    """
    def filter(self, qs: PageQuerySet, value: str):
        if not value or value == '':
            return qs
        try:
            app_label, model_name = tuple(value.split('.', 1))
            model = apps.get_model(app_label, model_name=model_name)
            return qs.type(model)

        except ValueError:
            raise django_filters.exceptions.FieldError(
                'value is not a model label', value)



class PageFilter(django_filters.FilterSet):
    page_type = PageTypeFilter()

    class Meta:
        model = Page
        fields = {
            'title': ['exact', 'icontains'],
            'seo_title': ['exact', 'icontains'],
            'slug': ['exact', 'icontains'],
            'first_published_at': ['exact', 'gt', 'gte', 'lte', 'lt'],
            'last_published_at': ['exact', 'gt', 'gte', 'lte', 'lt'],
            'path': ['exact', 'startswith'],
            'depth': ['exact', 'gt', 'gte', 'lt', 'lte'],
            'url_path': ['exact', "startswith"]
        }
