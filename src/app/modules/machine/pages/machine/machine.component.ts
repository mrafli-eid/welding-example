import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'ahm-machine',
    templateUrl: './machine.component.html',
    styleUrls: [ './machine.component.scss' ],
})
export class MachineComponent {
    id = '';

    constructor(private activatedRoute: ActivatedRoute) {
        this.id = this.activatedRoute.snapshot.paramMap.get('id') || '';
    }
}
