import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MasterRobot } from "../../../../core/models/master.model";

@Component({
  selector: 'app-master-robot-detail',
  templateUrl: './master-robot-detail.component.html',
  styleUrls: ['./master-robot-detail.component.scss']
})
export class MasterRobotDetailComponent {

  @Input() masterData: MasterRobot;
  @Output() onFinished = new EventEmitter();

  back() {
      this.onFinished.emit();
  }
}
