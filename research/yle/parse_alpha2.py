import json
import re

POS = r"(?:n|v|adj|adv|det|pron|poss|prep|conj|int|excl|dis)"
ENTRY = re.compile(
    r"^(?P<word>.+?)\s+(?P<pos>" + POS + r"(?:\s*\+\s*" + POS + r")*(?:\s+of\s+[a-z ]+)?)"
    r"\s+(?P<lvl>[SMF])$"
)
NOISE = re.compile(r"vocabulary list|Grammatical key|adjective|interrogative|adverb|noun|conjunction|"
                   r"possessive|determiner|preposition|discourse marker|pronoun|exclamation|verb|"
                   r"First appears at|^\s*\d+\s*$", re.I)


def cells(raw):
    out = []
    starts = [m.start() for m in re.finditer(r" {2,}", raw)]
    prev = 0
    for s in starts + [len(raw)]:
        chunk = raw[prev:s]
        if chunk.strip():
            out.append(chunk.strip())
        prev = s
    return out


lines = open("yle.txt", encoding="utf-8", errors="replace").read().split("\n")
alpha = lines[1130:1611]
RANK = {"S": 0, "M": 1, "F": 2}
entries = {}
pending = ""
for raw in alpha:
    if not raw.strip() or NOISE.search(raw):
        continue
    if re.fullmatch(r"[A-Z]", raw.strip()):
        pending = ""
        continue
    for cell in cells(raw):
        if re.fullmatch(r"[A-Z]", cell):
            pending = ""
            continue
        m = ENTRY.match(cell)
        if not m:
            if not cell.startswith("("):
                pending = (pending + " " + cell).strip()
            continue
        word = m.group("word").strip()
        if pending:
            word = pending if word.startswith("(") else pending + " " + word
            pending = ""
        word = re.sub(r"\s*\([^)]*\)", "", word)
        word = re.sub(r"\s+", " ", word).strip()
        if not word or not re.search(r"[A-Za-z]", word):
            pending = ""
            continue
        key = word.lower()
        lvl = m.group("lvl")
        if key in entries:
            if RANK[entries[key]["lvl"]] < RANK[lvl]:
                continue  # giu muc thap nhat (band som nhat)
            if RANK[entries[key]["lvl"]] > RANK[lvl]:
                entries[key]["lvl"] = lvl
            continue
        entries[key] = {"w": word, "pos": m.group("pos"), "lvl": lvl}

c = {"S": 0, "M": 0, "F": 0}
for e in entries.values():
    c[e["lvl"]] += 1
print("tu doc duoc:", len(entries), "| S:", c["S"], "M:", c["M"], "F:", c["F"], "| cumulative:",
      c["S"], c["S"] + c["M"], c["S"] + c["M"] + c["F"])
sus = [k for k in entries if len(k.split()) > 3 or not re.fullmatch(r"[a-z][a-z'’ /().-]{0,28}", k)]
print("nghi:", sus[:12], len(sus))
for w in ["a", "about", "apple", "weather", "will", "would", "could", "which", "the", "take a photo/picture"]:
    e = entries.get(w)
    print(" ", w, "->", (e["pos"], e["lvl"]) if e else "-")
json.dump(entries, open("yle-alpha.json", "w", encoding="utf-8"), ensure_ascii=False, indent=0)
