import { Component, Input } from '@angular/core';
import { DateFilter } from '../../../../core/models/date-filter.model';
import { getDefaultDateFilter } from '../../../../core/consts/datepicker.const';
import { DetailMachineProductionGraph } from '../../../../core/models/machine.model';
import { MachineService } from '../../../../core/services/machine.service';
import { interval, take } from 'rxjs';
import { DUMMY_DETAIL_MACHINE_PRODUCTION_GRAPH } from "./detail-machine-production-graph.dummy";
import { untilDestroyed } from 'src/app/core/helpers/rxjs.helper';
import { DEFAULT_INTERVAL } from "../../../../core/consts/app.const";

@Component({
    selector: 'ahm-detail-machine-production-graph',
    templateUrl: './detail-machine-production-graph.component.html',
    styleUrls: [ './detail-machine-production-graph.component.scss' ],
    host: {
        'class': 'dashboard-card',
    },
})
export class DetailMachineProductionGraphComponent {
    untilDestroyed = untilDestroyed();

    @Input() machine_name = '';
    robot_name = 'MASTER' || 'SLAVE';

    dateFilter: DateFilter = getDefaultDateFilter();
    productionGraphList: DetailMachineProductionGraph = DUMMY_DETAIL_MACHINE_PRODUCTION_GRAPH;

    constructor(private machineService: MachineService) {
    }

    ngOnInit() {
        this.fetchProductionGraph();
        interval(DEFAULT_INTERVAL)
            .pipe(this.untilDestroyed())
            .subscribe(() => {
                this.fetchProductionGraph();
            });
    }

    fetchProductionGraph() {
        this.machineService.getProductionGraph(this.machine_name, this.robot_name, this.dateFilter)
            .pipe(take(1))
            .subscribe({
                next: (resp) => {
                    this.productionGraphList = resp.data;
                },
                error: () => {
                },
            });
    }

    onFilterChanged(dateFilter: DateFilter) {
        this.dateFilter = dateFilter;
        this.fetchProductionGraph();
    }

    download() {
        this.machineService.downloadProductionGraph(this.machine_name, this.dateFilter);
    }

}
