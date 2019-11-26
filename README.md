# My first Graphql Front-end application

To install this application
```
npm i
```

To start the application 
```
npm start
```

This project requires the [backend](https://github.com/sukibeww/graphql-backend) application to run and I don't think I'm gonna host it because I didn't implemented any form of security in this application. So if you want to run it locally on your computer, you might need to setup the database environment (MongoDB) ... sorry 😗

---
## Libraries used in this project
* React
* @apollo/react-hooks
* GraphQL
* Styled-Components
* Mongoose ORM
* Context API

---
## Intro
It was a very adventurous project because I find the resources for the tech specs of this project is a bit scarce and the whole thing is still a bit alien to me. I did this project out of curiousity because I've heard a bunch of senior devs great things about it and I thought "Hmmm... what so great about it? I'll give it a shot." 

## Objective

Based on my very limited understanding and experience of GraphQL, I just want to make a simple application about books and author that covers all CRUD operations 
* GET
* POST
* PUT/PATCH
* DELETE

Just to get a hang of the syntax and behaviour, because I expect there will be a major blocker during the development process and there was... a lot ... 😑

---
## Writing queries 

Queries are fairly straight forward
```javascript
//query to get a specific book by providing the ID of that specific book 
const getSpecificBookQuery = gql`
  query getBookQuery($id: ID){
    book(id: $id) { // model name has to be exact 
      id            
      name
      genre
      author{       // relation has to be predefined in backend
        id
        name
        books {     // relation has to be predefined in backend
          name
        }
      }
    }
  }
`
```
 GraphQL takes in a string literal and you have to specify whether or not you are writing a query or a mutation (mutation all operations that changes data in database, POST, PUT/PATCH, DELETE). You have to provide the name to that query, I'm used this convention:

* getBookQuery
* getBooksQuery
* getAuthorQuery
* getAuthorsQuery

but I saw the official  [apollo query documentation](https://www.apollographql.com/docs/react/data/queries/) used this naming convention: ( probably gonna follow this convention for upcoming projects )
* GET_BOOK
* GET_BOOKS
* GET_AUTHOR
* GET_AUTHORS 

## Passing parameter to a query

```js
  query getBookQuery($id: ID){
```
In main purpose of this code is not passing a parameter to the query, but it is specifying the name of the parameter that is expected from the front end and the datatype of the parameter. 

```
$id //is the parameter name expected from the front end
ID //is the datatype of the parameter which is GraphQLID 
```
[GraphQL datatypes documentation](https://graphql.org/graphql-js/type/)

## Expected result of the query
```js
//json response
{
  "data": {
    "book": {
      "id": "5ddbbb2b8cbd3f2ac7126c95",
      "name": "Harry Potter ",
      "genre": "Fantasy",
      "author": {
        "id": "5ddbbb288cbd3f2ac7126c94",
        "name": "J K Rowling"
      }
    }
  }
}
```
If we are using a restful API, in order to get this data we have to query 2 time

* GET /book/:id
* GET /author/:id 

Starting to feel the power of GraphQL 😈 ? Imagine the possibility !!! 


---
## Invoking the query 
```js
const { loading, error, data } = useQuery(getSpecificBookQuery, {
  variables: {id: selectedBook.id}
});
```
You have to do all 3 object destructuring for: 
* loading 
* error
* data

I feel a bit constrained by this because I haven't found a good resource to explain why it has to be written in such way, but it breaks if you didn't destructure one of this bad boy. but, by complying to this rules allows us to do something rather cool like prompting a loading animation or prompting a error message like this 
```js
if(loading){
  return <LoadingAnimation /> 
}
if(error){
  return <ErrorMessage />
}
if(data.book){
  return <Book />
}
```
This three variable does not overlap with each other which means that there will not be a loading animation rendered while there's an error during the querying process or loading animation while the query result already retrieved, vice versa.. 🤩 

---
## Mutation 

This is by far the most challanging part of this project, as I explained above mutation is 

```
mutation all operations that changes data in database, POST, PUT/PATCH, DELETE 
//logical generalisation made by me, don't quote me on this.
```

---
## Writing a mutation 
```js
//mutation used to add a new book
const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!){
    addBook(name: $name, genre: $genre, authorId: $authorId){
      name
    }
  }
`
```

Just like writing a query you have to provide a string literal and provide a variable to it, but there's more to it in this case. 