import { Component } from '@angular/core';
import { HubConnectionService } from './core/services/hub-connection.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    isConnected = true;

    constructor(private hubService: HubConnectionService) {
        hubService.isConnectionEstablished.subscribe({
            next: isConnected => {
                this.isConnected = isConnected;
            },
            error: () => {
                this.isConnected = true;
            },
        });
    }
}
