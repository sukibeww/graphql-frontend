import React, {createContext, Component} from 'react';

export const SelectedBook = createContext();

class SelectedBookProvider extends Component {
  state = {
    selectedBook: null,
    freshDelete: false,
    editMode: false
  }

  setBook = (book) =>{
    this.setState((prevState) => {
        return {
          selectedBook: book,
          freshDelete: prevState.freshDelete,
          editMode: false
        }
    } )
  }

  toggleFreshDelete = () => {
    this.setState((prevState) => {
      return {
        selectedBook: null,
        freshDelete: !prevState.freshDelete,
        editMode: false
      }
    })
  }

  toggleEditMode = () => {
    this.setState((prevState) => {
      return {
        selectedBook: prevState.selectedBook,
        freshDelete: !prevState.freshDelete,
        editMode: !prevState.editMode
      }
    })
  }

  resetFreshDelete = () => {
    this.setState((prevState) => {
      return {
        selectedBook: prevState.selectedBook,
        freshDelete: false,
        editMode: false
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