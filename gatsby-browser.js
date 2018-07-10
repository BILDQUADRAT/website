const ReactDOM = require('react-dom');

exports.replaceHydrateFunction = () => {
  return (element, container, callback) => {
    container.classList.add('bq-root');
    ReactDOM.render(element, container, callback);
  };
};
