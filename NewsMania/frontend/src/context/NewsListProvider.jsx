import { useReducer, useEffect, useState } from "react";
import NewsListContext from "./NewsListContext";

// the purpose of reducer function is to return modified version of current state if modified, if not modified it will just return the state without any change

const reducerFunction = (currNewsList, action) => {
  let newNewsList = currNewsList;

  if (action.type === "ADD_NEWS") {
    newNewsList = action.payload;
  }
  return newNewsList;
};

const reducerFuncForNotes = (currNotes, action) => {
  let newNotes = currNotes;
  if (action.type === "FETCH_NOTES_SUCCESS") {
    newNotes = action.payload.notes;
  }
  if (action.type === "ADD_NOTE") {
    newNotes = [action.payload, ...currNotes];
  }
  if (action.type === "DELETE_NOTE") {
    newNotes = currNotes.filter((note) => note.id !== action.payload);
  }
  return newNotes;
};

const NewsListProvider = ({ children }) => {
  // const apiKey = "pub_4c0831f5ecb64446876f2f109f33e735 ";
  const [category, setCategory] = useState("top");
  // const [country, setCountry] = useState("np");
  //   const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&country=${country}&category=${category}

  // `;
  const token = localStorage.getItem("token"); // ✅ safe here
  // var req = new Request(url);

  const [NewsList, dispatchNewsList] = useReducer(reducerFunction, []);
  const [notes, dispatchNotes] = useReducer(reducerFuncForNotes, []);

  const handleListItemClick = (category) => {
    setCategory(category);
  };

  const handleDeleteNoteBtn = async (noteId) => {
    try {
      const res = await fetch(`http://localhost:5000/notes/${noteId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error("Failed to delete note");
      dispatchNotes({ type: "DELETE_NOTE", payload: noteId });
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleAddNoteBtn = async (note) => {
    try {
      const res = await fetch("http://localhost:5000/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(note),
      });

      const data = await res.json();
      dispatchNotes({
        type: "ADD_NOTE",
        payload: data.note,
      });
      if (!res.ok) throw new Error("Failed to add note");
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchNotes = async () => {
    try {
      const res = await fetch("http://localhost:5000/notes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log(data);
      if (!res.ok) throw new Error("Failed to fetch notes");

      dispatchNotes({ type: "FETCH_NOTES_SUCCESS", payload: data });
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    if (!token) return; // wait until token exists
    fetchNotes();
  }, [token]);

  const addNewsList = (News) => {
    dispatchNewsList({
      type: "ADD_NEWS",
      payload: News,
    });
  };

  useEffect(() => {
    fetch("http://localhost:5000/fetch-feed")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        addNewsList(data);
      });

    // const controller = new AbortController();
    // const signal = controller.signal;

    // fetch(req, { signal })
    //   .then((res) => res.json())
    //   .then((obj) => {
    //     addNewsList(obj);
    //   });

    // return () => {
    //   // controller.abort();
    // };
  }, [category]);

  return (
    <NewsListContext.Provider // context ma value fill garxa
      value={{
        NewsList,
        addNewsList,
        handleListItemClick,
        fetchNotes,
        handleAddNoteBtn,
        handleDeleteNoteBtn,
        notes,
      }}
    >
      {children}
    </NewsListContext.Provider>
  );
};

export default NewsListProvider;
