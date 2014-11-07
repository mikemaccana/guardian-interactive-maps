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

	var BRIGHT_BLUE = '#21c6dd';

	gdpData = [
    {
        "value": 438,
        "code": "nj"
    },
    {
        "value": 387.35,
        "code": "ri"
    },
    {
        "value": 312.68,
        "code": "ma"
    },
    {
        "value": 271.4,
        "code": "ct"
    },
    {
        "value": 209.23,
        "code": "md"
    },
    {
        "value": 195.18,
        "code": "ny"
    },
    {
        "value": 154.87,
        "code": "de"
    },
    {
        "value": 114.43,
        "code": "fl"
    },
    {
        "value": 107.05,
        "code": "oh"
    },
    {
        "value": 105.8,
        "code": "pa"
    },
    {
        "value": 86.27,
        "code": "il"
    },
    {
        "value": 83.85,
        "code": "ca"
    },
    {
        "value": 72.83,
        "code": "hi"
    },
    {
        "value": 69.03,
        "code": "va"
    },
    {
        "value": 67.55,
        "code": "mi"
    },
    {
        "value": 65.46,
        "code": "in"
    },
    {
        "value": 63.8,
        "code": "nc"
    },
    {
        "value": 54.59,
        "code": "ga"
    },
    {
        "value": 53.29,
        "code": "tn"
    },
    {
        "value": 53.2,
        "code": "nh"
    },
    {
        "value": 51.45,
        "code": "sc"
    },
    {
        "value": 39.61,
        "code": "la"
    },
    {
        "value": 39.28,
        "code": "ky"
    },
    {
        "value": 38.13,
        "code": "wi"
    },
    {
        "value": 34.2,
        "code": "wa"
    },
    {
        "value": 33.84,
        "code": "al"
    },
    {
        "value": 31.36,
        "code": "mo"
    },
    {
        "value": 30.75,
        "code": "tx"
    },
    {
        "value": 29,
        "code": "wv"
    },
    {
        "value": 25.41,
        "code": "vt"
    },
    {
        "value": 23.86,
        "code": "mn"
    },
    {
        "value": 23.42,
        "code": "ms"
    },
    {
        "value": 20.22,
        "code": "ia"
    },
    {
        "value": 19.82,
        "code": "ar"
    },
    {
        "value": 19.4,
        "code": "ok"
    },
    {
        "value": 17.43,
        "code": "az"
    },
    {
        "value": 16.01,
        "code": "co"
    },
    {
        "value": 15.95,
        "code": "me"
    },
    {
        "value": 13.76,
        "code": "or"
    },
    {
        "value": 12.69,
        "code": "ks"
    },
    {
        "value": 10.5,
        "code": "ut"
    },
    {
        "value": 8.6,
        "code": "ne"
    },
    {
        "value": 7.03,
        "code": "nv"
    },
    {
        "value": 6.04,
        "code": "id"
    },
    {
        "value": 5.79,
        "code": "nm"
    },
    {
        "value": 3.84,
        "code": "sd"
    },
    {
        "value": 3.59,
        "code": "nd"
    },
    {
        "value": 2.39,
        "code": "mt"
    },
    {
        "value": 1.96,
        "code": "wy"
    },
    {
        "value": 0.42,
        "code": "ak"
    }
]

	gdpData.forEach(function (datum) {
    datum.code = datum.code.toUpperCase();
  });

	window.gdpData = gdpData

	var chart = new Highcharts.Map({

		chart : {
			borderWidth : 1,
			renderTo: query('.gdp-map')
		},

		title : {
			text : 'US population density (/km²)'
		},

		legend: {
			layout: 'horizontal',
			borderWidth: 0,
			backgroundColor: 'rgba(255,255,255,0.85)',
			floating: true,
			verticalAlign: 'top',
			y: 25
		},

		mapNavigation: {
			enabled: true
		},

		colorAxis: {
			min: 1,
			type: 'logarithmic',
			minColor: '#EEEEFF',
			maxColor: '#000022',
			stops: [
				[0, '#EFEFFF'],
				[0.67, '#4444FF'],
				[1, '#000022']
			]
		},

		series : [{
			animation: {
				duration: 1000
			},
			data : gdpData,
			mapData: Highcharts.maps['countries/us/us-all'],
			joinBy: ['postal-code', 'code'],
			dataLabels: {
				enabled: true,
				color: 'white',
				format: '{point.code}'
			},
			name: 'Population density',
			tooltip: {
				pointFormat: '{point.code}: {point.value}/km²'
			}
		}]
	});

	// And the easy part: the table.
	var gdpTableBinding = new Ractive({
		el: query('.gdp-table'),
		data: {
			countries: gdpData
		},
		template: gdpTemplate
	});


})

