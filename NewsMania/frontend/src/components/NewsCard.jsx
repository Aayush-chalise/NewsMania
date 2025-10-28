import { motion } from "framer-motion";

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const NewsCard = ({ News }) => {
  return (
    <motion.a
      href={News?.link}
      target="_blank"
      rel="noopener noreferrer"
      variants={cardVariants}
      initial="initial"
      animate="animate"
      className="w-full bg-[#332b44] border border-white/10 rounded-xl 
                 shadow-md overflow-hidden cursor-pointer 
                 flex flex-col md:flex-row items-stretch 
                 transition-all duration-300 hover:bg-[#3a3250] hover:shadow-lg"
    >
      {/* Image: on top for small screens, left for md+ */}
      {News?.image && (
        <div className="w-full md:w-1/3">
          <img
            src={News?.image}
            alt={News?.title}
            className="w-full h-56 md:h-full object-cover"
          />
        </div>
      )}

      {/* Text */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white line-clamp-2">
            {News?.title}
          </h3>
          <p className="text-sm text-gray-200 mt-2 line-clamp-3">
            {News?.description}
          </p>
        </div>
        <p className="text-xs text-gray-400 mt-4">
          By {News?.source || "Unknown"} |{" "}
          {new Date(News?.pubDate).toLocaleDateString()}
        </p>
      </div>
    </motion.a>
  );
};

export default NewsCard;
