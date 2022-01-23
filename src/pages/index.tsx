import type { NextPage } from "next";
import UrlInput from "components/UrlInput";
import { useState } from "react";
import Footer from "components/Footer";
import Content from "components/Content";

const Home: NextPage = () => {
  const [tab, setTab] = useState<string>("input");

  const TabPage = ({ tab }: { tab: string }) => {
    switch (tab) {
      case "input":
        return (
          <UrlInput
            onSubmit={(str) => {
              setTab("content");
            }}
          />
        );
      case "content":
        return <Content />;
      default:
        return <></>;
    }
  };

  return (
    <>
      <div className="mx-auto flex flex-col items-center justify-center h-full">
        <div className="font-bold text-2xl">이름 못정함</div>
        <div className="mb-6">
          유튜브 영상 자막의 모르는 단어들을, 단어장으로 만들어 드립니다.
        </div>
        <TabPage tab={tab} />
      </div>
      <Footer />
    </>
  );
};

export default Home;
