/*=========================================================================================
  File Name: form-validation.js
  Description: jquery bootstrap validation js
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: PIXINVENT
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

$(function () {
  'use strict';

  var pageLoginForm = $('.auth-login-form');

  // jQuery Validation
  // --------------------------------------------------------------------
  if (pageLoginForm.length) {
    pageLoginForm.validate({
      /*
      * ? To enable validation onkeyup
      onkeyup: function (element) {
        $(element).valid();
      },*/
      /*
      * ? To enable validation on focusout
      onfocusout: function (element) {
        $(element).valid();
      }, */
      rules: {
        'login-email': {
          required: true,
          email: true
        },
        'login-password': {
          required: true
        }
      }
    });
  }

  // Password toggle functionality
  // --------------------------------------------------------------------
  $('.form-password-toggle .input-group-text').on('click', function (e) {
    e.preventDefault();
    var $this = $(this);
    var $input = $this.prev('.form-control');

    if ($input.attr('type') === 'password') {
      $input.attr('type', 'text');
      $this.find('i').attr('data-feather', 'eye-off');
    } else {
      $input.attr('type', 'password');
      $this.find('i').attr('data-feather', 'eye');
    }

    // Refresh Feather icons
    if (typeof feather !== 'undefined') {
      feather.replace();
    }
  });
});