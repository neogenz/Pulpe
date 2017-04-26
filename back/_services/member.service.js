const MongoError = require('../_helpers/MONGO_ERROR.json');
const AlreadyExistError = require('../_model/Errors').AlreadyExistError;
const NotFoundError = require('../_model/Errors').NotFoundError;
const Member = require('../_model/Member');
const Measurement = require('../_model/Measurement');

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
            .catch(function (err) {
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
        const array = [];
        let measurement = null;

        measurements.forEach(mes => {
            measurement = new Measurement();
            measurement.name = mes.name;
            measurement.unit = mes.unit;
            measurement.value = mes.value;
            array.push(measurement);
        });

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
                    throw error;
                }
            ).catch((error) => {
                throw error;
            });
    }
}

module.exports = MemberService;
