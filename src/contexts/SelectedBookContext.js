import React, {createContext, Component} from 'react';

export const SelectedBook = createContext();

class SelectedBookProvider extends Component {
  state = {
    selectedBook: null,
    freshDelete: false,
    editMode: false,
    authorsList: null
  }

  setAuthorlist = (authors) =>{ 
    this.setState((prevState) => {
      return{ 
        selectedBook: prevState.selectedBook,
        freshDelete: prevState.freshDelete,
        editMode: prevState.editMode,
        authorsList: authors
      }
    })
  }

  setBook = (book) =>{
    this.setState((prevState) => {
        return {
          selectedBook: book,
          freshDelete: prevState.freshDelete,
          editMode: false,
          authorsList: prevState.authorsList
        }
    } )
  }

  toggleFreshDelete = () => {
    this.setState((prevState) => {
      return {
        selectedBook: null,
        freshDelete: !prevState.freshDelete,
        editMode: false,
        authorsList: prevState.authorsList
      }
    })
  }

  toggleEditMode = () => {
    this.setState((prevState) => {
      return {
        selectedBook: prevState.selectedBook,
        freshDelete: !prevState.freshDelete,
        editMode: !prevState.editMode,
        authorsList: prevState.authorsList
      }
    })
  }

  resetFreshDelete = () => {
    this.setState((prevState) => {
      return {
        selectedBook: prevState.selectedBook,
        freshDelete: false,
        editMode: false,
        authorsList: prevState.authorsList
      }
    })
  }

  render() {
    return (
      <SelectedBook.Provider value={{...this.state, setBook: this.setBook, toggleFreshDelete: this.toggleFreshDelete, resetFreshDelete: this.resetFreshDelete, toggleEditMode: this.toggleEditMode}}>
        {this.props.children}
      </SelectedBook.Provider>
      );
  }
}

export default SelectedBookProvider;