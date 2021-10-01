/**
`d2l-seek-bar`
Polymer-based web component for a D2L seek-bar
@demo demo/index.html
*/
import '@polymer/polymer/polymer-legacy.js';

import { IronRangeBehavior } from '@polymer/iron-range-behavior/iron-range-behavior.js';
import { IronA11yKeysBehavior } from '@polymer/iron-a11y-keys-behavior/iron-a11y-keys-behavior.js';
import 'd2l-colors/d2l-colors.js';
import './d2l-progress.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-seek-bar">
	<template strip-whitespace="">
		<style>
			:host {
				@apply --layout;
				@apply --layout-justified;
				@apply --layout-center;
				display: block;

				--d2l-color-corundum-65-opacity: rgba(181, 189, 194, 0.65);
				--d2l-color-galena-88-opacity: rgba(134, 140, 143, 0.88);

				--calculated-d2l-seek-bar-height: var(--d2l-seek-bar-height, 6px);
				--calculated-d2l-knob-size: var(--d2l-knob-size, 32px);
				--half-knob-size: calc(var(--calculated-d2l-knob-size)/2);
				--half-knob-size-overflow: calc((var(--calculated-d2l-knob-size) - var(--calculated-d2l-seek-bar-height)) / 2 - 1px);
				--calculated-inner-knob-margin: var(--d2l-inner-knob-margin, 8px);
				--calculated-d2l-knob-box-shadow: var(--d2l-knob-box-shadow, 0 2px 4px 0 rgba(0, 0, 0, 0.52));
				--calculated-d2l-outer-knob-color: var(--d2l-outer-knob-color, var(--d2l-color-regolith));
				--calculated-d2l-outer-knob-border-color: var(--d2l-outer-knob-border-color, var(--d2l-color-pressicus));
				--calculated-d2l-inner-knob-color: var(--d2l-inner-knob-color, var(--d2l-color-celestine-plus-1));
				--calculated-d2l-knob-focus-color: var(--d2l-knob-focus-color, var(--d2l-color-celestine));
				--calculated-d2l-knob-focus-size: var(--d2l-knob-focus-size, 2px);
				--calculated-d2l-progress-background-color: var(--d2l-progress-background-color, var(--d2l-color-corundum-65-opacity));
				--calculated-d2l-progress-border-color: var(--d2l-progress-border-color, var(--d2l-color-pressicus));
				--calculated-d2l-progress-border-radius: var(--d2l-progress-border-radius, 6px);
				--calculated-d2l-progress-shadow-color: var(--d2l-progress-shadow-color, var(--d2l-color-galena-88-opacity));
				--calculated-d2l-progress-active-color: var(--d2l-progress-active-color, var(--d2l-color-celestine-plus-1));
			}

			:host(:focus) {
				outline: none;
			}

			:host(:focus) .slider-knob:after {
				content: '';
				position: absolute;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				border-radius: 50%;
				box-shadow: 0 0 0 var(--calculated-d2l-knob-focus-size) var(--calculated-d2l-knob-focus-color);
			}

			:host([solid]) .slider-knob-inner  {
				display: none;
			}

			#sliderContainer {
				position: relative;
				height: var(--calculated-d2l-knob-size);
				margin-left: var(--half-knob-size);
				margin-right: var(--half-knob-size);
			}

			#knobContainer {
				pointer-events: none;
				position: absolute;
				top: 0;
				bottom: 0;
				left: 0;
				right: 0;
			}

			:host([fullWidth]) #sliderContainer {
				margin-left: 0;
				margin-right: 0;
			}

			:host([fullWidth]) #knobContainer {
				left: var(--half-knob-size);
				right: var(--half-knob-size);
			}

			.bar-container {
				@apply --layout-fit;
				overflow: hidden;
				cursor: pointer;
			}

			#sliderBar {
				padding: var(--half-knob-size-overflow) 0;
				width: 100%;
				--d2l-progress-primary: {
					border-radius: var(--calculated-d2l-progress-border-radius);
					box-shadow: inset 0 1px 0 0 rgba(0, 0, 0, 0.07);
				}
				--d2l-progress-container: {
					border-radius: var(--calculated-d2l-progress-border-radius);
					box-shadow: inset 0 1px 0 0 var(--calculated-d2l-progress-shadow-color);
				}
				--d2l-progress-container-color: var(--calculated-d2l-progress-background-color);
				--d2l-progress-active-color: var(--calculated-d2l-progress-active-color);
			}

			.slider-knob {
				position: absolute;
				left: 0;
				top: 0;
				margin-left: calc(-1 * ((var(--calculated-d2l-knob-size) / 2) - var(--calculated-d2l-seek-bar-height) / 2) - var(--calculated-d2l-seek-bar-height) / 2);
				width: calc((((var(--calculated-d2l-knob-size) / 2) - var(--calculated-d2l-seek-bar-height) / 2) * 2) + var(--calculated-d2l-seek-bar-height) - 2px);
				height: calc((((var(--calculated-d2l-knob-size) / 2) - var(--calculated-d2l-seek-bar-height) / 2) * 2) + var(--calculated-d2l-seek-bar-height) - 2px);
				background-color: var(--calculated-d2l-outer-knob-color);
				box-shadow: var(--calculated-d2l-knob-box-shadow);
				border-radius: 50%;
				cursor: pointer;
				z-index: 1;
			}

			.slider-knob-inner {
				margin: var(--calculated-inner-knob-margin);
				width: calc(100% - var(--calculated-inner-knob-margin)*2);
				height: calc(100% - var(--calculated-inner-knob-margin)*2);
				background-color: var(--calculated-d2l-inner-knob-color);
				border-radius: 50%;
				box-sizing: border-box;
				box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.07)
			}

		</style>

		<div id="sliderContainer" fullWidth$="[[fullWidth]]">
			<div class="bar-container">
				<d2l-progress id="sliderBar" value="{{immediateValue}}" on-down="_barDown" on-up="_barUp" on-track="_onTrack"></d2l-progress>
			</div>
			<div id="knobContainer">
				<div id="sliderKnob" class="slider-knob" on-down="_knobDown" on-track="_onTrack">
					<div class="slider-knob-inner"></div>
				</div>
			</div>
		</div>
	</template>

