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



app_models = apps.get_app_config('backend').get_models()
for model in app_models:
    if model in (models.CourseLevelName, models.CourseLevel, models.Summary,
                 models.SummaryLanguage, models.SubjectName, models.Subject):
        continue
    try:
        admin.site.register(model)
    except AlreadyRegistered:
        pass
