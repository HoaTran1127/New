# research/yle — trích wordlist Cambridge YLE phục vụ gate từ vựng

## Nguồn

`https://www.cambridgeenglish.org/Images/739104-starters-movers-flyers-word-list-2025.pdf`
(wordlist chính thức 2025, mỗi từ có dấu S/M/F = "First appears at … level").

File này **không chứa PDF**: tải PDF về thư mục làm việc, chạy chuỗi lệnh dưới đây, rồi copy JSON trung gian vào `tools/data/yle.mjs`.

## Chạy lại (khoảng 2 phút)

```bash
python3 -m pip install pypdf                        # hoặc dùng poppler: xem bước 2
curl -L -o yle-wordlist.pdf "https://www.cambridgeenglish.org/Images/739104-starters-movers-flyers-word-list-2025.pdf"
pdftotext -layout yle-wordlist.pdf yle.txt          # giữ lệch cột → tách S/M/F theo cột
pdftotext -raw    yle-wordlist.pdf yle-raw.txt      # đúng thứ tự đọc → tách danh sách A-Z từng band
python3 parse_alpha2.py     # -> yle-alpha.json   (danh sách A-Z gộp, 1351 từ có marker)
python3 parse_levels.py     # -> yle-levels.json  (ba danh sách A-Z theo từng band)
python3 merge_levels.py     # -> yle-final.json   (1391 từ: gộp hai nguồn + tách child/children)
python3 topics2.py          # -> yle-topics.json  (15 chủ đề, bucket theo band)
python3 gen_yle2.py         # -> tools/data/yle.mjs
```

## Hai nguồn, mỗi nguồn thiếu một nửa

| Nguồn | Được gì | Mất gì |
| --- | --- | --- |
| `yle.txt` (`-layout`) + `parse_alpha2.py` | marker S/M/F chính xác từng từ, tách được cột | rơi các từ chức năng ở trang Grammatical list (`my`, `your`, `its`) |
| `yle-raw.txt` (`-raw`) + `parse_levels.py` | danh sách A-Z từng band, **có** từ chức năng, có `have got`, `a lot of`, ngày/tháng | hai cột liền nhau bị dính thành một dòng (`of place baby`), nên phải lọc |

`merge_levels.py` lấy alpha làm chuẩn, chỉ nhận từ mà alpha thiếu, rồi bỏ key nghi
(không nằm trong `a-z ' / - . `, có `title`, có ngoặc, >4 từ).

## Số liệu đo được (2026-10-05)

- Wordlist gốc: **1351** từ có marker trong `yle-alpha.json`.
- Sau merge: **1391** từ — `ST 515 · MV 379 · FY 497`; luỹ kế **515 / 894 / 1391**.
  Cao hơn số Cambridge công bố (490 / 863 / 1351) vì có thêm từ chức năng và tên riêng
  (`Alex`, `Ben`, `Peter`…) mà bảng A-Z từng band liệt kê.
- 15 chủ đề trong `yle-topics.json`: **264 từ ST · 136 từ MV · 128 từ FY** (505 từ khớp wordlist
  trên tổng số ứng viên viết tay). 28 ứng viên không có trong wordlist Cambridge
  (`pig`, `hen`, `goose`, `cherry`, `ferry`, `tram`, `season`, `pupil`, `colourful`, `pattern`,
  `tongue`, `sleeve`, `cafe`, `garage`, `vet`, `postman`, …) → xác tín đây là từ SGK Việt Nam
  nhiều hơn Cambridge, không phải lỗi trích (`grep -w pig yle-raw.txt` = 0).
  `levelOf` vẫn nhận ra các dạng biến thể (`reading`, `camping`, `feet`, `skating`) qua chuẩn hoá hình thái.
- `tools/data/yle.mjs` = **39.4 KB / 519 dòng**.

## Kiểm chứng

```bash
node -e "import('./tools/data/yle.mjs').then(m=>{
  const probe=['cat','dogs','swimming','children','than','better','bought','bigger','is','are','went','although'];
  console.log(probe.map(w=>w+'='+m.levelOf(w)).join(' '));
  console.log('luỹ kế', m.wordsFor('ST').size, m.wordsFor('MV').size, m.wordsFor('FY').size);
})"
# cat=ST dogs=ST swimming=ST children=ST than=MV better=MV bought=MV bigger=ST
# is=ST are=ST went=ST although=null
```

`levelOf` chuẩn hoá hình thái (số nhiều, -ing/-ed so le nhân đôi, -er/-est, động từ bất quy tắc,
thể của `be`) nên câu trong prompt không cần gõ dạng nguyên thể.

## Điều `tools/data/yle.mjs` cung cấp

- `YLE_ST` / `YLE_MV` / `YLE_FY`: `[[word, pos], …]` **theo tầng** (từ xuất hiện lần đầu ở tầng đó).
- `wordsFor(band)`: tập từ **luỹ kế** tới band — band dùng để gate.
- `topicWords(topic, band)`: từ của một chủ đề, luỹ kế tới band (nối inline vào prompt, vài trăm byte).
- `YLE_STRUCTURE[band]`: 8 cấu trúc ngữ pháp/band, viết tay theo descriptors Cambridge YLE.
- `YLE_EXTRA[band]`: từ ngoài wordlist nhưng thuộc SGK/đời sống Việt Nam (`pho`, `nephew`, `festival`…).
- `levelOf(word)` → `'ST' | 'MV' | 'FY' | null`; `bandOfId('MV-03')` → `'MV'`.

## Giới hạn đã biết

- Chủ đề tách bằng tay rồi mới đối chiếu band (`topics2.py`), **không** parse phần thematic của PDF:
  Cambridge xếp ba band thành ba cột dọc độc lập trong cùng một khối, nhãn chủ đề nằm ở cột trái
  nên ranh giới chủ đề bị lệch (đã thử `parse_theme.py`, `parse_theme2.py` → lỗi gộp nhãn).
- Tỷ lệ khớp `YLE_TOPICS` ≈ 90% số từ ứng viên; phần còn lại là từ Việt Nam/SGK, nằm trong
  `YLE_EXTRA` hoặc bị gate cảnh báo.
- Tên riêng trong wordlist (`Alex`, `Zoom`) vẫn được giữ: prompt không dùng tới nhưng gate không chặn.
