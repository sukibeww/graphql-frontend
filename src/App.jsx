import React from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import styled from 'styled-components';

//components
import Booklist from './components/Booklist';
import AddBook from './components/AddBook';
import AddAuthor from './components/AddAuthor';

//styled components 
const StyledHeader = styled.h1`
  font-family: 'Nunito', sans-serif;
  color: #E535AB;
  font-size: 3rem;
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
`
//apollo client setup
//PROPERLY PROVIDE THE URI AND IT'S URI NOT URL

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
})

function App() {
  return (
    <ApolloProvider client={client}>
      <StyledWrapper className="main">
        <StyledHeader>My reading list</StyledHeader>
        <Booklist />
        <FormWrapper>
          <AddBook />
          <AddAuthor />
        </FormWrapper>
        
      </StyledWrapper>
    </ApolloProvider>
  );
}

export default App;
