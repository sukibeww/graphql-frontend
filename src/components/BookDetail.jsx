import React, {useState} from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { getSpecificBookQuery ,deleteBook, getBooksQuery} from '../queries/queries'
import styled from 'styled-components';

//styled components
const StyledWrapper = styled.div`
  background-color: #51D3F5;
  padding: 30px;
  border-radius: 30px;
  display: flex; 
  justify-content: center; 
  flex-direction: column;
  align-items: center;
  margin: 30px;
`

const StyledParagraph = styled.p`
  list-style: none;
  font-family: 'Nunito' , sans-serif;
  color: #FFFFFF;
  font-size: 2rem;
  width: max-content;
  margin: 5px;
  width: max-content;
`

const StyledListItem = styled.li`
  list-style: none;
  font-family: 'Nunito' , sans-serif;
  color: #FFFFFF;
  font-size: 1.5rem;
  border: solid 3px #FFFFFF;
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

const StyledSubmit = styled.button`
  background-color: #FFFFFF;
  color: #51D3F5;
  font-family: 'Nunito' , sans-serif;
  font-size: 1.5rem;
  border: none;
  border-radius: 30px;
  padding: 10px 30px;
  margin: 10px 20px;
  cursor: pointer;
`

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row; 
`


const BookDetails = (props) => {
  const [editMode, toggleEditMode] = useState(false);
  const [deleted, updateDeleted] = useState(null);
  const { loading, error, data } = useQuery(getSpecificBookQuery, {
    variables: {id: props.selectedBook}
  });
  const [deletedBook] = useMutation(deleteBook);
  
  if (loading) return  <StyledParagraph> loading </StyledParagraph>
  if(error) return <StyledParagraph>Error :(</StyledParagraph>
  if(data.book){
    const onDelete = () => {
      updateDeleted((prevState) => !prevState);
      deletedBook({ 
        variables: { 
          id: data.book.id
        },
        refetchQueries: [{query: getBooksQuery}]
      })
    }
    return(
      <>
        <StyledWrapper>
          <StyledParagraph>{deleted ? "Deleted" : `Genre: ${data.book.genre}`}</StyledParagraph>
          <StyledParagraph>{deleted ? null :`Author: ${data.book.author.name}`}</StyledParagraph>
          <StyledParagraph>{deleted ? null :`Books by this author:`}</StyledParagraph>
          {deleted ? null : <StyledBookList>
            {data.book.author.books.map(({id, name}, index) => {return <StyledListItem key={index}>{name}</StyledListItem>}) }
          </StyledBookList>}
          {deleted ? null : <ButtonsWrapper>
            <StyledSubmit onClick={(e) => {
                e.preventDefault();
                toggleEditMode(prevState => !prevState);
              }}>Edit</StyledSubmit>
            <StyledSubmit onClick={(e) => {
              e.preventDefault();
              if(window.confirm("Delete book?")){
                onDelete();
              }
            }}>Remove</StyledSubmit>
          </ButtonsWrapper>}
        </StyledWrapper>
      </>
    )
  }
  else{
    return(
      <StyledWrapper>
        <StyledParagraph> Select a book :)</StyledParagraph>
      </StyledWrapper>
    )
  }
}

export default BookDetails;
