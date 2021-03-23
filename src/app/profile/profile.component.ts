import { Component, OnInit } from "@angular/core";
import { UserSettingsService } from "./user-settings.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  _tableEntityName: any;

  constructor(private userSettingsService: UserSettingsService) {}

  ngOnInit() {}

  loadProfile(callback: any, eventData: any) {
    this.userSettingsService.getEntity(this._tableEntityName).subscribe(
      res => {
        const profileData = { name: "test" };
        callback(profileData, eventData);
      },
      err => {
        console.warn(err);
        callback({}, eventData);
      }
    );
  }
}
