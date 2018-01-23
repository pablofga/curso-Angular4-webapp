import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

// Componentes
import { HomeComponent } from './components/home.component';
import { ErrorComponent } from './components/error.component';
import { ProductosListComponent } from './components/productos-list.component';
import { ProductoAddComponent } from './components/producto-add.component';
import { ImageAddComponent } from './components/image-add.component';

const appRoutes: Routes = [
{path: '', component: HomeComponent}, // ruta home
{path: 'home', component: HomeComponent},
{path: 'productos', component: ProductosListComponent},
{path: 'crear-producto', component: ProductoAddComponent},
{path: 'crear-imagen', component: ImageAddComponent},
{path: '**', component: ErrorComponent} // ruta cuando se produzca error
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);