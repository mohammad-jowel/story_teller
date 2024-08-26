from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Story, Paragraph, Option

# Create your views here.

@api_view(["GET"])
def index(request):
    stories = Story.objects.all().reverse()
    stories_list = [story_serializer(story) for story in stories]
    return Response(stories_list, status=status.HTTP_200_OK)


@api_view(["GET"])
def get_paragraph(request, id):
    para = Paragraph.objects.get(pk=id)
    options = para.options.all()
    serialized_options = [option.serializer() for option in options]
    curr_para = {
        "id": para.id,
        "text": para.text,
        "options": serialized_options
    }
    return Response(curr_para, status=status.HTTP_200_OK)

@api_view(["GET"])
def get_story(request, id):
    story = Story.objects.get(pk=id)
    return Response(story_serializer(story), status=status.HTTP_200_OK)

@api_view(["Post"])
def write_story(request):
    title = request.data['title']
    first_para = request.data['paragraph']
    s = Story(title=title)
    p = Paragraph(text=first_para, story=s)
    s.save()
    p.save()
    return Response(story_serializer(s), status=status.HTTP_201_CREATED)

@api_view(["POST"])
def add_option(request):
    prev_para_id = request.data['prev_para_id']
    prev_para = Paragraph.objects.get(pk=prev_para_id)
    next_para = Paragraph(text=request.data['text'], story = prev_para.story)
    option = Option(
        name = request.data['name'],
        curr_paragraph =  prev_para,
        next_paragraph = next_para
    )
    next_para.save() 
    option.save()
    option = option.serializer()
    option["text"] = request.data['text']
    return Response(option, status=status.HTTP_201_CREATED)

def story_serializer(story):
    serialized_story = story.serializer()
    first_para = story.paragraphs.first().serializer()
    serialized_story["first_para"] = first_para
    return serialized_story