import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { PureService } from '../../../core/services/pure.service';
import { MasterMachine } from '../../../core/models/master.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DUMMY_MASTER_MACHINE_LIST } from '../../master/master-machine/master-machine-list/master-machine-list.dummy';

interface Breadcrumb {
    label: string;
    link: string;
}
@Component({
  selector: 'ahm-maintenance-list',
  templateUrl: './maintenance-list.component.html',
  styleUrls: ['./maintenance-list.component.scss']
})
export class MaintenanceListComponent implements OnInit {
    destroyRef = inject(DestroyRef);
    machineList: MasterMachine[] = DUMMY_MASTER_MACHINE_LIST;

    constructor(private router: Router,
                private pureService: PureService,) {
    }

    ngOnInit() {
        this.fetchMachineList();
    }

    fetchMachineList() {
        this.pureService.getMachineList()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((resp) => {
               this.machineList = resp.data;
            });
    }
}
