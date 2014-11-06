requirejs.config({
  // By default load any module IDs from js dir
  baseUrl: 'js'
});

requirejs(["agave", "text!/templates/gdp.mustache", "text!/json/gdpPerCountry.json", "ractive"], function(agave, gdpTemplate, gdpPerCountry, Ractive) {
  agave.enable('av');
  var $ = function(selector) { return document.querySelector(selector) };
  var $all = function(selector) { return document.querySelectorAll(selector) };
  NodeList.prototype.forEach = NodeList.prototype.forEach || Array.prototype.forEach;
  var log = console.log.bind(console)

  gdpPerCountry = JSON.parse(gdpPerCountry)

  var gdpTableBinding = new Ractive({
    el: $('.gdp-table'),
    data: {
      countries: gdpPerCountry
    },
    template: gdpTemplate
  })

})

