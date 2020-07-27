import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap,map} from 'rxjs/operators';
import {GlobalDataSummary} from '../models/global-data';
import {Comments} from '../models/comments';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
private date:Date =new Date();
private d1=new Date(this.date.setDate(this.date.getDate()-2));
private dd=this.d1.getMonth()+1;
  private globalDataUrl='https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/'+this.dd+'-'+this.d1.getDate()+'-'+this.d1.getFullYear()+'.csv'; 
  private globalData='https://api.covid19india.org/data.json';
  
  constructor(private http : HttpClient) { }
  getcomments() : Observable<any>{    
    return this.http.get(this.globalData);
  }
  public getGlobalData(){
    if(this.dd<10){
      if(this.d1.getDate()>9)
    this.globalDataUrl='https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/0'+this.dd+'-'+this.d1.getDate()+'-'+this.d1.getFullYear()+'.csv';
    else{
      this.globalDataUrl='https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/0'+this.dd+'-0'+this.d1.getDate()+'-'+this.d1.getFullYear()+'.csv'
    }
  }
  else if(this.d1.getDate()<10)
  this.globalDataUrl='https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/'+this.dd+'-0'+this.d1.getDate()+'-'+this.d1.getFullYear()+'.csv'
       
       return this.http.get(this.globalDataUrl,{responseType: 'text'}).pipe(
      map(result =>{        
        let data:GlobalDataSummary[]=[];
        let raw={}
        let rows=result.split('\n');
        rows.splice(0,1);        
        rows.forEach(row=>{
          let cols=row.split(/,(?=\S)/)
          
          let cs= {
            country : cols[3],
            confirmed : +cols[7],
            deaths : +cols[8],
            recovered : +cols[9],
            active : +cols[10]
          };
          let temp : GlobalDataSummary=raw[cs.country];
          if(temp){
            temp.active=cs.active + temp.active
            temp.confirmed=cs.confirmed + temp.confirmed
            temp.recovered=cs.recovered + temp.recovered
            temp.deaths=cs.deaths + temp.deaths
            raw[cs.country]=temp;
          }
          else{
            raw[cs.country]=cs;
          }
       })
        
        return <GlobalDataSummary[]>Object.values(raw);
      })
    )
  }

}