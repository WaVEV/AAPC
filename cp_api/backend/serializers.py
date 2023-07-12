from rest_framework import serializers
from . import models


class GeneralSerializer(serializers.ModelSerializer):

    class Meta:
        model = None
        fields = '__all__'


class SponsorSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Sponsor
        fields = '__all__'


class TierSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.SponsorTier
        fields = '__all__'


class EditionSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Edition
        fields = '__all__'


class SponsorEditionTierSerializer(GeneralSerializer):
    sponsor = SponsorSerializer(many=False, read_only=True)
    tier = TierSerializer(many=False, read_only=True)
    editions = EditionSerializer(many=False, read_only=True)

    class Meta:
        model = models.SponsorEditionTier
        fields = '__all__'


class LanguageSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Language
        fields = ['id', 'name', 'code']


class SummaryLanguageSerializer(serializers.ModelSerializer):
    language = LanguageSerializer(many=False, read_only=True)

    class Meta:
        model = models.SummaryLanguage
        fields = '__all__'


class SummarySerializer(serializers.ModelSerializer):
    text = SummaryLanguageSerializer(many=True, read_only=True)

    class Meta:
        model = models.Summary
        fields = '__all__'


class StaffSerializer(serializers.ModelSerializer):
    summary = SummarySerializer(many=False, read_only=True)

    class Meta:
        model = models.Staff
        fields = ['id', 'summary', 'name', 'surname', 'email', 'picture', 'is_speaker', 'is_organizer']


class SubjectNameSerializer(serializers.ModelSerializer):
    language = LanguageSerializer(many=False, read_only=True)

    class Meta:
        model = models.SubjectName
        fields = ['id', 'name', 'language']


class SubjectSerializer(serializers.ModelSerializer):
    name = SubjectNameSerializer(many=True, read_only=True)

    class Meta:
        model = models.Subject
        fields = '__all__'


class CourseLevelNameSerializer(serializers.ModelSerializer):
    language = LanguageSerializer(many=False, read_only=True)

    class Meta:
        model = models.SubjectName
        fields = ['id', 'name', 'language']


class LevelSerializer(serializers.ModelSerializer):
    name = CourseLevelNameSerializer(many=True, read_only=True)

    class Meta:
        model = models.CourseLevel
        fields = '__all__'


class LessonSerializer(GeneralSerializer):
    speakers = StaffSerializer(many=True, read_only=True)
    subjects = SubjectSerializer(many=True, read_only=True)
    level = LevelSerializer(many=False, read_only=True)

    class Meta:
        model = models.Lesson
        fields = '__all__'


class ContestSerializer(GeneralSerializer):
    level = LevelSerializer(many=False, read_only=True)

    class Meta:
        model = models.Contest
        fields = '__all__'


class ActivityMetadataSerializer(GeneralSerializer):
    class Meta:
        model = models.ActivityMetadata
        # fields = '__all__'
        exclude = ('created_at', 'updated_at', 'id')


class ActivitySerializer(GeneralSerializer):
    detail = serializers.SerializerMethodField()

    class Meta:
        model = models.Activity
        # fields = '__all__'
        exclude = ('created_at', 'updated_at', 'schedule', 'id')

    def get_detail(self, obj):
        language = self.context.get('language', None)
        data = obj.metadata.all()
        if language:
            data = data.filter(language__code=language)
        return ActivityMetadataSerializer(data, many=True).data


class ScheduleDataLanguageSerializer(GeneralSerializer):
    # language = LanguageSerializer(many=False, read_only=True)

    class Meta:
        model = models.ScheduleDataLanguage
        fields = ("description", "title", "language")


class ScheduleDataSerializer(GeneralSerializer):
    # datas = ScheduleDataLanguageSerializer(many=True)
    metadata = serializers.SerializerMethodField()

    class Meta:
        model = models.ScheduleData
        fields = '__all__'
        # exclude = ('created_at', 'updated_at')

    def get_metadata(self, obj):
        language = self.context.get('language', None)
        data = obj.datas.all()
        if language:
            data = data.filter(language__code=language)
        return ScheduleDataLanguageSerializer(data, many=True).data


class ScheduleSerializer(GeneralSerializer):
    activities = ActivitySerializer(many=True)
    # data = ScheduleDataSerializer(many=False, read_only=True)
    metadata = serializers.SerializerMethodField()

    class Meta:
        model = models.Schedule
        # fields = '__all__'
        exclude = ('created_at', 'updated_at', 'id')

    def get_metadata(self, obj):
        language = self.context.get('language', None)
        if not obj.data:
            return []
        data = obj.data.datas
        if language:
            data = data.filter(language__code=language)
        return ScheduleDataLanguageSerializer(data, many=True).data
