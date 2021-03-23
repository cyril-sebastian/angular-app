import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FilterComponent } from './filter/filter.component';
import { ParagraphComponent } from './paragraph/paragraph.component';
import { MinutesToHoursPipe } from './pipe/minutes-to-hours.pipe';
import { ProfileComponent } from './profile/profile.component';
import { SubscribeMeComponent } from './subscribe-me/subscribe-me.component';

@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    FilterComponent,
    ParagraphComponent,
    MinutesToHoursPipe,
    ProfileComponent,
    SubscribeMeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
