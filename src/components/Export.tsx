import { useRouter } from "next/router";
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
  let [categories] = useState<string[]>(["csv(탭)", "csv(콤마)"]);
  const [selected, setSelected] = useState<string>(categories[0]);
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

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

  const download = async () => {
    const element = document.createElement("a");
    const file = new Blob([text], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "vocabulary.csv";
    document.body.appendChild(element);
    element.click();
    element.remove();
  };

  useEffect(() => {
    setLoading(true);
    (async () => {
      let means: { [key: string]: string } = {};
      try {
        means = JSON.parse(sessionStorage.getItem("list") || "{}");
      } catch (e) {
        means = {};
      }
      const translateList: string[] = [];
      for (let item of vocaList!) {
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
      setLoading(false);
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
      <div className="mt-4 w-2/5 bg-white shadow-xl rounded-lg px-4 py-4 gap-y-1 flex flex-col overflow-y-scroll text-center">
        {loading ? (
          <div className="py-16 flex flex-col gap-y-0.5">
            <span>단어 목록을 불러오는 중입니다...</span>
            <span className="text-gray-600">
              단어 개수에 따라 시간이 걸릴 수 있습니다
            </span>
          </div>
        ) : (
          <textarea
            className="p-2"
            rows={10}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        )}
      </div>
      <div className="mt-6 flex w-2/5 justify-between">
        <div
          className="bg-white shadow-xl rounded-full py-2 px-4 text-gray-700 cursor-pointer"
          onClick={() => setPage!(PageEnum.Content)}
        >
          <HiChevronLeft size={22} />
        </div>
        {!loading && (
          <div
            className="bg-white shadow-xl rounded-full py-2 pl-4 pr-4 text-gray-700 flex cursor-pointer"
            onClick={download}
          >
            다운로드
          </div>
        )}
        <div
          className="bg-white shadow-xl rounded-full py-2 pl-4 pr-4 text-gray-700 flex cursor-pointer"
          onClick={() => {
            setVocaList!([]);
            setCaption!([]);
            router.push("/");
          }}
        >
          다시하기
        </div>
      </div>
    </>
  );
};

export default Export;
