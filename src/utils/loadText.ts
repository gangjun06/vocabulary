//@ts-ignore
import * as ycs from "youtube-captions-scraper";
import { ParsedCaption, YTCaption } from "models";
import { words } from "assets/words";

export const convertWord = (str: string) =>
  str
    .replace(/(thing)$/, "")
    .replace(/(s|ing|ly|er)$/, "")
    .replace(/(ies|ier)$/, "y")
    .replace(/(.)\1(est|ier)$/, "");

export const getTexts = async (videoID: string) => {
  const subTitles: YTCaption[] = await ycs.getSubtitles({
    videoID: videoID, // youtube video id
    lang: "en", // default: `en`
  });

  const convert = (num: number) => num.toFixed().padStart(2, "0");

  const result: ParsedCaption[] = subTitles.map<ParsedCaption>((item) => {
    const fixed1 = parseFloat(parseFloat(item.start).toFixed(2));
    const fixed2 = fixed1 + parseFloat(parseFloat(item.dur).toFixed(2));
    const start = `${convert(fixed1 / 60)}:${convert(fixed1 % 60)}`;
    const end = `${convert(fixed2 / 60)}:${convert(fixed2 % 60)}`;
    if (item.text.startsWith("[") && item.text.startsWith("(")) {
      return { start, end, words: [{ str: item.text, konw: true }] };
    }

    return {
      start,
      end,
      words: item.text
        .replaceAll("\n", " ")
        .split(" ")
        .map((str) => {
          const wordForKnow = str
            .replaceAll(".", "")
            .replaceAll(",", "")
            .replaceAll('"', "");
          return {
            str,
            konw:
              !isNaN(wordForKnow as any) ||
              wordForKnow.length < 3 ||
              words.common.includes(wordForKnow.toLowerCase()) ||
              words.common.includes(convertWord(wordForKnow)) ||
              /\d/.test(wordForKnow),
          };
        }),
    };
  });
  return result;
};
