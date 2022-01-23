import { FormEventHandler, useCallback, useState } from "react";
import { HiChevronRight } from "react-icons/hi";

export default function UrlInput({
  onSubmit,
}: {
  onSubmit: (str: string) => void;
}) {
  const [value, setValue] = useState<string>("");

  const formSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(value);
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
}
