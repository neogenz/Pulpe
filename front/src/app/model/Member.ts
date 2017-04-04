import {Program} from "./Program";
export class Member {

  constructor(firstname:string, lastname:string, mail:string, password:string, address:string, city:string, country:string, phone:string, age:string, mensuration:any, availability:any) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.mail = mail;
    this.password = password;
    this.address = address;
    this.city = city;
    this.country = country;
    this.phone = phone;
    this.age = age;
    this.mensuration = mensuration;
    this.availability = availability;
  }


  firstname:string;
  lastname:string;
  mail:string;
  password:string;
  address:string;
  city:string;
  country:string;
  phone:string;
  age:string;
  mensuration:any; //TODO: create class Mensuration (with english traduction)
  availability:any; //TODO: create class Planning
  goal:any; //TODO: create enum Goal ?
  program:Program;
}
