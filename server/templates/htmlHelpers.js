const createSkeleton = (body, scripts) => `
<!DOCTYPE html>
<html>
  <head>
  <title>Silverspoon Proxy</title>
</head>
<body>
  <script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
  <div id="AppMain">
    ${body}
    ${scripts}
  </div>
</body>
</html>
`;

const createBody = (about, reservation, menu, review) => `
  <div id="about">${about}</div>
  <div id="reservation">${reservation}</div>
  <div id="menu">${menu}</div>
  <div id="reviews">${review}</div>
`;

const hydrateComps = (about, reservation, menu, review) => `
  <script src='res-bundle.js'></script>
  <script>
ReactDOM.hydrate(
  React.createElement(${reservation}, { name: "restaurant10800000" }),
  document.getElementById('reservation')
);
  </script>
`;

module.exports = {
  createSkeleton,
  createBody,
  hydrateComps,
};
