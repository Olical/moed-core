function MainClass() {
}

MainClass.prototype.id = true;

module.exports = {
	MainClass: MainClass,
	register: function (context) {
		context.main = new MainClass();
	}
};
