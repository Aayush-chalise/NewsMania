import { motion } from "framer-motion";

const cardVariants = {
  hover: { scale: 1.05, transition: { duration: 0.3 } },
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const NewsCard = ({ News }) => {
  return (
    <motion.a
      href={News?.url}
      target="_blank"
      rel="noopener noreferrer"
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="bg-white rounded-xl shadow-md overflow-hidden w-64 sm:w-72 cursor-pointer transition"
    >
      <img
        src={News?.urlToImage}
        alt={News?.title}
        className="h-36 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
          {News?.title}
        </h3>
        <p className="text-sm text-gray-600 mt-2 line-clamp-3">
          {News?.description}
        </p>
        <p className="text-xs text-gray-400 mt-3">
          By {News?.author || "Unknown"} |{" "}
          {new Date(News?.publishedAt).toLocaleDateString()}
        </p>
      </div>
    </motion.a>
  );
};

export default NewsCard;
