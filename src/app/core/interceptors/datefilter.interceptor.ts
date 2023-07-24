import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class DatefilterInterceptor implements HttpInterceptor {


    constructor() {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        let modifiedParams = request.params;

        const change: any = [];

        if (request.params.get('start') && request.params.get('start') !== 'null') {
            let start: Date = new Date(request.params.get('start'));
            modifiedParams = modifiedParams.set('start', this.toIsoString(start));
        }

        if (request.params.get('end') && request.params.get('end') !== 'null') {
            let end: Date = new Date(request.params.get('end'));
            modifiedParams = modifiedParams.set('end', this.toIsoString(end));
        }

        if (request.params.get('act_date') && request.params.get('act_date') !== 'null') {
            let act_date: Date = new Date(request.params.get('act_date'));
            modifiedParams = modifiedParams.set('act_date', this.toIsoString(act_date));
        }

        if (request.params.get('plan_date') && request.params.get('plan_date') !== 'null') {
            let plan_date: Date = new Date(request.params.get('plan_date'));
            modifiedParams = modifiedParams.set('plan_date', this.toIsoString(plan_date));
        }


        const newRequest = request.clone({
            params: modifiedParams,
        });
        return next.handle(newRequest);
    }

    toIsoString(date: Date) {
        var tzo = -date.getTimezoneOffset(),
            dif = tzo >= 0 ? '+' : '-',
            pad = function (num) {
                return (num < 10 ? '0' : '') + num;
            };

        return date.getFullYear() +
            '-' + pad(date.getMonth() + 1) +
            '-' + pad(date.getDate()) +
            'T' + pad(date.getHours()) +
            ':' + pad(date.getMinutes()) +
            ':' + pad(date.getSeconds()) +
            dif + pad(Math.floor(Math.abs(tzo) / 60)) +
            ':' + pad(Math.abs(tzo) % 60);
    }
}
