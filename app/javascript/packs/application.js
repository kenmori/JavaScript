/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.slim

require('../../assets/stylesheets/application');
require('./Root.jsx');

if (process.env.NODE_ENV !== 'production') {
  const Immutable = require('immutable')
  const installDevTools = require('immutable-devtools')
  installDevTools(Immutable);

  const React = require('react')
  const { whyDidYouUpdate } = require('why-did-you-update')
  whyDidYouUpdate(React, { exclude: /./ }) // デフォルトでは対象から全コンポーネントを除外しておく
}