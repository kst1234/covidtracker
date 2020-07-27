import { Component, OnInit } from '@angular/core';
import { Comments } from 'src/app/models/comments'
import {Cmmnts} from 'src/app/models/cmmnts'
import { DataServiceService } from 'src/app/services/data-service.service'
@Component({
  selector: 'app-india',
  templateUrl: './india.component.html',
  styleUrls: ['./india.component.css']
})
export class IndiaComponent implements OnInit {

  constructor(private dataService : DataServiceService) { }
  dd:Comments;
  cases:Number;
  cc:string;
  newcases:string;
  date:string;
  totalrecovered:string;
  daily:string;
  ngOnInit(): void {
    this.dataService.getcomments()
    .subscribe({
      next : data=>{
        //this.lst=data;
        this.dd=data;
      this.cc=(this.dd.cases_time_series[this.dd.cases_time_series.length-1].totalconfirmed);
      this.newcases=(this.dd.cases_time_series[this.dd.cases_time_series.length-1].dailyconfirmed);
      this.date=(this.dd.cases_time_series[this.dd.cases_time_series.length-1].date);
      this.totalrecovered=(this.dd.cases_time_series[this.dd.cases_time_series.length-1].totalrecovered);
      this.daily=(this.dd.cases_time_series[this.dd.cases_time_series.length-1].dailyrecovered);
      console.log(this.cc);
      
      }
    })
  }

}
