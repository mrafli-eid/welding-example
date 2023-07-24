import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ahm-maintenance-detail',
  templateUrl: './maintenance-detail.component.html',
  styleUrls: ['./maintenance-detail.component.scss']
})
export class MaintenanceDetailComponent {
    id: string = '';
    constructor(private activatedRoute: ActivatedRoute) {
        this.id = activatedRoute.snapshot.paramMap.get('id');
    }
}
