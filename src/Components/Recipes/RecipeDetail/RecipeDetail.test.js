import React from 'react';
import ReactDOM from 'react-dom';
import RecipeDetail from './Individual-Recipe';
import { BrowserRouter } from 'react-router-dom';
import renderer from "react-test-renderer";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter>
    <RecipeDetail />
  </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the UI as expected', () => {
  const tree = renderer.create(<BrowserRouter>
    <RecipeDetail />
  </BrowserRouter>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});