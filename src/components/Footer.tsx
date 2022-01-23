import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="absolute bottom-4 right-4 text-gray-600 flex items-center gap-x-2">
      <div>by Gangjun</div>
      <a href="https://github.com/gangjun06/">
        <FaGithub />
      </a>
    </div>
  );
};

export default Footer;
