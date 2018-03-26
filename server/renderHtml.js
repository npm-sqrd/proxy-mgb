const React = require('react');
const ReactDOM = require('react-dom/server');
const { createSkeleton, createBody, hydrateComps } = require('./templates/htmlHelpers');

const renderComponents = (response, bundle) => {
  const comp = React.createElement(bundle);
  const compStr = ReactDOM.renderToString(comp);
  response.statusCode = 200;
  response.end(createSkeleton(
    createBody('ABOUT', compStr, 'MENU', 'REVIEWS'),
    hydrateComps('', 'Reservation', '', ''),
  ));
};

module.exports = renderComponents;
