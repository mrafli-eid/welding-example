import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface MasterData {
    label: string;
    link: string;
}

@Component({
    selector: 'ahm-master-data-list',
    templateUrl: './master-data-list.component.html',
    styleUrls: [ './master-data-list.component.scss' ],
})
export class MasterDataListComponent {
    masterDataList: MasterData[] = [
        {
            label: 'line',
            link: '/master/line',
        },
        {
            label: 'machine',
            link: '/master/machine',
        },
        {
            label: 'subject',
            link: '/master/subject',
        },
        {
            label: 'register subject machine',
            link: '/master/register/subject-machine',
        },
        {
            label: 'register machine line',
            link: '/master/register/machine-line',
        },
    ];

    constructor(private router: Router) {
    }

    navigateTo(link: string): void {
        this.router.navigate([ link ]);
    }
}
