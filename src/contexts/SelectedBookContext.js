import React, {createContext, Component} from 'react';

export const SelectedBook = createContext();

class SelectedBookProvider extends Component {
  state = {
    selectedBook: null,
    freshDelete: false
  }

  setBook = (book) =>{
    this.setState((prevState) => {
        return {
          selectedBook: book,
          freshDelete: prevState.freshDelete
        }
    } )
  }

  toggleFreshDelete = () => {
    this.setState((prevState) => {
      return {
        selectedBook: null,
        freshDelete: !prevState.freshDelete
      }
    })
  }

  resetFreshDelete = () => {
    this.setState((prevState) => {
      return {
        selectedBook: prevState.selectedBook,
        freshDelete: false
      }
    })
  }

  render() {
    return (
      <SelectedBook.Provider value={{...this.state, setBook: this.setBook, toggleFreshDelete: this.toggleFreshDelete, resetFreshDelete: this.resetFreshDelete}}>
        {this.props.children}
      </SelectedBook.Provider>
      );
  }
}

export default SelectedBookProvider;