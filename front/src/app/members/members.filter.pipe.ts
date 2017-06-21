import {Pipe, PipeTransform} from '@angular/core';
import {Member} from "../_model/Member";

@Pipe({
  name: 'filterMembers',
  pure: false
})
export class FilterMembers implements PipeTransform {
  transform(members: Member[], arg: string): any {
    if (!members || !arg) {
      return members;
    }
    return members.filter(member =>
      member.mail.toLocaleLowerCase().includes(arg.toLocaleLowerCase())
      || member.firstName.toLocaleLowerCase().includes(arg.toLocaleLowerCase())
      || member.lastName.toLocaleLowerCase().includes(arg.toLocaleLowerCase())
    );
  }
}