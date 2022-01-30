import type { NextPage } from "next";
import MainLayout from "Layouts/MainLayout";
import { HiChevronRight } from "react-icons/hi";
import { toast } from "react-toastify";
import { useState } from "react";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const [value, setValue] = useState<string>("");
  const router = useRouter();

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
      router.push(`/load/${videoID}`);
    } catch (e) {
      toast(
        "처리중 문제가 발생하였습니다.\n자세한 내용은 콘솔 로그를 참고하여 주세요.",
        { type: "warning" }
      );
    }
  };

  return (
    <MainLayout>
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
    </MainLayout>
  );
};

export default Home;
