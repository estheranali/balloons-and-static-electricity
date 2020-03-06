// Copyright 2018-2020, University of Colorado Boulder

/**
 * Tests for screen summary descriptions for balloons-and-static-electricity. These descriptions are invisible, but
 * available for screen reader users.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Bounds2 from '../../../../../dot/js/Bounds2.js';
import Vector2 from '../../../../../dot/js/Vector2.js';
import Tandem from '../../../../../tandem/js/Tandem.js';
import UtteranceQueue from '../../../../../utterance-queue/js/UtteranceQueue.js';
import balloonYellow from '../../../../images/balloon-yellow_png.js';
import BASEConstants from '../../BASEConstants.js';
import BASEModel from '../../model/BASEModel.js';
import PlayAreaMap from '../../model/PlayAreaMap.js';
import BalloonNode from '../BalloonNode.js';

// create model and view for testing
const layoutBounds = new Bounds2( 0, 0, 768, 504 );
const model = new BASEModel( layoutBounds.width, layoutBounds.height, Tandem.ROOT.createTandem( 'model' ) );

let balloonNode = null;
QUnit.module( 'BalloonDescriber', {
  before: () => {

    // BalloonDescriber uses many calls to utteranceQueue. This is to support testing
    phet.joist = phet.joist || {};
    phet.joist.sim = phet.joist.sim || {};
    phet.joist.sim.utteranceQueue = new UtteranceQueue( true );
    phet.joist.sim.supportsGestureA11y = false;
  },
  after: () => {
    delete phet.joist.sim.utteranceQueue;
    delete phet.joist.sim.supportsGestureA11y;
  },
  beforeEach: () => {
    balloonNode = new BalloonNode( model.yellowBalloon, balloonYellow, model, 'Yellow Balloon', 'Green Balloon', layoutBounds, Tandem.ROOT.createTandem( 'balloonNode' ), {
      labelContent: 'Yellow Balloon'
    } );
  }
} );

QUnit.test( 'Dynamic descriptions for PlayArea objects', function( assert ) {
  model.reset();

  // on load
  let actualDescription = balloonNode.descriptionContent;
  let expectedDescription = 'At center of Play Area. Has zero net charge, no more negative charges than positive charges.';
  assert.equal( actualDescription, expectedDescription );

  // balloon at upper wall with several more negative charges than positive, all charges shown
  model.yellowBalloon.chargeProperty.set( -30 );
  model.yellowBalloon.setCenter( new Vector2( PlayAreaMap.X_POSITIONS.AT_WALL, PlayAreaMap.Y_BOUNDARY_POSITIONS.AT_TOP ) );
  actualDescription = balloonNode.descriptionContent;
  expectedDescription = 'At upper wall. Has negative net charge, several more negative charges than positive charges.';
  assert.equal( actualDescription, expectedDescription );

  // balloon neutral on upper right arm of sweater with max charge, all charges shown
  model.yellowBalloon.chargeProperty.set( 0 );
  model.sweater.chargeProperty.set( BASEConstants.MAX_BALLOON_CHARGE );
  model.yellowBalloon.setCenter( new Vector2( PlayAreaMap.COLUMN_RANGES.RIGHT_ARM.getCenter(), PlayAreaMap.Y_BOUNDARY_POSITIONS.AT_TOP ) );
  actualDescription = balloonNode.descriptionContent;
  expectedDescription = 'On right shoulder of sweater. Has zero net charge, no more negative charges than positive charges.';
  assert.equal( actualDescription, expectedDescription );

  // showing no charges, only position should be described
  model.reset();
  model.showChargesProperty.set( 'none' );
  model.yellowBalloon.chargeProperty.set( -15 );
  model.yellowBalloon.setCenter( new Vector2( PlayAreaMap.X_POSITIONS.AT_WALL, PlayAreaMap.Y_BOUNDARY_POSITIONS.AT_BOTTOM ) );
  actualDescription = balloonNode.descriptionContent;
  expectedDescription = 'At lower wall.';
  assert.equal( actualDescription, expectedDescription );

  // neutral balloon in center of play area, showing charge differences
  model.reset();
  model.showChargesProperty.set( 'diff' );
  actualDescription = balloonNode.descriptionContent;
  expectedDescription = 'At center of Play Area. Has zero net charge, showing no charges.';
  assert.equal( actualDescription, expectedDescription );

  // Sticking to upper-left side of sweater with negative charge, showing charge differences
  model.yellowBalloon.setCenter( new Vector2( PlayAreaMap.COLUMN_RANGES.LEFT_SIDE_OF_SWEATER.getCenter(), PlayAreaMap.Y_BOUNDARY_POSITIONS.AT_TOP ) );
  model.yellowBalloon.chargeProperty.set( -30 );
  actualDescription = balloonNode.descriptionContent;
  expectedDescription = 'Sticking to upper-left side of sweater. Has negative net charge, showing several negative charges.';
  assert.equal( actualDescription, expectedDescription );
} );

QUnit.test( 'Interactive grab alert for balloon', function( assert ) {

  model.reset();

  // initial grab on load
  let actualDescription = balloonNode.describer.movementDescriber.getGrabbedAlert();
  let expectedDescription = 'Grabbed. At center of Play Area. Has no more negative charges than positive charges. Press W, A, S, or D key to move balloon. Space to release.';
  assert.equal( actualDescription, expectedDescription, 'grab alert test 1' );

  // Second grab, no longer have interaction hint
  actualDescription = balloonNode.describer.movementDescriber.getGrabbedAlert();
  expectedDescription = 'Grabbed. At center of Play Area. Has no more negative charges than positive charges.';
  assert.equal( actualDescription, expectedDescription, 'grab alert test 2' );

  // interaction hint returns after reset
  model.reset();
  actualDescription = balloonNode.describer.movementDescriber.getGrabbedAlert();
  expectedDescription = 'Grabbed. At center of Play Area. Has no more negative charges than positive charges. Press W, A, S, or D key to move balloon. Space to release.';
  assert.equal( actualDescription, expectedDescription, 'grab alert test 3' );

  // neutral balloon in center of play area, showing no charges
  model.showChargesProperty.set( 'none' );
  actualDescription = balloonNode.describer.movementDescriber.getGrabbedAlert();
  expectedDescription = 'Grabbed. At center of Play Area.';
  assert.equal( actualDescription, expectedDescription, 'grab alert test 4' );

  // neutral balloon in center of play area, showing charge differences
  model.showChargesProperty.set( 'diff' );
  actualDescription = balloonNode.describer.movementDescriber.getGrabbedAlert();
  expectedDescription = 'Grabbed. At center of Play Area. Has zero net charge, showing no charges.';
  assert.equal( actualDescription, expectedDescription, 'grab alert test 5' );

  // In open area near sweater with negative net charge, showing all charges
  model.reset();
  model.yellowBalloon.setCenter( new Vector2( PlayAreaMap.X_POSITIONS.AT_NEAR_SWEATER, model.yellowBalloon.getCenterY() ) );
  model.yellowBalloon.chargeProperty.set( -10 );
  actualDescription = balloonNode.describer.movementDescriber.getGrabbedAlert();
  expectedDescription = 'Grabbed. Near sweater. Has a few more negative charges than positive charges. Press W, A, S, or D key to move balloon. Space to release.';
  assert.equal( actualDescription, expectedDescription, 'grab alert test 6' );

  // In open area near sweater with negative net charge, showing charge differences
  model.showChargesProperty.set( 'diff' );
  actualDescription = balloonNode.describer.movementDescriber.getGrabbedAlert();
  expectedDescription = 'Grabbed. Near sweater. Has negative net charge, showing a few negative charges.';
  assert.equal( actualDescription, expectedDescription, 'grab alert test 7' );

  // charged balloon on sweater, showing all charges
  model.reset();
  model.yellowBalloon.setCenter( new Vector2( PlayAreaMap.COLUMN_RANGES.RIGHT_ARM.getCenter(), model.yellowBalloon.getCenterY() ) );
  model.yellowBalloon.chargeProperty.set( -10 );
  model.sweater.chargeProperty.set( 10 );

  actualDescription = balloonNode.describer.movementDescriber.getGrabbedAlert();
  expectedDescription = 'Grabbed. On right arm of sweater. Has a few more negative charges than positive charges. ' +
                        'Sweater has a few more positive charges than negative charges. ' +
                        'Press W, A, S, or D key to move balloon. Space to release.';
  assert.equal( actualDescription, expectedDescription, 'grab alert test 8' );

  // charged balloon on sweater, showing charge differences
  model.showChargesProperty.set( 'diff' );
  actualDescription = balloonNode.describer.movementDescriber.getGrabbedAlert();
  expectedDescription = 'Grabbed. On right arm of sweater. Has negative net charge, showing a few negative charges. ' +
                        'Sweater has positive net charge, showing a few positive charges.';
  assert.equal( actualDescription, expectedDescription, 'grab alert test 9' );

  // charged balloon on sweater, showing no charges
  model.showChargesProperty.set( 'none' );
  actualDescription = balloonNode.describer.movementDescriber.getGrabbedAlert();
  expectedDescription = 'Grabbed. On right arm of sweater.';
  assert.equal( actualDescription, expectedDescription, 'grab alert test 10' );

  // charged balloon at upper wall, inducing charge in upper wall, showing all charges
  model.reset();
  model.yellowBalloon.chargeProperty.set( -10 );
  model.yellowBalloon.setCenter( new Vector2( PlayAreaMap.X_POSITIONS.AT_WALL, PlayAreaMap.Y_BOUNDARY_POSITIONS.AT_TOP ) );
  actualDescription = balloonNode.describer.movementDescriber.getGrabbedAlert();
  expectedDescription = 'Grabbed. At upper wall. Has a few more negative charges than positive charges. ' +
                        'Negative charges in upper wall move away from Yellow Balloon a little bit. Positive charges do not move. ' +
                        'Wall has many pairs of negative and positive charges. ' +
                        'Press W, A, S, or D key to move balloon. Space to release.';
  assert.equal( actualDescription, expectedDescription, 'grab alert test 11' );

  // charged balloon at upper wall, inducing charge in upper wall, showing charge differences
  model.showChargesProperty.set( 'diff' );
  actualDescription = balloonNode.describer.movementDescriber.getGrabbedAlert();
  expectedDescription = 'Grabbed. At upper wall. Has negative net charge, showing a few negative charges. ' +
                        'Wall has zero net charge, showing no charges.';
  assert.equal( actualDescription, expectedDescription, 'grab alert test 12' );

  // neutral balloon grabbed at wall, showing all charges
  model.yellowBalloon.positionProperty.reset();
  model.yellowBalloon.chargeProperty.reset();
  model.yellowBalloon.setCenter( new Vector2( PlayAreaMap.X_POSITIONS.AT_WALL, model.yellowBalloon.getCenterY() ) );
  model.showChargesProperty.set( 'all' );
  actualDescription = balloonNode.describer.movementDescriber.getGrabbedAlert();
  expectedDescription = 'Grabbed. At wall. Has no more negative charges than positive charges. ' +
                        'In wall, no change in charges. Wall has many pairs of negative and positive charges.';
  assert.equal( actualDescription, expectedDescription, 'grab alert test 13' );

  // neutral balloon grabbed at wall, showing charge differences
  model.showChargesProperty.set( 'diff' );
  actualDescription = balloonNode.describer.movementDescriber.getGrabbedAlert();
  expectedDescription = 'Grabbed. At wall. Has zero net charge, showing no charges. ' +
                        'Wall has zero net charge, showing no charges.';
  assert.equal( actualDescription, expectedDescription, 'grab alert test 14' );

  // grab alerts when both balloons are visible, at wall, and neutral, all charges shown

  model.reset();
  model.greenBalloon.isVisibleProperty.set( true );
  model.yellowBalloon.setCenter( new Vector2( PlayAreaMap.X_POSITIONS.AT_WALL, model.yellowBalloon.getCenterY() ) );
  model.greenBalloon.setCenter( new Vector2( PlayAreaMap.X_POSITIONS.AT_WALL, model.greenBalloon.getCenterY() ) );
  model.yellowBalloon.isDraggedProperty.set( true );
  actualDescription = balloonNode.describer.movementDescriber.getGrabbedAlert();
  expectedDescription = 'Grabbed. At wall, next to Green Balloon. Each balloon has no more negative charges than positive charges. ' +
                        'In wall, no change in charges. Wall has many pairs of negative and positive charges. ' +
                        'Press W, A, S, or D key to move balloon. Space to release.';
  assert.equal( actualDescription, expectedDescription, 'grab alert test 15' );

  // grab alerts when both balloons are visible, at wall and have charge, all charges shown
  model.greenBalloon.chargeProperty.set( -20 );
  model.yellowBalloon.chargeProperty.set( -20 );
  model.yellowBalloon.setCenter( new Vector2( PlayAreaMap.X_POSITIONS.AT_WALL, PlayAreaMap.Y_BOUNDARY_POSITIONS.AT_TOP ) );
  model.greenBalloon.setCenter( new Vector2( PlayAreaMap.X_POSITIONS.AT_WALL, PlayAreaMap.Y_BOUNDARY_POSITIONS.AT_TOP ) );
  actualDescription = balloonNode.describer.movementDescriber.getGrabbedAlert();
  expectedDescription = 'Grabbed. At upper wall, next to Green Balloon. Each balloon has several more negative charges than positive charges. ' +
                        'Negative charges in upper wall move away from balloons quite a lot. Positive charges do not move. ' +
                        'Wall has many pairs of negative and positive charges.';
  assert.equal( actualDescription, expectedDescription, 'grab alert test 16' );

  // grab alerts when both balloons are visible, at wall and have charge of different amounts, all charges shown
  model.greenBalloon.chargeProperty.set( -10 );
  model.yellowBalloon.chargeProperty.set( -20 );
  model.yellowBalloon.setCenter( new Vector2( PlayAreaMap.X_POSITIONS.AT_WALL, PlayAreaMap.Y_BOUNDARY_POSITIONS.AT_BOTTOM ) );
  model.greenBalloon.setCenter( new Vector2( PlayAreaMap.X_POSITIONS.AT_WALL, PlayAreaMap.Y_BOUNDARY_POSITIONS.AT_BOTTOM ) );
  actualDescription = balloonNode.describer.movementDescriber.getGrabbedAlert();
  expectedDescription = 'Grabbed. At lower wall, next to Green Balloon. Yellow Balloon has several more negative charges than positive charges. ' +
                        'Green Balloon has a few more negative charges than positive charges. ' +
                        'Negative charges in lower wall move away from balloons quite a lot. Positive charges do not move. ' +
                        'Wall has many pairs of negative and positive charges.';
  assert.equal( actualDescription, expectedDescription, 'grab alert test 17' );

  // grab alerts when both balloons are visible, at wall, and one has charge while the other is neutral
  model.greenBalloon.chargeProperty.set( 0 );
  model.yellowBalloon.chargeProperty.set( -20 );
  model.yellowBalloon.setCenter( new Vector2( PlayAreaMap.X_POSITIONS.AT_WALL, PlayAreaMap.Y_BOUNDARY_POSITIONS.AT_TOP ) );
  model.greenBalloon.setCenter( new Vector2( PlayAreaMap.X_POSITIONS.AT_WALL, PlayAreaMap.Y_BOUNDARY_POSITIONS.AT_TOP ) );
  actualDescription = balloonNode.describer.movementDescriber.getGrabbedAlert();
  expectedDescription = 'Grabbed. At upper wall, next to Green Balloon. Yellow Balloon has several more negative charges than positive charges. ' +
                        'Green Balloon has no more negative charges than positive charges. ' +
                        'Negative charges in upper wall move away from Yellow Balloon a lot. Positive charges do not move. ' +
                        'Wall has many pairs of negative and positive charges.';
  assert.equal( actualDescription, expectedDescription, 'grab alert test 18' );

  // grab alert when both balloons visible, at wall, neutral, showing charge differences
  model.showChargesProperty.set( 'diff' );
  model.greenBalloon.chargeProperty.set( 0 );
  model.yellowBalloon.chargeProperty.set( 0 );
  model.yellowBalloon.setCenter( new Vector2( PlayAreaMap.X_POSITIONS.AT_WALL, PlayAreaMap.Y_BOUNDARY_POSITIONS.AT_BOTTOM ) );
  model.greenBalloon.setCenter( new Vector2( PlayAreaMap.X_POSITIONS.AT_WALL, PlayAreaMap.Y_BOUNDARY_POSITIONS.AT_BOTTOM ) );
  actualDescription = balloonNode.describer.movementDescriber.getGrabbedAlert();
  expectedDescription = 'Grabbed. At lower wall, next to Green Balloon. Each balloon has zero net charge, showing no charges. ' +
                        'Wall has zero net charge, showing no charges.';
  assert.equal( actualDescription, expectedDescription, 'grab alert test 19' );

  // grab alert when both balloons are visible, both have same amount of relative charge, both at wall, showing
  // charge differences
  model.greenBalloon.chargeProperty.set( -10 );
  model.yellowBalloon.chargeProperty.set( -10 );
  model.yellowBalloon.setCenter( new Vector2( PlayAreaMap.X_POSITIONS.AT_WALL, PlayAreaMap.Y_BOUNDARY_POSITIONS.AT_TOP ) );
  model.greenBalloon.setCenter( new Vector2( PlayAreaMap.X_POSITIONS.AT_WALL, PlayAreaMap.Y_BOUNDARY_POSITIONS.AT_TOP ) );
  actualDescription = balloonNode.describer.movementDescriber.getGrabbedAlert();
  expectedDescription = 'Grabbed. At upper wall, next to Green Balloon. ' +
                        'Each balloon has negative net charge, showing a few negative charges. ' +
                        'Wall has zero net charge, showing no charges.';
  assert.equal( actualDescription, expectedDescription, 'grab alert test 20' );

  // grab alert when both balloons are visible with differing amounts of charge, both at wall, showing differences
  model.greenBalloon.chargeProperty.set( -10 );
  model.yellowBalloon.chargeProperty.set( -20 );
  model.yellowBalloon.setCenter( new Vector2( PlayAreaMap.X_POSITIONS.AT_WALL, PlayAreaMap.Y_BOUNDARY_POSITIONS.AT_BOTTOM ) );
  model.greenBalloon.setCenter( new Vector2( PlayAreaMap.X_POSITIONS.AT_WALL, PlayAreaMap.Y_BOUNDARY_POSITIONS.AT_BOTTOM ) );
  actualDescription = balloonNode.describer.movementDescriber.getGrabbedAlert();
  expectedDescription = 'Grabbed. At lower wall, next to Green Balloon. Yellow Balloon has negative net charge, showing several negative charges. ' +
                        'Green Balloon has negative net charge, showing a few negative charges. ' +
                        'Wall has zero net charge, showing no charges.';
  assert.equal( actualDescription, expectedDescription, 'grab alert test 21' );

  // both balloons visible and at wall. Grabbed balloon neutral, un-grabbed balloon has charge, showing charge
  // differences
  model.greenBalloon.chargeProperty.set( -20 );
  model.yellowBalloon.chargeProperty.set( 0 );
  model.yellowBalloon.setCenter( new Vector2( PlayAreaMap.X_POSITIONS.AT_WALL, PlayAreaMap.Y_BOUNDARY_POSITIONS.AT_TOP ) );
  model.greenBalloon.setCenter( new Vector2( PlayAreaMap.X_POSITIONS.AT_WALL, PlayAreaMap.Y_BOUNDARY_POSITIONS.AT_TOP ) );
  actualDescription = balloonNode.describer.movementDescriber.getGrabbedAlert();
  expectedDescription = 'Grabbed. At upper wall, next to Green Balloon. Yellow Balloon has zero net charge, showing no charges. ' +
                        'Green Balloon has negative net charge, showing several negative charges. ' +
                        'Wall has zero net charge, showing no charges.';
  assert.equal( actualDescription, expectedDescription, 'grab alert test 21' );
} );

QUnit.test( 'Grabbing balloon on sweater when both are visible', function( assert ) {
  model.reset();
  model.greenBalloon.isVisibleProperty.set( true );

  const rightSweater = new Vector2( PlayAreaMap.COLUMN_RANGES.RIGHT_SIDE_OF_SWEATER.getCenter(), PlayAreaMap.Y_BOUNDARY_POSITIONS.AT_TOP );

  //--------------------------------------------------------------------------
  // All charges shown
  //--------------------------------------------------------------------------

  // both balloons have charge
  model.yellowBalloon.chargeProperty.set( -10 );
  model.greenBalloon.chargeProperty.set( -10 );
  model.sweater.chargeProperty.set( 20 );
  model.yellowBalloon.setCenter( rightSweater );
  model.greenBalloon.setCenter( rightSweater );
  model.yellowBalloon.isDraggedProperty.set( true );
  let actualDescription = balloonNode.describer.movementDescriber.getGrabbedAlert();
  let expectedDescription = 'Grabbed. On upper-right side of sweater, next to Green Balloon. ' +
                            'Each balloon has a few more negative charges than positive charges. ' +
                            'Sweater has several more positive charges than negative charges. ' +
                            'Press W, A, S, or D key to move balloon. Space to release.';
  assert.equal( actualDescription, expectedDescription, 'sweater grab test 1' );

  // both balloons have charge
  model.yellowBalloon.chargeProperty.set( -10 );
  model.greenBalloon.chargeProperty.set( -20 );
  model.sweater.chargeProperty.set( 30 );
  actualDescription = balloonNode.describer.movementDescriber.getGrabbedAlert();
  expectedDescription = 'Grabbed. On upper-right side of sweater, next to Green Balloon. ' +
                        'Yellow Balloon has a few more negative charges than positive charges. ' +
                        'Green Balloon has several more negative charges than positive charges. ' +
                        'Sweater has several more positive charges than negative charges.';
  assert.equal( actualDescription, expectedDescription, 'sweater grab test 2' );

  //--------------------------------------------------------------------------
  // Showing charge differences
  //--------------------------------------------------------------------------
  model.showChargesProperty.set( 'diff' );

  // both balloons have charge
  model.yellowBalloon.chargeProperty.set( -10 );
  model.greenBalloon.chargeProperty.set( -10 );
  model.sweater.chargeProperty.set( 20 );
  actualDescription = balloonNode.describer.movementDescriber.getGrabbedAlert();
  expectedDescription = 'Grabbed. On upper-right side of sweater, next to Green Balloon. ' +
                        'Each balloon has negative net charge, showing a few negative charges. ' +
                        'Sweater has positive net charge, showing several positive charges.';
  assert.equal( actualDescription, expectedDescription, 'sweater grab test 3' );

  // grabbed balloon neutral, next to negatively charged balloon.
  model.yellowBalloon.chargeProperty.set( 0 );
  model.greenBalloon.chargeProperty.set( -20 );
  model.sweater.chargeProperty.set( 30 );
  actualDescription = balloonNode.describer.movementDescriber.getGrabbedAlert();
  expectedDescription = 'Grabbed. On upper-right side of sweater, next to Green Balloon. ' +
                        'Yellow Balloon has zero net charge, showing no charges. ' +
                        'Green Balloon has negative net charge, showing several negative charges. ' +
                        'Sweater has positive net charge, showing several positive charges.';
  assert.equal( actualDescription, expectedDescription, 'sweater grab test 4' );
} );

QUnit.test( 'Charge pick up alerts', function( assert ) {
  model.reset();

  // first time balloon hits sweater and picks up negative charges
  model.yellowBalloon.chargeProperty.set( -1 );
  model.sweater.chargeProperty.set( 1 );
  let actualAlert = balloonNode.describer.getChargePickupDescription( true );
  let expectedAlert = 'Yellow Balloon picks up negative charges from sweater.';
  assert.equal( actualAlert, expectedAlert, 'charge pick up 1' );

  // first time  balloon hits sweater and picks up negative charges, showing charge differences
  model.showChargesProperty.set( 'diff' );
  actualAlert = balloonNode.describer.getChargePickupDescription( true );
  expectedAlert = 'Yellow Balloon picks up negative charges from sweater. Same increase of positive charges on sweater.';
  assert.equal( actualAlert, expectedAlert, 'charge pick up 2' );

  // balloon picks up enough charges to enter next described range of charge, all  charges shown
  model.showChargesProperty.set( 'all' );
  model.yellowBalloon.chargeProperty.set( -20 );
  model.sweater.chargeProperty.set( 20 );
  actualAlert = balloonNode.describer.getChargePickupDescription();
  expectedAlert = 'Yellow Balloon has several more negative charges than positive charges. Sweater has several more positive charges than negative charges.';
  assert.equal( actualAlert, expectedAlert, 'charge pick up 3' );

  // balloon picks up more negative charges without entering new relative range, all charges shown
  model.yellowBalloon.chargeProperty.set( -21 );
  model.sweater.chargeProperty.set( 21 );
  actualAlert = balloonNode.describer.getChargePickupDescription();
  expectedAlert = 'Yellow Balloon picks up more negative charges.';
  assert.equal( actualAlert, expectedAlert, 'charge pick up 4' );

  // balloon picks up enough charges to enter next described range of charge, charge differences shown
  model.reset();
  model.showChargesProperty.set( 'diff' );
  model.yellowBalloon.chargeProperty.set( -20 );
  model.sweater.chargeProperty.set( 20 );
  actualAlert = balloonNode.describer.getChargePickupDescription();
  expectedAlert = 'Yellow Balloon has negative net charge, showing several negative charges. Sweater has positive net charge, showing several positive charges.';
  assert.equal( actualAlert, expectedAlert, 'charge pick up 5' );

  // balloon picks up more negative charges without entering new relative range, charge differences shown
  model.yellowBalloon.chargeProperty.set( -21 );
  model.sweater.chargeProperty.set( 21 );
  actualAlert = balloonNode.describer.getChargePickupDescription();
  expectedAlert = 'Yellow Balloon picks up more negative charges. Same increase of positive charges on sweater.';
  assert.equal( actualAlert, expectedAlert, 'charge pick up 6' );
} );

QUnit.test( 'Sweater rub with no charge pickup', function( assert ) {
  model.reset();

  // balloon is 'grabbed' for all these tests
  model.yellowBalloon.isDraggedProperty.set( true );

  // move the balloon to the sweater  without picking up charges
  model.yellowBalloon.setCenter( new Vector2( PlayAreaMap.COLUMN_RANGES.LEFT_SIDE_OF_SWEATER.getCenter(), PlayAreaMap.Y_BOUNDARY_POSITIONS.AT_TOP ) );
  let actualAlert = balloonNode.describer.getNoChargePickupDescription();
  let expectedAlert = 'No change in charges. On upper-left side of sweater. More pairs of charges up and to the left.';
  assert.equal( actualAlert, expectedAlert, 'no pick up 1' );

  // same balloon on sweater but didn't pick up charges
  model.showChargesProperty.set( 'diff' );
  actualAlert = balloonNode.describer.getNoChargePickupDescription();
  expectedAlert = 'No change in net charge. On upper-left side of sweater. More hidden pairs of charges up and to the left.';
  assert.equal( actualAlert, expectedAlert, 'no pick up 2' );

  // the balloon just picked up the last charge from the sweater
  model.showChargesProperty.set( 'all' );
  model.sweater.chargeProperty.set( BASEConstants.MAX_BALLOON_CHARGE );
  model.yellowBalloon.chargeProperty.set( -BASEConstants.MAX_BALLOON_CHARGE );
  actualAlert = balloonNode.describer.getLastChargePickupDescription();
  expectedAlert = 'Sweater has no more negative charges, only positive charges. Yellow Balloon has many more negative charges than positive charges.';
  assert.equal( actualAlert, expectedAlert, 'no pick up 3' );

  // the balloon just picked up the last charge from the sweater,  showing charge differences
  model.showChargesProperty.set( 'diff' );
  actualAlert = balloonNode.describer.getLastChargePickupDescription();
  expectedAlert = 'Sweater has positive net charge, showing all positive charges. Yellow Balloon has negative net charge, showing many negative charges.';
  assert.equal( actualAlert, expectedAlert, 'no pick up 4' );

  // balloon is rubbing on sweater, but there are no more charges on the sweater
  model.showChargesProperty.set( 'all' );
  actualAlert = balloonNode.describer.getNoChargePickupDescription();
  expectedAlert = 'No change in charges. On upper-left side of sweater. Sweater has positive net charge. Yellow Balloon has negative net charge. Press Space to release.';
  assert.equal( actualAlert, expectedAlert, 'no pick up 5' );

  // balloon is rubbing on sweater, but no more charges remain, charge differences shown
  model.showChargesProperty.set( 'diff' );
  actualAlert = balloonNode.describer.getNoChargePickupDescription();
  expectedAlert = 'No change in net charge. On upper-left side of sweater. Press Space to release.';
  assert.equal( actualAlert, expectedAlert, 'no pick up 6' );
} );

QUnit.test( 'Balloon rubbing on wall', function( assert ) {
  model.reset();

  // balloon is 'grabbed' for all these tests
  model.yellowBalloon.isDraggedProperty.set( true );

  // neutral balloon rubbing along wall, all charges shown
  model.yellowBalloon.setCenter( new Vector2( PlayAreaMap.X_POSITIONS.AT_WALL, PlayAreaMap.Y_BOUNDARY_POSITIONS.AT_TOP ) );
  let actualAlert = balloonNode.describer.getWallRubbingDescription();
  let expectedAlert = 'At upper wall. No transfer of charge. In upper wall, no change in charges.';
  assert.equal( actualAlert, expectedAlert, 'wall rub test 1' );

  // charged balloon rubbing along upper wall, all charges shown
  model.yellowBalloon.chargeProperty.set( -20 );
  model.yellowBalloon.setCenter( new Vector2( PlayAreaMap.X_POSITIONS.AT_WALL, PlayAreaMap.Y_BOUNDARY_POSITIONS.AT_TOP + 1 ) );
  actualAlert = balloonNode.describer.getWallRubbingDescription();
  expectedAlert = 'At upper wall. No transfer of charge. Negative charges in upper wall move away from Yellow Balloon a lot. Positive charges do not move.';
  assert.equal( actualAlert, expectedAlert, 'wall rub test 2' );

  // charged balloon rubbing along upper wall, no charges shown
  model.showChargesProperty.set( 'none' );
  actualAlert = balloonNode.describer.getWallRubbingDescription();
  expectedAlert = 'At upper wall.';
  assert.equal( actualAlert, expectedAlert, 'wall rub test 3' );

  // neutral balloon rubbing along wall, charge differences shown
  model.showChargesProperty.set( 'diff' );
  model.yellowBalloon.chargeProperty.set( 0 );
  actualAlert = balloonNode.describer.getWallRubbingDescription();
  expectedAlert = 'At upper wall. Yellow Balloon has zero net charge, showing no charges. Wall has zero net charge, showing no charges.';
  assert.equal( actualAlert, expectedAlert, 'wall rub test 4' );

  // charged balloon rubbing along upper wall, charge differences shown
  model.yellowBalloon.chargeProperty.set( -20 );
  actualAlert = balloonNode.describer.getWallRubbingDescription();
  expectedAlert = 'At upper wall. Yellow Balloon has negative net charge, showing several negative charges. Wall has zero net charge, showing no charges.';
  assert.equal( actualAlert, expectedAlert, 'wall rub test 5' );
} );

QUnit.test( 'Two Balloons rubbing on wall', function( assert ) {
  model.reset();

  //--------------------------------------------------------------------------
  // Testing all charges shown
  //--------------------------------------------------------------------------
  model.greenBalloon.isVisibleProperty.set( true );

  // both balloons charged, all charges shown
  model.yellowBalloon.chargeProperty.set( -10 );
  model.greenBalloon.chargeProperty.set( -10 );
  model.yellowBalloon.setCenter( new Vector2( PlayAreaMap.X_POSITIONS.AT_WALL, PlayAreaMap.Y_BOUNDARY_POSITIONS.AT_TOP + 1 ) );
  model.greenBalloon.setCenter( new Vector2( PlayAreaMap.X_POSITIONS.AT_WALL, PlayAreaMap.Y_BOUNDARY_POSITIONS.AT_TOP + 1 ) );
  let actualAlert = balloonNode.describer.getWallRubbingDescription();
  let expectedAlert = 'At upper wall, next to Green Balloon. No transfer of charge. Negative charges in upper wall move away from balloons a lot. Positive charges do not move.';
  assert.equal( actualAlert, expectedAlert, 'wall rub, two balloons, test 1' );

  // only one balloon has charge, all charges shown - nudge the balloon so that induced Properties update
  model.greenBalloon.chargeProperty.set( 0 );
  model.greenBalloon.setCenter( new Vector2( PlayAreaMap.X_POSITIONS.AT_WALL, PlayAreaMap.Y_BOUNDARY_POSITIONS.AT_TOP ) );
  actualAlert = balloonNode.describer.getWallRubbingDescription();
  expectedAlert = 'At upper wall, next to Green Balloon. No transfer of charge. Negative charges in upper wall move away from Yellow Balloon a little bit. Positive charges do not move.';
  assert.equal( actualAlert, expectedAlert, 'wall rub, two balloons, test 2' );

  // grabbed balloon is neutral, and ungrabbed balloon has charges
  model.yellowBalloon.chargeProperty.set( 0 );
  model.greenBalloon.chargeProperty.set( -10 );
  model.greenBalloon.setCenter( new Vector2( PlayAreaMap.X_POSITIONS.AT_WALL, PlayAreaMap.Y_BOUNDARY_POSITIONS.AT_BOTTOM ) );
  model.yellowBalloon.setCenter( new Vector2( PlayAreaMap.X_POSITIONS.AT_WALL, PlayAreaMap.Y_BOUNDARY_POSITIONS.AT_BOTTOM ) );
  actualAlert = balloonNode.describer.getWallRubbingDescription();
  expectedAlert = 'At lower wall, next to Green Balloon. No transfer of charge. Negative charges in lower wall move away from Green Balloon a little bit. Positive charges do not move.';
  assert.equal( actualAlert, expectedAlert, 'wall rub, two balloons, test 3' );

  //--------------------------------------------------------------------------
  // Testing charge differences
  //--------------------------------------------------------------------------
  model.showChargesProperty.set( 'diff' );

  // both balloons charged
  model.yellowBalloon.chargeProperty.set( -20 );
  model.greenBalloon.chargeProperty.set( -10 );
  model.yellowBalloon.setCenter( new Vector2( PlayAreaMap.X_POSITIONS.AT_WALL, PlayAreaMap.Y_BOUNDARY_POSITIONS.AT_TOP ) );
  model.greenBalloon.setCenter( new Vector2( PlayAreaMap.X_POSITIONS.AT_WALL, PlayAreaMap.Y_BOUNDARY_POSITIONS.AT_TOP ) );
  model.yellowBalloon.isDraggedProperty.set( true );
  actualAlert = balloonNode.describer.getWallRubbingDescription();
  expectedAlert = 'At upper wall, next to Green Balloon. Yellow Balloon has negative net charge, showing several negative charges. Green Balloon has negative net charge, showing a few negative charges. Wall has zero net charge, showing no charges.';
  assert.equal( actualAlert, expectedAlert, 'wall rub, two balloons, test 4' );

  // grabbed balloon is neutral, ungrabbed balloon has many charges
  model.yellowBalloon.chargeProperty.set( 0 );
  model.greenBalloon.chargeProperty.set( -20 );
  model.yellowBalloon.setCenter( new Vector2( PlayAreaMap.X_POSITIONS.AT_WALL, PlayAreaMap.Y_BOUNDARY_POSITIONS.AT_BOTTOM ) );
  model.greenBalloon.setCenter( new Vector2( PlayAreaMap.X_POSITIONS.AT_WALL, PlayAreaMap.Y_BOUNDARY_POSITIONS.AT_BOTTOM ) );
  actualAlert = balloonNode.describer.getWallRubbingDescription();
  expectedAlert = 'At lower wall, next to Green Balloon. Yellow Balloon has zero net charge, showing no charges. Green Balloon has negative net charge, showing several negative charges. Wall has zero net charge, showing no charges.';
  assert.equal( actualAlert, expectedAlert, 'wall rub, two balloons, test 5' );

  // both balloons neutral
  model.yellowBalloon.chargeProperty.set( 0 );
  model.greenBalloon.chargeProperty.set( 0 );
  model.yellowBalloon.setCenter( new Vector2( PlayAreaMap.X_POSITIONS.AT_WALL, PlayAreaMap.Y_BOUNDARY_POSITIONS.AT_TOP ) );
  model.greenBalloon.setCenter( new Vector2( PlayAreaMap.X_POSITIONS.AT_WALL, PlayAreaMap.Y_BOUNDARY_POSITIONS.AT_TOP ) );
  actualAlert = balloonNode.describer.getWallRubbingDescription();
  expectedAlert = 'At upper wall, next to Green Balloon. Each balloon has zero net charge, showing no charges. Wall has zero net charge, showing no charges.';
  assert.equal( actualAlert, expectedAlert, 'wall rub, two balloons, test 6' );

  // two charged balloons, each with several charges
  model.yellowBalloon.chargeProperty.set( -20 );
  model.greenBalloon.chargeProperty.set( -20 );
  model.yellowBalloon.setCenter( new Vector2( PlayAreaMap.X_POSITIONS.AT_WALL, PlayAreaMap.Y_BOUNDARY_POSITIONS.AT_BOTTOM ) );
  model.greenBalloon.setCenter( new Vector2( PlayAreaMap.X_POSITIONS.AT_WALL, PlayAreaMap.Y_BOUNDARY_POSITIONS.AT_BOTTOM ) );
  actualAlert = balloonNode.describer.getWallRubbingDescription();
  expectedAlert = 'At lower wall, next to Green Balloon. Each balloon has negative net charge, showing several negative charges. Wall has zero net charge, showing no charges.';
  assert.equal( actualAlert, expectedAlert, 'wall rub, two balloons, test 6' );
} );