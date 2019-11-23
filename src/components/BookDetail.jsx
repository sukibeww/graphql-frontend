import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getSpecificBookQuery } from '../queries/queries'

const BookDetails = (props) => {
  const { loading, error, data } = useQuery(getSpecificBookQuery, {
    variables: {id: props.selectedBook}
  });
  if (loading) return  <p> loading </p>
  if(error) return <p>Error :(</p>
  if(data.book){
    return(
      <>
        <p>{`Genre: ${data.book.genre}`}</p>
        <p>{`Author: ${data.book.author.name}`}</p>
        <p>{`Books by this author:`}</p>
        <ul>
          {data.book.author.books.map(({id, name}, index) => {return <li key={index}>{name}</li>}) }
        </ul>
      </>
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
