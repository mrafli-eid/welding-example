import {
    Component,
    DestroyRef,
    inject,
    Input,
    OnChanges,
    OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { HubConnectionService } from '../../../../core/services/hub-connection.service';
import { DUMMY_MACHINE_LIST } from './layout-machine-area.dummy';
import { Machine } from '../../../../core/models/layout-machine.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'ahm-layout-machine-area',
    templateUrl: './layout-machine-area.component.html',
    styleUrls: ['./layout-machine-area.component.scss'],
    host: {
        class: 'dashboard-card justify-content-between',
    },
})
export class LayoutMachineAreaComponent implements OnChanges, OnInit {
    destroyRef = inject(DestroyRef);
    @Input() machineList: Machine[] = [];
    @Input() layoutMachineList: Machine[] = [];

    constructor(private hubConnectionService: HubConnectionService) {}

    ngOnChanges() {
        this.layoutMachineList = [];

        this.machineList.forEach(m => {
            this.layoutMachineList.push(m);
        });

        while (this.layoutMachineList.length < 18) {
            this.layoutMachineList.push({
                id: '',
                name: '',
                value: -1,
                date_time: new Date(),
            });
        }
    }

    ngOnInit() {
        this.getMachineList();
        this.hubConnectionService.isConnectionEstablished
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(turnedOn => {
                if (turnedOn) {
                    this.hubConnectionService.machineHealth$
                        .pipe(takeUntilDestroyed(this.destroyRef))
                        .subscribe({
                            next: resp => {
                                if (resp != undefined) {
                                    resp.forEach(res => {
                                        const machine =
                                            this.layoutMachineList.find(
                                                temp => temp.name === res.name
                                            );
                                        if (machine) {
                                            machine.value = res.value;
                                        }
                                    });
                                }
                            },
                        });
                }
            });
    }

    private getMachineList(): void {
        this.machineList = DUMMY_MACHINE_LIST;
    }

    getMachineClass(value: number) {
        let classList = 'machine';
        switch (value) {
            case 0:
                classList += ' stop';
                break;
            case 1:
                classList += ' idle';
                break;
            case 2:
                classList += ' running';
                break;
            default:
                classList += ' disconnect';
                break;
        }

        return classList;
    }
}
