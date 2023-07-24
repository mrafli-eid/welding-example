import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'string',
    standalone: true
})
export class StringPipe implements PipeTransform {

    transform(value: unknown, ...args: unknown[]): unknown {
        if (value) {
            return value;
        } else {
            return '-';
        }
    }

}
