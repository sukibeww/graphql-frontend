import React, { useContext } from 'react';
import { SelectedBook } from '../contexts/SelectedBookContext';
import EditBook from './EditBook';
import BookInfo from './BookInfo';

const Book = () => {  
  const { editMode } = useContext(SelectedBook)
  return(
    <>
      {editMode ?  <EditBook/>: <BookInfo/> }
    </>
  )
}

export default Book;
