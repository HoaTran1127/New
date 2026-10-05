import json
import re

alpha = json.load(open("yle-alpha.json", encoding="utf-8"))
levels = json.load(open("yle-levels.json", encoding="utf-8"))
CODE = {"ST": "S", "MV": "M", "FY": "F"}
JUNK = {"adjective", "adverb", "noun", "verb", "pronoun", "preposition", "conjunction",
        "determiner", "interjection", "exclamation", "discourse", "marker", "possessive",
        "modal", "first", "appears", "level"}

merged = {}
for w, d in alpha.items():
    if re.search(r"[()]|title", w) or not re.fullmatch(r"[a-z'’/\-\. ]+", w) or len(w.split()) > 4:
        continue
    merged[w] = {"w": d["w"], "pos": d["pos"], "lvl": d["lvl"]}
added = {}
for tier, sec in levels.items():
    lvl = CODE[tier]
    for w, d in sec.items():
        if w in JUNK or not re.match(r"^[a-z]", w):
            continue
        first = w.split()[0]
        if first in ("of", "and", "or", "to", "in", "for") and len(w.split()) > 3:
            continue
        if re.search(r"[()]|\bof (place|time)\b", w) or w.split()[0] == "interrogative" or len(w.split()) > 4:
            continue
        if w in merged:
            continue
        merged[w] = {"w": d["w"], "pos": d["pos"], "lvl": lvl}
        added.setdefault(lvl, []).append(d["w"])

rank = {"S": 0, "M": 1, "F": 2}
# tách biến thể "child/children", "tooth/teeth" và bỏ dấu
import unicodedata

def strip_acc(s):
    return "".join(c for c in unicodedata.normalize("NFD", s) if unicodedata.category(c) != "Mn")


exp = {}
for w, d2 in sorted(merged.items(), key=lambda kv: rank[kv[1]["lvl"]]):
    parts = [p.strip() for p in d2["w"].split("/")] if "/" in d2["w"] and len(d2["w"].split("/")) <= 2 else [d2["w"]]
    for p in parts:
        if not p or len(p.split()) > 3 or "title" in p:
            continue
        k = strip_acc(p).lower()
        if k not in exp:
            exp[k] = {"w": p, "pos": d2["pos"], "lvl": d2["lvl"]}
merged = exp
order = sorted(merged, key=lambda w: (rank[merged[w]["lvl"]], w))
tot = {k: sum(1 for v in merged.values() if v["lvl"] == k) for k in "SMF"}
print("total", len(merged), tot, "| cumulative", tot["S"], tot["S"] + tot["M"], sum(tot.values()))
for lvl in "SMF":
    a = added.get(lvl, [])
    print(f"+ them {lvl} ({len(a)}):", ", ".join(sorted(a)[:40]))
for w in ["the", "my", "is", "are", "a", "an", "I", "you", "he", "she", "him", "his", "her",
          "this", "that", "these", "those", "here", "there", "and", "but", "or", "because", "so",
          "if", "of", "to", "in", "on", "at", "with", "Monday", "January"]:
    k = w.lower()
    print(f"  {w:10s}", merged.get(k, {}).get("lvl", "-"), merged.get(k, {}).get("pos", ""))
json.dump({w: merged[w] for w in order}, open("yle-final.json", "w", encoding="utf-8"),
          ensure_ascii=False, indent=1)
