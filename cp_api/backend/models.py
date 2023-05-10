"""Django app models"""
from django.db import models


class TimeStampMixin(models.Model):
    """Base class for timestamps"""

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        """Meta"""

        abstract = True


class Language(TimeStampMixin):
    """Languages"""

    name = models.CharField(max_length=128)
    code = models.CharField(max_length=3)

    def __str__(self):
        """Str method"""

        return self.name


class Edition(TimeStampMixin):
    """Edition"""

    year = models.IntegerField(null=False)

    def __str__(self):
        return f'Edition {self.year}'


class News(TimeStampMixin):
    """News, it wasn't implemented in the page"""

    title = models.CharField(max_length=128)
    body = models.TextField()
    edition = models.ForeignKey(Edition, null=False, on_delete=models.CASCADE)
    language = models.ForeignKey(Language, editable=True, on_delete=models.CASCADE, null=False)

    def __str__(self):
        return f'News {self.title} ({self.language.name})'


class SponsorTier(TimeStampMixin):
    """Different tiers for sponsors"""

    priority = models.IntegerField(null=False)
    name = models.CharField(max_length=128)


    def __str__(self):
        return f'{self.name} ({self.priority})'


class Sponsor(TimeStampMixin):
    """Sponsor models"""

    name = models.CharField(max_length=128)
    logo = models.FileField(upload_to='sponsors-logos/', blank=False)
    link = models.URLField(max_length=128, null=True)

    def __str__(self):
        return f'{self.name}'


class SponsorEditionTier(TimeStampMixin):
    """Relation between edition, sponsors, and tier"""

    edition = models.ForeignKey(Edition, editable=True, null=False,
                                on_delete=models.CASCADE)
    tier = models.ForeignKey(SponsorTier, editable=True,
                             on_delete=models.CASCADE)
    sponsor = models.ForeignKey(Sponsor, editable=True,
                                on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.sponsor.name} {self.tier.name} {self.edition.year}'


class Subject(TimeStampMixin):
    """Abstract lesson class"""

    def __str__(self):
        return f'{self.id}:' + ', '.join(map(lambda x: x.name, self.name.all()))


class SubjectName(models.Model):
    """Lesson name"""

    name = models.CharField(max_length=128)
    subject = models.ForeignKey(Subject, editable=True, related_name='name',
                                on_delete=models.CASCADE, null=False)
    language = models.ForeignKey(Language, editable=True,
                                 on_delete=models.CASCADE, null=False)

    def __str__(self):
        return f'{self.name} ({self.language.name})'


class Summary(models.Model):
    """Abstract summary related to a staff"""

    def __str__(self):
        return f'{self.id} {str(self.staff)}'


class SummaryLanguage(models.Model):
    """Summary text of an staff"""

    summary_text = models.TextField(blank=True, null=True)
    summary = models.ForeignKey(Summary, editable=True, related_name='text',
                                on_delete=models.CASCADE, null=False)
    language = models.ForeignKey(Language, editable=True,
                                 on_delete=models.CASCADE, null=False)


class Staff(TimeStampMixin):
    """Staff"""

    name = models.CharField(max_length=128)
    surname = models.CharField(max_length=128)
    email = models.EmailField(null=True, blank=True)
    summary = models.ForeignKey(Summary, editable=True, related_name='staff',
                                on_delete=models.SET_NULL, null=True, blank=True)
    picture = models.FileField(upload_to='staff-picture/', blank=True)
    editions = models.ManyToManyField(Edition, blank=True, editable=True)
    is_speaker = models.BooleanField(null=False, default=True)
    is_organizer = models.BooleanField(null=False, default=True)

    def __str__(self):
        return f'{self.name} {self.surname}'


class CourseLevel(models.Model):
    """Course level"""

    level = models.IntegerField()

    def __str__(self):
        return ', '.join(map(lambda x: x.name, self.name.all()))


class CourseLevelName(models.Model):
    """Curse level name"""

    name = models.CharField(max_length=128)
    course_level = models.ForeignKey(CourseLevel, editable=True,
                                     related_name='name',
                                     on_delete=models.CASCADE, null=False)
    language = models.ForeignKey(Language, editable=True,
                                 on_delete=models.CASCADE, null=False)

    def __str__(self):
        return f'{self.name} ({self.language.name})'


class Lesson(TimeStampMixin):
    """Lesson"""

    date = models.DateField()
    edition = models.ForeignKey(Edition, editable=True,
                                on_delete=models.CASCADE, null=False)
    subjects = models.ManyToManyField(Subject, editable=True, blank=True)
    speakers = models.ManyToManyField(Staff, editable=True, blank=True)
    level = models.ForeignKey(CourseLevel, editable=True,
                              on_delete=models.CASCADE, null=False)
    attachment = models.FileField(upload_to='attachment/', blank=True)
    video = models.CharField(max_length=128, null=True, blank=True)

    def __str__(self):
        subjects = ", ".join(map(str, self.subjects.all()))
        speakers = ", ".join(map(str, self.speakers.all()))
        return f'{self.date.strftime("%m/%d/%Y")} | {subjects} | {speakers}'


class Contest(TimeStampMixin):
    """Contest, not implemented in the page"""

    date = models.DateField()
    name = models.CharField(null=True, max_length=128, blank=True)
    edition = models.ForeignKey(Edition, editable=True,
                                on_delete=models.CASCADE, null=False)
    link = models.CharField(max_length=256)
    level = models.ForeignKey(CourseLevel, editable=True,
                              on_delete=models.CASCADE, null=False)

    def __str__(self):
        return f'Contest {str(self.date)} ({str(self.level)})'
