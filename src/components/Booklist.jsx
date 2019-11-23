import React, {useState} from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getBooksQuery } from '../queries/queries'
import BookDetails from './BookDetail';



const Booklist = (props) => { 
  const [selectedBook, updateSelectedBook] = useState();
  const { loading, error, data } = useQuery(getBooksQuery);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const { books } = data;
  const bookListItems = books.map( ({ id, name }) => {
      return <li key={id} onClick={() => updateSelectedBook(id)}>{name}</li>;
  });

  return(
    <>
      <div className="book-list">
        <ul>
          {bookListItems}
        </ul>
        <BookDetails selectedBook={selectedBook} />
      </div>
    </>
  )
}
//this will bind the queries result with booklist component 
export default Booklist;