import { gql } from 'apollo-boost';

const getBooksQuery = gql`
  {
    books {
      name
      id
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

const getSpecificBookQuery= gql`
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

export {getAuthorsQuery, getBooksQuery, addBookMutation, getSpecificBookQuery};