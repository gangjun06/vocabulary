import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  text: string;
};

const Translate = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== "POST") {
    res.status(200).json({ text: "불러오기 실패" });
    return;
  }

  try {
    const resData = await fetch("https://openapi.naver.com/v1/papago/n2mt", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "X-Naver-Client-Id": process.env.X_NAVER_CLIENT_ID || "",
        "X-Naver-Client-Secret": process.env.X_NAVER_CLIENT_SECRET || "",
      },
      body: `source=en&target=ko&text=${req.body}`,
    });
    const json = await resData.json();
    res
      .status(200)
      .json({
        text: (json.message.result.translatedText as string).replaceAll(
          ".",
          ""
        ),
      });
  } catch (e) {
    res.status(500).json({ text: "불러오기 실패" });
  }
};

export default Translate;
