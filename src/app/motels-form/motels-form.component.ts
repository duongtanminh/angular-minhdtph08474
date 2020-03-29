import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { MotelService } from "../motel.service";

@Component({
  selector: 'app-motels-form',
  templateUrl: './motels-form.component.html',
  styleUrls: ['./motels-form.component.css']
})
export class MotelsFormComponent implements OnInit {

  motelForm = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(""),
    owner: new FormControl(""),
    image: new FormControl(""),
    address: new FormControl(""),
    room_number: new FormControl(null)
  });

  constructor(
    private MotelService: MotelService,
    private activeRoute: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit() {
    this.activeRoute.paramMap.subscribe(params => {
      let motelId = params.get("motelId");

      this.MotelService.getMotelById(motelId).subscribe(data => {
        this.motelForm.setValue(data);
      });
    });
  }
  save() {
    if (this.motelForm.value.id == null) {
      //thêm mới
      this.MotelService.addNewMotel(this.motelForm.value).subscribe(data => {
        this.route.navigate([""]);
      });
    } else {
      //cập nhật
      this.MotelService.updateMotel(this.motelForm.value).subscribe(data => {
        let mtId = this.motelForm.value.id;
        this.route.navigate(["/detail", mtId]);
      });
    }
  }

}