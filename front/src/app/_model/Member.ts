import {Program} from "./Program";
export class Member {

    constructor() {
    }

    id: string;
    firstName: string;
    lastName: string;
    mail: string;
    password: string;
    address: string;
    city: string;
    country: string;
    phone: string;
    age: string;
    mensuration: any; //TODO: create class Mensuration (with english traduction)
    availability: any; //TODO: create class Planning
    goal: any; //TODO: create enum Goal ?
    program: Program;

    public static of():MemberBuilder {
        return new MemberBuilder();
    }
}


/**
 * Class used to implement Builder pattern.
 */
class MemberBuilder {
    private me: Member = new Member();

    public id(id: string): MemberBuilder {
        this.me.id = id;
        return this;
    }

    public lastName(lastName: string): MemberBuilder {
        this.me.lastName = lastName;
        return this;
    }

    public firstName(firstName: string): MemberBuilder {
        this.me.firstName = firstName;
        return this;
    }

    public build(): Member {
        return this.me;
    }
}
