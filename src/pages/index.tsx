import type { NextPage } from "next";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi";
import { FaGithub } from "react-icons/fa";

const Home: NextPage = () => {
  return (
    <>
      <div className="mx-auto flex flex-col items-center justify-center h-full">
        <div className="font-bold text-2xl">이름 못정함</div>
        <div className="mb-6">
          유튜브 영상 자막의 모르는 단어들을, 단어장으로 만들어 드립니다.
        </div>
        <div className="text-gray-400">https://youtube.com/watch?v=1234</div>
        <div className="mt-4 bg-white shadow-xl w-2/5 rounded-lg px-4 py-4">
          <div className="flex gap-x-3 items-center">
            <div className="text-gray-500 text-center flex flex-col">
              <span>0:00</span>
              <span>0:05</span>
            </div>
            <div className="">
              Porro natus eos dolor est et facilis eligendi explicabo voluptatem
              animi.
            </div>
          </div>
          <div className="flex gap-x-3 items-center">
            <div className="text-gray-500 text-center flex flex-col">
              <span>0:00</span>
              <span>0:05</span>
            </div>
            <div className="">
              Porro natus eos dolor est et facilis eligendi explicabo voluptatem
              animi.
            </div>
          </div>
          <div className="flex gap-x-3 items-center">
            <div className="text-gray-500 text-center flex flex-col">
              <span>0:00</span>
              <span>0:05</span>
            </div>
            <div className="">
              Porro natus eos dolor est et facilis eligendi explicabo voluptatem
              animi.
            </div>
          </div>
          <div className="flex gap-x-3 items-center">
            <div className="text-gray-500 text-center flex flex-col">
              <span>0:00</span>
              <span>0:05</span>
            </div>
            <div className="">
              Porro natus eos dolor est et facilis eligendi explicabo voluptatem
              animi.
            </div>
          </div>
        </div>

        <div className="mt-6 flex w-2/5 justify-between">
          <div className="bg-white shadow-xl rounded-full py-2 px-4 text-gray-700 cursor-pointer">
            <HiChevronLeft size={22} />
          </div>
          <div className="bg-white shadow-xl rounded-full py-2 pl-4 pr-2 text-gray-700 flex cursor-pointer">
            내보내기
            <HiChevronRight size={22} />
          </div>
        </div>
        {/* <UrlInput /> */}
      </div>
      <div className="absolute bottom-4 right-4 text-gray-600 flex items-center gap-x-2">
        <div>by Gangjun</div>
        <a href="https://github.com/gangjun06/">
          <FaGithub />
        </a>
      </div>
    </>
  );
};

const UrlInput = () => {
  return (
    <div className="rounded-full bg-white shadow-xl flex items-center">
      <input
        className="pl-5 pr-2 py-2 rounded-l-full"
        placeholder="https://youtube.com/watch?v=......"
      />
      <button className="px-2 py-2">
        <HiChevronRight size={20} />
      </button>
    </div>
  );
};

export default Home;
