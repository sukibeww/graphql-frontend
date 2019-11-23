import React, {useState} from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getBooksQuery } from '../queries/queries'
import BookDetails from './BookDetail';
import styled from 'styled-components';

//styled components
const StyledBookItem = styled.li`
  list-style: none;
  font-family: 'Nunito' , sans-serif;
  color: #E535AB;
  font-size: 1.5rem;
  border: solid 3px #E535AB;
  width: max-content;
  padding: 5px;
  border-radius: 5px;
  margin: 5px;
  cursor: pointer;
`

const StyledBookList = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`

const StyledParagraph = styled.p`
  list-style: none;
  font-family: 'Nunito' , sans-serif;
  color: #E535AB;
  font-size: 2rem;
  width: max-content;
  margin: 5px;
  width: max-content;
`

const Booklist = (props) => { 
  const [allBooks , setAllBooks] = useState();
  const [selectedBook, updateSelectedBook] = useState();
  const { loading, error, data } = useQuery(getBooksQuery);
  if (loading) return <StyledParagraph>Loading...</StyledParagraph>;
  if (error) return <StyledParagraph>Error :(</StyledParagraph>;
  const { books } = data;
  if(books.books){
    setAllBooks(books.books)
  }
  const bookListItems = books.map( ({ id, name }) => {
      return <StyledBookItem key={id} onClick={() => updateSelectedBook(id)}>{name}</StyledBookItem>;
  });

  return(
    <>
      <div className="book-list">
        <StyledBookList>
          {bookListItems}
        </StyledBookList>
        <BookDetails selectedBook={selectedBook}/>
      </div>
    </>
  )
}
//this will bind the queries result with booklist component 
export default Booklist;