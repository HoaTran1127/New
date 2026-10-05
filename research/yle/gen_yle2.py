import json

words = json.load(open("yle-final.json", encoding="utf-8"))
topics = json.load(open("yle-topics.json", encoding="utf-8"))
static = open("yle_static.js", encoding="utf-8").read()
MARK = "// ===== TRA CỨU ====="
part_a, part_b = static.split(MARK)

LVL_BAND = {"S": "ST", "M": "MV", "F": "FY"}
BAND_LVL = {v: k for k, v in LVL_BAND.items()}


def q(s):
    return "'" + s.replace("\\", "\\\\").replace("'", "\\'") + "'"


data = ["// ===== DỮ LIỆU TRÍCH TỰ ĐỘNG TỪ WORDLIST CAMBRIDGE (không sửa tay) =====", ""]
for band in ["ST", "MV", "FY"]:
    items = sorted(
        [(w.lower(), v["pos"]) for w, v in words.items() if v["lvl"] == BAND_LVL[band]],
        key=lambda t: (t[0], t[1]),
    )
    data.append(f"export const YLE_{band} = [")
    for i in range(0, len(items), 6):
        chunk = items[i:i + 6]
        data.append("  " + " ".join(f"[{q(w)}, {q(p)}]," for w, p in chunk))
    data.append("]")
    data.append("")
data.append("const TIER_WORDS = { ST: YLE_ST, MV: YLE_MV, FY: YLE_FY }")
data.append("")
data.append("// Từ theo chủ đề, tách sẵn theo band (band = từ xuất hiện lần đầu ở level đó).")
data.append("export const YLE_TOPICS = {")
for t, b in topics.items():
    data.append(f"  {q(t)}: {{")
    for band in ["ST", "MV", "FY"]:
        ws = b[BAND_LVL[band]]
        if not ws:
            data.append(f"    {band}: [],")
            continue
        line = f"    {band}: ["
        for i, w in enumerate(ws):
            if i and (len(line) + len(q(w)) + 2) > 96:
                data.append(line.rstrip())
                line = "      "
            line += q(w) + (", " if i < len(ws) - 1 else "")
        data.append(line.rstrip() + "],")
    data.append("  },")
data.append("}")
data.append("")
data.append("// Tên tiếng Việt của 15 chủ đề, dùng cho dòng " + '"Dải từ" trong prompt.')
data.append("export const YLE_TOPIC_VI = {")
for line in [
    "dong-vat: động vật", "truong-hoc: trường học", "gia-dinh: gia đình",
    "nghe-nghiep: nghề nghiệp", "mau-sac: màu sắc", "so-thich: sở thích",
    "an-uong: ăn uống", "co-the: cơ thể", "quan-ao: quần áo", "thoi-tiet: thời tiết",
    "dia-diem: địa điểm", "giao-thong: giao thông", "thoi-gian: thời gian",
    "dong-tac: hoạt động", "mo-ta: mô tả",
]:
    k, v = line.split(": ")
    data.append(f"  {q(k)}: {q(v)},")
data.append("}")
data.append("")

out = part_a.rstrip() + "\n\n" + "\n".join(data) + "\n" + part_b.strip() + "\n"
open("../miti-src/tools/data/yle.mjs", "w", encoding="utf-8").write(out)
print("yle.mjs:", len(out.encode("utf-8")), "bytes |", out.count("\n"), "dong")
