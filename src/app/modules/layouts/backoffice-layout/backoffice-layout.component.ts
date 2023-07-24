import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { SidebarService } from '../../../core/services/sidebar.service';

@Component({
    selector: 'app-backoffice-layout',
    standalone: true,
    imports: [ CommonModule, NavbarComponent, SidebarComponent, RouterModule ],
    templateUrl: './backoffice-layout.component.html',
    styleUrls: [ './backoffice-layout.component.scss' ],
})
export class BackofficeLayoutComponent {
    constructor(public sidebarService: SidebarService) {
    }
}
