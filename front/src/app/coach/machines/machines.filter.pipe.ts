import {Pipe, PipeTransform} from '@angular/core';
import {Machine} from "../../_model/Machine";

@Pipe({
  name: 'filterMachines',
  pure: false
})
export class FilterMachines implements PipeTransform {
  transform(machines: Machine[], arg: string): any {
    if (!machines || !arg) {
      return machines;
    }
    return machines.filter(machine => machine.name.toLocaleLowerCase().includes(arg.toLocaleLowerCase()));
  }
}