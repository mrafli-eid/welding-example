import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MachineRoutingModule } from './machine-routing.module';
import { DetailMachineComponent } from './components/detail-machine/detail-machine.component';
import { MachineComponent } from './pages/machine/machine.component';
import { DetailMachineAlarmComponent } from './components/detail-machine-alarm/detail-machine-alarm.component';
import {
    DetailMachinePressLoadComponent
} from './components/detail-machine-press-load/detail-machine-press-load.component';
import {
    DetailMachineActivityMachineComponent
} from './components/detail-machine-activity-machine/detail-machine-activity-machine.component';
import {
    DetailMachineHistoryAlarmComponent
} from './components/detail-machine-history-alarm/detail-machine-history-alarm.component';
import {
    DetailMachineCnbLubOilPressureComponent
} from './components/detail-machine-cnb-lub-oil-pressure/detail-machine-cnb-lub-oil-pressure.component';
import {
    DetailMachineProductionGraphComponent
} from './components/detail-machine-production-graph/detail-machine-production-graph.component';
import {
    DetailMachineActualMaintenanceComponent
} from './components/detail-machine-actual-maintenance/detail-machine-actual-maintenance.component';
import {
    DetailMachineLubOilPressureComponent
} from './components/detail-machine-lub-oil-pressure/detail-machine-lub-oil-pressure.component';
import {
    ChartTopMachineAlarmComponent
} from '../dashboard/components/top-machine-alarm/chart-top-machine-alarm.component';
import { DatepickerComponent } from '../../shared/datepicker/datepicker.component';
import { DotComponent } from '../../shared/dot/dot.component';
import { PaginatorComponent } from '../../shared/paginator/paginator.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from "@angular/material/grid-list";
import { NgChartsModule } from "ng2-charts";
import {
    ChartDetailMachineAlarmComponent
} from "./components/detail-machine-alarm/chart-detail-machine-alarm.component";
import {
    ChartDetailMachineProductionGraphComponent
} from "./components/detail-machine-production-graph/chart-detail-machine-production-graph.component";
import {
    ChartDetailMachineCnbLubOilPressureComponent
} from "./components/detail-machine-cnb-lub-oil-pressure/chart-detail-machine-cnb-lub-oil-pressure.component";
import {
    ChartDetailMachineLubOilPressureComponent
} from "./components/detail-machine-lub-oil-pressure/chart-detail-machine-lub-oil-pressure.component";
import {
    ChartDetailMachineActivityMachineComponent
} from "./components/detail-machine-activity-machine/chart-detail-machine-activity-machine.component";
import {
    ChartDetailMachinePressLoadComponent
} from "./components/detail-machine-press-load/chart-detail-machine-press-load.component";
import { MatMenuModule } from "@angular/material/menu";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { DetailMachineTemperatureMirrorComponent } from './components/detail-machine-temperature-mirror/detail-machine-temperature-mirror.component';
import { ChartDetailMachineTemperatureMirrorComponent } from './components/detail-machine-temperature-mirror/chart-detail-machine-temperature-mirror.component';
import { DetailMachineRunningHourComponent } from './components/detail-machine-running-hour/detail-machine-running-hour.component';
import { ChartDetailMachineRunningHourComponent } from './components/detail-machine-running-hour/chart-detail-machine-running-hour.component';


@NgModule({
    declarations: [
        DetailMachineComponent,
        MachineComponent,
        DetailMachineAlarmComponent,
        DetailMachinePressLoadComponent,
        DetailMachineActivityMachineComponent,
        DetailMachineHistoryAlarmComponent,
        DetailMachineCnbLubOilPressureComponent,
        DetailMachineProductionGraphComponent,
        DetailMachineActualMaintenanceComponent,
        DetailMachineLubOilPressureComponent,
        DetailMachineTemperatureMirrorComponent,
        DetailMachineRunningHourComponent,
    ],
    imports: [
        CommonModule,
        MachineRoutingModule,
        ChartTopMachineAlarmComponent,
        DatepickerComponent,
        DotComponent,
        PaginatorComponent,
        ReactiveFormsModule,
        MatGridListModule,
        NgChartsModule,
        ChartTopMachineAlarmComponent,
        ChartDetailMachineAlarmComponent,
        ChartDetailMachineProductionGraphComponent,
        ChartDetailMachineCnbLubOilPressureComponent,
        ChartDetailMachineLubOilPressureComponent,
        ChartDetailMachineActivityMachineComponent,
        ChartDetailMachinePressLoadComponent,
        ChartDetailMachineTemperatureMirrorComponent,
        ChartDetailMachineRunningHourComponent,
        MatMenuModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
    ],
})
export class MachineModule {
}
