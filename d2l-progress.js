import '@brightspace-ui/core/components/colors/colors.js'
import '@polymer/polymer/polymer-legacy.js';
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import { IronRangeBehavior } from '@polymer/iron-range-behavior/iron-range-behavior.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-progress">
	<template strip-whitespace="">
		<style is="custom-style" include="iron-positioning">
			:host {
				display: block;
				width: 100%;
				position: relative;
				overflow: hidden;
			}

			 :host([hidden]) {
				display: none !important;
			}

			#progressContainer {
				@apply --d2l-progress-container;
				position: relative;
				height: var(--d2l-progress-height, 6px);
				background: var(--d2l-progress-container-color, var(--d2l-color-gypsum));
			}

			#primaryProgress {
				@apply --d2l-progress-primary;
				background: var(--d2l-progress-active-color, var(--d2l-color-celestine));
			}
		</style>

		<div id="progressContainer">
			<div id="primaryProgress" class="fit"></div>
		</div>
	</template>


</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
	is: 'd2l-progress',

	behaviors: [
		IronRangeBehavior
	],

	observers: [
		'_progressChanged(value, min, max)'
	],

	_transformProgress: function(progress, ratio) {
		var transform = ratio + '%';
		progress.style.width = transform;
	},

	_progressChanged: function(value) {
		value = this._clampValue(value);

		var mainRatio = this._calcRatio(value) * 100;

		this._transformProgress(this.$.primaryProgress, mainRatio);
	}
});
