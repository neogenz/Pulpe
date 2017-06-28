class CorpulenceEnum {

	constructor(name, code) {
		this.name = name;
		this.code = code;
	}

	toString() {
		return `${this.name}`;
	}

	static getName(code) {
		return CorpulenceEnum[code].name;
	}

	static getCorpulenceBy(imc) {
		if (imc < 18.5) {
			return CorpulenceEnum.Maigreur
		} else if (imc => 18.5 && imc <= 25) {
			return CorpulenceEnum.Normal;
		} else if (imc => 25 && imc <= 30) {
			return CorpulenceEnum.Surpoids;
		} else {
			return CorpulenceEnum.Obesite;
		}
	}
}

CorpulenceEnum.Maigreur = new CorpulenceEnum('Maigreur', 'MA');
CorpulenceEnum.Normal = new CorpulenceEnum('Normal', 'NO');
CorpulenceEnum.Surpoids = new CorpulenceEnum('Surpoids', 'SU');
CorpulenceEnum.Obesite = new CorpulenceEnum('Obésité', 'OB');

module.exports = CorpulenceEnum;