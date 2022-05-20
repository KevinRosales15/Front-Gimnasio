import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';

@Component({
  selector: 'app-websocket',
  templateUrl: './websocket.component.html',
  styleUrls: ['./websocket.component.css']
})
export class WebsocketComponent implements OnInit {
  
  constructor( private WebSocketService: WebsocketService) {
    
  }

  ngOnInit(): void {
    
    
  }

}
