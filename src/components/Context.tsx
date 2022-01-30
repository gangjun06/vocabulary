import { ParsedCaption } from "models";
import React, { ReactElement, useState } from "react";

export enum PageEnum {
  Home,
  Content,
  Export,
}

type MainContextProps = {
  url: string;
  setUrl: (str: string) => void;
  page: PageEnum;
  setPage: (str: PageEnum) => void;
  caption: ParsedCaption[];
  setCaption: (str: ParsedCaption[]) => void;
  vocaList: string[];
  setVocaList: React.Dispatch<React.SetStateAction<string[]>>;
};

export const MainContext = React.createContext<Partial<MainContextProps>>({});

export const MainContextWrapper = ({
  children,
}: {
  children: ReactElement;
}) => {
  const [url, setUrl] = useState<string>("");
  const [page, setPage] = useState<PageEnum>(PageEnum.Home);
  const [caption, setCaption] = useState<ParsedCaption[]>();
  const [vocaList, setVocaList] = useState<string[]>([]);

  return (
    <MainContext.Provider
      value={{
        url,
        setUrl,
        page,
        setPage,
        caption,
        setCaption,
        vocaList,
        setVocaList,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
