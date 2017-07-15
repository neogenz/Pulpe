const MongoError = require('../_helpers/MONGO_ERROR.json');
const Member = require('../_model/Member');
const Measurement = require('../_model/Measurement');
const AlreadyExistError = require('../_model/Errors').AlreadyExistError;
const NotFoundError = require('../_model/Errors').NotFoundError;
const TechnicalError = require('../_model/Errors').TechnicalError;
const ObjectiveEnum = require('../_enums/ObjectiveEnum');
const GenderEnum = require('../_enums/GenderEnum');
const MeasurementEnum = require('../_enums/MeasurementEnum');
const MeasurementService = require('../_services/measurement.service');
const CoachService = require('../_services/coach.service');
const EmailService = require('../_services/email.service');
const winston = require('winston');
const moment = require('moment');

class AlreadyExistMemberError extends AlreadyExistError {
}

class MemberService {
  constructor() {
  }

  /**
   * Find a member by an id.
   * @param id
   * @returns {Promise|Promise.<Member>}
   */
  static findById(id) {
    const populationGraph = {
      path: 'gym',
      model: 'Gym'
    };
    return Member.findOne({'_id': id})
      .populate(populationGraph)
      .then((member) => {
        if (!member) {
          throw new NotFoundError('Adhérent introuvable.');
        }
        return member;
      })
      .catch(err => {
        throw new TechnicalError(err.message);
      });
  }

  /**
   * Count number of members in a gym.
   * @param gym
   * @returns {Promise.<Number>|Promise}
   */
  static countBy(gym) {
    const populationGraph = {
      path: 'gym',
      model: 'Gym'
    };
    return Member.find({'gym': gym._id})
      .populate(populationGraph).count()
      .then((nbMembers) => {
        return nbMembers;
      })
      .catch(err => {
        throw new TechnicalError(err.message);
      });
  }

  /**
   * Find a member by his mail and his password.
   * Password is checked by validation method.
   * @param email
   * @param password
   * @returns {Promise.<Member>|Promise}
   */
  static findBy(email, password) {
    const populationGraph = {
      path: 'gym',
      model: 'Gym'
    };
    return Member.findOne({'email': email}).populate(populationGraph)
      .then((member) => {
        if (!member) {
          throw new NotFoundError('Utilisateur introuvable.');
        }
        if (!member.validPassword(password)) {
          throw new NotFoundError('Email ou mot de passe invalide.');
        }
        return member;
      }).catch(err => {
        throw err;
      });
  }

  /**
   * Hash the password of a member and save them.
   * @param member
   * @returns {Promise.<Member>|Promise}
   */
  static create(member) {
    member.password = member.generateHash(member.password);
    return member.save().then(
      (member) => {
        return member;
      },
      (error) => {
        if (error.code && error.code === MongoError.DUPPLICATE_KEY.code) {
          throw new AlreadyExistMemberError('Cet email existe déja.');
        }
      }
    ).catch((error) => {
      throw error;
    })
  }

  /**
   * Save a new member and send his password with his email.
   * @param memberToSave
   * @returns {Promise.<Member>|Promise}
   */
  static createAndSendPassword(memberToSave) {
    let member = new Member();
    member.profileCompleted = false;
    member.sessionFrequency = memberToSave.sessionFrequency;
    member.birthDate = new Date(memberToSave.birthDate);
    member.gym = memberToSave.gym._id;
    member.firstName = memberToSave.firstName;
    member.lastName = memberToSave.lastName;
    member.email = memberToSave.email;
    member.gender = GenderEnum.fromName(memberToSave.gender);
    member.objective = ObjectiveEnum.fromCode(memberToSave.objective);

    const passwordGenerated = member.generateRandomPassword();
    member.password = member.generateHash(passwordGenerated);

    return member.save()
      .then((memberSaved) => {
          member = memberSaved;
          return EmailService.sendPasswordTo(member, passwordGenerated);
        }, (error) => {
          if (error.code && error.code === MongoError.DUPPLICATE_KEY.code) {
            throw new AlreadyExistMemberError('Cet email existe déja.');
          }
          Member.findByIdAndRemove(member._id)
            .catch((error) => {
              winston.log('error', error.stack);
            });
          throw error;
        }
      )
      .then(() => {
        return member;
      }, (error) => {
        Member.findByIdAndRemove(member._id)
          .catch((error) => {
            winston.log('error', error.stack);
          });
        throw error;
      })
      .catch((error) => {
        throw error;
      })
  }

