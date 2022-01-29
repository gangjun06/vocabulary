import type { NextPage } from "next";
import Footer from "components/Footer";
import { MainContextWrapper } from "components/Context";
import { MainPage } from "components/MainPage";

const Home: NextPage = () => {
  return (
    <>
      <div className="mx-auto flex flex-col items-center justify-center h-full py-6">
        <div className="font-bold text-2xl">이름 못정함</div>
        <div className="mb-6">
          유튜브 영상 자막의 모르는 단어들을, 단어장으로 만들어 드립니다.
        </div>
        <MainContextWrapper>
          <MainPage />
        </MainContextWrapper>
      </div>
      <Footer />
    </>
  );
};

export default Home;
