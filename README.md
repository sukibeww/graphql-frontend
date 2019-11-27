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

# Screenshots 
### BookList & BookInfo
![image](https://user-images.githubusercontent.com/42060507/69685126-67178e00-110f-11ea-8649-6d3ad87dd236.png)
 
### AddBook & AddAuthor & RemoveAuthor 
 ![image](https://user-images.githubusercontent.com/42060507/69685169-94643c00-110f-11ea-8119-9066acd7a2da.png)

### EditBook
![image](https://user-images.githubusercontent.com/42060507/69685218-c2498080-110f-11ea-82f0-8124ac1bc106.png)


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

## Disclaimer

This is my first experience ever working with GraphQL, I am not in anyway expert in any of this tech stack. I just have a functioning understanding of React and web application development. Please take all of the things that I wrote with a grain of salt and if you see any mistake feel free to leave me a message to correct me (pls). This project is purely passion project and completed with a ton of assumption and generalisation. 😅

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
  query getBookQuery($id: ID!){
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
  query getBookQuery($id: ID!){
```
In main purpose of this code is not passing a parameter to the query, but it is specifying the name of the parameter that is expected from the front end and the datatype of the parameter. The exclamation mark indicates that the particular param is strictly have to be comply to the defined datatype which in this case GraphQLID. 

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

Starting to feel the power of GraphQL 😈 ? Imagine the possibility !!! ( we can also query all of the books that are written by the author in the same query )
 
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
Mutation is all operations that changes data in database such as POST, PUT/PATCH, DELETE. 
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

Just like writing a query you have to provide a string literal and provide a variable to it, but there's more to it in this case. We are required to specify the mutation that is already written in the backend and it has to be exact! 

--- 
## Invoking a mutation

```js
//definition in functional component using hooks
const [addBook] = useMutation(addBookMutation);
```
```js 
//invoking the mutation
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
```

```values```  will be all of the information provided by form and  ```{ variables : {...}```  is apollo syntax to provide parameter to the mutation or query. The keys have to be the same as the variable defined in the mutation ```($name, $genre, $authorId) ``` 

#### refetchQueries 

This is one of the most powerful functionality of apollo, which is to refetch any specified query(s). If we are working with a Restful API we have to manually fetch the newly added or updated information in order to show the user that the mutation has successfully invoked, by refetching  ```getBooksQuery``` the newly created book will be displayed in the ```<Booklist /> ``` component in real-time without having to manually fetch the new information.

## Hurdles

#### Query in lifecycle method

I'm operating under the rule of "Do all of your fetch operation in ```componentDidMount``` or in this case ```useEffect```", but apollo didn't allow me invoke my queries in ```useEffect```. I did some research on it and stumble into an experimental solution called "React-suspense". I decided not to dig to deep into it because it's experimental solution and my solution works for the time being eventhough it's not ideal. 

#### Context vs Query

I'm fairly new to Context API and I used context's state to display some information in the past. This practice has proven to be conflicting practice with apollo, because of ```refetchQueries``` feature in mutation. I ended up displaying information from my queries instead of my context. 

#### Chaining mutation

This caused a major cluster headache for me, because of I couldn't find a resources to mutation relational data for this specific scenario 
```
If Author to be deleted, All of the books that is written by this Author should be deleted too
``` 
I assumed there has to be a more elegant solution to this other than chaining two mutation in a single operation, but alas... I have to settle with this solution for now.

## Conclusion 

Developing a front-end for a GraphQL API has proven to be a rather challanging experience. It simplifies a lot of scenario but it has some gimmick that complicates the development process. 

#### Pros
* Single endpoint 
* ```refetchQueries```
* Multilayered query
* Selective query  

#### Cons
* Documentation is a bit daunting
* Conflict with React lifecycle method

# Thank you for reading 😄