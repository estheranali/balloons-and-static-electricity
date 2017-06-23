// Copyright 2017, University of Colorado Boulder

/**
 * Manages descriptions for the entire simulation Balloons and Static Electricity.  Has functions that put together
 * strings for descriptions that are used throughout several view types.
 * 
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var balloonsAndStaticElectricity = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloonsAndStaticElectricity' );
  var PlayAreaMap = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloons-and-static-electricity/model/PlayAreaMap' );
  var BASEA11yStrings = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloons-and-static-electricity/BASEA11yStrings' );

  // strings
  var leftShoulderOfSweaterString = BASEA11yStrings.leftShoulderOfSweaterString;
  var leftArmOfSweaterString = BASEA11yStrings.leftArmOfSweaterString;
  var bottomLeftEdgeOfSweaterString = BASEA11yStrings.bottomLeftEdgeOfSweaterString;

  var upperLeftSideOfSweaterString = BASEA11yStrings.upperLeftSideOfSweaterString;
  var leftSideOfSweaterString = BASEA11yStrings.leftSideOfSweaterString;
  var lowerLeftSideOfSweaterString = BASEA11yStrings.lowerLeftSideOfSweaterString;

  var upperRightSideOfSweaterString = BASEA11yStrings.upperRightSideOfSweaterString;
  var rightSideOfSweaterString = BASEA11yStrings.rightSideOfSweaterString;
  var lowerRightSideOfSweater = BASEA11yStrings.lowerRightSideOfSweater;

  var rightShoulderOfSweaterString = BASEA11yStrings.rightShoulderOfSweaterString;
  var rightArmOfSweaterString = BASEA11yStrings.rightArmOfSweaterString;
  var lowerRightArmOfSweaterString = BASEA11yStrings.lowerRightArmOfSweaterString;

  var upperLeftSideOfPlayAreaString = BASEA11yStrings.upperLeftSideOfPlayAreaString;
  var leftSideOfPlayAreaString = BASEA11yStrings.leftSideOfPlayAreaString;
  var lowerLeftSideOfPlayAreaString = BASEA11yStrings.lowerLeftSideOfPlayAreaString;

  var upperCenterOfPlayAreaString = BASEA11yStrings.upperCenterOfPlayAreaString;
  var centerOfPlayAreaString = BASEA11yStrings.centerOfPlayAreaString;
  var lowerCenterOfPlayAreaString = BASEA11yStrings.lowerCenterOfPlayAreaString;

  var upperRightSideOfPlayAreaString = BASEA11yStrings.upperRightSideOfPlayAreaString;
  var rightSideOfPlayAreaString = BASEA11yStrings.rightSideOfPlayAreaString;
  var lowerRightSideOfPlayAreaString = BASEA11yStrings.lowerRightSideOfPlayAreaString;

  var upperWallString = BASEA11yStrings.upperWallString;
  var wallString = BASEA11yStrings.wallString;
  var lowerWallString = BASEA11yStrings.lowerWallString;

  var upperRightEdgeOfPlayAreaString = BASEA11yStrings.upperRightEdgeOfPlayAreaString;
  var rightEdgeOfPlayArea = BASEA11yStrings.rightEdgeOfPlayArea;
  var lowerRightEdgeOfPlayArea = BASEA11yStrings.lowerRightEdgeOfPlayArea;

  // constants
  var locationDescriptionMap = {
    LEFT_ARM: {
      UPPER_PLAY_AREA: leftShoulderOfSweaterString,
      CENTER_PLAY_AREA: leftArmOfSweaterString,
      LOWER_PLAY_AREA: bottomLeftEdgeOfSweaterString
    },
    LEFT_SIDE_OF_SWEATER: {
      UPPER_PLAY_AREA: upperLeftSideOfSweaterString,
      CENTER_PLAY_AREA: leftSideOfSweaterString,
      LOWER_PLAY_AREA: lowerLeftSideOfSweaterString
    },
    RIGHT_SIDE_OF_SWEATER: {
      UPPER_PLAY_AREA: upperRightSideOfSweaterString,
      CENTER_PLAY_AREA: rightSideOfSweaterString,
      LOWER_PLAY_AREA: lowerRightSideOfSweater
    },
    RIGHT_ARM: {
      UPPER_PLAY_AREA: rightShoulderOfSweaterString,
      CENTER_PLAY_AREA: rightArmOfSweaterString,
      LOWER_PLAY_AREA: lowerRightArmOfSweaterString
    },
    LEFT_PLAY_AREA: {
      UPPER_PLAY_AREA: upperLeftSideOfPlayAreaString,
      CENTER_PLAY_AREA: leftSideOfPlayAreaString,
      LOWER_PLAY_AREA: lowerLeftSideOfPlayAreaString
    },
    CENTER_PLAY_AREA: {
      UPPER_PLAY_AREA: upperCenterOfPlayAreaString,
      CENTER_PLAY_AREA: centerOfPlayAreaString,
      LOWER_PLAY_AREA: lowerCenterOfPlayAreaString
    },
    RIGHT_PLAY_AREA: {
      UPPER_PLAY_AREA: upperRightSideOfPlayAreaString,
      CENTER_PLAY_AREA: rightSideOfPlayAreaString,
      LOWER_PLAY_AREA: lowerRightSideOfPlayAreaString
    },
    WALL: {
      UPPER_PLAY_AREA: upperWallString,
      CENTER_PLAY_AREA: wallString,
      LOWER_PLAY_AREA: lowerWallString
    },
    RIGHT_EDGE: {
      UPPER_PLAY_AREA: upperRightEdgeOfPlayAreaString,
      CENTER_PLAY_AREA: rightEdgeOfPlayArea,
      LOWER_PLAY_AREA: lowerRightEdgeOfPlayArea
    }
  };

  function BalloonsAndStaticElectricityDescriber() {
    // TODO: Does this really need a type? Or can it be a static Object?
  }

  balloonsAndStaticElectricity.register( 'BalloonsAndStaticElectricityDescriber', BalloonsAndStaticElectricityDescriber );

  return inherit( Object, BalloonsAndStaticElectricityDescriber, {}, {

    /**
     * Get the location description for the balloon. This is not a full description, but a short
     * descsription. Regions are defined in PlayAreaMap.  This will get called very often and needs to be quick.
     * 
     * @param {Vector2} location - location of the balloon, relative to its center
     * @return {string}
     */
    getLocationDescription: function( location, wallVisible ) {

      var columns = PlayAreaMap.COLUMN_RANGES;
      var rows = PlayAreaMap.ROW_RANGES;

      // loop through keys manually to prevent a many closures from being created during object iteration in 'for in'
      // loops
      var columnsKeys = Object.keys( columns );
      var rowKeys = Object.keys( rows );

      var currentColumn;
      var currentRow;
      var i;
      for ( i = 0; i < columnsKeys.length; i++ ) {
        if ( columns[ columnsKeys[ i ] ].contains( location.x ) ) {
          currentColumn = columnsKeys[ i ];
        }
      }

      for ( i = 0; i < rowKeys.length; i++ ) {
        if ( rows[ rowKeys[ i ] ].contains( location.y ) ) {
          currentRow = rowKeys[ i ];
        }
      }
      assert && assert( currentColumn && currentRow, 'balloon should be in a row or column of the play area' );

      // the wall and the right edge of the play area overlap, so if the wall is visible, chose that description
      if ( wallVisible && currentColumn === 'RIGHT_EDGE' ) {
        currentColumn = 'WALL';
      }

      return locationDescriptionMap[ currentColumn ][ currentRow ];
    },
  } );
} );