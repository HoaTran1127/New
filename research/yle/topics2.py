import json

d = json.load(open("yle-final.json", encoding="utf-8"))

TOPICS = {
    "dong-vat": "animal pet cat dog cow horse sheep chicken duck goat rabbit mouse bird fish frog snake spider bee fly lizard monkey polar bear crocodile elephant giraffe lion tiger zebra dolphin kangaroo panda parrot penguin shark snail whale butterfly camel insect nest swan wing fur tail",
    "truong-hoc": "school teacher classroom lesson desk chair book bookcase pen pencil rubber ruler bag backpack rucksack crayon paint paints computer tablet picture playground music student pupil homework library seat dictionary glue scissors project science maths history English bin cupboard",
    "gia-dinh": "family mother father mum dad baby brother sister cousin grandma grandpa grandmother grandfather aunt uncle daughter son children child people friend name boy girl man woman grandparents nephew niece twin",
    "nghe-nghiep": "job teacher doctor nurse driver farmer cook waiter dentist vet pilot singer dancer actor artist writer engineer manager police officer fire fighter postman builder business woman shop assistant cleaner work office factory hospital",
    "mau-sac": "colour red blue green yellow black white brown orange pink purple grey light dark bright colourful pattern spot stripe spotted striped plain",
    "so-thich": "hobby like love enjoy favourite swim run cycling football basketball baseball volleyball badminton tennis chess dance singing drawing reading writing skating skiing climbing riding board game card game fishing camping cinema concert skateboarding sport",
    "an-uong": "food drink breakfast lunch dinner meal apple banana orange pear peach grape melon lemon mango coconut cherry bread rice noodles meat fish chicken egg milk water juice tea coffee cake biscuit sweet chocolate ice cream sandwich burger chips cheese butter sugar salt pepper soup salad sauce vegetable carrot potato tomato onion corn bean jam honey yoghurt peanut jelly",
    "co-the": "body head hair eye ear nose mouth tooth teeth tongue arm hand leg foot feet knee elbow shoulder back neck stomach finger toe face smile beard moustache long short fair curly blond fat thin strong",
    "quan-ao": "clothes T-shirt shirt trousers jeans skirt dress sock shoe boots trainers sweater jumper coat jacket hat cap scarf glove belt ring necklace bracelet pocket sleeve pyjamas swimsuit uniform tie glasses sunglasses costume",
    "thoi-tiet": "weather season spring summer autumn winter rain snow wind cloud sunny sun storm ice cold hot warm cool wet dry umbrella fog temperature",
    "dia-diem": "place town city village street road square park garden zoo farm shop supermarket market station airport beach mountain forest lake river sea ocean island country building house flat bedroom bathroom kitchen living room dining room garage roof floor window door wall stairs lift office museum cinema restaurant cafe hotel shopping centre sports centre",
    "giao-thong": "transport car bus train tram bicycle bike motorbike taxi lorry van plane ship boat ferry ticket journey traffic jam petrol fly sail ride drive",
    "thoi-gian": "time day week month year morning afternoon evening night today tomorrow yesterday now late early hour minute second o'clock monday tuesday wednesday thursday friday saturday sunday january february march april may june july august september october november december birthday holiday weekend date always sometimes never often usually",
    "dong-tac": "run walk jump climb swim dance sing play sit stand sleep get up go come eat drink read write draw paint listen speak talk say tell ask answer open close turn on turn off wash wear put on take off ride drive fly catch throw kick push pull carry hold point touch help look watch find lose win learn teach study practise",
    "mo-ta": "big small large little long short tall high low fast slow new old young good bad nice lovely beautiful ugly clever funny kind friendly happy sad angry afraid tired hungry thirsty full empty clean dirty tidy untidy hot cold warm easy difficult different same far near quiet loud dangerous delicious wonderful interesting",
}

out, unknown = {}, {}
for topic, s in TOPICS.items():
    toks, b = s.split(), {"S": [], "M": [], "F": []}
    i = 0
    while i < len(toks):
        w = toks[i]
        if i + 1 < len(toks) and (w + " " + toks[i + 1]).lower() in d:
            w += " " + toks[i + 1]
            i += 1
        k = w.lower()
        if k in d:
            b[d[k]["lvl"]].append(d[k]["w"])
        else:
            unknown.setdefault(topic, []).append(w)
        i += 1
    out[topic] = {k: sorted(set(v)) for k, v in b.items()}

for t, b in out.items():
    print(f"== {t} S{len(b['S'])} M{len(b['M'])} F{len(b['F'])}")
print("CHUA KHOP:", json.dumps({k: sorted(set(v)) for k, v in unknown.items()}, ensure_ascii=False))
json.dump(out, open("yle-topics.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
