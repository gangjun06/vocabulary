import React, { useContext, useEffect, useState } from "react";
import { HiChevronLeft, HiRewind } from "react-icons/hi";
import { convertWord } from "utils/loadText";
import { MainContext, PageEnum } from "./Context";

const Export = () => {
  const { vocaList, setVocaList, setPage, page, setCaption } =
    useContext(MainContext);
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }
  let [categories] = useState<string[]>(["csv(탭)", "csv(콤마)", "json"]);
  const [selected, setSelected] = useState<string>(categories[0]);
  const [text, setText] = useState<string>("");

  const translateEnglish = async (str: string) => {
    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        body: str,
      });
      const json = await res.json();
      return json.text;
    } catch (e) {
      return "불러오기 실패";
    }
  };

  useEffect(() => {
    (async () => {
      let means: { [key: string]: string } = {};
      try {
        means = JSON.parse(sessionStorage.getItem("list") || "{}");
      } catch (e) {
        means = {};
      }
      const translateList: string[] = [];
      for (let item of vocaList!) {
        console.log(item);
        if (means[item]) {
          translateList.push(means[item]);
          continue;
        }
        const res = await translateEnglish(item);
        translateList.push(res);
        if (res !== "불러오기 실패") {
          means[item] = res;
        }
      }
      console.log(translateList);
      sessionStorage.setItem("list", JSON.stringify(means));
      if (selected === "csv(탭)") {
        const list = vocaList!.map(
          (item, index) => `${item}	${translateList[index]}`
        );
        setText(list.join("\n"));
      } else if (selected === "csv(콤마)") {
        const list = vocaList!.map(
          (item, index) => `${item},${translateList[index]}`
        );
        setText(list.join("\n"));
      }
    })();
  }, [selected, vocaList, page]);

  return (
    <>
      <div className="w-2/5 flex p-1 space-x-1 bg-white/40 shadow-xl rounded-lg">
        {categories.map((category) => (
          <div
            key={category}
            onClick={() => setSelected(category)}
            className={classNames(
              "w-full py-2.5 text-sm leading-5 font-medium rounded-lg text-center",
              selected === category
                ? "bg-white shadow"
                : "text-gray-600 hover:text-black hover:bg-white/80 hover:shadow-sm"
            )}
          >
            {category}
          </div>
        ))}
      </div>
      <div className="mt-4 w-2/5 bg-white shadow-xl rounded-lg px-4 py-4 gap-y-1 flex flex-col overflow-y-scroll">
        <textarea value={text} />
      </div>
      <div className="mt-6 flex w-2/5 justify-between">
        <div
          className="bg-white shadow-xl rounded-full py-2 px-4 text-gray-700 cursor-pointer"
          onClick={() => setPage!(PageEnum.Content)}
        >
          <HiChevronLeft size={22} />
        </div>
        <div
          className="bg-white shadow-xl rounded-full py-2 pl-4 pr-4 text-gray-700 flex cursor-pointer"
          onClick={() => {
            setPage!(PageEnum.Home);
            setVocaList!([]);
            setCaption!([]);
          }}
        >
          다시하기
        </div>
      </div>
    </>
  );
};

export default Export;
