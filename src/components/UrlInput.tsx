import { useContext, useState } from "react";
import { HiChevronRight } from "react-icons/hi";
import { getTexts } from "utils/loadText";
import { MainContext, PageEnum } from "./Context";

const UrlInput = () => {
  const [value, setValue] = useState<string>("");
  const { setPage, setCaption } = useContext(MainContext);

  const formSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const list = await getTexts(value);
      console.log(list);
      setCaption!(list || []);
      setPage!(PageEnum.Content);
    } catch (e) {}
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
