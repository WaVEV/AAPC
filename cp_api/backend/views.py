import types
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework
from django.shortcuts import render
from rest_framework import viewsets
from django.db.models.base import ModelBase
from rest_framework import filters
import django_filters

from .serializers import (
    GeneralSerializer,
    SponsorEditionTierSerializer,
    LessonSerializer,
    ContestSerializer,
    StaffSerializer)
from . import models


class GeneralViewSet(viewsets.ReadOnlyModelViewSet):

    def get_queryset(self):
        return self.model.objects.all()

    def get_serializer_class(self):
        model = self.kwargs.get('model')
        GeneralSerializer.Meta.model = self.model
        return GeneralSerializer


class Languages(GeneralViewSet):
    model = models.Language


class Editions(GeneralViewSet):
    model = models.Edition
    filter_backends = [filters.OrderingFilter, DjangoFilterBackend]


class News(GeneralViewSet):
    model = models.News
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['edition']


class Sponsor(GeneralViewSet):
    model = models.Sponsor
    filterset_fields = ['edition']


class Subjects(GeneralViewSet):
    model = models.Subject


class EditionFilter(django_filters.FilterSet):
    editions = django_filters.NumberFilter(
        field_name='editions__id',
        lookup_type='contains',
    )

    class Meta:
        model = models.Staff
        fields = ('editions', 'is_speaker')


class Staffs(GeneralViewSet):
    model = models.Staff
    filterset_fields = ['editions', 'is_speaker']
    # filter_class = EditionFilter

    def get_serializer_class(self):
        return StaffSerializer


class Lessons(GeneralViewSet):
    model = models.Lesson
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['edition']

    def get_serializer_class(self):
        return LessonSerializer


class Contests(GeneralViewSet):
    model = models.Contest
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['edition']

    def get_serializer_class(self):
        model = self.kwargs.get('model')
        ContestSerializer.Meta.model = self.model
        return ContestSerializer

class SponsorEditionTier(GeneralViewSet):
    model = models.SponsorEditionTier
    filterset_fields = ['edition']

    def get_serializer_class(self):
        model = self.kwargs.get('model')
        SponsorEditionTierSerializer.Meta.model = self.model
        return SponsorEditionTierSerializer


views = [
    ('languages', Languages),
    ('editions', Editions),
    ('news', News),
    ('sponsors', SponsorEditionTier),
    ('subjects', Subjects),
    ('staffs', Staffs),
    ('lessons', Lessons),
    ('contests', Contests),
]
