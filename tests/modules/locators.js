var test = require('tape');
var MoedCore = require('../..');

function setup() {
	var engine = new MoedCore();
	var l  = engine.context.locators;
	var win = engine.context.settings.get('windows.current');

	return {
		engine: engine,
		l: l,
		win: win,
	};
}

test('move left', function (t) {
	t.plan(1);
	this.l.left(this.win);
	t.strictEqual(this.win.cursor.x, -1, 'moved the cursor left');
}.bind(setup()));

test('move right', function (t) {
	t.plan(1);
	this.l.right(this.win);
	t.strictEqual(this.win.cursor.x, 1, 'moved the cursor right');
}.bind(setup()));

test('move up', function (t) {
	t.plan(1);
	this.l.up(this.win);
	t.strictEqual(this.win.cursor.y, -1, 'moved the cursor up');
}.bind(setup()));

test('move left', function (t) {
	t.plan(1);
	this.l.down(this.win);
	t.strictEqual(this.win.cursor.y, 1, 'moved the cursor down');
}.bind(setup()));