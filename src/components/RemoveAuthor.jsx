import React from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import useForm from "react-hook-form";
import { deleteAuthorMutation, deleteBooksByAuthorMutation, getAuthorsQuery, getBooksQuery} from '../queries/queries'
import styled from 'styled-components';

//styled components
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: solid 5px #E535AB;
  padding: 30px;
  border-radius: 30px;
  margin: 30px;
`
const StyledHeader = styled.h1`
  font-family: 'Nunito', sans-serif;
  color: #E535AB;
  font-size: 3rem;
  line-height: 0;
`;

const StyledParagraph = styled.p`
  list-style: none;
  font-family: 'Nunito' , sans-serif;
  color: #FFFFFF;
  font-size: 2rem;
  width: max-content;
  margin: 5px;
  width: max-content;
`

const StyledSelectInput = styled.select`
  border: solid 5px #E535AB;
  padding: 10px 30px;
  border-radius: 10px;
  margin: 5px;
  font-family: 'Nunito' , sans-serif;
  color: #E535AB;
  font-size: 1.5rem;
`

const StyledSubmit = styled.button`
  background-color: #E535AB;
  color: #FFFFFF;
  font-family: 'Nunito' , sans-serif;
  font-size: 1.5rem;
  border: none;
  border-radius: 30px;
  padding: 10px 30px;
  margin-top: 10px;
`

const RemoveAuthor = () => {
  const { handleSubmit, register, reset} = useForm();
  const {loading, error, data} = useQuery(getAuthorsQuery);
  const [deleteAuthor] = useMutation(deleteAuthorMutation);
  const [deleteBooksByAuthor] = useMutation(deleteBooksByAuthorMutation);
  if(loading) return <StyledParagraph>Loading...</StyledParagraph>
  if(error) return <StyledParagraph>Error :(</StyledParagraph>
  const {authors} = data;
  const authorListItems = authors.map((author) => {
    return <option key={author.id} value={author.id}>{author.name}</option>
  });
  
  const onSubmit = (values) => {
    console.log(values)
    deleteBooksByAuthor({ 
      variables: { 
        authorId: values.authorId
      },
      refetchQueries: [{query: getBooksQuery}]
    })
    deleteAuthor({
      variables: {
        id: values.authorId 
      },
      refetchQueries: [{query: getAuthorsQuery}]
    })
    reset({
      authorId: ""
    });
  };
  return(
    <>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <StyledHeader>Remove Author</StyledHeader>
        <StyledSelectInput
          name="authorId"
          placeholder="Author"
          ref={register({
            required: 'Required'
          })}>
          {authorListItems}
        </StyledSelectInput>

        <StyledSubmit type="submit">Submit</StyledSubmit>
      </StyledForm>
    </>
  )
}

export default RemoveAuthor;