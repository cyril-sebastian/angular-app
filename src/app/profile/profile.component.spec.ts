// jasmine spy example

import { TestBed, ComponentFixture } from "@angular/core/testing";
// https://angular.io/api/platform-browser/By
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { ProfileComponent } from "./profile.component";
import { UserSettingsService } from "./user-settings.service";

describe("ProfileComponent", () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      providers: [UserSettingsService]
    });

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });
});
