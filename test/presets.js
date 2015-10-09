/*jshint node:true, mocha:true */

'use strict';

require('should');

var Decimal = require('linear-arbitrary-precision')(require('floating-adapter'));
var rescale = require('rescale')(Decimal).rescale;
var velocity = require('linear-preset-factory')(require('../src/linear-presets-velocity'));

function convert(x, preset) {
  return Number(rescale(preset[0], preset[1], x));
}

function invert(preset) {
  return preset.slice(0).reverse();
}

describe('velocity presets', function() {
  it('should convert correctly', function() {
    (100/9.58).should.be.exactly(convert(100/9.58, invert(velocity.metresSecond_metresSecond)), 'metresSecond_metresSecond')
      .and.exactly(convert(23.35006567906474, invert(velocity.metresSecond_milesHour)), 'metresSecond_milesHour')
      .and.exactly(convert(34.24676299596162, invert(velocity.metresSecond_feetSecond)), 'metresSecond_feetSecond')
      .and.exactly(convert(37.578288100208766, invert(velocity.metresSecond_kilometresHour)), 'metresSecond_kilometresHour')
      .and.exactly(convert(20.290652321926984, invert(velocity.metresSecond_knot)), 'metresSecond_knot');

    (0).should.be.exactly(convert(0, velocity.metresSecond_metresSecond), 'metresSecond_metresSecond')
      .and.exactly(convert(0, velocity.metresSecond_milesHour), 'metresSecond_milesHour')
      .and.exactly(convert(0, velocity.metresSecond_feetSecond), 'metresSecond_feetSecond')
      .and.exactly(convert(0, velocity.metresSecond_kilometresHour), 'metresSecond_kilometresHour')
      .and.exactly(convert(0, velocity.metresSecond_knot), 'metresSecond_knot');
  });
});
