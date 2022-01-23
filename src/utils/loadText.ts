//@ts-ignore
import * as ycs from "youtube-captions-scraper";

export const getTexts = async (url: string) => {
  const parsed = new URL(url);
  if (
    parsed.host === "youtu.be" ||
    parsed.host === "www.youtube.com" ||
    parsed.host === "youtube.com"
  ) {
    console.log(parsed);
    const videoID =
      parsed.pathname === "/watch"
        ? parsed.searchParams.get("v") || ""
        : parsed.pathname.substring(1);
    const subTitles = await ycs.getSubtitles({
      videoID: videoID, // youtube video id
      lang: "en", // default: `en`
    });
  }
};
