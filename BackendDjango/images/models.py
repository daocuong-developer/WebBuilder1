from django.db import models

class Image(models.Model):
    title = models.CharField(max_length=255, blank=True)
    # Thay đổi từ ImageField sang FileField
    image = models.FileField(upload_to='images/') 
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title if self.title else self.image.name