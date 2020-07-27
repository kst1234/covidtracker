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
  private globalDataUrl='https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/07-11-2020.csv'; 
  private globalData='https://api.covid19india.org/data.json';
  
  constructor(private http : HttpClient) { }
  getcomments() : Observable<any>{    
    return this.http.get(this.globalData);
  }
  public getGlobalData(){
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
