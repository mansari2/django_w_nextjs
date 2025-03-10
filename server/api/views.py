from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import re
from collections import Counter
import json

@csrf_exempt
def health_check(request):
    return JsonResponse({"message": "pong"})

@csrf_exempt
def document_analysis(request):
    data = json.loads(request.body)
    text_body = data['text_body']
    keyword_macros = data['keyword_macros']
    analysis_type = data['analysis_type']

    if analysis_type != 'top_words':
        return JsonResponse({"error": "Unsupported analysis type"}, status=400)

    # Define filler words to exclude
    filler_words = {"and", "the", "or", "a", "of"}

    # Tokenize the text body and filter out filler words and symbols
    words = re.findall(r'\b\w+\b', text_body.lower())
    filtered_words = [word for word in words if word not in filler_words]

    # Split text body into sentences
    sentences = text_body.split('.')

    result = []
    for macro in keyword_macros:
        keywords = re.split(r'[-+]', macro)
        include_keywords = [kw for kw in keywords if not kw.startswith('-')]
        exclude_keywords = [kw[1:] for kw in keywords if kw.startswith('-')]

        # Filter sentences based on include and exclude keywords
        matching_sentences = [
            sentence for sentence in sentences
            if all(kw in sentence.lower() for kw in include_keywords) and not any(kw in sentence.lower() for kw in exclude_keywords)
        ]
        matching_words = re.findall(r'\b\w+\b', ' '.join(matching_sentences).lower())
        filtered_matching_words = [word for word in matching_words if word not in filler_words and word not in include_keywords]

        # using counter to simplify dict building
        word_counter = Counter(filtered_matching_words)

        #sorted words with a custom tie-breaker: descending frequency and then descending alphabetical order
        sorted_words = sorted(word_counter.items(), key=lambda item: (item[1], item[0]), reverse=True)
        top_words = [word for word, _ in sorted_words[:3]]


        result.append({
            "keyword_macro": macro,
            "analysis_type": "top_words",
            "value": top_words
        })

    return JsonResponse(result, safe=False)
