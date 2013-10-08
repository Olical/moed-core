var test = require('tape');
var MoedCore = require('../..');

test('handling a key with an exact match executes the right function', function (t) {
	t.plan(1);
	var engine = new MoedCore();
	var i = engine.context.input;

	i.map('<w>', 'normal', 'command', {
		target: function () {
			t.pass('mapping routed through');
		}
	});

	i.map('<b>', 'normal', 'command', {
		target: function () {
			t.fail('mapping routed through when it should not');
		}
	});

	i.fire('<w>');
});

test('sending one key when there are other potential matches does not execute', function (t) {
	t.plan(1);
	var engine = new MoedCore();
	var i = engine.context.input;

	i.map('<w>', 'normal', 'command', {
		target: function () {
			t.fail('<w> should not execute, it is ambiguous');
		}
	});

	i.map('<w><b>', 'normal', 'command', {
		target: function () {
			t.pass('<w><b> should execute, it is an exact match');
		}
	});

	i.map('<b>', 'normal', 'command', {
		target: function () {
			t.fail('<b> should not execute, <b> is never used at the start of the combo');
		}
	});

	i.fire('<w>');
	i.fire('<b>');
});
