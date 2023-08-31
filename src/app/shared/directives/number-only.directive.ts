import { DecimalPipe } from '@angular/common';
import { Directive, ElementRef, HostListener, Input, OnDestroy, OnInit, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
	selector: '[appOnlyNumber]',
    standalone: true,
})
export class OnlyNumberDirective implements OnInit, OnDestroy {
	private debounceTimer: any;
	private decimalPipe: DecimalPipe;
	private subscription: Subscription[];
	private value: number;

	@Input()
	public allowComma: boolean;

	@Input()
	public allowOperator: boolean;

	@Input()
	public isFormatThousand: boolean;

	@Input()
	public isFormatThousandRupiah: boolean;

	@Input()
	public limitComma: number;

	@Input()
	public minNumber: number;

	@Input()
	public maxNumber: number;

	@HostListener('keydown', ['$event'])
	onKeyDown(event: KeyboardEvent) {
		const input = event.key;
		const numberRegex = /[0-9]+/g;
		const operatorKeys = ['+', '-', '*', '/', '(', ')', '.'];
		const specialKeys = [
			'ArrowLeft',
			'ArrowRight',
			'Backspace',
			'Del',
			'Delete',
			'Enter',
			'Escape',
			'End',
			'Home',
			'Tab',
		];
		const value = this.elementRef.nativeElement.value;

		if (value.slice(0, 1) === '0' && event.key === '0' && (this.isFormatThousand || this.isFormatThousandRupiah)) {
			event.preventDefault();
		}
		/* allow Select All, Copy, Paste, Cut */

		if (
			(event.keyCode === 65 && event.ctrlKey === true) /* Ctrl + A */ ||
			(event.keyCode === 67 && event.ctrlKey === true) /* Ctrl + C */ ||
			(event.keyCode === 86 && event.ctrlKey === true) /* Ctrl + V */ ||
			(event.keyCode === 88 && event.ctrlKey === true) /* Ctrl + X */ ||
			(event.keyCode === 65 && event.metaKey === true) /* Cmd + A */ ||
			(event.keyCode === 67 && event.metaKey === true) /* Cmd + C */ ||
			(event.keyCode === 86 && event.metaKey === true) /* Cmd + V */ ||
			(event.keyCode === 88 && event.metaKey === true) /* Cmd + X */
		) {
			return;
		}

		if (specialKeys.indexOf(event.key) !== -1) {
			return;
		}

		/* allow comma */

		if (this.allowComma) {
			if (value.slice(0, 1) === '0' && value.slice(1, 2) !== ',' && event.key === '0') {
				event.preventDefault();
			}
			if (this.limitComma !== undefined && numberRegex.test(input)) {
				const current = this.elementRef.nativeElement.value;
				const position = this.elementRef.nativeElement.selectionStart;
				const next = [
					current.slice(0, position),
					event.key === 'Decimal' ? ',' : event.key,
					current.slice(position),
				].join('');
				const afterComma = next.split(',')[1];
				if (afterComma && afterComma.length > this.limitComma) {
					event.preventDefault();
				}

				return;
			}

			if (event.key === ',' && !/\,/g.test(value)) {
				return;
			}
		}

		/* allow operator */

		if (this.allowOperator) {
			if (operatorKeys.indexOf(event.key) !== -1) {
				return;
			}
		}

		/* allow number */

		if (numberRegex.test(input)) {
			return;
		}

		event.preventDefault();
	}

	@HostListener('keyup', ['$event'])
	onkeyup(event: KeyboardEvent) {
		const value = this.elementRef.nativeElement.value;

		/* allow arrow keys */
		const arrowKeys = ['ArrowLeft', 'ArrowRight'];

		if (arrowKeys.indexOf(event.key) !== -1) {
			return;
		}

		if (value.length < 1) {
			return;
		}

		if (this.isFormatThousandRupiah) {
			const nominalWithoutDelimiter = this.parse(value);

			const nominalWithDelimiter = this.isFormatThousandRupiah
				? this.transform(Number(nominalWithoutDelimiter))
				: this.decimalPipe.transform(
					Number(nominalWithoutDelimiter),
					'0.0'
				);

			this.ngControl.control.setValue(nominalWithoutDelimiter);

			if (Number(nominalWithoutDelimiter) > 0) {
				this.ngControl.valueAccessor.writeValue(nominalWithDelimiter);
			}
		}
	}

	@HostListener('paste', ['$event'])
	onPaste(event: ClipboardEvent) {
		event.preventDefault();

		const pastedInput: string = event.clipboardData
			.getData('text/plain')
			.replace(/\D/g, '');

		document.execCommand('insertText', false, pastedInput);

	}

	constructor(
		@Self()
		private ngControl: NgControl,
		private elementRef: ElementRef
	) { }

	ngOnInit() {
		this.decimalPipe = new DecimalPipe('id-ID');

		this.subscription = [];

		this.setValueChanges();
	}

	ngOnDestroy() {
		this.subscription.forEach((each) => each.unsubscribe());
	}

	public transform(value: number): string {
		value = value && value > 0 ? value : 0;

		return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
	}

	public parse(value: string): string {
		return value
			.toString()
			.split('.')
			.join('')
			.split(',')
			.join('')
			.split(' ')
			.join('')
			.replace('R', '')
			.replace('p', '');
	}

	private setValueChanges() {
		/* subs value changes to check limit */

		const subs = this.ngControl.valueChanges.subscribe((value) => {
			this.value = Number(value);

			clearTimeout(this.debounceTimer);

			this.debounceTimer = setTimeout(() => {
				this.checkLimit();
			}, 100);
		});

		this.subscription.push(subs);
	}

	private checkLimit() {
		/* check limit if defined */
		if (this.value.toString().length > 1) {
			if (
				this.minNumber !== undefined &&
				this.value < Number(this.minNumber)
			) {
				this.ngControl.control.setValue(Number(this.minNumber));
			}

			if (
				this.maxNumber !== undefined &&
				this.value > Number(this.maxNumber)
			) {
				this.ngControl.control.setValue(Number(this.maxNumber));
			}
		}
	}
}
