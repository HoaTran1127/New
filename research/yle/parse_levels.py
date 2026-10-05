import json
import re

lines = open("yle-raw.txt", encoding="utf-8", errors="replace").read().split("\n")

POSS = {"n", "v", "adj", "adv", "det", "pron", "poss", "prep", "conj", "int", "excl", "dis", "modal"}
HEAD = re.compile(r"^(Pre A1 Starters|A1 Movers|A2 Flyers) A-Z wordlist$")
CODE = {"Pre A1 Starters": "ST", "A1 Movers": "MV", "A2 Flyers": "FY"}
FOOTER = re.compile(r"^(?:\x0c?\d+ ?)?(?:Pre A1 Starters|A1 Movers|A2 Flyers) A-Z wordlist(?: \d+)?$")
WORD_TOK = re.compile(r"^[A-Za-z][A-Za-z0-9'\-/\.]*$")
JUNK = {"adjective", "adverb", "noun", "verb", "pronoun", "preposition", "conjunction",
        "determiner", "interjection", "exclamation", "discourse", "marker", "possessive",
        "modal", "key", "grammatical", "sentence", "title", "first", "appears", "level"}

heads = [(i, HEAD.match(l.strip()).group(1)) for i, l in enumerate(lines) if HEAD.match(l.strip())]
merged_start = next(i for i, l in enumerate(lines) if l.strip() == "Pre A1 Starters and A1 Movers")
ranges = []
for k, (i, name) in enumerate(heads):
    stop = min(heads[k + 1][0] if k + 1 < len(heads) else len(lines), merged_start)
    ranges.append((CODE[name], i + 1, stop))

data = {"ST": {}, "MV": {}, "FY": {}}


def entries(text):
    toks = [t for t in text.split() if t not in ("(", ")")]
    out, word, pos, i = [], [], [], 0
    while i < len(toks):
        t = toks[i]
        if t == "+":
            i += 1
            continue
        if t.lower() in POSS:
            pos.append(t.lower())
            i += 1
            continue
        if pos:
            out.append((" ".join(word), " ".join(pos)))
            word, pos = [], []
        word.append(t)
        i += 1
    if pos and word:
        out.append((" ".join(word), " ".join(pos)))
    leftover = " ".join(word + pos)
    return out, leftover


for code, a, b in ranges:
    sec = data[code]
    buf = ""
    for raw in lines[a:b]:
        t = raw.strip().lstrip("\x0c").strip()
        t = re.sub(r"\([^)]*\)?", " ", t)
        t = re.sub(r"\s+", " ", t).strip()
        if not t or FOOTER.match(t) or t.isupper() and len(t) <= 2 or len(t) > 90:
            continue
        cand = (buf + " " + t).strip() if buf else t
        buf = ""
        got, left = entries(cand)
        if not got:
            if len(cand) < 40:
                buf = cand
            continue
        for w, p in got:
            w = re.sub(r"\s+", " ", w).strip(" ,.")
            toks = w.split()
            if not toks or w.split()[0] in JUNK or any(t in JUNK for t in toks):
                continue
            if not WORD_TOK.match(toks[0]) or len(w) > 28:
                continue
            sec[w.lower()] = {"w": w, "pos": p}
        buf = left if len(left) < 40 else ""

tot = {k: len(v) for k, v in data.items()}
print("tu theo tang:", tot, "| luy ke:", tot["ST"], tot["ST"] + tot["MV"], sum(tot.values()))
for w in ["the", "my", "is", "are", "have got", "can", "will", "would", "Monday", "January", "him",
          "whose", "if", "than", "zoo", "weather", "polar bear", "dining room", "don't worry", "excuse me",
          "right", "left", "station", "breakfast", "because", "but", "so", "always", "never"]:
    print(f"  {w:14s}", [k for k in data if w in data[k]] or "-")
json.dump(data, open("yle-levels.json", "w", encoding="utf-8"), ensure_ascii=False, indent=0)
