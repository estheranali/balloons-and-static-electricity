// Copyright 2002-2016, University of Colorado Boulder

/**
 * This type allows for determining descriptions for the balloon.  Describing the location of the balloon
 * is quite complicated so this distributes the description work so that BalloonNode does not become
 * a massive file.  Used for accessibility.
 *
 * TODO: Bring up to standards, immprove documentation, delete many functions which are now unused.
 *
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var BalloonDirectionEnum = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloons-and-static-electricity/model/BalloonDirectionEnum' );
  var Range = require( 'DOT/Range' );
  var BASEA11yStrings = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloons-and-static-electricity/BASEA11yStrings' );
  var BalloonsAndStaticElectricityDescriber = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloons-and-static-electricity/view/BalloonsAndStaticElectricityDescriber' );
  var balloonsAndStaticElectricity = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloonsAndStaticElectricity' );

  // strings
  var balloonButtonHelpString = BASEA11yStrings.balloonButtonHelpString;
  var upString = BASEA11yStrings.upString;
  var downString = BASEA11yStrings.downString;
  var leftString = BASEA11yStrings.leftString;
  var rightString = BASEA11yStrings.rightString;
  var upAndRightString = BASEA11yStrings.upAndRightString;
  var upAndLeftString = BASEA11yStrings.upAndLeftString;
  var downAndRightString = BASEA11yStrings.downAndRightString;
  var downAndLeftString = BASEA11yStrings.downAndLeftString;
  var balloonStickingToString = BASEA11yStrings.balloonStickingToString;
  var balloonOnString = BASEA11yStrings.balloonOnString;
  var balloonTouchingString = BASEA11yStrings.balloonTouchingString;
  var balloonNetChargePatternString = BASEA11yStrings.balloonNetChargePatternString;
  var balloonNoString = BASEA11yStrings.balloonNoString;
  var balloonNegativeString = BASEA11yStrings.balloonNegativeString;
  var balloonRelativeChargePatternString = BASEA11yStrings.balloonRelativeChargePatternString;
  var balloonChargeDifferencesPatternString = BASEA11yStrings.balloonChargeDifferencesPatternString;
  var balloonLocationAttractiveStatePatternString = BASEA11yStrings.balloonLocationAttractiveStatePatternString;
  var balloonShowAllChargesPatternString = BASEA11yStrings.balloonShowAllChargesPatternString;
  var balloonDescriptionWithHelpPatternString = BASEA11yStrings.balloonDescriptionWithHelpPatternString;
  var balloonShowNoChargesPatternString = BASEA11yStrings.balloonShowNoChargesPatternString;

  // constants
  var A_FEW_RANGE = new Range( 1, 15 );
  var SEVERAL_RANGE = new Range( 15, 40 );
  var MANY_RANGE = new Range( 40, 57 );
  var MAX_BALLOON_CHARGE = -57;

  var StringMaps = {
    DIRECTION_MAP: {
      UP: upString,
      DOWN: downString,
      LEFT: leftString,
      RIGHT: rightString,
      UP_RIGHT: upAndRightString,
      UP_LEFT: upAndLeftString,
      DOWN_RIGHT: downAndRightString,
      DOWN_LEFT: downAndLeftString
    }
  };

  /**
   * @param {BalloonsAndStaticElectricityModel} model
   * @param {WallModel} wall
   * @param {BalloonModel} balloon
   * @constructor
   */
  function BalloonDescriber( model, wall, balloon, accessibleLabel ) {

    // @private
    this.model = model;
    this.wall = wall;
    this.balloon = balloon; // TODO: remove
    this.balloonModel = balloon;
    this.accessibleLabel = accessibleLabel;
    this.showChargesProperty = model.showChargesProperty;


    this.balloonLabelMap = {
      GREEN: BASEA11yStrings.greenBalloonString,
      YELLOW: BASEA11yStrings.yellowBalloonString
    };

    // @private - TODO: delete this?
    this.locationDescriptionMap = {
      TOP_LEFT: BASEA11yStrings.topLeftEdgeOfSweaterString,
      UPPER_LEFT: BASEA11yStrings.upperLeftEdgeOfSweaterString,
      LOWER_LEFT: BASEA11yStrings.lowerLeftEdgeOfSweaterString,
      BOTTOM_LEFT: BASEA11yStrings.bottomLeftEdgeOfSweaterString,

      TOP_LEFT_ARM: BASEA11yStrings.topLeftArmString,
      UPPER_LEFT_ARM: BASEA11yStrings.upperLeftArmString,
      LOWER_LEFT_ARM: BASEA11yStrings.lowerLeftArmString,
      BOTTOM_LEFT_ARM: BASEA11yStrings.bottomLeftArmString,

      TOP_LEFT_SWEATER: BASEA11yStrings.topLeftSideOfSweaterString,
      UPPER_LEFT_SWEATER: BASEA11yStrings.upperLeftSideOfSweaterString,
      LOWER_LEFT_SWEATER: BASEA11yStrings.lowerLeftSideOfSweaterString,
      BOTTOM_LEFT_SWEATER: BASEA11yStrings.bottomLeftSideOfSweaterString,

      TOP_RIGHT_SWEATER: BASEA11yStrings.topRightSideOfSweaterString,
      UPPER_RIGHT_SWEATER: BASEA11yStrings.upperRightSideOfSweaterString,
      LOWER_RIGHT_SWEATER: BASEA11yStrings.lowerRightSideOfSweaterString,
      BOTTOM_RIGHT_SWEATER: BASEA11yStrings.bottomRightSideOfSweaterString,

      TOP_RIGHT_ARM: BASEA11yStrings.topRightArmString,
      UPPER_RIGHT_ARM: BASEA11yStrings.upperRightArmString,
      LOWER_RIGHT_ARM: BASEA11yStrings.lowerRightArmString,
      BOTTOM_RIGHT_ARM: BASEA11yStrings.bottomRightArmString,

      TOP_LEFT_PLAY_AREA: BASEA11yStrings.topLeftSideOfPlayAreaString,
      UPPER_LEFT_PLAY_AREA: BASEA11yStrings.upperLeftSideOfPlayAreaString,
      LOWER_LEFT_PLAY_AREA: BASEA11yStrings.lowerLeftSideOfPlayAreaString,
      BOTTOM_LEFT_PLAY_AREA: BASEA11yStrings.bottomLeftSideOfPlayAreaString,

      TOP_CENTER_PLAY_AREA: BASEA11yStrings.topCenterOfPlayAreaString,
      UPPER_CENTER_PLAY_AREA: BASEA11yStrings.upperCenterOfPlayAreaString,
      LOWER_CENTER_PLAY_AREA: BASEA11yStrings.lowerCenterOfPlayAreaString,
      BOTTOM_CENTER_PLAY_AREA: BASEA11yStrings.bottomCenterOfPlayAreaString,

      TOP_RIGHT_PLAY_AREA: BASEA11yStrings.topRightSideOfPlayAreaString,
      UPPER_RIGHT_PLAY_AREA: BASEA11yStrings.upperRightSideOfPlayAreaString,
      LOWER_RIGHT_PLAY_AREA: BASEA11yStrings.lowerRightSideOfPlayAreaString,
      BOTTOM_RIGHT_PLAY_AREA: BASEA11yStrings.bottomRightSideOfPlayAreaString,

      TOP_RIGHT: BASEA11yStrings.topRightEdgeOfPlayAreaString,
      UPPER_RIGHT: BASEA11yStrings.upperRightEdgeOfPlayAreaString,
      LOWER_RIGHT: BASEA11yStrings.lowerRightEdgeOfPlayAreaString,
      BOTTOM_RIGHT: BASEA11yStrings.bottomRightEdgeOfPlayAreaString,

      TOP_EDGE: BASEA11yStrings.atTopOfPlayAreaString,
      BOTTOM_EDGE: BASEA11yStrings.atBottomOfPlayAreaString,
      LEFT_EDGE: BASEA11yStrings.leftEdgeString,
      RIGHT_EDGE: BASEA11yStrings.rightEdgeString,
      AT_WALL: BASEA11yStrings.atWallString

    };

    // @private - track the number of times each of the W, A, S and D keys have been pressed in a single interaction
    this.aKeyPressedCount = 0;
    this.wKeyPressedCount = 0;
    this.sKeyPressedCount = 0;
    this.dKeyPressedCount = 0;

    // @private - track the current bounds and state of the balloon
    this.balloonBounds = this.model.playArea.getPointBounds( balloon.getCenter() );
    this.balloonOnSweater = balloon.onSweater();
    this.transitionedToNewArea = false; // true when balloon moves across sweater
    this.balloonCharge = balloon.chargeProperty.get();
    this.balloonChargeRange = A_FEW_RANGE;
    this.balloonInChargeRangeCount = 0; // if stays in one range while picking up many charges, this is incremented
    this.balloonLocation = balloon.locationProperty.get(); // tracks when the value has changed
    this.balloonTouchingWall = balloon.touchingWall();
  }

  balloonsAndStaticElectricity.register( 'BalloonDescriber', BalloonDescriber );

  return inherit( Object, BalloonDescriber, {

    /**
     * Get the description for this balloon, including information about the Balloon's location, and charge
     * 
     * @return {string}
     */
    getBalloonDescription: function() {
      var description;
      var showCharges = this.showChargesProperty.get();

      // a string that peices together attractive state and location.
      var locationDescriptionString = this.getBalloonLocationDescription();
      var attractiveStateDescriptionString = this.getAttractiveStateDescription();
      var attractiveStateAndLocationString = StringUtils.fillIn( balloonLocationAttractiveStatePatternString, {
        attractiveState: attractiveStateDescriptionString,
        location: locationDescriptionString 
      } );

      if ( showCharges === 'none' ) {
        description = StringUtils.fillIn( balloonShowNoChargesPatternString, {
          stateAndLocation: attractiveStateAndLocationString
        } );
      }
      else {
        // balloon net charge description
        var netChargeDescriptionString = this.getNetChargeDescription();

        // balloon relative charge string, dependent on charge visibility
        var relativeChargesString = this.getRelativeChargeDescription();

        description = StringUtils.fillIn( balloonShowAllChargesPatternString, {
          stateAndLocation: attractiveStateAndLocationString,
          netCharge: netChargeDescriptionString,
          relativeCharge: relativeChargesString
        } );
      }

      return StringUtils.fillIn( balloonDescriptionWithHelpPatternString, {
        description: description,
        help: balloonButtonHelpString
      } );
    },

    getNetChargeDescription: function() {
      var chargeAmountString = this.balloonModel.chargeProperty.get() < 0 ? balloonNegativeString : balloonNoString;
      return StringUtils.fillIn( balloonNetChargePatternString, {
        chargeAmount: chargeAmountString
      } );
    },

    getRelativeChargeDescription: function() {
      var chargeValue = Math.abs( this.balloonModel.chargeProperty.get() );
      var relativeChargesString = BalloonsAndStaticElectricityDescriber.getRelativeChargeDescription( chargeValue );

      var stringPattern;
      var showCharges = this.showChargesProperty.get();
      if ( showCharges === 'all' ) {
        stringPattern = balloonRelativeChargePatternString;
      }
      else if ( showCharges === 'diff' ) {
        stringPattern = balloonChargeDifferencesPatternString;
      }
      assert && assert( stringPattern, 'stringPattern not found for showChargesProperty value ' + showCharges );

      return StringUtils.fillIn( stringPattern, {
        amount: relativeChargesString
      } );
    },

    getAttractiveStateDescription: function() {
      var attractiveStateString = '';

      if ( this.balloonModel.onSweater() || this.balloonModel.touchingWall() ) {
        if ( !this.balloonModel.isDraggedProperty.get() && Math.abs( this.balloonModel.chargeProperty.get() ) > 0 ) {
          attractiveStateString = balloonStickingToString;
        }
        else {
          attractiveStateString = balloonTouchingString;
        }
      }
      else {
        attractiveStateString = balloonOnString;
      }

      return attractiveStateString;
    },

    /**
     * Return a phrase describing the location of the balloon in the play area.  This is usually described relative
     * to the center of the balloon, unless the balloon is touching an object, in which case it will be relative to the
     * point where the objects are touching.
     * 
     * @return {[type]} [description]
     */
    getBalloonLocationDescription: function() {
      var describedBalloonPosition = this.getDescribedPoint();
      var wallVisible = this.wall.isVisibleProperty.get();

      return BalloonsAndStaticElectricityDescriber.getLocationDescription( describedBalloonPosition, wallVisible );
    },

    /**
     * Get the point on the balloon that should be described. Generally, this is the balloon center.  If the balloon
     * is touching the sweater or the wall, the point of touching should be described, so the touch point is returned.
     * 
     * @return {Vector2}
     */
    getDescribedPoint: function() {
      var describedBalloonPosition;
      if ( this.balloonModel.touchingWall() ) {
        describedBalloonPosition = this.balloonModel.getWallTouchingCenter(); 
      }
      else if ( this.balloonModel.onSweater() ) {
        describedBalloonPosition = this.balloonModel.getSweaterTouchingCenter();
      }
      else {
        describedBalloonPosition = this.balloonModel.getCenter();
      }

      return describedBalloonPosition;
    },

    getTouchingWallDescription: function( balloon, dragging ) {

      var upperLowerString;
      var balloonLocationDescription;
      if ( balloon.inUpperHalfOfPlayArea() ) {
        upperLowerString = BASEA11yStrings.upperWallString;
      }
      else {
        upperLowerString = BASEA11yStrings.lowerWallString;
      }

      if ( balloon.chargeProperty.get() === 0 || dragging ) {
        balloonLocationDescription = StringUtils.format( BASEA11yStrings.touchingWallStringPattern, upperLowerString );
      }
      else {
        balloonLocationDescription = StringUtils.format( BASEA11yStrings.stickingToWallStringPattern, upperLowerString );
      }

      return balloonLocationDescription;
    },

    /**
     * Get a description of the proximity of the balloon to other items in the play area.
     * @param  {BalloonModel} balloon
     * @returns {string}
     */
    getBalloonProximityDescription: function( balloon ) {
      var proximityDescription;
      var balloonOnSweater = balloon.onSweater();
      if ( balloon.nearSweater() ) {
        proximityDescription = BASEA11yStrings.nearSweaterString; 
      }
      else if ( balloon.nearWall() && this.model.wall.isVisibleProperty.get() ) {
        proximityDescription = BASEA11yStrings.nearWallString;
      }
      else if ( balloonOnSweater !== this.balloonOnSweater ) {
        if ( balloonOnSweater ) {

          // only anounce on sweater the first time it hits the sweater
          // if the balloon picks up a charge as it touches the sweater, anounce this
          if ( balloon.chargeProperty.get() !== this.balloonCharge ) {
            proximityDescription = StringUtils.format( BASEA11yStrings.onSweaterPatternStringString, BASEA11yStrings.picksUpNegativeChargesString );
            this.balloonCharge = balloon.chargeProperty.get();
          }
          else {
            proximityDescription = StringUtils.format( BASEA11yStrings.onSweaterPatternStringString, '' );
          }
        }
        else {
          proximityDescription = BASEA11yStrings.offSweaterString;
        }
        this.balloonOnSweater = balloonOnSweater;
        this.transitionedToNewArea = true;
      }
      else if ( balloonOnSweater === this.balloonOnSweater ) {
        this.transitionedToNewArea = false;
      }

      return proximityDescription;
    },

    getBalloonChargeDescription: function() {
      
    },

    /**
     * Get a description of the balloon's charge.
     * TODO: This kind of method of getting descriptions based on numerical values in a range
     * could be generalized some how.
     *
     * @param  {Baloon} balloon
     * @returns {string}
     */
    getBalloonChargeDescriptionDeprecated: function( balloon, dragging ) {
      var chargeString; // qualitative description of balloon charge
      var neutralityString; // description of whether balloon has no or negative charge
      var inducedChargeString; // qualitative description for induced charge

      // assemble a description for the balloon's charge
      var balloonChargeDescription;
      var balloonLabel = this.balloonLabelMap[ balloon.balloonLabel ];

      var charge = Math.abs( balloon.chargeProperty.value );
      if ( charge === 0 ) {
        chargeString = BASEA11yStrings.noString;
        neutralityString = BASEA11yStrings.neutralString;
        inducedChargeString = BASEA11yStrings.doNotMoveString;
      }
      else if ( A_FEW_RANGE.contains( charge ) ) {
        chargeString = BASEA11yStrings.aFewString;
        neutralityString = BASEA11yStrings.negativeString;
        inducedChargeString = BASEA11yStrings.moveALittleBitString;
      }
      else if ( SEVERAL_RANGE.contains( charge ) ) {
        chargeString = BASEA11yStrings.severalString;
        neutralityString = BASEA11yStrings.negativeString;
        inducedChargeString = BASEA11yStrings.moveALotString;
      }
      else if ( MANY_RANGE.contains( charge ) ) {
        chargeString = BASEA11yStrings.manyString;
        neutralityString = BASEA11yStrings.negativeString;
        inducedChargeString = BASEA11yStrings.moveQuiteALotString;
      }
      assert && assert( chargeString, 'no description found for balloon with charge: ' + balloon.chargeProperty.get() );

      if ( dragging ) {
        balloonChargeDescription = StringUtils.format( BASEA11yStrings.namedBalloonChargeDescriptionPatternString, balloonLabel, neutralityString, chargeString );
      }
      else {
        balloonChargeDescription = StringUtils.format( BASEA11yStrings.balloonChargeStringPattern, neutralityString, chargeString );
      }

      var wallChargeDescription = StringUtils.format( BASEA11yStrings.atWallTouchPointPatternString, inducedChargeString );

      // assemble a description for the wall charge if the balloon is touching the wall
      if ( balloon.touchingWall() && this.model.wall.isVisibleProperty.get() ) {
        return StringUtils.format( '{0} {1}', balloonChargeDescription, wallChargeDescription );
      }
      else {
        return balloonChargeDescription;
      }

    },

    getJumpingDescription: function( balloon ) {
      var balloonCenterX = balloon.getCenter().x;

      var jumpDescription;
      if ( balloonCenterX === this.model.playArea.atNearSweater ) {
        jumpDescription = BASEA11yStrings.nearSweaterString;
      }
      else if ( balloonCenterX === this.model.playArea.atNearWall ) {
        if ( this.model.wall.isVisibleProperty.get() ) {
          jumpDescription = BASEA11yStrings.nearWallString;
        }
        else {
          jumpDescription = BASEA11yStrings.onRightSideOfPlayAreaString;
        }
      }
      else if ( balloonCenterX === this.model.playArea.atCenter ) {
        jumpDescription = BASEA11yStrings.atCenterOfPlayAreaString;
      }
      else if ( balloonCenterX === this.model.playArea.atWall ) {
        var chargeDescription = this.getBalloonChargeDescription( balloon, true );
        jumpDescription = StringUtils.format( '{0} {1}', BASEA11yStrings.atWallString, chargeDescription );
      }

      return jumpDescription;
    },

    getSweaterChargeDescription: function( balloon ) {
      var chargeString;
      var neutralityString;

      var charge = Math.abs( balloon.chargeProperty.value );
      if ( charge === 0 ) {
        chargeString = BASEA11yStrings.noString;
        neutralityString = BASEA11yStrings.neutralString;
      }
      else if ( A_FEW_RANGE.contains( charge ) ) {
        chargeString = BASEA11yStrings.aFewString;
        neutralityString = BASEA11yStrings.positiveString;
      }
      else if ( SEVERAL_RANGE.contains( charge ) ) {
        chargeString = BASEA11yStrings.severalString;
        neutralityString = BASEA11yStrings.positiveString;
      }
      else if ( MANY_RANGE.contains( charge ) ) {
        chargeString =BASEA11yStrings. manyString;
        neutralityString = BASEA11yStrings.positiveString;
      }

      assert && assert( chargeString, 'no description found for sweater with charge: ' + -balloon.chargeProperty.get() );
      return StringUtils.format( BASEA11yStrings.sweaterChargePatternString, neutralityString, chargeString );
    },

    /**
     * Get the movement direction for the balloon.  Will be one of BalloonDirectionEnum entires.
     * @param  {Vector2} location    
     * @param  {Vector2} oldLocation 
     * @returns {string}s
     */
    getMovementDirection: function( location, oldLocation ) {
      var delta = location.minus( oldLocation );
      var direction; // string

      if ( delta.x > 0 ) {
        direction = BalloonDirectionEnum.RIGHT;
      }
      else if ( delta.x < 0 ) {
        direction = BalloonDirectionEnum.LEFT;
      }
      else if ( delta.y > 0 ) {
        direction = BalloonDirectionEnum.DOWN;
      }
      else if ( delta.y < 0 ) {
        direction = BalloonDirectionEnum.UP;
      }

      return direction;
    },

    /**
     * Get a description of the balloon leaving the wall as a function of distance from the wall.
     *
     * @param  {BalloonModel} balloon
     * @returns {string}
     */
    getLeavingWallDescription: function( balloon ) {
      var distanceToWall = Math.abs( balloon.getDistanceToWall() );

      if ( distanceToWall < 40 ) {
        return StringUtils.format( BASEA11yStrings.wallChargesReturnString, BASEA11yStrings.slightlyString );
      }
      else {
        return StringUtils.format( BASEA11yStrings.wallChargesReturnString, BASEA11yStrings.allTheWayString );
      }
    },

    /**
     * Get a description of the balloon rubbing the wall.  This should only be called
     * if the balloon is touching the wall.  This description includes the induced charge
     * in the wall.
     * @param  {BalloonModel} balloon
     * @returns {string}
     */
    getWallRubDescription: function( balloon ) {
      var charge = Math.abs( balloon.chargeProperty.get() );
      var inducedChargeDescription;

      if ( charge === 0 ) {
        inducedChargeDescription = BASEA11yStrings.doNotMoveString;
      }
      else if ( A_FEW_RANGE.contains( charge ) ) {
        inducedChargeDescription = BASEA11yStrings.moveALittleBitString;
      }
      else if ( SEVERAL_RANGE.contains( charge ) ) {
        inducedChargeDescription = BASEA11yStrings.moveALotString;
      }
      else if ( MANY_RANGE.contains( charge ) ) {
        inducedChargeDescription = BASEA11yStrings.moveQuiteALotString;
      }

      return StringUtils.format( BASEA11yStrings.wallRubStringPattern, inducedChargeDescription );
    },

    /**
     * Get an alert for when the balloon rubs on the sweater.
     * @param  {BalloonModel} balloon
     * @returns {string}
     */
    getSweaterRubDescription: function( balloon ) {
      var currentBalloonCharge = balloon.chargeProperty.get();
      var currentBalloonChargeRange = this.getCurrentChargeRange();

      var balloonChargeString;
      var sweaterChargeString;
      var balloonPicksUpChargesString;

      var sweater = this.model.sweater;
      if ( sweater.chargeProperty.get() === -MAX_BALLOON_CHARGE ) {
        return BASEA11yStrings.noMoreChargesRemainingOnSweaterString;
      }
      else if ( currentBalloonCharge !== this.balloonCharge ) {

        // the balloon has picked at least one charge
        this.balloonCharge = balloon.chargeProperty.get();

        if ( this.balloonChargeRange !== currentBalloonChargeRange ) {

          // the balloon has picked up enough charges to remind the user of the
          // charge difference between sweater and balloon
          this.balloonInChargeRangeCount = 0;
          this.balloonChargeRange = currentBalloonChargeRange;
        }

        if ( this.balloonInChargeRangeCount === 0 ) {

          // this is the first time picking up a charge in this range
          balloonChargeString = this.getBalloonChargeDescription( balloon, true /*dragging*/ );
          sweaterChargeString = this.getSweaterChargeDescription( balloon );

        }
        else if ( this.balloonInChargeRangeCount === 1 ) {
          balloonPicksUpChargesString = BASEA11yStrings.balloonPicksUpMoreChargesString;
        }
        else {
          balloonPicksUpChargesString = BASEA11yStrings.againMoreChargesString;
        }

        this.balloonInChargeRangeCount++;
      }
      else {

        // no charge was picked up, so tell the user where they can find more
        var moreChargesString = this.getChargePositionCue();

        // Once we give this cue, the user needs more context when they pick up additional charges
        this.balloonInChargeRangeCount = 1;

        var locationHelpStringPattern = '{0} {1} {2}';
        var balloonLocation = '';
        if ( balloon.centerInSweaterChargedArea() ) {
          var locationBounds = this.model.playArea.getPointBounds( balloon.getCenter() );
          var locationDescription = this.locationDescriptionMap[ locationBounds ];

          balloonLocation = StringUtils.format( BASEA11yStrings.draggingLocationStringPattern, locationDescription );
        }
        return StringUtils.format( locationHelpStringPattern, BASEA11yStrings.noChangeInChargesString, balloonLocation, moreChargesString );
      }

      if ( balloonPicksUpChargesString ) {
        return balloonPicksUpChargesString;
      }
      else {
        var stringPattern = '{0} {1}';
        return StringUtils.format( stringPattern, balloonChargeString, sweaterChargeString );
      }

    },

    /**
     * Get a description that tells the user where they can find more charges.
     *
     * @returns {string}
     */
    getChargePositionCue: function() {
      assert && assert( this.model.sweater.chargeProperty.get() < -MAX_BALLOON_CHARGE, 'trying to find more charges when none remain' );

      // get the closest charge that has not been picked up
      var closestCharge = this.balloon.getClosestCharge();
      var directionToCharge = this.balloon.getDirectionToCharge( closestCharge );

      var directionCueString = StringMaps.DIRECTION_MAP[ directionToCharge ];
      assert && assert( directionCueString, 'no direction found for nearest charge' );

      return StringUtils.format( BASEA11yStrings.morePairsOfChargesStringPattern, directionCueString );
    },

    /**
     * Return the range that contains the current charge value of the balloon.
     * @returns {Range|null}
     */
    getCurrentChargeRange: function() {
      var charge = Math.abs( this.balloon.chargeProperty.get() );

      if ( charge === 0 ) {
        return;
      }
      else if ( A_FEW_RANGE.contains( charge ) ) {
        return A_FEW_RANGE;
      }
      else if ( SEVERAL_RANGE.contains( charge ) ) {
        return SEVERAL_RANGE;
      }
      else if ( MANY_RANGE.contains( charge ) ) {
        return MANY_RANGE;
      }

    },

    /**
     * Reset all key counters used for hysteresis when checking balloon
     */
    resetKeyCounts: function() {
      this.aKeyPressedCount = 0;
      this.wKeyPressedCount = 0;
      this.sKeyPressedCount = 0;
      this.dKeyPressedCount = 0;
    },

    /**
     * Reset all flags that monitor the balloon and define hysteresis for descriptions.
     * @public
     */
    reset: function() {
      this.aKeyPressedCount = 0;
      this.wKeyPressedCount = 0;
      this.sKeyPressedCount = 0;
      this.dKeyPressedCount = 0;

      this.balloonBounds = this.model.playArea.getPointBounds( this.balloon.getCenter() );
      this.balloonOnSweater = this.balloon.onSweater();
      this.transitionedToNewArea = false;
      this.balloonCharge = this.balloon.chargeProperty.get();
      this.balloonChargeRange = A_FEW_RANGE;
      this.balloonInChargeRangeCount = 0;
      this.balloonLocation = this.balloon.locationProperty.get();
      this.balloonTouchingWall = this.balloon.touchingWall();
    },

    /**
     * Get a description of the balloon after it has been released.
     * This description id dependent on the position.
     * @returns {string}
     */
    getReleaseDescription: function() {

      var descriptionString = '';
      if ( this.balloon.chargeProperty.get() === 0 ) {

        // when the charge is zero, we want to hear the balloon Label, release position, no change in position,
        // no change in charges, button label
        descriptionString = StringUtils.format( BASEA11yStrings.balloonReleasedNoChangePatternString, BASEA11yStrings.noChangeInPositionOrChargeString );
      }
      else if ( this.balloon.touchingWall() ) {
        var touchingWallDescription = this.getTouchingWallDescription( this.balloon );
        descriptionString = StringUtils.format( BASEA11yStrings.balloonReleasedNoChangePatternString, touchingWallDescription );
      }
      else if ( this.balloon.centerInSweaterChargedArea() ) {
        var stickingString = StringUtils.format( BASEA11yStrings.stickingToLocationPatternString, BASEA11yStrings.sweaterString );
        descriptionString = StringUtils.format( BASEA11yStrings.balloonReleasedNoChangePatternString, stickingString );
      }
      else {

        // otherwise, we want to hear direction and speed of balloon movement.
        var velocityDescription = this.getVelocityDescription();

        var attractedObject = this.getAttractedObject();

        // put it together
        descriptionString = StringUtils.format( BASEA11yStrings.balloonReleasedPatternString, velocityDescription, attractedObject );
      }

      return descriptionString;
    },

    getAttractedObject: function() {

      // determine which object the balloon is moving toward
      var attractedDirection = this.balloon.getAttractedDirection();

      var attractedObject;
      if ( attractedDirection === BalloonDirectionEnum.RIGHT ) {
        attractedObject = BASEA11yStrings.wallString;
      }
      else {
        attractedObject = BASEA11yStrings.sweaterString;
      }

      return attractedObject;
    },

    /**
     * Get a description of how the balloon changes when the wall is removed.
     *
     * @returns {}
     */
    getWallRemovedDescription: function( wallRemoved ) {
      var wallRemovedFromPlayAreaAlert = wallRemoved ? BASEA11yStrings.wallRemovedString : BASEA11yStrings.wallAddedString;
      var balloonLabel = this.balloonLabelMap[ this.balloon.balloonLabel ];

      var velocityString = this.getVelocityDescription();
      var attractedObject = this.getAttractedObject();
      var velocityDescription = StringUtils.format( BASEA11yStrings.movesToObjectPatternString, velocityString, attractedObject );

      var balloonChargeDescription = this.getBalloonChargeDescription( this.balloon );
      var sweaterChargeDescription = this.getSweaterChargeDescription( this.balloon );

      var stringPattern = '{0} {1} {2} {3} {4} {5}';
      return StringUtils.format( stringPattern, wallRemovedFromPlayAreaAlert, balloonLabel, velocityDescription, BASEA11yStrings.stickingToSweaterString, balloonChargeDescription, sweaterChargeDescription );
    },

    /**
     * Return true when it is time to reset the dragging descriptions.
     * @returns {boolean}
     */
    keyCountsNeedToBeReset: function() {
      var countsTooHigh =
        this.dKeyPressedCount > 5 ||
        this.sKeyPressedCount > 5 ||
        this.aKeyPressedCount > 5 ||
        this.wKeyPressedCount > 5;

      return countsTooHigh || this.transitionedToNewArea;
    },

    /**
     * Get a description of how quickly the balloon moves to another object in the play area
     * as a function of the charge.
     * @param  {number} charge
     * @returns {string}
     */
    getVelocityDescription: function() {
      var velocityDescription = '';

      // map the charges to ranges
      var verySlowRange = new Range( 1, 14 );
      var slowRange = new Range( 15, 29 );
      var quickRange = new Range( 30, 44 );
      var veryQuickRange = new Range( 45, 57 );
      var absCharge = Math.abs( this.balloon.chargeProperty.get() );

      if ( verySlowRange.contains( absCharge ) ) {
        velocityDescription = 'very slowly';
      }
      else if ( slowRange.contains( absCharge ) ) {
        velocityDescription = 'slowly';
      }
      else if ( quickRange.contains( absCharge ) ) {
        velocityDescription = 'quickly';
      }
      else if ( veryQuickRange.contains( absCharge ) ) {
        velocityDescription = 'very quickly';
      }
      return velocityDescription;
    }
  } );
} );