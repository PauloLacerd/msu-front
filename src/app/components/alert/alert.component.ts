import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  @Input()
  typeAlert: 'danger'|'warning'|'primary'|String = "";

  @Input()
  errorMessage: String = "";

  constructor() { }

  ngOnInit(): void {
  }

}
