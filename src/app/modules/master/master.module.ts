import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';
import { MasterLineContainerComponent } from './master-line/master-line-container/master-line-container.component';
import { MasterDataMachineComponent } from './master-machine/master-machine-container/master-data-machine.component';
import { MasterSubjectContainerComponent } from './master-subject/master-subject-container/master-subject-container.component';
import { MasterLineUpsertComponent } from './master-line/master-line-upsert/master-line-upsert.component';
import { MasterLineListComponent } from './master-line/master-line-list/master-line-list.component';
import { BreadcrumbsComponent } from '../../shared/breadcrumbs/breadcrumbs.component';
import { PaginatorComponent } from '../../shared/paginator/paginator.component';
import { MasterDataListComponent } from './master-data-list/master-data-list.component';
import { MatSortModule } from '@angular/material/sort';
import { ReactiveFormsModule } from '@angular/forms';
import { MasterLineDetailComponent } from './master-line/master-line-detail/master-line-detail.component';
import { MasterDataDeleteComponent } from './dialogs/master-data-delete/master-data-delete.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MasterMachineUpsertComponent } from './master-machine/master-machine-upsert/master-machine-upsert.component';
import { MasterMachineListComponent } from './master-machine/master-machine-list/master-machine-list.component';
import { MasterMachineDetailComponent } from './master-machine/master-machine-detail/master-machine-detail.component';
import { MasterSubjectUpsertComponent } from './master-subject/master-subject-upsert/master-subject-upsert.component';
import { MasterSubjectListComponent } from './master-subject/master-subject-list/master-subject-list.component';
import { MasterSubjectDetailComponent } from './master-subject/master-subject-detail/master-subject-detail.component';
import { RegisterSubjectMachineContainerComponent } from './register-subject-machine/register-subject-machine-container/register-subject-machine-container.component';
import { RegisterMachineLineContainerComponent } from './register-machine-line/register-machine-line-container/register-machine-line-container.component';
import { RegisterSubjectMachineListComponent } from './register-subject-machine/register-subject-machine-list/register-subject-machine-list.component';
import { RegisterMachineDetailComponent } from './register-subject-machine/register-subject-machine-detail/register-machine-detail.component';
import { RegisterSubjectMachineUpsertComponent } from './register-subject-machine/register-subject-machine-upsert/register-subject-machine-upsert.component';
import { RegisterMachineLineListComponent } from './register-machine-line/register-machine-line-list/register-machine-line-list.component';
import { RegisterMachineLineUpsertComponent } from './register-machine-line/register-machine-line-upsert/register-machine-line-upsert.component';
import { RegisterMachineLineDetailComponent } from './register-machine-line/register-machine-line-detail/register-machine-line-detail.component';
import { MasterRobotContainerComponent } from './master-robot/master-robot-container/master-robot-container.component';
import { MasterRobotDetailComponent } from './master-robot/master-robot-detail/master-robot-detail.component';
import { MasterRobotListComponent } from './master-robot/master-robot-list/master-robot-list.component';
import { MasterRobotUpsertComponent } from './master-robot/master-robot-upsert/master-robot-upsert.component';
import {MatSelectModule } from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@NgModule({
    declarations: [
        MasterDataListComponent,
        MasterLineContainerComponent,
        MasterDataMachineComponent,
        MasterSubjectContainerComponent,
        MasterDataDeleteComponent,
        MasterLineUpsertComponent,
        MasterLineListComponent,
        MasterLineDetailComponent,
        MasterMachineUpsertComponent,
        MasterMachineListComponent,
        MasterMachineDetailComponent,
        MasterSubjectUpsertComponent,
        MasterSubjectListComponent,
        MasterSubjectDetailComponent,
        RegisterSubjectMachineContainerComponent,
        RegisterMachineLineContainerComponent,
        RegisterSubjectMachineListComponent,
        RegisterMachineDetailComponent,
        RegisterSubjectMachineUpsertComponent,
        RegisterMachineLineListComponent,
        RegisterMachineLineUpsertComponent,
        RegisterMachineLineDetailComponent,
        MasterRobotContainerComponent,
        MasterRobotDetailComponent,
        MasterRobotListComponent,
        MasterRobotUpsertComponent
    ],
    imports: [
        CommonModule,
        MasterRoutingModule,
        BreadcrumbsComponent,
        NgOptimizedImage,
        PaginatorComponent,
        MatSortModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule
    ],
})
export class MasterModule {}