</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
	is: 'd2l-seek-bar',

	behaviors: [
		IronRangeBehavior,
		IronA11yKeysBehavior
	],

	properties: {
		immediateValue: {
			type: Number,
			value: 0,
			readOnly: true,
			notify: true
		},

		hoverValue: {
			type: Number,
			value: 0,
			readOnly: true,
			notify: true
		},

		dragging: {
			type: Boolean,
			value: false,
			readOnly: true,
			notify: true
		},

		hovering: {
			type: Boolean,
			value: false,
			readOnly: true,
			notify: true
		},

		vertical: {
			type: Boolean,
			value: false
		},

		fullWidth: {
			type: Boolean,
			value: false
		}
	},

	hostAttributes: {
		tabindex: 0,
		role: 'slider'
	},

	keyBindings: {
		'up': '_onKeyPress',
		'down': '_onKeyPress',
		'left': '_onKeyPress',
		'right': '_onKeyPress'
	},

	listeners: {
		mouseover: '_onHostHover',
		mousemove: '_onHostMove',
		mouseout: '_onHostUnhover',
	},

	observers: [
		'_updateKnob(value, min, max)',
		'_immediateValueChanged(immediateValue)',
		'_draggingChanged(dragging)',
		'_hoverValueChanged(hoverValue)',
		'_hoveringChanged(hovering)'
	],

	_onHostHover: function() {
		this._setHovering(true);
	},

	_onHostMove: function(e) {
		if (this.hovering) {
			var rect = this.$.knobContainer.getBoundingClientRect();
			var mousePosition = this.vertical ? rect.bottom - e.clientY : e.clientX - rect.left;
			var ratio = mousePosition / this.$.knobContainer.offsetWidth;

			var value = this._calcStep(this._calcKnobPosition(ratio));
			if (value >= this.min && value <= this.max)
				this._setHoverValue(value);
		}
	},

	_onHostUnhover: function() {
		this._setHovering(false);
	},

	_onKeyPress: function(event) {
		if (this.vertical) {
			this._checkKey(event, 'up', 5);
			this._checkKey(event, 'down', -5);
		} else {
			this._checkKey(event, 'right', 5);
			this._checkKey(event, 'left', -5);
		}
	},

	_checkKey(event, key, valueChange) {
		if (event.detail.key === key) {
			event.preventDefault();
			this._setImmediateValue(this.immediateValue + valueChange);
			this.dispatchEvent(new CustomEvent('position-change', { bubbles: true, composed: true }));
		}
	},

	_update: function() {
		this._setRatio(this._calcRatio(this.value));
	},

	_updateKnob: function(value) {
		this._positionKnob(this._calcRatio(value));
	},

	_immediateValueChanged: function() {
		if (!this.dragging) {
			this.value = this.immediateValue;
		}
	},

	_draggingChanged: function() {
		if (this.dragging) {
			this.dispatchEvent(new CustomEvent('drag-start', { bubbles: true, composed: true }));
		} else {
			this.dispatchEvent(new CustomEvent('drag-end', { bubbles: true, composed: true }));
		}
	},

	_hoveringChanged: function() {
		if (this.hovering) {
			this.dispatchEvent(new CustomEvent('hovering-start', { bubbles: true, composed: true }));
		} else {
			this.dispatchEvent(new CustomEvent('hovering-end', { bubbles: true, composed: true }));
		}
	},

	_hoverValueChanged: function() {
		if (this.hovering) {
			this.dispatchEvent(new CustomEvent('hovering-move', { bubbles: true, composed: true }));
		}
	},

	_positionKnob: function(ratio) {
		this._setImmediateValue(this._calcStep(this._calcKnobPosition(ratio)));
		this._setRatio(this._calcRatio(this.immediateValue));

		this.$.sliderKnob.style.left = (this.ratio * 100) + '%';
		if (this.dragging) {
			this._knobstartx = this.ratio * this._w;
			this.translate3d(0, 0, 0, this.$.sliderKnob);
		}
	},

	_knobDown: function(event) {
		event.preventDefault();
		this.focus();
	},

	_onTrack: function(event) {
		this.dispatchEvent(new CustomEvent('position-change', { bubbles: true, composed: true }));
		event.stopPropagation();
		switch (event.detail.state) {
			case 'start':
				this._trackStart(event);
				break;
			case 'track':
				this._track(event);
				break;
			case 'end':
				this._trackEnd();
				break;
		}
	},

	_trackStart: function() {
		this._w = this.$.knobContainer.offsetWidth;
		this._x = this.ratio * this._w;
		this._startx = this._x;
		this._knobstartx = this._startx;
		this._minx = -this._startx;
		this._maxx = this._w - this._startx;
		this._setDragging(true);
	},

	_track: function(event) {
		if (!this.dragging) {
			this._trackStart(event);
		}

		var mousePosition = this.vertical ? -event.detail.dy : event.detail.dx;
		var dx = Math.min(this._maxx, Math.max(this._minx, mousePosition));
		this._x = this._startx + dx;

		var immediateValue = this._calcStep(this._calcKnobPosition(this._x / this._w));
		this._setImmediateValue(immediateValue);

		var translateX = ((this._calcRatio(this.immediateValue) * this._w) - this._knobstartx);
		this.translate3d(translateX + 'px', 0, 0, this.$.sliderKnob);
	},

	_trackEnd: function() {
		var s = this.$.sliderKnob.style;

		this._setDragging(false);
		this.value = this.immediateValue;

		s.transform = s.webkitTransform = '';
	},

	_barDown: function(event) {
		this._w = this.$.knobContainer.offsetWidth;
		var rect = this.$.knobContainer.getBoundingClientRect();

		var mousePosition = this.vertical ? rect.bottom - event.detail.y : event.detail.x - rect.left;
		var ratio = mousePosition / this._w;

		this._setDragging(true);
		this._positionKnob(ratio);

		event.preventDefault();
		this.focus();
	},

	_barUp: function() {
		this._setDragging(false);
	},

	_calcKnobPosition: function(ratio) {
		return (this.max - this.min) * ratio + this.min;
	}
});
