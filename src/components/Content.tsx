import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const Content = () => {
  return (
    <>
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
    </>
  );
};

export default Content;
