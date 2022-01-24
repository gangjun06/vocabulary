import { useContext } from "react";
import Content from "./Content";
import { MainContext, PageEnum } from "./Context";
import UrlInput from "./UrlInput";

export const MainPage = () => {
  const { page } = useContext(MainContext);
  if (page === PageEnum.Home) return <UrlInput />;
  if (page === PageEnum.Content) {
    return <Content />;
  }
  return <></>;
};
