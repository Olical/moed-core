var test = require('tape');
var MoedCore = require('../..');

function setup() {
	var engine = new MoedCore();
	var l  = engine.context.locators;
	var win = engine.context.windows.create();

	return {
		engine: engine,
		l: l,
		win: win,
	};
}

test('move left', function (t) {
	t.plan(1);
	var result = this.l.left(this.win, this.win.cursor);
	t.strictEqual(result.x, -1, 'moved the cursor left');
}.bind(setup()));

test('move right', function (t) {
	t.plan(1);
	var result = this.l.right(this.win, this.win.cursor);
	t.strictEqual(result.x, 1, 'moved the cursor right');
}.bind(setup()));

test('move up', function (t) {
	t.plan(1);
	var result = this.l.up(this.win, this.win.cursor);
	t.strictEqual(result.y, -1, 'moved the cursor up');
}.bind(setup()));

test('move left', function (t) {
	t.plan(1);
	var result = this.l.down(this.win, this.win.cursor);
	t.strictEqual(result.y, 1, 'moved the cursor down');
}.bind(setup()));

test('can expand a locator', function (t) {
	t.plan(1);
	var result = this.l.expand(20, this.l.right, this.win);
	t.strictEqual(result.x, 20, 'locator was expanded correctly');
}.bind(setup()));
