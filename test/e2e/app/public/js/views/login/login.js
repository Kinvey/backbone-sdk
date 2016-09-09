(function(root, _, $, Backbone, Kinvey) {
  root.LoginView = Backbone.Layout.extend({
    template: '/login/login.html',
    el: 'main',

    events: {
      'submit #loginForm': 'login',
      'submit #loginWithMICForm': 'loginWithMIC',
    },

    bindings: {
      '#username': 'username',
      '#password': 'password'
    },

    model: root.User,

    login: function(event) {
      event.preventDefault();
      this.model.login(this.model.get('username'), this.model.get('password'));
    },

    loginWithMIC: function(event) {
      event.preventDefault();
      this.model.loginWithMIC('http://localhost:3000', Kinvey.AuthorizationGrant.AuthorizationCodeLoginPage);
    }
  });
})(window, window._, window.$, window.Backbone, window.Kinvey);
