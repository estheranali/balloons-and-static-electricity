// Copyright 2013-2019, University of Colorado Boulder

/**
 * Main model container, which has wall, balloons & sweater.
 *
 * @author Vasily Shakhov (Mlearner.com)
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg(PhET Interactive Simulations)
 */

import Property from '../../../../axon/js/Property.js';
import PropertyIO from '../../../../axon/js/PropertyIO.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import inherit from '../../../../phet-core/js/inherit.js';
import StringIO from '../../../../tandem/js/types/StringIO.js';
import balloonsAndStaticElectricity from '../../balloonsAndStaticElectricity.js';
import BalloonModel from './BalloonModel.js';
import PlayAreaMap from './PlayAreaMap.js';
import ScanningPropertySet from './ScanningPropertySet.js';
import SweaterModel from './SweaterModel.js';
import WallModel from './WallModel.js';

/**
 * Constructor for main model for the Balloons and Static Electricity sim.
 * @param {number} width
 * @param {number} height
 * @param {Tandem} tandem
 */
function BASEModel( width, height, tandem ) {

  // @public {string} - charge visibility setting, valid values of 'all', 'none', 'diff'
  this.showChargesProperty = new Property( 'all', {
    tandem: tandem.createTandem( 'showChargesProperty' ),
    phetioType: PropertyIO( StringIO )
  } );

  // @public {boolean} - whether or not the two balloons are considered 'next to' each other, primarily used for a11y
  this.balloonsAdjacentProperty = new Property( false );

  // @public (read-only)
  this.width = width;
  this.height = height;

  // @public {read-only}
  this.wallWidth = 80;

  // @public (read-only) - Model of the sweater, position empirically determined to match design
  this.sweater = new SweaterModel( 25, 20, tandem.createTandem( 'sweater' ) );

  // @public
  this.playAreaBounds = new Bounds2( 0, 0, width - this.wallWidth, height );
  this.yellowBalloon = new BalloonModel( 440, 100, this, true, tandem.createTandem( 'yellowBalloon' ) );
  this.greenBalloon = new BalloonModel( 380, 130, this, false, tandem.createTandem( 'greenBalloon' ) );

  // assign 'other' balloon references
  this.yellowBalloon.other = this.greenBalloon;
  this.greenBalloon.other = this.yellowBalloon;

  // @public - set of Properties that indicate where the user is while scanning for objects in the play area
  this.scanningPropertySet = new ScanningPropertySet();

  // @public (read-only) - Model of the wall
  this.wall = new WallModel( width - this.wallWidth, this.wallWidth, height, this.yellowBalloon, this.greenBalloon, tandem.createTandem( 'wall' ) );

  // when the wall changes visibility, the balloons could start moving if they have charge and are near the wall
  const self = this;
  this.wall.isVisibleProperty.link( function( isVisible ) {

    // update the model bounds
    const newWidth = isVisible ? width - self.wallWidth : width;
    self.playAreaBounds.setMaxX( newWidth );
  } );

  // add listeners to each balloon
  this.balloons.forEach( function( balloon ) {

    // when the balloon positions change, update the closest charge in the wall
    balloon.positionProperty.link( function( position ) {

      // find the closest charge in the wall
      balloon.closestChargeInWall = self.wall.getClosestChargeToBalloon( balloon );

      // update whether or not the two balloons are close to each other
      self.balloonsAdjacentProperty.set( self.getBalloonsAdjacent() );

      // update the balloon play area row and column
      balloon.playAreaRowProperty.set( PlayAreaMap.getPlayAreaRow( balloon.getCenter(), self.wall.isVisibleProperty.get() ) );
      balloon.playAreaColumnProperty.set( PlayAreaMap.getPlayAreaColumn( balloon.getCenter() ) );
      balloon.playAreaLandmarkProperty.set( PlayAreaMap.getPlayAreaLandmark( balloon.getCenter() ) );
    } );

    // when wall visibility changes, update the Properties indicating induced charge and which charges are visible
    self.wall.isVisibleProperty.link( function( isVisible ) {
      balloon.touchingWallProperty.set( balloon.touchingWall() );
    } );

    // update whether the balloon is currently inducing charge in the wall
    Property.multilink( [ self.wall.isVisibleProperty, balloon.positionProperty ], function( wallVisible, position ) {
      balloon.inducingChargeProperty.set( balloon.inducingCharge( wallVisible ) );
    } );
  } );

  this.reset();
}

balloonsAndStaticElectricity.register( 'BASEModel', BASEModel );

inherit( Object, BASEModel, {

  /**
   * Get all of the ballons in an array, for ease of iterating over them.
   * @returns {BalloonModel[]}
   */
  get balloons() {
    return [ this.yellowBalloon, this.greenBalloon ];
  },

  // Called by the animation loop
  step: function( dt ) {
    const self = this;

    this.balloons.forEach( function( balloon ) {
      if ( balloon.isVisibleProperty.get() ) {
        balloon.step( self, dt );
      }
    } );
  },

  // Reset the entire model
  reset: function() {

    //Reset the properties in this model
    this.showChargesProperty.reset();

    //Reset balloons, resetChildren don't get them
    this.balloons.forEach( function( balloon ) {
      balloon.reset();
    } );

    this.sweater.reset();
    this.wall.reset();
  },

  /**
   * Return true when both balloons are visible.
   * @public
   *
   * @returns {boolean}
   */
  bothBalloonsVisible: function() {
    return this.greenBalloon.isVisibleProperty.get() && this.yellowBalloon.isVisibleProperty.get();
  },

  /**
   * Returns true when both balloons are visible and adjacent to each other.
   *
   * @returns {boolean}
   */
  getBalloonsAdjacent: function() {
    const balloonsAdjacent = ( this.yellowBalloon.getCenter().minus( this.greenBalloon.getCenter() ).magnitude ) < BalloonModel.BALLOON_WIDTH;
    return balloonsAdjacent && this.bothBalloonsVisible();
  },

  /**
   * Check if a balloon is outside world borders and return it to border if outside.
   *
   * @param {Vector2} position
   * @param {number} objWidth - width of balloon
   * @param {number} objHeight - height of balloon
   *
   * @returns {[type]} [description]
   */
  checkBalloonRestrictions: function( position, objWidth, objHeight ) {

    //flag to check if we outside borders
    let isOutBounds = false;

    // if wall visible, right bound will be smaller by width of wall
    const rightBound = this.playAreaBounds.width;

    //if more than maxRight position - set maxRight position
    if ( position.x + objWidth > rightBound ) {
      position.x = rightBound - objWidth;
      isOutBounds = true;
    }

    //if less then top border set y to minTop position
    if ( position.y < 0 ) {
      position.y = 0;
      isOutBounds = true;
    }
    else if ( position.y + objHeight > this.height ) {

      //if larger then bottom border set y to maxTop position
      position.y = this.height - objHeight;
      isOutBounds = true;
    }

    //if smaller then left border set x to minLeft position
    if ( position.x < 0 ) {
      position.x = 0;
      isOutBounds = true;
    }

    //set flag
    position.isOutBounds = isOutBounds;
    return position;
  },

  /**
   * Get the distance between the two balloons.
   *
   * @returns {number}
   */
  getDistance: function() {
    return this.greenBalloon.getCenter().distance( this.yellowBalloon.getCenter() );
  }
}, {

  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
  UP: 'UP',
  DOWN: 'DOWN',
  UP_LEFT: 'UP_LEFT',
  UP_RIGHT: 'UP_RIGHT',
  DOWN_LEFT: 'DOWN_LEFT',
  DOWN_RIGHT: 'DOWN_RIGHT'
} );

export default BASEModel;