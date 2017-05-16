const MemberService = require('./member.service');
const Program = require('../_model/Program');
const jwt = require('jsonwebtoken');
const NotFoundError = require('../_model/Errors').NotFoundError;
const ObjectiveEnum = require('../_enums/ObjectiveEnum');
const MuscleEnum = require('../_enums/MuscleEnum');
//todo Create exercise service to find by some criterias
const Exercise = require('../_model/Exercise');
const DifficultyEnum = require('../_enums/DifficultyEnum');

class ProgramService {
  constructor() {
  }

  /**
   * find a program for a member.
   * @param memberId
   * @returns {Promise|Promise.<Program>}
   */
  static findByMemberId(memberId) {
    return Program.findOne({'member': memberId})
      .then((program) => {
        if (!program) {
          throw new NotFoundError("Programme introuvable pour l'adhérent : " + memberId);
        }
        return program;
      })
      .catch(function (err) {
        throw err;
      });
  }

  static generateProgramBy(nbSessions, objective) {

  }


  static generateSessionsBy(nbSessions, objective) {
    let musclesGroupsBySession = ProgramService.getMuscularGroupSessionRepartitionBy(nbSessions, objective);
    musclesGroupsBySession.forEach(musclesGroup => {
      Exercise.find({
        'workedMuscles.name': {
          $in: musclesGroup.muscles.map(muscle => {
            return muscle.toString()
          })
        },
        'workedMuscles.intensity': DifficultyEnum.HARD.toString(),
        'phase': 1
      }).then(finded => {
        console.log(finded);
      })
    });
  }


  static getMuscularGroupSessionRepartitionBy(nbSeance, objectiveEnum) {
    let sessionsRepartition = [];
    switch (objectiveEnum) {
      case ObjectiveEnum.MassGainer:
        sessionsRepartition = ProgramService.getMuscularGroupSessionRepartitionToMassGainerBy(nbSeance);
        break;
    }
    return sessionsRepartition;
  }

  static getMuscularGroupSessionRepartitionToMassGainerBy(nbSeance) {
    let muscularsGroupsSession = [];
    switch (nbSeance) {
      case 1:
        break;
      case 2:
        break;
      case 3:
        muscularsGroupsSession = [
          {
            muscles: [MuscleEnum.PECS, MuscleEnum.BICEPS, MuscleEnum.TRICEPS, MuscleEnum.RECTUS_ABDOMINIS],
            training: true
          },
          {
            muscles: [MuscleEnum.LATISSIMUS_DORSI, MuscleEnum.POSTERIOR_DELTOID, MuscleEnum.DELTOID, MuscleEnum.RECTUS_ABDOMINIS],
            training: true
          },
          {
            muscles: [MuscleEnum.THIGH_BICEPS, MuscleEnum.THIGH_QUADRICEPS, MuscleEnum.GLUTEUS_MEDIUS, MuscleEnum.GLUTEUS_MAXIMUS, MuscleEnum.RECTUS_ABDOMINIS],
            training: true
          }
        ];
        break;
    }
    return muscularsGroupsSession;
  }
}

module.exports = ProgramService;


