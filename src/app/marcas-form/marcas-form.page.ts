import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { subscribeOn } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { marcasI } from '../models/marcas.interface';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@Component({
  selector: 'app-marcas-form',
  templateUrl: './marcas-form.page.html',
  styleUrls: ['./marcas-form.page.scss'],
})
export class MarcasFormPage implements OnInit {

  nuevoMarca: FormGroup;
  nombre_marcaClicked: boolean = false;
  marcas: any = []
  currentPage: number = 1;
  pageSize: number = 10; // Tamaño de la página
  marcaSeleccionada: any;

  constructor(private api: AuthService, private fb: FormBuilder,private router: Router,) { 
    this.nuevoMarca = this.fb.group({
      // define your form controls here
      nombre_marca: ['', Validators.required]
    });
   
  }

  ngOnInit(): void{
    this.getMarcas()
  }


  getMarcas(){
    this.api.getAllMarcas().subscribe(data => {
      this.marcas = data;
    })
  }


  insertMarca(marca: marcasI) {
    this.api.insertMarca(marca).subscribe(() => {
      console.log('Marca insertada correctamente');
      
      this.getMarcas()
    }, (error) => {
      console.error('Error al insertar la marca:', error);
      
    });
  }


  desactivarMarca(marca: marcasI) {
    // Crear un nuevo objeto marca con el cambio en estado_rg
    const marcaActualizada: marcasI = {
      ...marca, // Copia todos los atributos de la marca original
      estado_rg: 0 // Cambia el estado_rg al valor deseado
    };
  
    // Llamar a la API con la marca actualizada
    this.api.deleteMarca(marcaActualizada).subscribe(() => {
      console.log('Marca eliminada correctamente');
    
      this.getMarcas(); // Actualizar la lista de marcas después de eliminar
    }, (error) => {
      console.error('Error al eliminar la marca:', error);
    });
  }


  activarMarca(marca: marcasI) {
    // Crear un nuevo objeto marca con el cambio en estado_rg
    const marcaActualizada: marcasI = {
      ...marca, // Copia todos los atributos de la marca original
      estado_rg: 1 // Cambia el estado_rg al valor deseado
    };
  
    // Llamar a la API con la marca actualizada
    this.api.deleteMarca(marcaActualizada).subscribe(() => {
      console.log('Marca eliminada correctamente');
      
      this.getMarcas(); // Actualizar la lista de marcas después de eliminar
    }, (error) => {
      console.error('Error al eliminar la marca:', error);
      
    });
  }


  getCurrentRowNumber(index: number): number {
    return (this.currentPage - 1) * this.pageSize + index + 1;
  }
  salir() {
    this.router.navigate(['home'])
  }
  validateNombre_marca() {
    if (!this.nombre_marcaClicked) {
      return false
    }
    const nombre_marcaControl = this.nuevoMarca.get('nombre_marca');
    if (nombre_marcaControl?.errors && nombre_marcaControl?.value.length == 0) {
      return 'El nombre de la marca es requerido';
    } else if (nombre_marcaControl?.value.length < 3) {
      return 'Al menos 3 caracteres';
    }
    return null;
  }
  onNombre_marcaClicked() {
    this.nombre_marcaClicked = true; // Marcar como true cuando se hace clic en el campo
  }
  getCurrentPageItems(): marcasI[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.marcas.slice(startIndex, endIndex);
  }
  getPages(): number[] {
    const totalPages = this.getTotalPages();
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }
  goToPage(page: number) {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
    }
  }

  nextPage() {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  getTotalPages(): number {
    return Math.ceil(this.marcas.length / this.pageSize);
  }
  isFormValid(): boolean {
    return this.nuevoMarca.valid; // Retorna true si el formulario es válido, de lo contrario retorna false
  }
  

 







}
