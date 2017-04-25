const MongoError = require('../_helpers/MONGO_ERROR.json');
const AlreadyExistError = require('../_model/Errors').AlreadyExistError;
const Member = require('../_model/Member');

class AlreadyExistMemberError extends AlreadyExistError {
}

class MemberService {
  constructor() {
  }

  /**
   * Find a member by his mail and his password.
   * Password is checked by validation method.
   * @param email
   * @param password
   * @returns {Promise.<Member>|Promise}
   */
  static findByEmailAndPassword(email, password) {
    return Member.findOne({'email': email}).then((member)=> {
      if (!member) {
        throw new Error('Adhérent introuvable.');
      }
      if (!member.validPassword(password)) {
        throw new Error('Email ou mot de passe invalide.');
      }
      return member;
    }).catch(function (err) {
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
      (member)=> {
        return member;
      },
      (error) => {
        if (error.code && error.code === MongoError.DUPPLICATE_KEY.code) {
          throw new AlreadyExistMemberError('Cette email existe déja.');
        }
      }
    ).catch((error)=> {
      throw error;
    })
  }
}

module.exports = MemberService;
