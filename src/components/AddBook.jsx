import React from 'react';
import { useQuery, useMutation} from '@apollo/react-hooks';
import useForm from "react-hook-form";
import { getAuthorsQuery , addBookMutation, getBooksQuery} from '../queries/queries'


const AddBook = () => {
  const { handleSubmit, register, errors } = useForm();
  const {loading, error, data} = useQuery(getAuthorsQuery);
  const [addBook] = useMutation(addBookMutation);
  if(loading) return <p>Loading...</p>
  if(error) return <p>Error :(</p>
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
    console.log(values)
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="name"
          ref={register({
            required: 'Required'
          })}
        />
        {errors.email && errors.email.message}

        <input
          name="genre"
          ref={register({
            required: 'Required'
          })}
        />
        <select
          name="authorId"
          ref={register({
            required: 'Required'
          })}
        >
          {authorListItems}
        </select>
        {errors.username && errors.username.message}

        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default AddBook;