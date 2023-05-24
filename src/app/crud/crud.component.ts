import { Component, OnInit } from '@angular/core';
import { CrudService } from './services/crud.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css'],
})
export class CrudComponent implements OnInit {
  products: any[] = [];
  constructor(
    private crudservice: CrudService,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {}

  producto: any; // Declaración de la propiedad producto

  ngOnInit(): void {
    this.getProductos();
    this.producto = {
      images: [
        { url: 'imagen1.jpg', currentSlide: 0 },
        { url: 'imagen2.jpg', currentSlide: 0 },
        { url: 'imagen3.jpg', currentSlide: 0 },
      ],
    };
  }

  getProductos() {
    this.crudservice.getProduct().subscribe((data) => {
      this.products = data.products;
      console.log(data.products);
    });
  }

  actualizarProducto(data: any) {}

  deleteProducto(id: any) {
    this.crudservice.deleteProduct(id).subscribe((res) => {
      this.getProductos();
      console.log(res);
    });
  }

  logout() {
    this.afAuth
      .signOut()
      .then(() => {
        // Cierre de sesión exitoso
        // Realiza las acciones adicionales que desees, como redirigir al usuario a la página de inicio de sesión
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        // Manejo de errores durante el cierre de sesión
        console.log(error);
      });
  }
  currentSlide: number = 0;
  prevSlide() {
    if (this.currentSlide === 0) {
      this.currentSlide = this.producto.images.length - 1;
    } else {
      this.currentSlide--;
    }
  }

  nextSlide() {
    if (this.currentSlide === this.producto.images.length - 1) {
      this.currentSlide = 0;
    } else {
      this.currentSlide++;
    }
  }
}
