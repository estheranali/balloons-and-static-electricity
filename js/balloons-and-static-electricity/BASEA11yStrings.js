// Copyright 2017, University of Colorado Boulder

/**
 * Single location of all accessibility strings.  These strings are not meant to be translatable yet.  Rosetta needs
 * some work to provide translators with context for these strings, and we want to receive some community feedback
 * before these strings are submitted for translation.
 *
 * @author Jesse Greenberg
 */
define( function( require ) {
  'use strict';

  var balloonsAndStaticElectricity = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloonsAndStaticElectricity' );

  var BASEA11yStrings = {

    //------------------------------------------------------------------------
    // General utility strings
    //------------------------------------------------------------------------
    singleStatementPatternString: '{{statement}}.',

    // TODO: Can these be removed?
    balloonDescriptionPatternString: '{0} {1} {2}', // location, charge, interaction cu,
    balloonGrabbedDescriptionPatternString: '{0} {1} {2} {3}', // grabbed, location, charge, interaction cue,
    balloonDragDescriptionPatternString: '{0} {1} {2} {3} {4} {5}', // direction, proximity, charge, ,
    grabButtonNavigationCueString: 'Look for grab button to play.',
    dragNavigationCueString: 'Press W, A, S, or D key to drag balloon. Space key to let go.',

    grabBalloonToPlayString: 'Grab balloon to play.',
    keyboardShortcutsHelpString: 'If needed, check out the keyboard shortcuts for this sim.',

    positionString: 'position',
    positionsString: 'positions',

    // location strings
    balloonLocationStringPattern: 'In {0}.',
    draggingLocationStringPattern: 'At {0}.',
    stickingToLocationPatternString: 'Sticking to {0}.',

    // location strings for the grid in the play area
    leftShoulderOfSweaterString: 'left shoulder of sweater',
    leftArmOfSweaterString: 'left arm of sweater',
    bottomLeftEdgeOfSweaterString: 'lower-left arm of sweater',

    upperLeftSideOfSweaterString: 'upper-left side of sweater',
    leftSideOfSweaterString: 'left side of sweater',
    lowerLeftSideOfSweaterString: 'lower-left side of sweater',

    upperRightSideOfSweaterString: 'upper-right side of sweater',
    rightSideOfSweaterString: 'right side of sweater',
    lowerRightSideOfSweater: 'lower-right side of sweater',

    rightShoulderOfSweaterString: 'right shoulder of sweater',
    rightArmOfSweaterString: 'right arm of sweater',
    lowerRightArmOfSweaterString: 'lower-right arm of sweater',

    upperLeftSideOfPlayAreaString: 'upper-left side of Play Area',
    leftSideOfPlayAreaString: 'left side of Play Area',
    lowerLeftSideOfPlayAreaString: 'lower-left side of Play Area',

    upperCenterOfPlayAreaString: 'upper-center of Play Area',
    centerOfPlayAreaString: 'center of Play Area',
    lowerCenterOfPlayAreaString: 'lower-center of Play Area',

    upperRightSideOfPlayAreaString: 'upper-right side of Play Area',
    rightSideOfPlayAreaString: 'right side of Play Area',
    lowerRightSideOfPlayAreaString: 'lower-right side of Play Area',

    upperWallString: 'upper wall',
    wallString: 'wall',
    lowerWallString: 'lower wall',

    upperRightEdgeOfPlayAreaString: 'upper-right edge of Play Area',
    rightEdgeOfPlayArea: 'right edge of Play Area',
    lowerRightEdgeOfPlayArea: 'lower-right edge of Play Area',

    // location strings while touching another object
    touchingWallStringPattern: 'Touching {0}.',
    stickingToWallStringPattern: 'Sticking to {0}.',
	generalWallString: 'wall',

    stickingToSweaterString: 'Sticking to right side of sweater.',

    // charge descriptions
    namedBalloonChargeDescriptionPatternString: '{0} has {1} net charge, {2} more negative charges than positive charges.',
    balloonChargeStringPattern: 'Has {0} net charge, {1} more negative charges than positive charges.',

    neutralString: 'neutral',
    negativeString: 'negative',
    positiveString: 'positive',

    noString: 'no',
    aFewString: 'a few',
    severalString: 'several',
    manyString: 'many',

    // wall charge descriptions
    atWallString: 'At wall.',
    atWallTouchPointPatternString: 'At touch point, negative charges in wall {0}. Positive charges do not move.  Wall has neutral net charge, many pairs of negative and positive charges.',
    wallRubStringPattern: 'No transfer of charge.  At touch point, negative charges in wall {0}.  Positive charges do not move.',
    wallChargesReturnString: 'Negative charges in wall return {0}.',

    slightlyString: 'slightly',
    allTheWayString: 'all the way',
    noChangeInChargesString: 'No change in charges.',
    moveALittleBitString: 'move away from balloon a little bit',
    moveALotString: 'move away from balloon a lot',
    moveQuiteALotString: 'move away from balloon quite a lot',
    doNotMoveString: 'do not move',

    noMoreChargesRemainingOnSweaterString: 'No change in charges. No more charges remaining on sweater.',

    // release descriptions
    balloonReleasedNoChangePatternString: 'Balloon Released. {0}',
    noChangeInPositionOrChargeString: 'No change in position.  No change in charge.',

    sweaterString: 'sweater',

    // interaction descriptions
    upTowardsTopString: 'Up. Towards top.',
    leftTowardsSweaterString: 'Left. Towards sweater.',
    downTowardsBottomString: 'Down. Towards bottom.',
    rightTowardsWallString: 'Right. Towards wall.',
    rightTowardsRightSideOfPlayAreaString: 'Right. Towards right side of play area.',

    closerToTopString: 'Up. Closer to top.',
    closerToSweaterString: 'Left. Closer to sweater.',
    closerToBottomString: 'Down. Closer to bottom.',
    closerToWallString: 'Right. Closer to wall.',
    closerToRightSideString: 'Right. Closer to right side of play area.',

    moveUpString: 'Up.',
    moveLeftString: 'Left.',
    moveDownString: 'Down.',
    moveRightString: 'Right.',

    morePairsOfChargesStringPattern: 'More pairs of charges {0}.',

    wallRemovedString: 'Wall removed from play area.',
    wallAddedString: 'Wall added to play area.',

    // boundary strings
    atTopOfPlayAreaString: 'At top.',
    atBottomOfPlayAreaString: 'At bottom.',
    leftEdgeString: 'At left edge.',
    rightEdgeString: 'At right edge.',

    nearSweaterString: 'Near sweater.',
    onSweaterPatternStringString: 'On sweater. {0}',
    picksUpNegativeChargesString: 'Picks up negative charges from sweater.',
    nearWallString: 'Near wall.',

    atCenterOfPlayAreaString: 'At center of play area.',
    onRightSideOfPlayAreaString: 'On right side of play area.',

    balloonPicksUpMoreChargesString: 'Balloon picks up more negative charges.',
    againMoreChargesString: 'Again, more negative charges.',

    // labels
    greenBalloonString: 'Green balloon',
    yellowBalloonString: 'Yellow balloon',

    //------------------------------------------------------------------------
    // Scene summary strings
    //------------------------------------------------------------------------
    sceneSummaryString: 'Scene Summary',
    openingSummaryString: 'Simulation contains a Play Area and a Control Panel. The play area is a small room. The control panel has buttons and switches to change conditions in the room.',

    // objects for the scene summary
    roomObjectsPatternString: 'Currently, room has {{description}}.',
    aBalloonString: 'a balloon',
    twoBalloonsString: 'two balloons',
    andARemovableWallString: 'and a removable wall',
    aSweaterString: 'a sweater',
    andASweaterString: 'and a sweater',
    objectsWithWallPatternString: '{{balloon}}, {{sweater}}, {{wall}}',
    objectsNoWallPatternString: '{{balloon}} {{sweater}}',

    // patterns for the balloon description in the scene summary
    balloonSummaryWithInducedChargePatternString: '{{balloon}}, {{attractiveState}} {{location}}. {{inducedCharge}}.',
    balloonSummaryWithoutInducedChargePatternString: '{{balloon}}, {{attractiveState}} {{location}}.',
    twoBalloonLocationSummaryString: '{{yellowBalloon}} {{greenBalloon}}',
    balloonLocationSummaryWithPositiveChargeDescription: '{{balloonSummary}} Positive charges do not move.',

    inducedChargePatternString: 'Negative charges in {{wallLocation}} move away from {{balloon}} {{inductionAmount}}',

    // describing the attractive state of a balloon
    sceneSummaryStickingToString: 'sticking to',
    sceneSummaryOnString: 'on',
    sceneSummaryTouchingString: 'touching',

    // scene summary charge strings
    allHaveNoNetChargeString: 'All have no net charge',
    neutralBalloonChargePatternString: '{{balloon}} has a few pairs of negative and positive charges.',
    neutralSweaterChargeString: 'Sweater, many pairs of negative and positive charges.',
    neutralSweaterAndWallChargeString: 'Sweater and wall, many pairs of negative and positive charges.',

    //-----------------
    // Location Descriptions
    twoBalloonDescriptionPattern: '{0} {1}',
    balloonLocationDescriptionStringPattern: '{0}, {1}',
    balloonInCenterPatternString: '{0} {1}',

    // TODO: are these used anywhere?
    balloonAndSweaterString: 'a balloon and a sweater',
    twoBalloonsAndASweater: 'two balloons and a sweater',
    inPlayAreaStringPattern: 'in {0} of play area.',
    inPlayAreaNearItemStringPattern: 'in {0} of play area, {1}.',
    evenlyBetweenString: 'Evenly between sweater and wall. Sweater is at far left. Wall is at far right.',
    stickingToWallWithChargesStringPattern: 'sticking to {0} wall. {1}',
    negativeChargesMoveStringPattern: 'Negative charges in wall move away from balloon {0}.',

    //------------------------------------------------------------------------
    // Induced charge strings
    //------------------------------------------------------------------------
    aLittleBitString: 'a little bit',
    aLotString: 'a lot',
    quiteALotString: 'quite a lot',

    stickingToSweaterStringPattern: 'sticking to {0} of sweater.',

    //------------------------------------------------------------------------
    // Charge view strings
    //------------------------------------------------------------------------
    noChargesShownString: 'no charges shown',

    //------------------------------------------------------------------------
    // Object strings (strings shared between all objects)
    //------------------------------------------------------------------------
    manyChargePairsString: 'many pairs of positive and negative charges',

    //------------------------------------------------------------------------
    // Sweater strings
    //------------------------------------------------------------------------
    sweaterLabelString: 'Sweater',
    sweaterLocationString: 'At left edge of Play Area',
    sweaterDescriptionPatternString: '{{location}}. {{charge}}.',
    sweaterChargePatternString: '{{netCharge}}, {{relativeCharge}}',
    sweaterNetChargePatternString: 'Has {{netCharge}} net charge',
    sweaterRelativeChargeAllPatternString: '{{charge}} more positive charges than negative charges',
    sweaterRelativeChargeDifferencesPatternString: 'showing {{charge}} positive charges',
    sweaterNoChargesShownString: 'no charges shown',
    sweaterNoMoreChargesString: 'no more negative charges, only positive charges',

    //------------------------------------------------------------------------
    // Wall strings
    //------------------------------------------------------------------------
    wallDescriptionPatternString: '{{location}}. {{charge}}.',
    wallLocationString: 'At right edge of Play Area',
    wallNoNetChargeString: 'Has no net charge',
    wallNoTransferOfChargeString: 'No transfer of charge',
    wallChargeWithoutInducedPatternString: '{{netCharge}}, {{shownCharges}}',
    wallChargeWithInducedPatternString: '{{netCharge}}, {{shownCharges}}. {{inducedCharge}}',
    wallTwoBalloonInducedChargePatternString: '{{yellowBalloon}}. {{greenBalloon}}',

    //------------------------------------------------------------------------
    // Balloon strings
    //------------------------------------------------------------------------
    greenBalloonLabelString: 'Green Balloon',
    yellowBalloonLabelString: 'Yellow Balloon',
    grabBalloonPatternString: 'Grab {{balloon}}',

    balloonLocationAttractiveStatePatternString: '{{attractiveState}} {{location}}',
    balloonShowAllChargesPatternString: '{{stateAndLocation}}. {{netCharge}}, {{relativeCharge}}.',
    balloonShowNoChargesPatternString: '{{stateAndLocation}}.',
    balloonShowChargeDifferencesPatternString: '{{stateAndLocation}}. {{netCharge}}, {{chargesShown}}.',
    balloonDescriptionWithHelpPatternString: '{{description}} {{help}}',

    // describing the attractive state of a balloon
    balloonStickingToString: 'Sticking to',
    balloonOnString: 'On',
    balloonTouchingString: 'Touching',

    balloonNetChargePatternString: 'Has {{chargeAmount}} net charge',
    balloonNoString: 'no',
    balloonNegativeString: 'negative',
    balloonRelativeChargePatternString: '{{amount}} more nevative charges than positive charges',
    balloonChargeDifferencesPatternString: 'showing {{amount}} negative charges',

    //--------------------------------------------------------------------------
    // Balloon interaction strings
    //--------------------------------------------------------------------------
    grabbedString: 'Grabbed.',
    balloonReleasedPatternString: '{{balloon}} released.',

    //--------------------------------------------------------------------------
    // Balloon movement strings
    //--------------------------------------------------------------------------
    movesToObjectPatternString: 'Moves {{velocity}} {{toObject}}.',

    towardsSweaterString: 'towards sweater',
    toWallString: 'to wall',

    verySlowlyString: 'very slowly',
    slowlyString: 'slowly',
    quicklyString: 'quickly',
    veryQuicklyString: 'very quickly',

    //--------------------------------------------------------------------------
    // Balloon Dragging strings
    //--------------------------------------------------------------------------
    upString: 'Up.',
    leftString: 'Left.',
    downString: 'Down.',
    rightString: 'Right.',
    upAndToTheRightString: 'Up and to the right.',
    upAndToTheLeftString: 'Up and to the left.',
    downAndToTheRightString: 'Down and to the right.',
    downAndToTheLeftString: 'Down and to the left.',

    atLeftEdgeString: 'At left edge.',
    atTopString: 'At top.',
    atBottomString: 'At bottom.',
    atRightEdgeString: 'At right edge.',

    onSweaterString: 'On Sweater.',
    offSweaterString: 'Off sweater.',

    veryCloseToSweaterString: 'Very close to sweater.',
    veryCloseToWallString: 'Very close to wall.',
    veryCloseToRightEdgeString: 'Very close to right edge.',

    balloonAtLocationPatternString: 'At {{location}}.',
    balloonOnLocationPatternString: 'On {{location}}.',

    //------------------------------------------------------------------------
    // Control panel strings
    //------------------------------------------------------------------------
    chargeSettingsDescriptionString: 'Choose how you see or hear charge information.',
    chargeSettingsLabelString: 'Charge Settings',
    showAllChargesAlertString: 'No charges hidden.',
    shoNoChargesAlertString: 'All charges hidden.',
    showChargeDifferencesAlertString: 'Only unpaired charges shown.',

    // sweater charge descriptions
    netNeutralString: 'neutral net',
    netPositiveString: 'positive net',

    // balloon grab cue
    balloonButtonHelpString: 'Look for grab button to play.',

    // misc labels
    removeWallLabelString: 'Remove Wall',
    addWallLabelString: 'Add Wall',

    balloonString: 'Balloon',
    balloonsString: 'Balloons',
    twoBalloonExperimentLabelString: 'Two-Balloon Experiment',
    grabPatternString: 'Grab {0}',
    greenBalloonRemovedString: 'Green balloon removed from Play Area',
    greenBalloonAddedString: 'Green balloon added to Play Area',
    playAreaString: 'Play Area',
    wallLabelString: 'Wall',
    controlPanelString: 'Control Panel',
    wallDescriptionString: 'Run experiments with or without the wall.',
    resetBalloonsDescriptionPatternString: 'Reset {0} to start {1} and an uncharged state.',

    resetAllString: 'Reset All',

    // strings for keyboard shortcuts help content
    keyboardHelpDialogString: 'Keyboard Shortcuts',
	grabBalloonString: 'Grab/Release Balloon',
    grabDescriptionString: 'Space or Enter grabs or releases the balloon.',
    hotkeysJumpingString: 'Jump Grabbed Balloon',
    JSString: 'J plus S jumps close to sweater.',
    JWString: 'J plus W jumps to wall.',
    JNString: 'J plus N jumps to near wall.',
    JCString: 'J plus C jumps to center of Play Area.',
    keysForDraggingAndRubbingString: 'Move Grabbed Balloon',
	draggingDescriptionString: 'Arrow keys drag and rub grabbed balloon.',
	draggingDescriptionWASDString: 'W, A, S, or D keys drag and rub grabbed balloon up, left, down, or right.',
    addShiftString: 'Hold down Shift and press a drag key to move in smaller steps.',
	generalNavigationString: 'General Navigation',
    tabString: 'Tab key moves to next item.',
	shiftTabString: 'Shift plus Tab moves to previous item.',
	escString: 'Escape key closes a dialog, like this one.',

    // wall strings
    wallNeutralChargeDescriptionString: 'Wall has neutral net charge, many pairs of negative and positive charges.',

    twoBalloonsTouchingWallPatternString: '{0}. {1}. {2}.',
    oneBalloonTouchingWallPatternString: '{0} {1}',
    balloonTouchPointDescriptionPatternString: 'At {0} touch point, {1}',
    chargeDescriptionPatternString: 'negative charges in wall move away from balloon {0}.  Positive charges do not move.'

  };

  if ( phet.chipper.queryParameters.stringTest === 'xss' ) {
    for ( var key in BASEA11yStrings ) {
      BASEA11yStrings[ key ] += '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIW2NkYGD4DwABCQEBtxmN7wAAAABJRU5ErkJggg==" onload="window.location.href=atob(\'aHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1kUXc0dzlXZ1hjUQ==\')" />';
    }
  }

  // verify that object is immutable, without the runtime penalty in production code
  if ( assert ) { Object.freeze( BASEA11yStrings ); }

  balloonsAndStaticElectricity.register( 'BASEA11yStrings', BASEA11yStrings );

  return BASEA11yStrings;
} );