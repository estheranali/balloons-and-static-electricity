// Copyright 2017, University of Colorado Boulder

/**
 * A map of the 2D play area for this simulation.  The play area includes anywhere that the Balloons can move about, so it
 * contains the entire bounds of the model.  This map is used for accessibility to generate descriptions about where
 * the balloons are as they move about the play area.  There are also critical landmarks that describe where
 * the balloon is.
 * 
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var balloonsAndStaticElectricity = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloonsAndStaticElectricity' );
  var Range = require( 'DOT/Range' );

  // constants
  var LANDMARK_WIDTH = 20;

  // critical x locations for the balloon (relative to the balloon's center)
  var X_LOCATIONS = {
    AT_LEFT_EDGE: 67,
    AT_NEAR_SWEATER: 393,
    AT_CENTER_PLAY_AREA: 507,
    AT_NEAR_WALL: 596,
    AT_WALL: 621,
    AT_NEAR_RIGHT_EDGE: 676,
    AT_RIGHT_EDGE: 701
  };

  // critical y locations for the balloon (relative to the balloon's center)
  var Y_LOCATIONS = {
    AT_TOP: 111,
    AT_BOTTOM: 393,
    AT_CENTER_PLAY_AREA: 249
  };

  var LANDMARK_RANGES = {
    AT_LEFT_EDGE: new Range( X_LOCATIONS.AT_LEFT_EDGE - LANDMARK_WIDTH / 2, X_LOCATIONS.AT_LEFT_EDGE + LANDMARK_WIDTH / 2 ),
    AT_NEAR_SWEATER: new Range( X_LOCATIONS.AT_NEAR_SWEATER - LANDMARK_WIDTH / 2, X_LOCATIONS.AT_NEAR_SWEATER + LANDMARK_WIDTH / 2 ),
    AT_CENTER_PLAY_AREA: new Range( X_LOCATIONS.AT_CENTER_PLAY_AREA - LANDMARK_WIDTH / 2, X_LOCATIONS.AT_CENTER_PLAY_AREA + LANDMARK_WIDTH / 2 ),
    AT_NEAR_WALL: new Range( X_LOCATIONS.AT_NEAR_WALL - LANDMARK_WIDTH / 2, X_LOCATIONS.AT_NEAR_WALL + LANDMARK_WIDTH / 2 ),
    AT_WALL: new Range( X_LOCATIONS.AT_WALL - LANDMARK_WIDTH / 2, X_LOCATIONS.AT_WALL + LANDMARK_WIDTH / 2 ),
    AT_NEAR_RIGHT_EDGE: new Range( X_LOCATIONS.AT_NEAR_RIGHT_EDGE - LANDMARK_WIDTH / 2, X_LOCATIONS.AT_NEAR_RIGHT_EDGE + LANDMARK_WIDTH / 2 ),
    AT_RIGHT_EDGE: new Range( X_LOCATIONS.AT_RIGHT_EDGE - LANDMARK_WIDTH / 2, X_LOCATIONS.AT_RIGHT_EDGE + LANDMARK_WIDTH / 2 )
  };

  var COLUMN_RANGES = {
    LEFT_ARM: new Range( -Number.MAX_VALUE, 138 ),
    LEFT_SIDE_OF_SWEATER: new Range( 138, 203 ),
    RIGHT_SIDE_OF_SWEATER: new Range( 203, 270 ),
    RIGHT_ARM: new Range( 270, 335 ),
    LEFT_PLAY_AREA: new Range( 335, 467 ),
    CENTER_PLAY_AREA: new Range( 467, 544 ),
    RIGHT_PLAY_AREA: new Range( 544, 676 ),
    RIGHT_EDGE: new Range( 676, Number.MAX_VALUE )
  };

  var ROW_RANGES = {
    UPPER_PLAY_AREA: new Range( -Number.MAX_VALUE, 172 ),
    CENTER_PLAY_AREA: new Range( 172, 326 ),
    LOWER_PLAY_AREA: new Range( 326, Number.MAX_VALUE )
  };

  var PlayAreaMap = {
    X_LOCATIONS: X_LOCATIONS,
    Y_LOCATIONS: Y_LOCATIONS,
    COLUMN_RANGES: COLUMN_RANGES,
    ROW_RANGES: ROW_RANGES,
    LANDMARK_RANGES: LANDMARK_RANGES,
    WIDTH: 768,
    HEIGHT: 504,

    /**
     * Get the column of the play area for the a given location in the model, including landmark locations.
     * 
     * @param  {Vector2} location
     * @return {string}         
     */
    getPlayAreaColumn: function( location, wallVisible ) {
      var columns = COLUMN_RANGES;
      var landmarks = LANDMARK_RANGES;
      var columnsAndLandmarks = _.extend( columns, landmarks );

      // loop through keys manually to prevent a many closures from being created during object iteration in 'for in'
      // loops
      var columnsKeys = Object.keys( columns );
      columnsKeys = columnsKeys.concat( Object.keys( landmarks ) );

      var column;
      for ( var i = 0; i < columnsKeys.length; i++ ) {
        if ( columnsAndLandmarks[ columnsKeys[ i ] ].contains( location.x ) ) {
          column = columnsKeys[ i ];
        }
      }
      assert && assert( column, 'object should be in a column of the play area' );

      // the wall and the right edge of the play area overlap, so if the wall is visible, chose that description
      if ( wallVisible && column === 'RIGHT_EDGE' ) {
        column = 'WALL';
      }

      return column;
    },

    /**
     * Get a row in the play area that contains the location in the model.
     * 
     * @param  {Vector2} location 
     * @return {strint}
     */
    getPlayAreaRow: function( location ) {
      var rows = PlayAreaMap.ROW_RANGES;

      // loop through keys manually to prevent a many closures from being created during object iteration in 'for in' loops
      var rowKeys = Object.keys( rows );

      var row;
      var i;
      for ( i = 0; i < rowKeys.length; i++ ) {
        if ( rows[ rowKeys[ i ] ].contains( location.y ) ) {
          row = rowKeys[ i ];
        }
      }
      assert && assert( row, 'item should be in a row of the play area' );

      return row;
    },

    inLandmarkColumn: function( location ) {
      var landmarks = PlayAreaMap.LANDMARK_RANGES;

      // loop through keys manually to prevent many closures from being created during object iteration in for loops
      var landmarkKeys = Object.keys( landmarks );
      var inLandmarkColumn = false;
      for( var i = 0; i < landmarkKeys.length; i++ ) {
        if ( landmarks[ landmarkKeys[ i ] ].contains( location.x ) ) {
          inLandmarkColumn = true;
          break;
        }
      }

      return inLandmarkColumn;
    }
  };

  balloonsAndStaticElectricity.register( 'PlayAreaMap', PlayAreaMap );

  return PlayAreaMap;
} );
