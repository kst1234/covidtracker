import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { Comments } from 'src/app/models/comments';
import { Stat } from 'src/app/models/stat';
@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {

  constructor(private service : DataServiceService) { }
  dd:Comments;
  hh:Stat[];
  i:number;
  state:string[]=[];
  active:string="0";
  confirmed:string="0";
  deaths:string="0";
  ngOnInit(): void {
    this.service.getcomments().subscribe(result=>{
      this.dd=result;
      for(this.i=0;this.i<this.dd.statewise.length;this.i++){
        if(this.dd.statewise[this.i].state!="Total")
        this.state.push(this.dd.statewise[this.i].state);
      }
      console.log(this.state);
      
    }
      )
  }
  updatValues(stat : string){
    for(this.i=0;this.i<this.dd.statewise.length;this.i++){
      if(this.dd.statewise[this.i].state==stat){
        this.active=this.dd.statewise[this.i].active;
        this.confirmed=this.dd.statewise[this.i].confirmed;
        this.deaths=this.dd.statewise[this.i].deaths;
      }
    }
    
  }

}
