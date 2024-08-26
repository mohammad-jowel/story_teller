from django.db import models

# Create your models here.

class Story(models.Model):
    title = models.CharField(max_length=120)

    def serializer(self):
        return {
            "id" : self.id,
            "title": self.title,
        }

    def __str__(self):
        return self.title

class Paragraph(models.Model):
    text = models.TextField() 
    story = models. ForeignKey(Story, on_delete=models.CASCADE, related_name="paragraphs")

    def serializer(self):
        return {
            "id": self.id,
            "text": self.text
        }

    def __str__(self):
        return f"S: {self.story.title} T: {self.text[0:5]}"

class Option(models.Model):
    name = models.CharField(max_length=120)
    curr_paragraph = models.ForeignKey(Paragraph, on_delete=models.CASCADE, related_name="options")
    next_paragraph = models.ForeignKey(Paragraph, on_delete=models.CASCADE, related_name="next_options")

    def serializer(self):
        return {
            "id": self.id,
            "name": self.name,
            "next_paragraph_id": self.next_paragraph.id
        }


    def __str__(self):
        return self.name
