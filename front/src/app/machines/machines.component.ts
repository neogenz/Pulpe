import {Component, OnInit} from '@angular/core';
import {Machine} from "../_model/Machine";
import {DialogService} from "ng2-bootstrap-modal";
import {ActivatedRoute} from "@angular/router";
import {Animations} from "../shared/Animations";

@Component({
  selector: 'pulpe-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.css'],
  animations: [Animations.fadeIn()]
})
export class MachinesComponent implements OnInit {
  private machines: Machine[];
  filterArgs: string;

  constructor(private route: ActivatedRoute, private dialogService: DialogService) {
  }

  ngOnInit() {
    this.machines = this.route.snapshot.data['machines'];
    this.filterArgs = '';
  }

}
