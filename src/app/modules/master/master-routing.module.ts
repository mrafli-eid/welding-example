import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterLineContainerComponent } from './master-line/master-line-container/master-line-container.component';
import { MasterDataMachineComponent } from './master-machine/master-machine-container/master-data-machine.component';
import {
    MasterSubjectContainerComponent
} from './master-subject/master-subject-container/master-subject-container.component';
import { MasterDataListComponent } from './master-data-list/master-data-list.component';
import {
    RegisterSubjectMachineContainerComponent
} from "./register-subject-machine/register-subject-machine-container/register-subject-machine-container.component";
import {
    RegisterMachineLineContainerComponent
} from "./register-machine-line/register-machine-line-container/register-machine-line-container.component";

const routes: Routes = [
    {
        path: '',
        component: MasterDataListComponent,
    },
    {
        path: 'line',
        component: MasterLineContainerComponent,
    },
    {
        path: 'machine',
        component: MasterDataMachineComponent,
    },
    {
        path: 'subject',
        component: MasterSubjectContainerComponent,
    },
    {
        path: 'register/subject-machine',
        component: RegisterSubjectMachineContainerComponent,
    },
    {
        path: 'register/machine-line',
        component: RegisterMachineLineContainerComponent,
    },

];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ],
})
export class MasterRoutingModule {
}
