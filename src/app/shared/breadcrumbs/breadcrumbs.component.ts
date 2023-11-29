import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'ahm-breadcrumbs',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './breadcrumbs.component.html',
    styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent {
    @Input() breadcrumbs = [];

    constructor(private router: Router) {}

    navigateTo(link: string): void {
        this.router.navigate([link]);
    }
}
