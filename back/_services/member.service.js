const MongoError = require('../_helpers/MONGO_ERROR.json');
const Member = require('../_model/Member');
const Measurement = require('../_model/Measurement');
const AlreadyExistError = require('../_model/Errors').AlreadyExistError;
const NotFoundError = require('../_model/Errors').NotFoundError;
const TechnicalError = require('../_model/Errors').TechnicalError;
const ObjectiveEnum = require('../_enums/ObjectiveEnum');

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
    return Member.findOne({'_id': id})
      .then((member) => {
        if (!member) {
          throw new NotFoundError('Adhérent introuvable.');
        }
        return member;
      })
      .catch(err => {
        throw err;
      });
  }

  /**
   * Find a member by his mail and his password.
   * Password is checked by validation method.
   * @param email
   * @param password
   * @returns {Promise.<Member>|Promise}
   */
  static findByEmailAndPassword(email, password) {
    return Member.findOne({'email': email}).then((member) => {
      if (!member) {
        throw new NotFoundError('Adhérent introuvable.');
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
  static createMember(member) {
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
   * Add measurements for a member.
   * @param memberId
   * @param measurements
   * @returns {Promise.<Member>|Promise}
   */
  static addMeasurements(memberId, measurements) {
    return this.findById(memberId)
      .then(member => {
        measurements.forEach(mes => {
          member.measurements.push(mes);
        });
        return member.save();
      })
      .then(member => {
          return member;
        },
        (error) => {
          throw new TechnicalError(error.message);
        }
      ).catch((error) => {
        throw error;
      });
  }

  /**
   * Add measurements for a member and complete his profile.
   * @param memberId
   * @param measurements
   * @param sessionFrequency
   * @param birthDate
   * @param {ObjectiveEnum} objectiveEnum
   * @returns {Promise.<Member>|Promise}
   */
  static completeProfile(memberId, measurements, sessionFrequency, birthDate, objectiveEnum) {
    return this.findById(memberId)
      .then(member => {
        measurements.forEach(mes => {
          member.measurements.push(mes);
        });
        member.profileCompleted = true;
        member.sessionFrequency = sessionFrequency;
        member.birthDate = new Date(birthDate);
        member.objective = ObjectiveEnum.MassGainer;
        return member.save();
      })
      .then(member => {
          return member;
        },
        (error) => {
          throw new TechnicalError(error.message);
        }
      ).catch((error) => {
        throw error;
      });
  }
}

module.exports = MemberService;
