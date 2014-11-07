requirejs.config({
	// By default load any module IDs from js dir
	baseUrl: 'js'
});

requirejs([
	"agave",
	"polyfills",
	"text!/templates/gdp.mustache",
	"text!/json/gdpPerCountry.json",
	"ractive"
], function(agave, unused, gdpTemplate, gdpData, Ractive) {
	gdpData = JSON.parse(gdpData)

	agave.enable('av');

	var query = function(selector) { return document.querySelector(selector) };
	var queryAll = function(selector) { return document.querySelectorAll(selector) };
	var log = console.log.bind(console)

	var COLORS = {
		brightBlue: '#21c6dd',
		paleBlue: '#EEEEFF',
		darkBlue: '#000022'
	}

	// Hack as documentation for keypaths within Highmaps joinBy is lacking
	Highcharts.maps['custom/world'].features.forEach(function(feature){
		feature.realID = feature.properties['iso-a3']
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

		credits: {
			enabled: false
		},

		colorAxis: {
			min: 1,
			type: 'logarithmic',
			minColor: COLORS.paleBlue,
			maxColor: COLORS.darkBlue
		},

		series : [{
			mapData: Highcharts.maps['custom/world'],
			data : gdpData,
			// http://api.highcharts.com/highmaps#plotOptions.map.joinBy
			// the first points to a key in the mapData, and the second points to another key in the data
			joinBy: ['realId', 'id'],
			name: 'GDP per country',
			states: {
				hover: {
					color: COLORS.brightBlue
				}
			},
			dataLabels: {
				enabled: false
			}
		}]
	});

	// And the easy part: the table.
	var gdpTableBinding = new Ractive({
		el: query('.gdp-table'),
		data: {
			countries: gdpData,
			commaSeperate: function numberWithCommas(x) {
				return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			}
		},
		template: gdpTemplate
	});


})

