import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MachineComponent } from './pages/machine/machine.component';

const routes: Routes = [
    {
        path: ':name/MASTER',
        component: MachineComponent,
    },
    {
        path: ':name/SLAVE',
        component: MachineComponent,
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ],
})
export class MachineRoutingModule {
}
