import './Navigation.scss';

export const Navigation = (() => {

  const events = {
    onButtonClick: function () {

      document.body.addEventListener('click', function (evt) {
        if (evt.target.className === 'Navigation__button') {
          console.log('=>', evt);

        }
      }, false);

    }
  };

  const methods = {
    initialize: function () {
      events.onButtonClick();
    },
    showSubmenu: function () {
      console.log('mostrar submenu');

    }
  };

  return {
    init: methods.initialize
  }
})();