import { createContext } from "react";

const NewsListContext = createContext({
  // this is a structure of data that our provider will provider. eg: postlist will be a array , add post and delete post will be a method. code will run even if we dont provide structure.

  NewsList: [], // structure designing
  addNewsList: () => {},
  handleListItemClick: () => {},
  fetchNotes: () => {},
  handleAddNoteBtn: () => {},
  notes: [],
});
export default NewsListContext;
