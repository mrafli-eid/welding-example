import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type DotColor =
    | 'primary'
    | 'warning'
    | 'danger'
    | 'success'
    | 'greenplan'
    | 'greenactual'
    | 'greenmttrmtbf'
    | 'secondary';
export type DotType = 'dot' | 'line' | 'dashed';

@Component({
    selector: 'ahm-dot',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './dot.component.html',
    styleUrls: ['./dot.component.scss'],
})
export class DotComponent {
    @HostBinding('class') @Input() color: DotColor = 'primary';
    @Input() type: DotType = 'dot';
}
