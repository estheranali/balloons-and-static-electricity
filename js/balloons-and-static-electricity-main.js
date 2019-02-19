// Copyright 2013-2019, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var BASEConstants = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloons-and-static-electricity/BASEConstants' );
  var BASEKeyboardHelpContent = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloons-and-static-electricity/view/BASEKeyboardHelpContent' );
  var BASEModel = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloons-and-static-electricity/model/BASEModel' );
  var BASEView = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloons-and-static-electricity/view/BASEView' );
  var Screen = require( 'JOIST/Screen' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );
  var Tandem = require( 'TANDEM/Tandem' );

  // strings
  var balloonsAndStaticElectricityTitleString = require( 'string!BALLOONS_AND_STATIC_ELECTRICITY/balloons-and-static-electricity.title' );

  SimLauncher.launch( function() {

    var tandem = Tandem.rootTandem;

    var simOptions = {
      credits: {
        leadDesign: 'Noah Podolefsky & Sam Reid',
        softwareDevelopment: 'Sam Reid, John Blanco',
        team: 'Wendy Adams, Jesse Greenberg, Trish Loeblein, Emily Moore, Ariel Paul,<br>Kathy Perkins, Taliesin Smith',
        qualityAssurance: 'Steele Dalton, Bryce Griebenow, Ethan Johnson, Elise Morgan,<br>Liam Mulhall, Oliver Orejola, ' +
                          'Benjamin Roberts, Jacob Romero, Bryan Yoelin',
        graphicArts: 'Sharon Siman-Tov',
        thanks: 'Thanks to Mobile Learner Labs for working with the PhET development team to convert this simulation to HTML5.'
      },
      accessibility: true,
      keyboardHelpNode: new BASEKeyboardHelpContent()
    };

    var balloonsAndStaticElectricityScreenTandem = tandem.createTandem( 'balloonsAndStaticElectricityScreen' );

    //Create and start the sim
    new Sim( balloonsAndStaticElectricityTitleString, [
      new Screen(
        function() {
          return new BASEModel(
            768,
            504,
            balloonsAndStaticElectricityScreenTandem.createTandem( 'balloonsAndStaticElectricityModel' ) );
        },
        function( model ) {
          return new BASEView(
            model,
            balloonsAndStaticElectricityScreenTandem.createTandem( 'balloonsAndStaticElectricityView' )
          );
        },
        {
          backgroundColorProperty: BASEConstants.backgroundColorProperty,
          tandem: balloonsAndStaticElectricityScreenTandem
        }
      )
    ], simOptions ).start();
  } );
} );
