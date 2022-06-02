import '../d2l-seek-bar.js';
import { assert, fixture, html } from '@open-wc/testing';

describe('d2l-seek-bar', () => {
	it('instantiating the element works', async() => {
		const element = await fixture(html`<d2l-seek-bar></d2l-seek-bar>`);
		assert.equal(element.is, 'd2l-seek-bar');
	});
});