  /**
   * Add measurements for a member.
   * @param memberId
   * @param measurement
   * @returns {Promise.<Member>|Promise}
   */
  static addMeasurement(memberId, measurement) {
    let member;
    let imcMeasurement;
    return this.findById(memberId)
      .then(memberFinded => {
        member = memberFinded;
        const measurementToArchive = member.measurements.filter(m => m.name === measurement.name)[0];
        imcMeasurement = MeasurementService.findMeasurementIn(member.measurements, MeasurementEnum.Imc);
        return MeasurementService.createArchivedMeasurements(memberId, measurementToArchive ? [measurementToArchive] : []);
      })
      .then(() => {
        const indexOfMeasurementArchived = member.measurements.findIndex(m => m.name === measurement.name);
        if (indexOfMeasurementArchived > -1) {
          member.measurements.splice(indexOfMeasurementArchived, indexOfMeasurementArchived, measurement);
        } else {
          member.measurements.push(measurement);
        }
        return member.save();
      })
      .then(member => {
          return member;
        }, (error) => {
          throw new TechnicalError(error.message);
        }
      ).catch((error) => {
        throw error;
      });
  }

  /**
   * Add measurements for a member and complete his profile.
   * @param gymId
   * @param memberId
   * @param measurements
   * @param sessionFrequency
   * @param birthDate
   * @param {ObjectiveEnum} objectiveEnum
   * @returns {Promise.<Member>|Promise}
   */
  static completeProfile(gymId, memberId, measurements, sessionFrequency, birthDate, objectiveEnum, gender) {
    return this.findById(memberId)
      .then(member => {
        member.profileCompleted = true;
        member.sessionFrequency = sessionFrequency;
        member.birthDate = new Date(birthDate);
        member.objective = objectiveEnum;
        member.gym = gymId;
        member.gender = gender;

        let weightMeasurement;
        let sizeMeasurement;
        measurements.forEach(mes => {
          member.measurements.push(mes);
          if (MeasurementEnum[mes.name] === MeasurementEnum.Weight) {
            weightMeasurement = mes;
          }
          if (MeasurementEnum[mes.name] === MeasurementEnum.Size) {
            sizeMeasurement = mes;
          }
        });

        const imcMeasurement = new Measurement();
        imcMeasurement.value = MeasurementService.getIMCBy(weightMeasurement, sizeMeasurement);
        imcMeasurement.name = MeasurementEnum.Imc.toString();
        member.measurements.push(imcMeasurement);
        return member.save();
      })
      .then(memberSaved => {
          return this.findById(memberSaved._id)
        }, (error) => {
          throw new TechnicalError(error.message);
        }
      )
      .then((memberFinded) => {
        return memberFinded;
      }, (error) => {
        throw new TechnicalError(error.message);
      })
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Update a member.
   * @param member
   * @returns {Promise.<Member>|Promise}
   */
  static update(member) {
    return this.findById(member._id)
      .then(memberFinded => {
        memberFinded.sessionFrequency = member.sessionFrequency;
        memberFinded.birthDate = new Date(member.birthDate);
        memberFinded.objective = ObjectiveEnum.fromCode(member.objective);
        memberFinded.email = member.email;
        memberFinded.firstName = member.firstName;
        memberFinded.lastName = member.lastName;
        memberFinded.gender = GenderEnum.fromName(member.gender);
        memberFinded.gym = member.gym;
        return memberFinded.save();
      })
      .then(member => {
          return this.findById(member._id)
        }, (error) => {
          throw new TechnicalError(error.message);
        }
      ).then(member => {
        return member;
      }, (error) => {
        throw new TechnicalError(error.message);
      })
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Find all members of a coach linked by their gym.
   * @param id of coach
   * @returns {Promise.<Member[]>|Promise}
   */
  static findAllByCoach(id) {
    return CoachService.findById(id)
      .then(coachFinded => {
        return this.findAllByGym(coachFinded.gym._id);
      }, (error) => {
        console.error(error.stack);
        throw new TechnicalError(error.message);
      })
      .then(members => {
        return members;
      }, (error) => {
        console.error(error.stack);
        throw new TechnicalError(error.message);
      })
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Find all members of a gym.
   * @param id
   * @returns {Promise.<Member[]>|Promise}
   */
  static findAllByGym(id) {
    const populationGraph = {
      path: 'gym',
      model: 'Gym'
    };
    return Member.find({'gym': id})
      .populate(populationGraph)
      .then(members => {
        return members;
      }, (error) => {
        console.error(error.stack);
        throw new TechnicalError(error.message);
      })
      .catch((error) => {
        throw error;
      });
  }


  /**
   * Find previsions for a member.
   * @param member
   * @returns {Promise.<Array<Object>>|Promise}
   */
  //todo refactor
  static findEfficientPrevisions(member) {
    const imcMeasurement = MeasurementService.findMeasurementIn(member.measurements, MeasurementEnum.Imc);
    if (!imcMeasurement) {
      throw new Error('No IMC measurement found');
    }
    const objective = ObjectiveEnum.fromName(member.objective);
    const initialIMC = imcMeasurement.value;
    const idealIMC = MeasurementService.getIdealIMCBy(initialIMC, objective);
    const previsions = [];
    let prevision = {};
    const weightMeasurements = [];
    let memberHaveArchivedMeasurements = false;
    const achievedObjective = {
      date: null,
      value: 100
    };

    return MeasurementService.findAllArchivedMeasurementsBy(member)
      .then((archivedMeasurements) => {
          memberHaveArchivedMeasurements = archivedMeasurements.length > 0;
          const archivedAndActualMeasurements = archivedMeasurements.concat(member.measurements);
          const measurementsUsedToPrevisions = archivedAndActualMeasurements.filter(archivedMeasurement => {
            return archivedMeasurement.name === MeasurementEnum.Weight.name;
          });
          let weightMeasurement;
          let sizeMeasurement = MeasurementService.findMeasurementIn(member.measurements, MeasurementEnum.Size);
          measurementsUsedToPrevisions.forEach((measurement) => {
            if (measurement.name === MeasurementEnum.Weight.name) {
              weightMeasurement = measurement;
              weightMeasurements.push(measurement);
            }
            if (weightMeasurement && sizeMeasurement) {
              prevision = generatePrevisionBy(weightMeasurement, sizeMeasurement, initialIMC, idealIMC);
              previsions.push(prevision);
              weightMeasurement = null;
            }
          });
          const firstMeasurement = imcMeasurement;
          const currentMeasurement = weightMeasurements[weightMeasurements.length - 1];
          const currentPercentageAchieved = previsions[previsions.length - 1].value;
          const ms = moment(currentMeasurement.createdAt).diff(moment(firstMeasurement.createdAt));
          const daysToAchieveTheCurrentImc = moment.duration(ms).asDays();
          const daysToAchieveIdealImc = (100 * daysToAchieveTheCurrentImc) / currentPercentageAchieved;
          const dateToAchieveIdealImc = moment(firstMeasurement.createdAt).add(daysToAchieveIdealImc, 'days').format('DD/MM/YYYY');
          if (previsions.length > 1) {
            previsions[0].date = moment(imcMeasurement.createdAt).format('DD/MM/YYYY');
          }
          if (!memberHaveArchivedMeasurements || moment(firstMeasurement.createdAt).toDate() == moment(currentMeasurement.createdAt).toDate()) {
            achievedObjective.date = moment(imcMeasurement.createdAt).add(1, 'Y').format('DD/MM/YYYY');
          } else {
            achievedObjective.date = dateToAchieveIdealImc;
          }
          previsions.push(achievedObjective);

          return previsions;
        }
      );
  }

  /**
   * Add measurements for a member.
   * @param memberId
   * @param measurements
   * @returns {Promise.<Member>|Promise}
   */
  static addMeasurementsWithIMC(memberId, measurements) {
    return this.findById(memberId)
      .then(memberFinded => {
        memberFinded.measurements = [];
        measurements.forEach(mes => {
          memberFinded.measurements.push(mes);
        });
        return memberFinded.save();
      })
      .then(member => {
          return member;
        }, (error) => {
          throw new TechnicalError(error.message);
        }
      ).catch((error) => {
        throw error;
      });
  }

}

module.exports = MemberService;


function generatePrevisionBy(weightMeasurement, sizeMeasurement, initialIMC, idealImc) {
  const newIMC = MeasurementService.getIMCBy(weightMeasurement, sizeMeasurement);
  const evolutionOfImc = (newIMC - initialIMC);
  let percentage = 0;
  if (evolutionOfImc === 0) {
    percentage = 0
  } else {
    percentage = Math.round(evolutionOfImc * 100 / (idealImc - initialIMC));
  }
  const date = moment(weightMeasurement.createdAt).format('DD/MM/YYYY');

  return {
    date: date,
    value: (percentage > 100 ? 100 : percentage)
  };
}