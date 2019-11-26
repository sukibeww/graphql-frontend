import React, { useContext } from 'react';
import styled from 'styled-components';
import { useQuery, useMutation} from '@apollo/react-hooks';
import useForm from "react-hook-form";
import { SelectedBook } from '../contexts/SelectedBookContext'
import { updateBookMutation, getBooksQuery, getAuthorsQuery, getSpecificBookQuery } from '../queries/queries';

//styled components
const StyledParagraph = styled.p`
  list-style: none;
  font-family: 'Nunito' , sans-serif;
  color: #FFFFFF;
  font-size: 2rem;
  width: max-content;
  margin: 5px;
  width: max-content;
`

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

const StyledInputText = styled.input`
  border: solid 5px #FFFFFF;
  padding: 10px 30px;
  border-radius: 10px;
  margin: 5px;
  font-family: 'Nunito' , sans-serif;
  color: #51D3F5;
  font-size: 1.5rem;
`

const StyledSelectInput = styled.select`
  border: solid 5px #51D3F5;
  padding: 10px 30px;
  border-radius: 10px;
  margin: 5px;
  font-family: 'Nunito' , sans-serif;
  color: #51D3F5;
  font-size: 1.5rem;
`

const EditBook = () => {
  const { toggleEditMode, selectedBook} = useContext(SelectedBook)
  const { handleSubmit, register } = useForm();
  const {loading, error, data} = useQuery(getAuthorsQuery);
  const [updateBook] = useMutation(updateBookMutation);
  if(loading) return <StyledParagraph>Loading...</StyledParagraph>
  if(error) return <StyledParagraph>Error :(</StyledParagraph>
  const {authors} = data;
  const authorListItems = authors.map((author) => {
    if(author.id === selectedBook.author.id) return <option key={author.id} value={author.id} selected>{author.name}</option>
    return <option key={author.id} value={author.id}>{author.name}</option>
  });
  const onUpdate = (values) => {
    if(!values.name){
      values.name = selectedBook.name;
    } 
    if(!values.genre){
      values.genre = selectedBook.genre;
    } 
    if(!values.author){
      values.author = selectedBook.author.id;
    }
    updateBook({ 
      variables: {
        id: selectedBook.id,
        name: values.name,
        genre: values.genre,
        authorId: values.author
      },
      refetchQueries: [{query: getBooksQuery}, {query: getSpecificBookQuery}]
    })
    toggleEditMode();
  };
  return(
    <>
      <StyledWrapper>
        <form onSubmit={handleSubmit(onUpdate)}>
          <StyledParagraph>Name:</StyledParagraph>
          <StyledInputText name="name" placeholder={selectedBook.name} ref={register({
            required: false
          })}/>
          <StyledParagraph>Genre:</StyledParagraph>
          <StyledInputText name="genre" placeholder={selectedBook.genre} ref={register({
            required: false
          })}/>
          <StyledParagraph>Author:</StyledParagraph>
          <StyledSelectInput name="author" placeholder={selectedBook.author.name} ref={register({
            required: false
          })}>
            {authorListItems}
          </StyledSelectInput>
          <ButtonsWrapper>
            <StyledSubmit type="submit">Save</StyledSubmit>
            <StyledSubmit onClick={(e) => {
              e.preventDefault();
              toggleEditMode();
            }}>Cancel</StyledSubmit>
          </ButtonsWrapper>
        </form>
      </StyledWrapper>
    </>
  )
}

export default EditBook;