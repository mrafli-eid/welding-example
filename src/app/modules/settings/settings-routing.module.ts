import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingContainerComponent } from "./setting-container/setting-container.component";

const routes: Routes = [
    {
        path: '',
        component: SettingContainerComponent
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ],
})
export class SettingsRoutingModule {
}
