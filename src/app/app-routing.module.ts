import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component'
import { CountriesComponent } from './components/countries/countries.component'
import {IndiaComponent} from './components/india/india.component'
import {StateComponent} from './components/state/state.component'
const routes: Routes = [
  {path : '',component:HomeComponent},
  {path : 'countries' ,component : CountriesComponent},
  {path : 'india',component : IndiaComponent},
  {path : 'state',component:StateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
