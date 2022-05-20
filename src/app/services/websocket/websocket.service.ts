import { Injectable, EventEmitter, Output } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket: Socket | undefined;
  connectionOptions =  {
    "force new connection" : true,
    "reconnectionAttempts": "Infinity", 
    "timeout" : 10000,                  
    "transports" : ["websocket"]
  };

  constructor(private toastr: ToastrService) { 
    this.socket = io('http://localhost:3000', {              
      "transports" : ["websocket"]
    });
    this.socket.on('pago', (msg: string) => {
      this.toastr.info('El cliente ' + msg +' ha realizado un pago','Moneeeeeyyy!!!!');
    });
  }

  
}
