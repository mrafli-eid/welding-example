import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DUMMY_MACHINE_LIST } from '../../../dashboard/components/layout-machine-area/layout-machine-area.dummy';
import { Machine } from '../../../../core/models/layout-machine.model';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { take } from 'rxjs';

@Component({
    selector: 'ahm-machine',
    templateUrl: './machine.component.html',
    styleUrls: [ './machine.component.scss' ],
})
export class MachineComponent {
    machine_name = '';
    machine: Machine;
    machineList: Machine[] = DUMMY_MACHINE_LIST;
    showComponentBoring = false;
    showComponentLaser = false;
    showComponentNotLaserAndBoring = false;
    imageDetailMachine: string;
    showTitleMachine: boolean = false;

    constructor(private activatedRoute: ActivatedRoute, private dashboardService: DashboardService){
        this.machine_name = this.activatedRoute.snapshot.paramMap.get('name') || '';
    }

  ngOnInit() {
    this.machine = this.machineList.find((machine) => machine.name === this.machine_name);
    this.dashboardService.getMachineList()
      .pipe(take(1))
      .subscribe((resp) => {
        this.machineList = resp.data;
        this.machine = this.machineList.find((machine) => machine.name === this.machine_name);
      });
    this.showComponent();
  }

  showComponent() {
    if (this.machine.name == 'BORING') {
      this.imageDetailMachine = "/assets/images/detail-machine-boring.png";
      this.showComponentBoring = true;
      this.showTitleMachine = true;
    } else if (this.machine.name == 'LASER'){
      this.imageDetailMachine = "/assets/images/detail-machine-laser.png";
      this.showTitleMachine = true;
      this.showComponentLaser = true;
    }else{
      this.imageDetailMachine = "/assets/images/detail-machine.png";
      this.showComponentNotLaserAndBoring = true;
    }
  }
    
}
