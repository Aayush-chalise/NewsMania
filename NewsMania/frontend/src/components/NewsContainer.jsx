// NewsContainer.jsx
import { useContext } from "react";
import NewsCard from "./NewsCard";
import NewsListContext from "../context/NewsListContext";

const NewsContainer = () => {
  const { NewsList } = useContext(NewsListContext);
  return (
    <div
      className="flex flex-col items-center gap-6 
             bg-[#2c2638] rounded-2xl  border    border-white/10
           mt-3 mx-4 sm:mx-8 md:mx-16 lg:mx-37 shadow-inner"
    >
      {NewsList.map((news, index) => (
        <NewsCard key={index} News={news} />
      ))}
    </div>
  );
};

export default NewsContainer;
