import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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
export class MachineComponent implements OnInit {
    machine_name = '';
    machine: Machine;
    machineList: Machine[] = DUMMY_MACHINE_LIST;
    showComponentBoring = false;
    showComponentLaser = false;
    showComponentNotLaserAndBoring = false;
    imageDetailMachine: string;
    showTitleMachine: boolean = false;

    robot_name = 'MASTER' || 'SLAVE';

    constructor(private activatedRoute: ActivatedRoute, private dashboardService: DashboardService){
        this.machine_name = this.activatedRoute.snapshot.paramMap.get('name') || '';
        this.robot_name = this.activatedRoute.snapshot.paramMap.get('robot') || '';
    }

  ngOnInit() {
    this.machine = this.machineList.find((machine) => machine.name === this.machine_name);
    this.dashboardService.getMachineList()
      .pipe(take(1))
      .subscribe((resp) => {
        this.machineList = resp.data;
        this.machine = this.machineList.find((machine) => machine.name === this.machine_name);
      });
    this.showComponent(this.machine_name);

    if (this.machine_name === "BORRING" || this.machine_name === "LASER") {
      this.activatedRoute.snapshot.paramMap.has('');
    }
  }

  changeMachineName(name: string) {
    this.machine_name = name;
    this.showComponent(this.machine_name);
    this.machine = this.machineList.find((machine) => machine.name === this.machine_name);
  }

  showComponent(machine_name: string) {
    if (this.machine_name == 'BORRING') {
      this.imageDetailMachine = "/assets/images/detail-machine-boring.png";
    } else if (this.machine_name == 'LASER'){
      this.imageDetailMachine = "/assets/images/detail-machine-laser.png";
    }else{
      this.imageDetailMachine = "/assets/images/detail-machine.png";
    }
  }

  reloadPage() {
    window.location.reload();
  }

  changeRobotToSlave() {
<<<<<<< Updated upstream
    window.location.href = '/machine/' + this.machine_name + '/SLAVE';
  }

  changeRobotToMaster() {
    window.location.href = '/machine/' + this.machine_name + '/MASTER';
=======
    this.reloadPage();
    this.robot_name = 'SLAVE';
  }

  changeRobotToMaster() {
    this.reloadPage();
    this.robot_name = 'MASTER';
>>>>>>> Stashed changes
  }
    
}
