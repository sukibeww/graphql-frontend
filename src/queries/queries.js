import { gql } from 'apollo-boost';

const getBooksQuery = gql`
  {
    books {
      name
      genre
      id
      author{
        name
        age
      }
    }
  }
`

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`

const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!){
    addBook(name: $name, genre: $genre, authorId: $authorId){
      name
    }
  }
`
//param type is based on graphql variable types such as GraphqlString and GraphqlInt, not based on javascript non-primitive datatype
const addAuthorMutation = gql`
  mutation($name: String!, $age: Int!){
    addAuthor(name: $name, age: $age){
      id
      name
      age
    }
  }
`

const getSpecificBookQuery = gql`
  query getBookQuery($id: ID){
    book(id: $id) {
      id
      name
      genre
      author{
        name
        books {
          name
        }
      }
    }
  }
`

const deleteBookMutation = gql`
  mutation($id: ID!){
    deleteBook(id: $id){
      genre
    }
  }
`

const deleteAuthorMutation = gql`
  mutation($id: ID!){
    deleteAuthor(id: $id){
      name
      age
    }
  }
`

const deleteBooksByAuthorMutation = gql`
  mutation($authorId: ID!){
    deleteBookByAuthor(id: $authorId){
      name
    }
  }
`

const updateBookMutation = gql`
  mutation($id: ID!, $name: String!, $genre: String!, $authorId: ID!){
    updateBook(id: $id, name: $name, genre: $genre, authorId: $authorId){
      id
      name
      genre
      author{
        id
        name
      }
    }
  }
`

export {deleteBooksByAuthorMutation, deleteAuthorMutation, addAuthorMutation, updateBookMutation, deleteBookMutation, getAuthorsQuery, getBooksQuery, addBookMutation, getSpecificBookQuery};