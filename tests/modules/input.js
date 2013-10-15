var test = require('tape');
var MoedCore = require('../..');

function setup() {
	var engine = new MoedCore();

	return {
		engine: engine,
		i: engine.context.input,
		s: engine.context.settings
	};
}

test('handling a key with an exact match executes the right function', function (t) {
	t.plan(1);

	this.i.map(['w'], 'normal', 'command', {
		target: function () {
			t.pass('mapping routed through');
		}
	});

	this.i.map(['b'], 'normal', 'command', {
		target: function () {
			t.fail('mapping routed through when it should not');
		}
	});

	this.i.fire('w');
}.bind(setup()));

test('sending one key when there are other potential matches does not execute', function (t) {
	t.plan(1);

	this.i.map(['w'], 'normal', 'command', {
		target: function () {
			t.fail('<w> should not execute, it is ambiguous');
		}
	});

	this.i.map(['w', 'b'], 'normal', 'command', {
		target: function () {
			t.pass('<w><b> should execute, it is an exact match');
		}
	});

	this.i.map(['b'], 'normal', 'command', {
		target: function () {
			t.fail('<b> should not execute, <b> is never used at the start of the combo');
		}
	});

	this.i.fire('w');
	this.i.fire('b');
}.bind(setup()));

test('passing a count before a command will execute it with that count', function (t) {
	t.plan(1);

	this.i.map(['w'], 'normal', 'command', {
		target: function (count) {
			t.strictEqual(count, 105, 'the mapping was executed with the correct count');
		}
	});

	this.i.fire('1');
	this.i.fire('0');
	this.i.fire('5');
	this.i.fire('w');
}.bind(setup()));

test('passing a count to a mapping that does not take one will not execute', function (t) {
	t.plan(1);
	var executed = false;

	this.i.map(['w'], 'normal', 'command', {
		acceptsCount: false,
		target: function () {
			executed = true;
		}
	});

	this.i.map(['b'], 'normal', 'command', {
		target: function () {
			executed = true;
		}
	});

	this.i.fire('1');
	this.i.fire('0');
	this.i.fire('w');
	t.strictEqual(executed, false, 'no commands were executed');
}.bind(setup()));

test('a command can be given another command', function (t) {
	t.plan(1);
	var target = 'from <w> with love';
	var result;

	this.i.map(['d'], 'normal', 'command', {
		acceptsMapping: 'motion',
		target: function (count, next) {
			result = next();
		}
	});

	this.i.map(['w'], 'normal', 'motion', {
		target: function () {
			return target;
		}
	});

	this.i.fire('d');
	this.i.fire('w');
	t.strictEqual(result, target, '<d> was passed the correct partially applied function');
}.bind(setup()));

test('a command can be given another command even when ambiguous', function (t) {
	t.plan(1);
	var target = 'from <w> with love';
	var result;

	this.i.map(['d'], 'normal', 'command', {
		acceptsMapping: 'motion',
		target: function (count, next) {
			result = next();
		}
	});

	this.i.map(['d', 'd'], 'normal', 'command', {
		target: function () {
			t.fail('should not execute');
		}
	});

	this.i.map(['w'], 'normal', 'motion', {
		target: function () {
			return target;
		}
	});

	this.i.fire('d');
	this.i.fire('w');
	t.strictEqual(result, target, '<d> was passed the correct partially applied function');
}.bind(setup()));

test('a command can be given another command with counts', function (t) {
	t.plan(1);
	var result;

	this.i.map(['d'], 'normal', 'command', {
		acceptsCount: true,
		acceptsMapping: 'motion',
		target: function (count, next) {
			result = count + next();
		}
	});

	this.i.map(['w'], 'normal', 'motion', {
		acceptsCount: true,
		target: function (count) {
			return count;
		}
	});

	this.i.fire('1');
	this.i.fire('0');
	this.i.fire('d');
	this.i.fire('2');
	this.i.fire('0');
	this.i.fire('w');
	t.strictEqual(result, 30, 'got the combined count');
}.bind(setup()));

test('can chain triple commands', function (t) {
	t.plan(1);
	var target = 'foobarbaz';
	var result;

	this.i.map(['d'], 'normal', 'command', {
		acceptsMapping: 'motion',
		target: function (count, next) {
			result = 'foo' + next();
		}
	});

	this.i.map(['d', 'd'], 'normal', 'command', {
		target: function () {
			t.fail('should not execute');
		}
	});

	this.i.map(['a'], 'normal', 'motion', {
		acceptsMapping: 'object',
		target: function (count, next) {
			return 'bar' + next();
		}
	});

	this.i.map(['w'], 'normal', 'object', {
		target: function () {
			return 'baz';
		}
	});

	this.i.fire('d');
	this.i.fire('a');
	this.i.fire('w');
	t.strictEqual(result, target, 'all three mappings were executed and their values were combined');
}.bind(setup()));

test('changing the mode through a binding will reset the current mapping', function (t) {
	t.plan(1);

	this.i.map(['d', 'd'], 'normal', 'command', {
		target: function () {
			t.fail('this should not have been executed');
		}
	});

	this.i.map(['d'], 'normal', 'command', {
		target: function () {
			t.fail('this should not have been executed');
		}
	});

	this.i.map(['d'], 'not-normal', 'command', {
		target: function () {
			t.ok('this should be execute');
		}
	});

	this.i.fire('d');
	this.s.set('input.mode', 'not-normal');
	this.i.fire('d');
}.bind(setup()));
