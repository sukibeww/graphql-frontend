import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import SelectedBookProvider from './contexts/SelectedBookContext';

ReactDOM.render(<SelectedBookProvider><App /></SelectedBookProvider>, document.getElementById('root'));