import { Component, OnInit } from '@angular/core';
import { MotelService } from "../motel.service";

@Component({
  selector: 'app-motels-list',
  templateUrl: './motels-list.component.html',
  styleUrls: ['./motels-list.component.css']
})
export class MotelsListComponent implements OnInit {

  constructor(private motelService: MotelService) {}

  motels = [];
  ngOnInit() {
    this.motelService.getMotels().subscribe(data => {
      console.log(data);
      this.motels = data;
    });
  }

}