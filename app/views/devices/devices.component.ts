import { Component, ElementRef, ViewChild } from '@angular/core';
import { Device } from '../../model/device';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';


const INITIAL_STATE = { label: null, os: null };

@Component({
  selector: 'devices-view',
  templateUrl: './devices.component.html',
  styleUrls: [ './devices.component.css' ]
  
})
export class DevicesViewComponent {
  devices: Device[] = [];
  active: Device;
  

  baseUrl = 'https://server-gubzsieuew.now.sh';
  //baseUrl = 'https://files-ojakghlutp.now.sh';

  constructor(private http: HttpClient) {
    // console.log ('environment:', env);
    this.getAll();
  }

  getAll() {
    this.http.get<Device[]>(`${this.baseUrl}/devices`)
      .subscribe(result => this.devices = result)
  }

  setActiveHandler(device: Device) {
    console.log( device )
    this.active = Object.assign({}, device);
  }

  save(form: NgForm) {
    if (this.active.id) {
      this.edit(form.value);
    } else {
      this.add(form.value);
      form.reset();
    }
  }

  add(device: Device) {
    this.http.post<Device>(`${this.baseUrl}/devices`, device)
      .subscribe(res => {
        this.devices.push(res)
        this.reset();
      })
  }

  edit(device: Device) {
    const newDevice = Object.assign(
      {},
      this.active,
      device
    );

    this.http.patch<Device>(`${this.baseUrl}/devices/${newDevice.id}`, newDevice )
      .subscribe(
        res => {
          const index = this.devices.findIndex(d => d.id === newDevice.id) ;
          this.devices[index] = newDevice;
        }
      )
  }

  delete(device: Device) {
    this.http.delete<any>(`${this.baseUrl}/devices/${device.id}`)
      .subscribe(
        () => {
          const index = this.devices.indexOf(device)
          this.devices.splice(index, 1);
          this.reset();
        }
      )
  }

  reset() {
    //this.active = INITIAL_STATE;
  }
  
  
}
