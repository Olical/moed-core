var test = require('tape');
var MoedCore = require('../..');

function setup() {
	var engine = new MoedCore();
	var s = engine.context.settings;
	var win = engine.context.windows.create();
	win.buffer.lines = [
		'Hello, World!',
		'How are you?'
	];

	return {
		engine: engine,
		c: engine.context.commands,
		s: s,
		win: win
	};
}

test('can move the cursor to the specified position', function (t) {
	t.plan(2);
	var position = {
		x: 5,
		y: 1
	};

	this.c.moveCursor(this.win, position);
	t.strictEqual(this.win.cursor.x, position.x, 'x is correct');
	t.strictEqual(this.win.cursor.y, position.y, 'y is correct');
}.bind(setup()));

test('can not go out of bounds when moving the cursor', function (t) {
	t.plan(2);
	var lines = this.win.buffer.lines;
	var position = {
		x: 300,
		y: -20
	};
	var actual = {
		x: lines[0].length - 1,
		y: 0
	};

	this.c.moveCursor(this.win, position);
	t.strictEqual(this.win.cursor.x, actual.x, 'x is correct');
	t.strictEqual(this.win.cursor.y, actual.y, 'y is correct');
}.bind(setup()));
