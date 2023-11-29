import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignalrClient, SignalrConnection } from 'ngx-signalr-websocket';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BroadcastResponse } from '../models/broadcast.model';

@Injectable({
    providedIn: 'root',
})
export class HubConnectionService {
    isConnectionEstablished = new BehaviorSubject<boolean>(false);
    broadcast$?: Observable<any> = new Observable<BroadcastResponse>();
    machineHealth$?: Observable<any> = new Observable<BroadcastResponse>();
    connection?: SignalrConnection;

    constructor(httpClient: HttpClient) {
        const client = SignalrClient.create(httpClient);

        client.connect(environment.SIGNALR_URL).subscribe({
            next: connection => {
                this.connection = connection;
                this.setupMachineHealthPipe(connection);
                this.isConnectionEstablished.next(true);
            },
            error: () => {
                this.isConnectionEstablished.next(true);
            },
        });
    }

    private setupMachineHealthPipe(connection: SignalrConnection): void {
        this.machineHealth$ = connection.stream<any>('RealtimeMachine');
    }
}
