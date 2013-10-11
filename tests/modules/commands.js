var test = require('tape');
var MoedCore = require('../..');

function setup() {
	var engine = new MoedCore();
	var s = engine.context.settings;
	var win = s.get('windows.current');

	return {
		engine: engine,
		c: engine.context.commands,
		s: s,
		win: win // :D
	};
}

test('can move the cursor to the specified position', function (t) {
	t.plan(2);
	var position = {
		x: 5,
		y: 0
	};
	this.c.moveCursor(this.win, position);
	t.strictEqual(this.win.cursor.x, position.x, 'x is correct');
	t.strictEqual(this.win.cursor.y, position.y, 'y is correct');
}.bind(setup()));
