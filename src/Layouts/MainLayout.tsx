import Footer from "components/Footer";
import { ReactElement } from "react";
import { FaGithub } from "react-icons/fa";

const MainLayout = (props: { children: ReactElement }) => {
  return (
    <>
      <div className="mx-auto flex flex-col items-center justify-center h-full py-12 px-4 text-center">
        <div className="font-bold text-2xl">이름 못정함</div>
        <div className="mb-1 md:mb-3">
          유튜브 영상 자막의 모르는 단어들을, 단어장으로 만들어 드립니다.
        </div>
        <div className="text-gray-600 flex items-center gap-x-1 mb-3 md:hidden">
          <div>by Gangjun</div>
          <a href="https://github.com/gangjun06/">
            <FaGithub />
          </a>
        </div>
        {props.children}
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
