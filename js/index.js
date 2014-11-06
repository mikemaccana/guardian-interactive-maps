requirejs.config({
	// By default load any module IDs from js dir
	baseUrl: 'js'
});

requirejs([
	"agave",
	"polyfills",
	"text!/templates/gdp.mustache",
	"text!/json/gdpPerCountry.json",
	"text!/json/countries.geo.json",
	"ractive"
], function(agave, unused, gdpTemplate, gdpPerCountry, mapData, Ractive) {

	agave.enable('av');

	var query = function(selector) { return document.querySelector(selector) };
	var queryAll = function(selector) { return document.querySelectorAll(selector) };
	var log = console.log.bind(console)

	var BRIGHT_BLUE = '#21c6dd';

	gdpPerCountry = JSON.parse(gdpPerCountry)
	mapData = JSON.parse(mapData)

	// Our list of features includes all countries, we only care about the countries
	// with GDP
	mapDataRelevantFeatures = [];
	mapData.features.forEach(function(country){
		var found = gdpPerCountry.find(function(countryWithGDP){return ( countryWithGDP.code === country.id ) })
		if ( found ) {
			mapDataRelevantFeatures.push(country)
		}
	})
	mapData.features = mapDataRelevantFeatures

	window.mapData = mapData

	var gdpTableBinding = new Ractive({
		el: query('.gdp-table'),
		data: {
			countries: gdpPerCountry
		},
		template: gdpTemplate
	});

	var gdpData = gdpPerCountry.map(function(country){
		return {'code': country.code, 'value': country.gdp}
	})

	var chart = new Highcharts.Map({

		title: null,

		chart: {
			renderTo: query('.gdp-map')
		},

		mapNavigation: {
			enabled: true,
			buttonOptions: {
				verticalAlign: 'bottom'
			}
		},

		colorAxis: {
		},

		series : [{
			mapData: mapData,
			data : gdpData,
			joinBy: ['id', 'code'], // First is mapdata, second is data
			name: 'GDP per country',
			states: {
				hover: {
					color: BRIGHT_BLUE
				}
			},
			dataLabels: {
				enabled: true,
				format: '{point.name}'
			}
		}]
	});

})

