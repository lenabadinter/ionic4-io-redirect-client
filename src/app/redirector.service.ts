import { Injectable, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RedirectorService implements OnInit {

  constructor(private socket: Socket) { }

  ngOnInit() {
    this.socket.connect();
  }

  sendMessage(data: any, callback: any) {
    this.socket.emit('NotifyServer', data, callback);
  }

  getMessage() {
      return this.socket
          .fromEvent('NotifyClient')
          .pipe( map( (data: any) => data ));
  }
}
