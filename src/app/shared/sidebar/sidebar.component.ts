import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarService } from '../../core/services/sidebar.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [ CommonModule, RouterModule ],
    templateUrl: './sidebar.component.html',
    styleUrls: [ './sidebar.component.scss' ],
})
export class SidebarComponent {

    constructor(public sidebarService: SidebarService,
                private authService: AuthService) {
    }

    logout(): void {
        this.authService.logout();
    }
}
