class MuscleEnum {

  constructor(name, code) {
    this.name = name;
    this.code = code;
  }

  toString() {
    return `${this.name}`;
  }

  static getName(code) {
    return MuscleEnum[code].name;
  }
}

MuscleEnum.TRAPS = new MuscleEnum('traps', 'TRA');
MuscleEnum.DELTOID = new MuscleEnum('deltoid', 'DEL'); //Avant des épaules
MuscleEnum.POSTERIOR_DELTOID = new MuscleEnum('deltoid', 'PDE'); // Arrière des épaules
MuscleEnum.PECS = new MuscleEnum('pecs', 'PEC');
MuscleEnum.LATISSIMUS_DORSI = new MuscleEnum('latissimus dorsi', 'LDO'); //Dorsaux
MuscleEnum.BICEPS = new MuscleEnum('biceps', 'BIC');
MuscleEnum.TRICEPS = new MuscleEnum('triceps', 'TRI');
MuscleEnum.LUMBAR = new MuscleEnum('lumbar', 'LUM');
MuscleEnum.MIDDLE_BACK = new MuscleEnum('middle back', 'MBA');
MuscleEnum.RECTUS_ABDOMINIS = new MuscleEnum('rectus abdominus', 'RAB'); // Abdos
MuscleEnum.LOWER_BACK = new MuscleEnum('lower back', 'LBA');
MuscleEnum.THIGH_QUADRICEPS = new MuscleEnum('thigh quadriceps', 'TQU'); //Avant de la cuisse
MuscleEnum.THIGH_BICEPS = new MuscleEnum('thigh biceps', 'TBI'); //Arrière de la cuisse
MuscleEnum.GLUTEUS_MAXIMUS = new MuscleEnum('gluteus maximus', 'GMA'); //Grand fessier
MuscleEnum.GLUTEUS_MEDIUS = new MuscleEnum('gluteus medius', 'GMA'); //Moyen fessier
MuscleEnum.CARDIO = new MuscleEnum('cardiovascular', 'CAR');
MuscleEnum.GASTROCNEMIUS_LATERAL = new MuscleEnum('gastrocnemius lateral', 'GAL');

module.exports = MuscleEnum;