#!/usr/bin/env node
var fs = require('fs'),
	csvParse = require('csv-parse'),
	agave = require('agave'),
	jsonFile = require('jsonfile'),
	twitter = require('twitter');

agave.enable()

var log = console.log.bind(console),
	deepLog = function(object) {
		console.log(JSON.stringify(object, null, 2))
	}

//We manually converted the file to utf8 from iso8895-1
var fileContents = fs.readFileSync('GDP.csv');

var INVALID_COUNTRY_CODES = ['WLD','LIC','MIC','LMC','UMC','LMY','EAP','ECA','LAC','MNA','SSA','HIC','EMU']

csvParse(fileContents, {}, function(err, output){

	log(err, output)

	if ( err ) {
		return
	}

	var cleaned = []

	output.forEach(function(entry){
		// Sample line:
		// USA,1,,United States," 16,800,000 ",,,,,
		var countryCode = entry[0]
		var country = entry[3].strip(' ')
		var gdp = entry[4].strip(' ').replace(/,/g, '')
		var validEntry = countryCode.length === 3 && ( ! INVALID_COUNTRY_CODES.contains(countryCode) ) && ( gdp !== '..' )
		if ( validEntry ) {
			cleaned.push({
				country: country,
				gdp: parseInt(gdp)
			})
		} else {
			log('WARNING: could not parse "', country, '" with GDP', gdp)
		}
	})

	jsonFile.writeFile('data/gdpPerCountry.json', cleaned, function(err) {
		if (err) {
			return log(err)
		}
		log(cleaned)
		log('Done!')
		process.exit(0)
	})

});
