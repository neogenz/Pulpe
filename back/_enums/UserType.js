class UserType {

	constructor(name, code) {
		this.name = name;
		this.code = code;
	}

	toString() {
		return `${this.name}`;
	}

	static getName(code) {
		return UserType[code].name;
	}
}

UserType.MEMBER = new UserType('Member');
UserType.COACH = new UserType('Coach');

module.exports = UserType;