import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";

const LoadCaption = () => {
  return <div></div>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  };
};

export default LoadCaption;
