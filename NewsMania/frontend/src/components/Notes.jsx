import { useState } from "react";
import { motion } from "framer-motion";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react"; // import trash icon
import NewsListContext from "../context/NewsListContext";

function Notes() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { notes, handleAddNoteBtn, handleDeleteNoteBtn } =
    useContext(NewsListContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newNote = {
      title,
      content,
    };

    handleAddNoteBtn(newNote);

    setTitle("");
    setContent("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto mt-4 sm:mt-10 px-3 sm:px-6"
    >
      {/* Back Button */}
      <button
        onClick={() => navigate("/home")}
        className="mb-4 sm:mb-6 w-full sm:w-auto px-4 sm:px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm sm:text-base transition"
      >
        ← Back to Home
      </button>

      <h2 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-gray-200">
        Notes
      </h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-3 sm:space-y-4 mb-6 sm:mb-10"
      >
        <div>
          <label className="block text-gray-400 font-medium mb-1 text-sm sm:text-base">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded-md w-full bg-gray-800 text-gray-400 border-b-2 border-gray-600 focus:border-theme-color outline-none py-2 px-3 placeholder-gray-500 transition text-sm sm:text-base"
            placeholder="Enter note title"
          />
        </div>

        <div>
          <label className="block text-gray-400 font-medium mb-1 text-sm sm:text-base">
            Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-gray-800 text-gray-400 border-b-2 border-gray-600 focus:border-theme-color outline-none py-2 px-3 placeholder-gray-500 transition rounded-md text-sm sm:text-base break-words"
            rows={4}
            placeholder="Write your note..."
          ></textarea>
        </div>

        <motion.button
          whileHover={{ backgroundColor: "#e53e3e" }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full sm:w-auto bg-theme-color text-white font-medium px-4 sm:px-6 py-2 rounded-lg transition text-sm sm:text-base"
        >
          Add Note
        </motion.button>
      </form>

      {/* Notes List */}
      <div className="space-y-3 sm:space-y-4">
        {notes.length === 0 && (
          <p className="text-gray-400 text-center text-sm sm:text-base">
            No notes yet. Add one above!
          </p>
        )}
        {notes.map((note) => (
          <div
            key={note.id}
            className="p-3 sm:p-4 border-l-4 border-theme-color bg-gray-900 rounded-md flex justify-between items-start w-full"
          >
            {/* Note content */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-200 text-base sm:text-lg break-words">
                {note.title}
              </h3>
              <p className="text-gray-400 mt-1 text-sm sm:text-base break-words">
                {note.content}
              </p>
            </div>

            {/* Trash Button on the right */}
            <button
              onClick={() => handleDeleteNoteBtn(note.id)}
              className="ml-3 sm:ml-4 mt-1 text-red-500 hover:text-red-400 transition flex-shrink-0"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default Notes;
