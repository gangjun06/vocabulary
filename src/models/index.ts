export type YTCaption = {
  start: string;
  dur: string;
  text: string;
};

export type ParsedCaption = {
  start: string;
  end: string;
  words: {
    str: string;
    konw: boolean;
  }[];
};
