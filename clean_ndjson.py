import sys, json, re, spacy

nlp = spacy.load("en_core_web_sm", disable=["tagger","parser","lemmatizer","attribute_ruler"])
TAG = {
    "PERSON":"[PERSON]", "ORG":"[ORG]", "GPE":"[LOCATION]",
    "LOC":"[LOCATION]", "PRODUCT":"[PRODUCT]", "WORK_OF_ART":"[TITLE]",
    "FAC":"[LOCATION]", "NORP":"[GROUP]"
}

url_re    = re.compile(r'https?://\S+', re.I)
email_re  = re.compile(r'\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b', re.I)
handle_re = re.compile(r'(^|\s)@[\w.\-]+', re.I)
# hash_re   = re.compile(r'(^|\s)#[\w\-\_]+', re.I)

def redact(text: str) -> str:
    t = url_re.sub("[LINK]", text)
    t = email_re.sub("[EMAIL]", t)
    t = handle_re.sub(" [HANDLE]", t)
    # t = hash_re.sub(" [HASHTAG]", t)

    doc = nlp(t)
    out = t
    for ent in reversed(doc.ents):
        repl = TAG.get(ent.label_, "[ENTITY]")
        out  = out[:ent.start_char] + repl + out[ent.end_char:]
    return re.sub(r'\s{2,}', ' ', out).strip()

for line in sys.stdin:
    obj = json.loads(line)
    if "text" in obj and isinstance(obj["text"], str):
        obj["text"] = redact(obj["text"])
    print(json.dumps(obj, ensure_ascii=False))