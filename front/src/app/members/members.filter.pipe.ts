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
      member.mail.includes(arg)
      || member.firstName.includes(arg)
      || member.lastName.includes(arg)
    );
  }
}