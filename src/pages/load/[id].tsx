import { MainContextWrapper } from "components/Context";
import { MainPage } from "components/MainPage";
import MainLayout from "Layouts/MainLayout";
import { ParsedCaption } from "models";
import { GetServerSideProps } from "next";
import { getTexts } from "utils/loadText";

type props = {
  data: ParsedCaption[];
};

const LoadCaption = ({ data }: props) => {
  return (
    <MainLayout>
      <MainContextWrapper captionData={data}>
        <MainPage />
      </MainContextWrapper>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps<props> = async (
  context
) => {
  if (!context.params || !context.params.id) {
    return {
      notFound: true,
    };
  }
  const videoID = context.params.id;
  if (typeof videoID !== "string" || !/^.{11}$/.test(videoID)) {
    return {
      notFound: true,
    };
  }

  const data = await getTexts(videoID);

  return {
    props: {
      data,
    },
  };
};

export default LoadCaption;
