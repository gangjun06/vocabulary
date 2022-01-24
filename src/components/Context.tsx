import React, { ReactElement, useState } from "react";

export enum PageEnum {
  Home,
  Content,
}

type MainContextProps = {
  url: string;
  setUrl: (str: string) => void;
  page: PageEnum;
  setPage: (str: PageEnum) => void;
};

export const MainContext = React.createContext<Partial<MainContextProps>>({});

export const MainContextWrapper = ({
  children,
}: {
  children: ReactElement;
}) => {
  const [url, setUrl] = useState<string>("");
  const [page, setPage] = useState<PageEnum>(PageEnum.Home);

  return (
    <MainContext.Provider value={{ url, setUrl, page, setPage }}>
      {children}
    </MainContext.Provider>
  );
};
