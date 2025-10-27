import { Routes } from '@angular/router';
import { ProductoComponent } from './components/producto/producto';
import { CategoriaComponent } from './components/categoria/categoria';


export const routes: Routes = [
  {path:'producto',component:ProductoComponent},
  {path:'categoria',component:CategoriaComponent},
  {path:'',redirectTo:'/producto', pathMatch:'full'}
];
