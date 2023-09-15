import { Component, ViewChild } from '@angular/core';
import { Breadcrumb } from "../../../core/models/breadcrumbs.model";
import { SettingListComponent } from '../setting-list/setting-list.component';
import { Setting } from 'src/app/core/models/setting.model';

@Component({
    selector: 'ahm-setting-container',
    templateUrl: './setting-container.component.html',
    styleUrls: [ './setting-container.component.scss' ]
})
export class SettingContainerComponent {
    breadcrumbs: Breadcrumb[] = [
        { label: 'Setting', link: '/settings' },
    ];
    data: Setting[];


    @ViewChild(SettingListComponent) settingList: SettingListComponent;

    onFinished() {
        this.data = null;
        this.settingList.refreshData();
    }
}
