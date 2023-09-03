from django.apps import apps
from django.contrib import admin
from django.contrib.admin.sites import AlreadyRegistered
from . import models


class CourseLevelNameInline(admin.TabularInline):
    model = models.CourseLevelName

    def get_max_num(self, request, obj=None, **kwargs):
        return models.Language.objects.count()


@admin.register(models.CourseLevel)
class CourseLevelAdmin(admin.ModelAdmin):
    inlines = [CourseLevelNameInline]


class SummaryLanguageInline(admin.TabularInline):
    model = models.SummaryLanguage

    def get_max_num(self, request, obj=None, **kwargs):
        return models.Language.objects.count()


@admin.register(models.Summary)
class SummaryAdmin(admin.ModelAdmin):
    inlines = [SummaryLanguageInline]


class SubjectNameInline(admin.TabularInline):
    model = models.SubjectName

    def get_max_num(self, request, obj=None, **kwargs):
        return models.Language.objects.count()


@admin.register(models.Subject)
class SubjectAdmin(admin.ModelAdmin):
    inlines = [SubjectNameInline]


class ScheduleDataLanguageInline(admin.TabularInline):
    model = models.ScheduleDataLanguage

    def get_max_num(self, request, obj=None, **kwargs):
        return models.Language.objects.count()


@admin.register(models.ScheduleData)
class ScheduleDataAdmin(admin.ModelAdmin):
    inlines = [ScheduleDataLanguageInline]


class ActivityMetadataInline(admin.TabularInline):
    model = models.ActivityMetadata

    def get_max_num(self, request, obj=None, **kwargs):
        return models.Language.objects.count()


@admin.register(models.Activity)
class ActivityAdmin(admin.ModelAdmin):
    inlines = [ActivityMetadataInline]


app_models = apps.get_app_config('backend').get_models()
for model in app_models:
    if model in (models.CourseLevelName, models.CourseLevel, models.Summary,
                 models.SummaryLanguage, models.SubjectName, models.Subject,
                 models.ScheduleDataLanguage, models.ActivityMetadata, admin.ModelAdmin):
        continue
    try:
        admin.site.register(model)
    except AlreadyRegistered:
        pass
