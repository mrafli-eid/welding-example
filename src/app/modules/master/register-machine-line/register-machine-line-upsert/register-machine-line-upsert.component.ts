import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import {
    MasterLine,
    MasterMachineLine,
    registerMachineList,
} from '../../../../core/models/master.model';
import { MachineLine } from '../../../../core/models/register.model';
import { PureService } from 'src/app/core/services/pure.service';
import { RegisterService } from 'src/app/core/services/register.service';
import {
    DUMMY_LINE_LIST,
    DUMMY_MACHINE_LIST,
} from '../../register-machine-line/register-machine-line-upsert/register-machine-line-upsert.dummy';

@Component({
    selector: 'ahm-register-machine-line-upsert',
    templateUrl: './register-machine-line-upsert.component.html',
    styleUrls: ['./register-machine-line-upsert.component.scss'],
})
export class RegisterMachineLineUpsertComponent {
    @Input() masterData: MachineLine;
    @Output() onSubmit = new EventEmitter();

    lineList: MasterLine[] = DUMMY_LINE_LIST;
    machineList: MasterMachineLine[] = DUMMY_MACHINE_LIST;

    notSelectedMachineList: MasterMachineLine[] = [];
    selectedMachineList: MasterMachineLine[] = [];

    filteredNotSelectedMachineList: MasterMachineLine[] = [];
    filteredSelectedMachineList: MasterMachineLine[] = [];

    notSelectedFormControl = new FormControl();
    selectedFormControl = new FormControl();

    formGroup: FormGroup = new FormGroup({
        line_id: new FormControl('', [Validators.required]),
        machine_id: new FormControl(),
    });

    constructor(
        private registerService: RegisterService,
        private pureService: PureService
    ) {}

    ngOnInit() {
        this.initList();
        this.notSelectedFormControl.valueChanges.subscribe(text => {
            this.filteredNotSelectedMachineList =
                this.notSelectedMachineList.filter(m =>
                    m.name.toLowerCase().includes(text.toLowerCase())
                );
        });
        this.selectedFormControl.valueChanges.subscribe(text => {
            this.filteredSelectedMachineList = this.selectedMachineList.filter(
                m => m.name.toLowerCase().includes(text.toLowerCase())
            );
        });
        this.selectedFormControl.setValue('');
        this.notSelectedFormControl.setValue('');
    }

    ngOnChanges() {
        this.patchValue();
    }

    selectOneMachine(machine: MasterMachineLine) {
        machine.selected = !machine.selected;
        this.notSelectedMachineList.find(m => m.id == machine.id).selected =
            machine.selected;
    }

    unselectOneMachine(machine: MasterMachineLine) {
        machine.selected = !machine.selected;
        this.selectedMachineList.find(m => m.id == machine.id).selected =
            machine.selected;
    }

    unselectBulk() {
        const selected = this.selectedMachineList.filter(m => m.selected);
        selected.forEach(m => {
            m.selected = false;
            this.notSelectedMachineList.push(m);
            const index = this.selectedMachineList.findIndex(
                o => o.id === m.id
            );
            this.selectedMachineList.splice(index, 1);
        });
        this.refreshData();
    }

    selectBulk() {
        const selected = this.notSelectedMachineList.filter(m => m.selected);
        selected.forEach(m => {
            m.selected = false;
            this.selectedMachineList.push(m);
            const index = this.notSelectedMachineList.findIndex(
                o => o.id === m.id
            );
            this.notSelectedMachineList.splice(index, 1);
        });
        this.refreshData();
    }

    selectMachine(index: number) {
        const machine = this.notSelectedMachineList[index];
        machine.selected = false;
        this.selectedMachineList.push(machine);
        this.notSelectedMachineList.splice(index, 1);
        this.refreshData();
    }

    unselectMachine(index: number) {
        const machine = this.selectedMachineList[index];
        machine.selected = false;
        this.notSelectedMachineList.push(machine);
        this.selectedMachineList.splice(index, 1);
        this.refreshData();
    }

    refreshData() {
        this.filteredNotSelectedMachineList =
            this.notSelectedMachineList.filter(m =>
                m.name
                    .toLowerCase()
                    .includes(this.notSelectedFormControl.value.toLowerCase())
            );
        this.filteredSelectedMachineList = this.selectedMachineList.filter(m =>
            m.name
                .toLowerCase()
                .includes(this.selectedFormControl.value.toLowerCase())
        );
    }

    initList() {
        this.notSelectedMachineList = this.machineList.filter(m => true);
        this.pureService.getLineList().subscribe(resp => {
            this.lineList = resp.data;
        });
        this.pureService.getMachineList().subscribe(resp => {
            this.machineList = resp.data;
            this.notSelectedMachineList = this.machineList.filter(m => true);
            this.refreshData();
        });
    }

    patchValue() {
        if (this.masterData) {
            this.formGroup.get('line_id').setValue(this.masterData.line_id);
            const machine_id = [];
            this.masterData.machines.forEach(m => {
                machine_id.push(m.machine_id);
                const machine = this.notSelectedMachineList.find(
                    o => o.id === m.machine_id
                );
                if (machine) {
                    machine.selected = true;
                }
            });
            this.selectBulk();
            this.formGroup.get('machine_id').setValue(machine_id);
        }
    }

    submit() {
        this.formGroup.markAllAsTouched();
        if (this.formGroup.valid) {
            const body = this.formGroup.value;

            const machine_id = [];
            this.selectedMachineList.forEach(m => {
                machine_id.push(m.id);
            });
            body.machine_id = machine_id;

            if (this.masterData) {
                this.edit(body);
            } else {
                this.create(body);
            }
        }
    }

    edit(body: registerMachineList) {
        this.finish();
        // const id = this.masterData.line_id;
        // this.registerService
        //     .updateMachineLine(id, body)
        //     .pipe(take(1))
        //     .subscribe({
        //         next: () => {
        //             this.finish();
        //         },
        //         error: () => {
        //             this.finish();
        //         },
        //     });
    }

    create(body: registerMachineList) {
        this.finish();
        // this.registerService
        //     .createMachineLine(body)
        //     .pipe(take(1))
        //     .subscribe({
        //         next: () => {
        //             this.finish();
        //         },
        //         error: () => {
        //             this.finish();
        //         },
        //     });
    }

    finish() {
        // this.onSubmit.emit();
        this.formGroup.reset();
        this.notSelectedMachineList = this.machineList.filter(m => true);
        this.selectedMachineList = [];
        // this.refreshData();
    }
}
