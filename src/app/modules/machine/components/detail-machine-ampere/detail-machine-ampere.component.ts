import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { getDefaultDateFilter } from 'src/app/core/consts/datepicker.const';
import { untilDestroyed } from 'src/app/core/helpers/rxjs.helper';
import { DateFilter } from 'src/app/core/models/date-filter.model';
import { DetailMachineAmpereAndVoltage } from 'src/app/core/models/machine.model';
import { MachineService } from 'src/app/core/services/machine.service';
import { DUMMY_DETAIL_MACHINE_AMPERE } from './detail-machine-ampere';
import { interval, take } from 'rxjs';

@Component({
    selector: 'ahm-detail-machine-ampere',
    templateUrl: './detail-machine-ampere.component.html',
    styleUrls: ['./detail-machine-ampere.component.scss'],
    host: {
        class: 'dashboard-card',
    },
})
export class DetailMachineAmpereComponent {
    untilDestroyed = untilDestroyed();
    
    @Input() machine_name = '';
    @Input() robot_name = '';
    
    dateFilter: DateFilter = getDefaultDateFilter();
    setting = 950;
    minimum = 900;
    medium = 950;
    maximum = 1000;

    ampereList: DetailMachineAmpereAndVoltage;

    constructor(
        private machineService: MachineService,
        private router: Router
    ) {
        
    }

    ngOnChanges() {
        this.fetchAmpere();
        interval(1 * 60 * 1000)
            .pipe(this.untilDestroyed())
            .subscribe(() => {
                this.fetchAmpere();
            });
    }

    fetchAmpere() {
        const machine_name = this.router.url.split('/')[2];
        const robot_name = this.router.url.split('/')[3];
        console.log(machine_name, robot_name);     
        this.machineService
            .getAmpere(machine_name, robot_name, this.dateFilter)
            .pipe(take(1))
            .subscribe({
                next: (resp: any) => {
                    this.ampereList = resp.data;
                    console.log(resp.data);
                },
            });
    }

    onFilterChanged(dateFilter: DateFilter) {
        this.dateFilter = dateFilter;
        this.fetchAmpere();
    }

    download() {
        this.machineService.downloadAmpere(this.machine_name, this.robot_name);
    }

    goToSettings() {
        this.router.navigate(['/settings'], {
            queryParams: {
                name: 'Ampere',
                machine: this.machine_name,
                robot: this.robot_name,
            },
        });
    }
}
