import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DialogModule } from './dialog/dialog.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, DialogModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
