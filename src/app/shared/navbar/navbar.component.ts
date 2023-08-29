import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../../core/services/sidebar.service';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [ CommonModule, MatButtonModule, MatMenuModule],
    templateUrl: './navbar.component.html',
    styleUrls: [ './navbar.component.scss' ],
})
export class NavbarComponent implements OnInit {
    todaysDate = new Date();

    constructor(private sidebarService: SidebarService) {
    }

    ngOnInit() {
        setInterval(() => {
            this.todaysDate = new Date();
        }, 1000);
    }

    toggle() {
        this.sidebarService.toggle();
    }
}
