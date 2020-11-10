from django.contrib import admin
from .models import Article,Article_Tag,Tag
# Register your models here.

admin.site.register(Article)
admin.site.register(Article_Tag)
admin.site.register(Tag)