import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getSpecificBookQuery } from '../queries/queries'
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

const BookDetails = (props) => {
  const { loading, error, data } = useQuery(getSpecificBookQuery, {
    variables: {id: props.selectedBook}
  });
  if (loading) return  <StyledParagraph> loading </StyledParagraph>
  if(error) return <StyledParagraph>Error :(</StyledParagraph>
  if(data.book){
    return(
      <StyledWrapper>
        <StyledParagraph>{`Genre: ${data.book.genre}`}</StyledParagraph>
        <StyledParagraph>{`Author: ${data.book.author.name}`}</StyledParagraph>
        <StyledParagraph>{`Books by this author:`}</StyledParagraph>
        <StyledBookList>
          {data.book.author.books.map(({id, name}, index) => {return <StyledListItem key={index}>{name}</StyledListItem>}) }
        </StyledBookList>
      </StyledWrapper>
    )
  }
  else{
    return(
      <>
      </>
    )
  }
}

export default BookDetails;
