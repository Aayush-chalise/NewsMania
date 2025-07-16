// NewsContainer.jsx
import { useContext } from "react";
import NewsCard from "./NewsCard";
import NewsListContext from "../context/NewsListContext";

const NewsContainer = () => {
  const { NewsList } = useContext(NewsListContext);
  return (
    <div className="flex flex-wrap gap-6 justify-center p-6">
      {NewsList.map((news, index) => (
        <NewsCard key={index} News={news} />
      ))}
    </div>
  );
};

export default NewsContainer;
