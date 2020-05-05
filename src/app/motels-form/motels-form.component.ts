import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { MotelService } from "../motel.service";

@Component({
  selector: "app-motels-form",
  templateUrl: "./motels-form.component.html",
  styleUrls: ["./motels-form.component.css"]
})
export class MotelsFormComponent implements OnInit {
  motelForm = new FormGroup({
    id: new FormControl(null),
    name: new FormControl("", [Validators.required, Validators.minLength(4)]),
    owner: new FormControl("", [Validators.required, Validators.minLength(6)]),
    image: new FormControl("", [
      Validators.required,
      Validators.pattern(/\.(gif|jpe?g|tiff|png|webp|bmp)s/i)
    ]),
    address: new FormControl("", [
      Validators.required,
      Validators.minLength(7)
    ]),
    room_number: new FormControl(null, [Validators.required])
  });
  get name() {
    return this.motelForm.get("name");
  }
  get owner() {
    return this.motelForm.get("owner");
  }
  get image() {
    return this.motelForm.get("image");
  }
  get address() {
    return this.motelForm.get("address");
  }
  get room_number() {
    return this.motelForm.get("room_number");
  }

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
