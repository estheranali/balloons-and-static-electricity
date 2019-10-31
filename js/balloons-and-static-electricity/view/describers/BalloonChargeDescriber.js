// Copyright 2018-2019, University of Colorado Boulder

/**
 * Generates descriptions about to the balloon's charge, which is dependent on which charges are visible
 * in the sim and the value of BASEModel.showChargesProperty.
 *
 * @author Jesse Greenberg
 */

define( require => {
  'use strict';

  // modules
  const BalloonModel = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloons-and-static-electricity/model/BalloonModel' );
  const balloonsAndStaticElectricity = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloonsAndStaticElectricity' );
  const BASEA11yStrings = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloons-and-static-electricity/BASEA11yStrings' );
  const BASEDescriber = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloons-and-static-electricity/view/describers/BASEDescriber' );
  const inherit = require( 'PHET_CORE/inherit' );
  const PlayAreaMap = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloons-and-static-electricity/model/PlayAreaMap' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const SweaterDescriber = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloons-and-static-electricity/view/describers/SweaterDescriber' );
  const Vector2 = require( 'DOT/Vector2' );
  const WallDescriber = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloons-and-static-electricity/view/describers/WallDescriber' );

  // a11y strings
  const summaryBalloonNeutralChargeString = BASEA11yStrings.summaryBalloonNeutralCharge.value;
  const balloonNetChargePatternString = BASEA11yStrings.balloonNetChargePattern.value;
  const balloonZeroString = BASEA11yStrings.balloonZero.value;
  const balloonNegativeString = BASEA11yStrings.balloonNegative.value;
  const balloonRelativeChargePatternString = BASEA11yStrings.balloonRelativeChargePattern.value;
  const balloonChargeDifferencesPatternString = BASEA11yStrings.balloonChargeDifferencesPattern.value;
  const moreInducedChargePatternString = BASEA11yStrings.moreInducedChargePattern.value;
  const lessInducedChargePatternString = BASEA11yStrings.lessInducedChargePattern.value;
  const balloonRelativeChargeAllPatternString = BASEA11yStrings.balloonRelativeChargeAllPattern.value;
  const combinedChargePatternString = BASEA11yStrings.combinedChargePattern.value;
  const wallInducedChargeWithManyPairsPatternString = BASEA11yStrings.wallInducedChargeWithManyPairsPattern.value;
  const eachBalloonString = BASEA11yStrings.eachBalloon.value;
  const singleStatementPatternString = BASEA11yStrings.singleStatementPattern.value;
  const wallHasManyChargesString = BASEA11yStrings.wallHasManyCharges.value;
  const balloonHasRelativeChargePatternString = BASEA11yStrings.balloonHasRelativeChargePattern.value;
  const showingNoChargesString = BASEA11yStrings.showingNoCharges.value;
  const balloonHasNetChargePatternString = BASEA11yStrings.balloonHasNetChargePattern.value;
  const balloonNetChargePatternStringWithLabel = BASEA11yStrings.balloonNetChargePatternStringWithLabel.value;
  const moveAwayALittleMoreString = BASEA11yStrings.moveAwayALittleMore.value;
  const beginToReturnString = BASEA11yStrings.beginToReturn.value;
  const returnALittleMoreString = BASEA11yStrings.returnALittleMore.value;
  const balloonHasChargePatternString = BASEA11yStrings.balloonHasChargePattern.value;
  const balloonHasChargeShowingPatternString = BASEA11yStrings.balloonHasChargeShowingPattern.value;

  /**
   * @constructor
   * @param {BASEModel} model
   * @param {BalloonModel} balloonModel
   * @param {string} accessibleName - the accessible name for this balloon
   * @param {string} otherAccessibleName - the accessible name for the other balloon in this sim
   */
  function BalloonChargeDescriber( model, balloonModel, accessibleName, otherAccessibleName ) {
    const self = this;

    // @private
    this.model = model;
    this.balloonModel = balloonModel;
    this.wall = model.wall;
    this.accessibleName = accessibleName;
    this.otherAccessibleName = otherAccessibleName;
    this.showChargesProperty = model.showChargesProperty;

    // @private - Allows us to track the change in the balloon's induced charge, useful for describing how the charges
    // move towards or away their resting positions
    this.previousForceMagnitude = 0;

    // @private - The previous magnitude of force delta normalized, so we can track whether induced charge increases or
    // decreases between when a description of induced charge change is triggered. Useful for describing how induced
    // charge changes between consecutive balloon movements, so we can say charges "continue" to move away.
    this.previousForceMagnitudeNormalized = 0;

    // listeners, no need to unlink
    // if the balloon is no longer inducing charge, reset reference forces until balloon begins to induce charge again
    balloonModel.inducingChargeProperty.link( function( inducingCharge ) {
      if ( !inducingCharge ) {
        self.resetReferenceForces();
      }
    } );

    // when the balloon touches the wall, values that help describe change in charges
    balloonModel.touchingWallProperty.link( function() {
      self.resetReferenceForces();
    } );

    // when the balloon is grabbed or released, reset reference forces for describing changes to induced charge
    // in the wall
    balloonModel.isDraggedProperty.link( function() {
      self.resetReferenceForces();
    } );
  }

  balloonsAndStaticElectricity.register( 'BalloonChargeDescriber', BalloonChargeDescriber );

  return inherit( Object, BalloonChargeDescriber, {


    /**
     * Get a description of the  net charge. Will return something like
     * "Has negative net charge." or
     * "Has neutral net charge."
     *
     * @returns {string}
     */
    getNetChargeDescription: function() {
      const chargeAmountString = this.balloonModel.chargeProperty.get() < 0 ? balloonNegativeString : balloonZeroString;
      return StringUtils.fillIn( balloonNetChargePatternString, {
        chargeAmount: chargeAmountString
      } );
    },

    /**
     * Get a description of the net charge for the balloon, including the label. Will return something like
     * "Yellow balloon has negative net charge." or
     * "Green balloon has no net charge."
     *
     * @returns {string}
     */
    getNetChargeDescriptionWithLabel: function() {
      const chargeAmountString = this.balloonModel.chargeProperty.get() < 0 ? balloonNegativeString : balloonZeroString;
      return StringUtils.fillIn( balloonNetChargePatternStringWithLabel, {
        chargeAmount: chargeAmountString,
        balloon: this.accessibleName
      } );
    },

    /**
     * Get the combined relative charge description for each balloon. Will return something like
     *
     * "Each balloon has zero net charge, showing no charges." or
     * "Green balloon has negative net charge, showing a few negative charges. Yellow balloon has zero net charge,
     *   showing no charges." or
     * "Each balloon has no more negative charges than positive charges." or
     * "Green balloon has several more negative charges than positive  charges. Yellow balloon has several more
     *   negative charges than positive charges." or
     *
     * @returns {string}
     */
    getCombinedRelativeChargeDescription: function() {
      assert && assert( this.balloonModel.isDraggedProperty.get(), 'alert should only be generated if balloon is grabbed' );
      let description;

      // the relative charge, used in all cases
      const sameChargeRange = BASEDescriber.getBalloonsVisibleWithSameChargeRange( this.balloonModel, this.balloonModel.other );

      const chargesShown = this.showChargesProperty.get();

      // if both balloons have the same charge range, describe togethehr
      if ( sameChargeRange ) {
        description = BalloonChargeDescriber.getRelativeChargeDescriptionWithLabel( this.balloonModel, chargesShown, eachBalloonString );
      }
      else {
        const grabbedBalloonDescription = BalloonChargeDescriber.getRelativeChargeDescriptionWithLabel( this.balloonModel, chargesShown, this.accessibleName );

        if ( this.model.bothBalloonsVisible() ) {
          const otherBalloonDescription = BalloonChargeDescriber.getRelativeChargeDescriptionWithLabel( this.balloonModel.other, chargesShown, this.otherAccessibleName );

          description = StringUtils.fillIn( combinedChargePatternString, {
            grabbedBalloon: grabbedBalloonDescription,
            otherBalloon: otherBalloonDescription
          } );
        }
        else {

          // just the visible balloon, this description should not include the balloon's' label
          description = StringUtils.fillIn( balloonRelativeChargeAllPatternString, {
            charge: BalloonChargeDescriber.getRelativeChargeDescription( this.balloonModel, chargesShown )
          } );
        }
      }

      return description;
    },

    /**
     * Get a description of the induced charge in the wall or the charge of the sweater. To be used by the "grab" alert
     * when the balloon is picked up.
     *
     * @returns {string}
     */
    getOtherObjectChargeDescription: function() {
      const inducingChargeOrTouchingWall = this.balloonModel.inducingChargeProperty.get() || this.balloonModel.touchingWall();
      const onSweater = this.balloonModel.onSweater();
      assert && assert( onSweater || inducingChargeOrTouchingWall, 'only include this phrase when balloon is inducing charge or on sweater' );
      let description;

      const chargesShown = this.showChargesProperty.get();

      // if balloon is inducing charge, describe that object
      if ( inducingChargeOrTouchingWall ) {
        const wallVisible = this.model.wall.isVisibleProperty.get();

        if ( chargesShown === 'diff' ) {

          // if showing charge differences, no charges are shown, so include that information
          const balloonsAdjacent = this.model.getBalloonsAdjacent();
          description = WallDescriber.getWallChargeDescriptionWithLabel( this.model.yellowBalloon, this.model.greenBalloon, balloonsAdjacent, wallVisible, chargesShown );
          description = StringUtils.fillIn( singleStatementPatternString, { statement: description } );
        }
        else {
          if ( this.balloonModel.inducingChargeAndVisible() && this.balloonModel.other.inducingChargeAndVisible() ) {

            // both balloons inducing charge, return combined descriptions
            description = WallDescriber.getCombinedInducedChargeDescription( this.balloonModel, wallVisible );
            description = StringUtils.fillIn( singleStatementPatternString, { statement: description } );
          }
          else if ( this.balloonModel.inducingChargeAndVisible() ) {

            // only one balloon inducing charge, describe this
            description = WallDescriber.getInducedChargeDescription( this.balloonModel, this.accessibleName, wallVisible );
            description = StringUtils.fillIn( singleStatementPatternString, { statement: description } );
          }
          else {

            // touching wall, not inducing charge, wrap with punctuation for this context
            const balloonCenter = this.balloonModel.getCenter();
            description = WallDescriber.getNoChangeInChargesDescription( BASEDescriber.getLocationDescription( balloonCenter, wallVisible ) );
            description = StringUtils.fillIn( singleStatementPatternString, {
              statement: description
            } );
          }

          // include a statement that the wall has many pairs of positive and negative charges
          description = StringUtils.fillIn( wallInducedChargeWithManyPairsPatternString, {
            inducedCharge: description,
            chargePairs: wallHasManyChargesString
          } );
        }
      }
      else if ( onSweater ) {
        description = SweaterDescriber.getRelativeChargeDescriptionWithLabel( this.model.sweater.chargeProperty.get(), chargesShown );
      }

      return description;
    },

    /**
     * Get a description of how induced charge changes as a charged balloon moves around a wall. Every time we
     * generate this description we store two variables for hysteresis. We track the magnitude of force so that
     * we can determine the change in force between generations of this description. We track the normalized value
     * of this force so that we can determine if the force increases or decreases multiple times in a row. This
     * function will return something like
     * "Negative charges in wall begin to move away from Yellow Balloon."
     * "Negative charges in wall move away a little more from green balloon."
     * "Negative charges in wall begin to return."
     * "Negative charges in wall return a little more."
     *
     * @returns {string}
     */
    getInducedChargeChangeDescription: function() {
      let descriptionString;

      const wallVisible = this.model.wall.isVisibleProperty.get();

      // the force between the balloon and the closest charge to the balloon in the wall
      const balloonForce = BalloonModel.getForceToClosestWallCharge( this.balloonModel );
      const forceMagnitude = balloonForce.magnitude;

      // change in force magnitude on charges in the wall - sign determines if balloon is inducing more or less
      // charge in the wall, but there must be some change since the last description
      const forceDelta = forceMagnitude - this.previousForceMagnitude;
      assert && assert( forceDelta !== 0, 'induced charge did not change since last description' );

      // if the sign of the change in force hasn't changed, then the balloon has continued to apply force on
      // wall charges in the same direction since the last time this change was described
      const forceDeltaNormalized = forceDelta / Math.abs( forceDelta );
      const continuedDirection = forceDeltaNormalized === this.previousForceMagnitudeNormalized;

      // describes the location of induced charge in the wall
      const balloonY = this.balloonModel.getCenterY();
      const chargeLocation = new Vector2( PlayAreaMap.X_LOCATIONS.AT_WALL, balloonY );
      const chargeLocationString = BASEDescriber.getLocationDescription( chargeLocation, wallVisible );

      let movementString;
      if ( forceDelta > 0 ) {
        if ( continuedDirection ) {

          // the charges are continuing to move away from the balloon
          descriptionString = StringUtils.fillIn( moreInducedChargePatternString, {
            location: chargeLocationString,
            movement: moveAwayALittleMoreString,
            balloon: this.accessibleName
          } );
        }
        else {

          // first time charges are moving away from balloon, just say that charges in wall move away
          descriptionString = WallDescriber.getInducedChargeDescriptionWithNoAmount( this.balloonModel, this.accessibleName, wallVisible );
        }
      }
      else {

        // charges are moving back to resting position
        movementString = continuedDirection ? returnALittleMoreString : beginToReturnString;
        descriptionString = StringUtils.fillIn( lessInducedChargePatternString, {
          location: chargeLocationString,
          movement: movementString
        } );
      }

      // hysteresis so that we can change the description if the induced charge continues to increase or decrease
      // next time
      this.previousForceMagnitudeNormalized = forceDeltaNormalized;
      this.previousForceMagnitude = balloonForce.magnitude;

      return descriptionString;
    },

    /**
     * Reset the tracked forces that determine the next description of induced charge change.
     */
    resetReferenceForces: function() {
      this.previousForceMagnitude = BalloonModel.getForceToClosestWallCharge( this.balloonModel ).magnitude;
      this.previousForceMagnitudeNormalized = 0;
    },

    /**
     * Return whether or not change in induced charge should be described for the balloon. If the balloon not on
     * the wall and is inducing charge while all charges are visible we will always describe change. If we described
     * that the charges moved away from the balloon, we will always describe the return of induced charges at least
     * once.
     *
     * @returns {boolean}
     */
    describeInducedChargeChange: function() {
      const chargesShown = this.showChargesProperty.get();
      const wallVisible = this.wall.isVisibleProperty.get();
      const jumping = this.balloonModel.jumping;
      return !jumping &&
             !this.balloonModel.touchingWall() &&
             wallVisible &&
             chargesShown === 'all' &&
             ( this.balloonModel.inducingChargeProperty.get() );
    },

    /**
     * A description of the balloon's relative charge but modified slightly for the context of the screen summary.
     *
     * @returns {string}
     */
    getSummaryRelativeChargeDescription: function() {
      const chargesShown = this.showChargesProperty.get();

      if ( this.balloonModel.chargeProperty.get() === 0 && chargesShown === 'all' ) {
        return summaryBalloonNeutralChargeString;
      }
      else {
        return BalloonChargeDescriber.getRelativeChargeDescription( this.balloonModel, chargesShown );
      }
    },

    /**
     * Get a description that indicates how much charge the balloon has, and how much charge is showing depending
     * on charge view. Will return something like
     * "Has zero net charge, showing no charges." or
     * "Has zero net charge, many pairs of positive and negative charges"
     *
     * @returns {string}
     */
    getHasRelativeChargeDescription: function() {
      const balloonCharge = this.balloonModel.chargeProperty.get();
      const chargesShown = this.showChargesProperty.get();
      let chargeDescription = BalloonChargeDescriber.getRelativeChargeDescription( this.balloonModel, chargesShown );

      if ( chargesShown === 'all' ) {
        chargeDescription = StringUtils.fillIn( balloonHasChargePatternString, {
          charge: chargeDescription
        } );
      }
      else if ( chargesShown === 'diff' ) {
        const chargeString = ( balloonCharge < 0 ) ? balloonNegativeString : balloonZeroString;
        chargeDescription = StringUtils.fillIn( balloonHasChargeShowingPatternString, {
          charge: chargeString,
          showing: chargeDescription
        } );
      }

      return chargeDescription;
    },

    /**
     * Reset flags that track state between descriptions.
     * @public
     */
    reset: function() {
      this.previousForceMagnitude = 0;
      this.previousForceMagnitudeNormalized = 0;
    }
  }, {

    //--------------------------------------------------------------------------
    // statics
    //--------------------------------------------------------------------------

    /**
     * Get the relative charge description of a balloon, will return something like
     * "no more negative charges than positive charges" or
     * "several more negative charges than positive charges" or
     * "showing several negative charges"
     *
     * @param {BalloonModel} balloonModel
     * @param {string} showCharges - one of 'all', 'none, 'diff'
     *
     * @returns {string}
     */
    getRelativeChargeDescription: function( balloonModel, showCharges ) {
      let description;
      const chargeValue = Math.abs( balloonModel.chargeProperty.get() );

      // if charge view is 'diff' and there are no charges, we simply say that there are no
      // charges shown
      if ( chargeValue === 0 && showCharges === 'diff' ) {
        description = showingNoChargesString;
      }
      else {
        const relativeChargesString = BASEDescriber.getRelativeChargeDescription( chargeValue );
        let stringPattern;
        if ( showCharges === 'all' ) {
          stringPattern = balloonRelativeChargePatternString;
        }
        else if ( showCharges === 'diff' ) {
          stringPattern = balloonChargeDifferencesPatternString;
        }
        assert && assert( stringPattern, 'stringPattern not found for showChargesProperty value ' + showCharges );

        description = StringUtils.fillIn( stringPattern, {
          amount: relativeChargesString
        } );
      }

      return description;
    },

    /**
     * Get the relative charge with the accessible label, something like
     * "Yellow balloon has a few more negative charges than positive charges." or
     * "Yellow balloon has negative net charge, showing several negative charges." or
     * "Yellow balloon has zero net charge, showing no charges."
     *
     * Dependent on the charge view.
     *
     * @returns {string}
     */
    getRelativeChargeDescriptionWithLabel: function( balloonModel, showCharges, label ) {
      let description;
      const relativeCharge = BalloonChargeDescriber.getRelativeChargeDescription( balloonModel, showCharges );
      assert && assert( showCharges !== 'none', 'relative description with label should never be read when no charges are shown' );

      if ( showCharges === 'all' ) {
        description = StringUtils.fillIn( balloonHasRelativeChargePatternString, {
          balloonLabel: label,
          relativeCharge: relativeCharge
        } );
      }
      else if ( showCharges === 'diff' ) {
        const balloonCharge = balloonModel.chargeProperty.get();
        const chargeString = ( balloonCharge < 0 ) ? balloonNegativeString : balloonZeroString;

        description = StringUtils.fillIn( balloonHasNetChargePatternString, {
          balloon: label,
          charge: chargeString,
          showing: relativeCharge
        } );
      }

      return description;
    }
  } );
} );
