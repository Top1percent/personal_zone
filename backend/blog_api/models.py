from django.db import models
import django.utils.timezone as timezone
from django.contrib.auth.models import User  # 导入django自带的用户模型
from django.utils.html import mark_safe  # 将字符串标记为安全进行输出
from markdown import markdown  # 导入 markdown 插件,将markdown格式转化为html

# Create your models here.
from django.db import models


"""
 该类是用来生成数据库的 必须要继承models.Model
"""
class Article(models.Model):
    """
    创建如下几个表的字段
    """
    # 文章号 primary_key=True: 该字段为主键
    article_id = models.AutoField('文章号', primary_key=True)
    # 标题 字符串 最大长度50
    title = models.CharField('标题', max_length=50)
    # 作者
    author = models.CharField('作者', max_length=20)
    # 发布时间 default=timezone.now 设置时间默认为当前时间，可读可写
    add_time = models.DateTimeField('发布时间',default=timezone.now)
    # 最后修改时间 auto_now=True 只读 值设置为当前时间，并且每次修改model，都会自动更新
    mod_time = models.DateTimeField('最后修改时间', auto_now=True)
    # 赞同数 
    article_like = models.IntegerField('赞同数')
    
    content = models.TextField(max_length=10000)
    # 标题栏图片
    #title_bg_img = models.ImageField('标题背景图', upload_to = user_directory_path, blank = True, null = True)
    # 指定表名 不指定默认APP名字——类名(app_demo_Student)

    def get_article_text_md(self):
        return mark_safe(markdown(self.content))

    def __str__(self):
        return self.content
    class Meta:
        db_table = 'article'


"""
学生社团信息表
"""
class Tag(models.Model):
    # 标签id
    tag_id = models.PositiveSmallIntegerField()
    tag_name = models.CharField(max_length=50)

    class Meta:
        db_table = 'tag'


class Article_Tag(models.Model):
    id = models.AutoField(primary_key=True)
    article_id = models.SmallIntegerField()
    tag_id = models.PositiveSmallIntegerField()

    class Meta:
        db_table = 'article_tag'


"""
OneToOneField： 一对一
ForeignKey: 一对多
ManyToManyField： 多对多(没有ondelete 属性)
"""