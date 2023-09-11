import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'ahm-maintenance-detail',
    templateUrl: './maintenance-detail.component.html',
    styleUrls: [ './maintenance-detail.component.scss' ]
})
export class MaintenanceDetailComponent {
    machine_name: string = '';
    id = '';

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router) {
        this.machine_name = activatedRoute.snapshot.paramMap.get('name')
        this.id = activatedRoute.snapshot.queryParamMap.get('id');
    }

    navigateToDetailPreventive(){
        this.router.navigate([ `/maintenance/${this.machine_name}/preventive` ], {
            queryParams: {
                id: this.id,
            },
        });
    }

    navigateToDetailCorrective(){
        this.router.navigate([ `/maintenance/${this.machine_name}/corrective` ], {
            queryParams: {
                id: this.id,
            },
        });
    }
}
