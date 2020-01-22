import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const directoriesStore = {
    hasDirectories: false,
    error: false,
    directories: [],
  };

  ReactDOM.render(<App sortStore={{}} directoriesStore={directoriesStore} sortClassDeterminator={jest.fn()} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
