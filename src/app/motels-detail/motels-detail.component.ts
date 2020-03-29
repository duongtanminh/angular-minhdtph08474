import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { MotelService } from "../motel.service";
import { Observable } from "rxjs";

@Component({
  selector: 'app-motels-detail',
  templateUrl: './motels-detail.component.html',
  styleUrls: ['./motels-detail.component.css']
})
export class MotelsDetailComponent implements OnInit {

  motelData = null;
  constructor(
    private motelService: MotelService,
    private activeRoute: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit() {
    this.activeRoute.paramMap.subscribe(params => {
      let motelId = params.get("motelId");
      this.motelService.getMotelById(motelId).subscribe(data => {
        console.log(data);
        this.motelData = data;
      });
    });
  }
  remove() {
    let conf = confirm("Bạn có chắc chắn xóa nhà trọ này ?");
    if (conf) {
      this.motelService
        .removeMotelById(this.motelData.id)
        .subscribe(data => {
          this.route.navigate([""]);
        });
    }
  }

}