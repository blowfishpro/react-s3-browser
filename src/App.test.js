import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const appStore = {
    isLoading: true,
    isLoaded: false,
    isError: false,
  };

  ReactDOM.render(<App sortStore={{}} appStore={appStore} sortClassDeterminator={jest.fn()} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
