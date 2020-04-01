// import React from 'react';
// import ReactDOM from 'react-dom';
// import RecipeEdit from './Edit-Recipe';
// import { BrowserRouter } from 'react-router-dom';
// import renderer from "react-test-renderer";

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<BrowserRouter>
//     <RecipeEdit />
//   </BrowserRouter>, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

// it('renders the UI as expected', () => {
//   const tree = renderer.create(<BrowserRouter>
//     <RecipeEdit />
//   </BrowserRouter>)
//     .toJSON();
//   expect(tree).toMatchSnapshot();
// });