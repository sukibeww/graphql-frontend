import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import useForm from "react-hook-form";
import { addAuthorMutation, getAuthorsQuery } from '../queries/queries'
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


const AddAuthor = () => {
  const { handleSubmit, register, errors } = useForm();
  const [addAuthor] = useMutation(addAuthorMutation);
  const onSubmit = (values) => {
    values.age = parseInt(values.age);
    addAuthor({ 
      variables: { 
        name: values.name,
        age: parseInt(values.age)
      },
      refetchQueries: [{query: getAuthorsQuery}]
    })
  };
  return(
    <>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <StyledHeader>Add author</StyledHeader>
        <StyledTextInput
          name="name"
          placeholder="Author name"
          ref={register({
            required: 'Required'
          })}
        />
        {errors.email && errors.email.message}

        <StyledTextInput
          name="age"
          type="number"
          placeholder="Age"
          ref={register({
            required: 'Required'
          })}
        />

        <StyledSubmit type="submit">Submit</StyledSubmit>
      </StyledForm>
    </>
  )
}

export default AddAuthor;