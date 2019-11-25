import React from 'react';
import { useQuery, useMutation} from '@apollo/react-hooks';
import useForm from "react-hook-form";
import { getAuthorsQuery , addBookMutation, getBooksQuery} from '../queries/queries'
import styled from 'styled-components';

//styled components
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
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

const StyledTextInput = styled.input`
  border: solid 5px #E535AB;
  padding: 10px 30px;
  border-radius: 10px;
  margin: 5px;
  font-family: 'Nunito' , sans-serif;
  color: #E535AB;
  font-size: 1.5rem;
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


const AddBook = () => {
  const { handleSubmit, register, errors } = useForm();
  const {loading, error, data} = useQuery(getAuthorsQuery);
  const [addBook] = useMutation(addBookMutation);
  if(loading) return <StyledParagraph>Loading...</StyledParagraph>
  if(error) return <StyledParagraph>Error :(</StyledParagraph>
  const {authors} = data;
  //map() takes in a callback function and normally looks like this (x) => {return x * 2}
  //in this case tho, the map function iterates through an array of authors and each iteration will points at a specific author. the weird part is that i have to do object deconstruction on each iteration which is kinda new and cool imo
  // const authorListItems = authors.map(({id, name}) => {
  //   return <option key={id}>{name}</option>
  // });
  //prefer it this way tho, less dry but more readable
  const authorListItems = authors.map((author) => {
    return <option key={author.id} value={author.id}>{author.name}</option>
  });
  
  const onSubmit = (values) => {
    addBook({ 
      variables: { 
        name: values.name,
        genre: values.genre,
        authorId: values.authorId
      },
      refetchQueries: [{query: getBooksQuery}]
    })
  };
  return(
    <>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <StyledHeader>Add book</StyledHeader>
        <StyledTextInput
          name="name"
          placeholder="Book name"
          ref={register({
            required: 'Required'
          })}
        />
        {errors.email && errors.email.message}

        <StyledTextInput
          name="genre"
          placeholder="Genre"
          ref={register({
            required: 'Required'
          })}
        />
        <StyledSelectInput
          name="authorId"
          placeholder="Author"
          ref={register({
            required: 'Required'
          })}
        >
          <option disabled value> -- select an author -- </option>
          {authorListItems}
        </StyledSelectInput>
        {errors.username && errors.username.message}

        <StyledSubmit type="submit">Submit</StyledSubmit>
      </StyledForm>
    </>
  )
}

export default AddBook;