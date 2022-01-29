//@ts-ignore
import * as ycs from "youtube-captions-scraper";
import { ParsedCaption, YTCaption } from "models";
import { words } from "assets/words";

export const convertWord = (str: string) =>
  str
    .replace(/(b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z)ing$/, "e")
    .replace(/(s|ing|ly)$/, "")
    .replace(/(ies|ier)$/, "y")
    .replace(/(.)\1(est|ier)$/, "");

export const getTexts = async (url: string) => {
  const parsed = new URL(url);
  if (
    parsed.host === "youtu.be" ||
    parsed.host === "www.youtube.com" ||
    parsed.host === "youtube.com"
  ) {
    const videoID =
      parsed.pathname === "/watch"
        ? parsed.searchParams.get("v") || ""
        : parsed.pathname.substring(1);

    const subTitles: YTCaption[] = await ycs.getSubtitles({
      videoID: videoID, // youtube video id
      lang: "en", // default: `en`
    });

    const convert = (num: number) => num.toFixed().padStart(2, "0");

    const result: ParsedCaption[] = subTitles
      .filter((item) => !item.text.startsWith("["))
      .map<ParsedCaption>((item, index) => {
        const fixed1 = parseFloat(parseFloat(item.start).toFixed(2));
        const fixed2 = fixed1 + parseFloat(parseFloat(item.dur).toFixed(2));

        return {
          start: `${convert(fixed1 / 60)}:${convert(fixed1 % 60)}`,
          end: `${convert(fixed2 / 60)}:${convert(fixed2 % 60)}`,
          words: item.text
            .replaceAll("\n", " ")
            .split(" ")
            .map((str) => ({
              str,
              konw:
                !isNaN(str as any) ||
                str.length < 3 ||
                words.common.includes(str.toLowerCase()) ||
                words.common.includes(convertWord(str)) ||
                /\d/.test(str),
            })),
        };
      });
    return result;
  }
};
