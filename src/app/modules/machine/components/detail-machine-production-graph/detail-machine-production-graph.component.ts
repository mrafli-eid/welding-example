import { Component, Input } from '@angular/core';
import { DateFilter } from '../../../../core/models/date-filter.model';
import { getDefaultDateFilter } from '../../../../core/consts/datepicker.const';
import { DetailMachineProductionGraph } from '../../../../core/models/machine.model';
import { MachineService } from '../../../../core/services/machine.service';
import { interval, take } from 'rxjs';
import { DUMMY_DETAIL_MACHINE_PRODUCTION_GRAPH } from './detail-machine-production-graph.dummy';
import { untilDestroyed } from 'src/app/core/helpers/rxjs.helper';
import { DEFAULT_INTERVAL } from '../../../../core/consts/app.const';

@Component({
    selector: 'ahm-detail-machine-production-graph',
    templateUrl: './detail-machine-production-graph.component.html',
    styleUrls: ['./detail-machine-production-graph.component.scss'],
    host: {
        class: 'dashboard-card',
    },
})
export class DetailMachineProductionGraphComponent {
    untilDestroyed = untilDestroyed();

    @Input() machine_name = '';
    //@ts-ignore
    robot_name = 'MASTER' || 'SLAVE';

    dateFilter: DateFilter = getDefaultDateFilter();
    productionGraphList: DetailMachineProductionGraph =
        DUMMY_DETAIL_MACHINE_PRODUCTION_GRAPH;

    constructor(private machineService: MachineService) {}

    ngOnInit() {
        // this.fetchProductionGraph();
        // interval(1 * 60 * 1000)
        //     .pipe(this.untilDestroyed())
        //     .subscribe(() => {
        //         this.fetchProductionGraph();
        //     });
        setInterval(() => {
            this.productionGraphList = {
                ...DUMMY_DETAIL_MACHINE_PRODUCTION_GRAPH,
                data: DUMMY_DETAIL_MACHINE_PRODUCTION_GRAPH.data.map(item => ({
                    label: item.label,
                    date_time: item.date_time,
                    value: Math.floor(Math.random() * (1600 - 1500) + 1500),
                })),
            };
        }, 3000);
    }

    fetchProductionGraph() {
        this.machineService
            .getProductionGraph(this.machine_name, this.dateFilter)
            .pipe(take(1))
            .subscribe({
                next: resp => {
                    this.productionGraphList = resp.data;
                },
                error: () => {},
            });
    }

    onFilterChanged(dateFilter: DateFilter) {
        this.dateFilter = dateFilter;
        this.fetchProductionGraph();
    }

    download() {
        this.machineService.downloadProductionGraph(this.machine_name);
    }
}
