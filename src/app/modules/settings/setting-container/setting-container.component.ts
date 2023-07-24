import { Component } from '@angular/core';
import { Breadcrumb } from "../../../core/models/breadcrumbs.model";

@Component({
    selector: 'ahm-setting-container',
    templateUrl: './setting-container.component.html',
    styleUrls: [ './setting-container.component.scss' ]
})
export class SettingContainerComponent {
    breadcrumbs: Breadcrumb[] = [
        { label: 'Setting', link: '/settings' },
    ];
}
