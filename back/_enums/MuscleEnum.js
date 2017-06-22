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

MuscleEnum.Traps = new MuscleEnum('Traps', 'TRA');
MuscleEnum.Deltoid = new MuscleEnum('Deltoid', 'DEL'); //Avant des épaules
MuscleEnum.PosteriorDeltoid = new MuscleEnum('PosteriorDeltoid', 'PDE'); // Arrière des épaules
MuscleEnum.Pecs = new MuscleEnum('Pecs', 'PEC');
MuscleEnum.LatissimusDorsi = new MuscleEnum('LatissimusDorsi', 'LDO'); //Dorsaux
MuscleEnum.Biceps = new MuscleEnum('Biceps', 'BIC');
MuscleEnum.Triceps = new MuscleEnum('Triceps', 'TRI');
MuscleEnum.Lumbar = new MuscleEnum('Lumbar', 'LUM');
MuscleEnum.MiddleBack = new MuscleEnum('MiddleBack', 'MBA');
MuscleEnum.RectusAbdominus = new MuscleEnum('RectusAbdominus', 'RAB'); // Abdos
MuscleEnum.LowerBack = new MuscleEnum('LowerBack', 'LBA');
MuscleEnum.ThighQuadriceps = new MuscleEnum('ThighQuadriceps', 'TQU'); //Avant de la cuisse
MuscleEnum.ThighBiceps = new MuscleEnum('ThighBiceps', 'TBI'); //Arrière de la cuisse
MuscleEnum.GluteusMaximus = new MuscleEnum('GluteusMaximus', 'GMA'); //Grand fessier
MuscleEnum.GluteusMedius = new MuscleEnum('GluteusMedius', 'GMA'); //Moyen fessier
MuscleEnum.Cardiovascular = new MuscleEnum('Cardiovascular', 'CAR');
MuscleEnum.GastrocnemiusLateral = new MuscleEnum('GastrocnemiusLateral', 'GAL');

module.exports = MuscleEnum;