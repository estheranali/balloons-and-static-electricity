// Copyright 2002-2013, University of Colorado

/**
 * Model of a balloon.
 * Wall have electrons which can change position under force
 * @author Vasily Shakhov (Mlearner)
 */
define( function ( require ) {
  'use strict';
  var Fort = require( 'FORT/Fort' );
  var Balloon = require( "model/BalloonModel" );
  var Vector2 = require( 'DOT/Vector2' );
  var PointCharge = require( 'model/PointChargeModel' );

  // Constructor for BarMagnet.
  var Wall = Fort.Model.extend(
      {
        //Properties of the model.  All user settings belong in the model, whether or not they are part of the physical model
        defaults: {
          numX: 3, //number of columns with charges
          numY: 18, //number of rows with charges
          isVisible: true
        },

        //Main constructor
        init: function ( x, width, height ) {
          this.dx = Math.round( 70 / this.numX + 2 );
          this.dy = height / this.numY;
          this.x = x;
          this.width = width;
          this.height = height;

          this.plusCharges = [];
          this.minusCharges = [];

          for ( var i = 0; i < this.numX; i++ ) {
            for ( var k = 0; k < this.numY; k++ ) {
              //plus
              var position = this.calculatePosition( i, k );
              var plusCharge = new PointCharge( position[0], position[1] );

              this.plusCharges.push( plusCharge );

              //minus
              position = this.calculatePosition( i, k );
              var minusCharge = new PointCharge( position[0] + PointCharge.radius, position[1] + PointCharge.radius );
              this.minusCharges.push( minusCharge );
            }
          }
        },

        // Called by the animation loop
        step: function ( balloons ) {

          var k = -1000000 / 5;

          this.minusCharges.forEach( function ( entry ) {
            var ch = entry;
            var kqq = k * (-1) * balloons[0].charge;
            var dv = Balloon.getForce( ch.location, balloons[0].getCenter(), kqq, 2.7 );
            entry.location = new Vector2( entry.defaultLocation.x + dv.x, entry.defaultLocation.y + dv.y );
          } );
          // Make model changes here.
        },

        // Reset the entire model
        reset: function () {

          //Reset the properties in this model
          Fort.Model.prototype.reset.call( this );

          this.minusCharges.each( function ( entry ) {
            entry.reset();
          } );
        },

        calculatePosition: function ( i, k ) {
          var y0 = i % 2 === 0 ? this.dy / 2 : 1;
          return [i * this.dx + this.x + 1, k * this.dy + y0];
        }

      } );

  return Wall;
} )
;
