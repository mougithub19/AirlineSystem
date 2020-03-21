import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DevicesViewComponent } from './views/devices/devices.component';

 
@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpClientModule  ],
  declarations: [ AppComponent, DevicesViewComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
