from django.db import models

# Create your models here.
class Detail(models.Model):
  company_name = models.CharField(max_length=100, primary_key=True)
  type = models.CharField(max_length=100)
  symbol = models.CharField(max_length=100)
  description = models.CharField(max_length=255)
  is_deleted = models.BooleanField(default=False, null=False)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now_add=True)

  def __str__(self) -> str:
      return self.symbol