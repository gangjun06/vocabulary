import React, { useContext } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { MainContext, PageEnum } from "./Context";
import Link from "next/link";

const Content = () => {
  const { url, setPage, caption, vocaList, setVocaList } =
    useContext(MainContext);

  return (
    <>
      <div className="text-gray-400">{url}</div>

      <div className="mt-4 bg-white shadow-xl text-left rounded-lg px-4 py-4 gap-y-1 flex flex-col overflow-y-scroll">
        {caption?.map((item, index) => (
          <div className="flex gap-x-3 items-center" key={index}>
            <div className="text-gray-500 text-center flex flex-col sm:flex-row text-sm gap-x-1">
              <div>{item.start}</div>
              <div>{item.end}</div>
            </div>
            <div className="">
              {item.words.map((item, index) => {
                const includes = vocaList?.includes(item.str);
                let className = "";
                let onClick = () => {};
                if (item.konw && !includes) {
                  onClick = () =>
                    setVocaList!((voca) => voca?.concat(item.str));
                } else if (includes) {
                  className = "text-red-500";
                  onClick = () =>
                    setVocaList!((voca) =>
                      voca?.filter((voca) => voca !== item.str)
                    );
                } else {
                  className = "text-blue-500";
                  onClick = () => {
                    console.log(item.str);
                    setVocaList!((voca) => voca?.concat(item.str));
                  };
                }
                return (
                  <span
                    key={index}
                    className={className}
                    onClick={onClick}
                  >{`${item.str} `}</span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div>
        <div className="invisible h-0">
          Dummy Text For Make Layout. I know, Its stupid method...
        </div>
        <div className="mt-6 flex justify-between" style={{ width: "inherit" }}>
          <Link href="/" passHref>
            <div className="bg-white shadow-xl rounded-full py-2 px-4 text-gray-700 cursor-pointer">
              <HiChevronLeft size={22} />
            </div>
          </Link>
          <div
            className="bg-white shadow-xl rounded-full py-2 pl-4 pr-2 text-gray-700 flex cursor-pointer"
            onClick={() => setPage!(PageEnum.Export)}
          >
            ????????????
            <HiChevronRight size={22} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Content;
