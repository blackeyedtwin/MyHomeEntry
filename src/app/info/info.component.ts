import { Component, OnInit, Input } from '@angular/core';
import query from 'jquery';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  @Input() id : string;
  user: object;
  streamer: string;
  submitted: boolean = false;
  onlineStatus: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  setStreamer(event: any) {
      this.streamer = event.target.value;
      console.log(this.streamer)
  }

  async getTwitchJson(strimmer: string) {
    let promise = query.getJSON('https://api.twitch.tv/kraken/streams/'+ strimmer + '?client_id=9h0afpbnqqfbg7e7x6fe37dbzig6tu');

    let online;
    await promise.done(function(channel){

      if (channel["stream"] === null) { 
          online = false;
      } else {
          online = true;
      }
      console.log("Hits the print");
      return online;
    });
    console.log("OUTPUT of online: " + online);
    this.onlineStatus = online;
  }

  updateTwitchStreamer(strimmer: string)
  {
    this.streamer = strimmer;
  }

  selectTwitch() {
    if (this.streamer === undefined)
    {
      return
    }
    let online;
    let strimmer = this.streamer
    
    
    online = this.getTwitchJson(strimmer);

    console.log(online)
    this.onlineStatus = online;
    console.log("Selected Twitch: ");
    this.submitted = true;
  }


  
  
  


  selectStock() {
    /*
    query.getJSON("http://finance.google.com/finance/info?client=ig&q=NASDAQ%3AGOOG"),function(json){
      console.log(json);
    }

    console.log("Selected Stock!!");*/
  }
}
