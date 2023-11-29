import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'thousand',
    standalone: true,
})
export class ThousandPipe implements PipeTransform {
    transform(value: number, ...args: unknown[]): unknown {
        if (value == null || value == undefined) {
            return '-';
        }
        const stringValue = value.toFixed(2);
        const parts = stringValue.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        return parts.join('.');
    }
}
