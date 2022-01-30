import { useContext, useState } from "react";
import { HiChevronRight } from "react-icons/hi";
import { getTexts } from "utils/loadText";
import { MainContext, PageEnum } from "./Context";
import { toast } from "react-toastify";

const UrlInput = () => {
  const [value, setValue] = useState<string>("");
  const { setPage, setCaption } = useContext(MainContext);

  const formSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const text = value.trim();
      if (!text.length) {
        toast("텍스트를 입력하여 주세요", { type: "warning" });
        return;
      }
      if (
        !/^https:\/\/((www.|)youtube.com\/watch\?v=.+|youtu.be\/.+)$/.test(text)
      ) {
        toast("올바르지 않은 유튜브 링크입니다.", { type: "warning" });
        return;
      }
      const parsed = new URL(text);
      const videoID =
        parsed.pathname === "/watch"
          ? parsed.searchParams.get("v") || ""
          : parsed.pathname.substring(1);
      const list = await getTexts(videoID);
      setCaption!(list || []);
      setPage!(PageEnum.Content);
    } catch (e) {
      toast(
        "처리중 문제가 발생하였습니다.\n자세한 내용은 콘솔 로그를 참고하여 주세요.",
        { type: "warning" }
      );
    }
  };

  return (
    <form
      onSubmit={formSubmit}
      className="rounded-full bg-white shadow-xl flex items-center"
    >
      <input
        className="pl-5 pr-2 py-2 rounded-l-full"
        placeholder="https://youtube.com/watch?v=......"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="px-2 py-2" type="submit">
        <HiChevronRight size={20} />
      </button>
    </form>
  );
};

export default UrlInput;
