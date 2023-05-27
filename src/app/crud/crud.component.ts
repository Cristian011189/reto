import { Component, OnInit } from '@angular/core';
import { CrudService } from './services/crud.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormGroup,
  FormBuilder,
  AbstractControl,
  Validators,
  NgForm,
} from '@angular/forms';
import { User as FirebaseUser } from 'firebase/auth';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css'],
})
export class CrudComponent implements OnInit {
  products: any[] = [];
  product: any = [];
  public productosFrom: FormGroup;
  user: FirebaseUser | null = null; // Update the user type
  photoURL: string | null = null;
  email: string | null = null;
  id: any = 0;
  searchTerm: string = '';
  searchResults: any[] = [];
  constructor(
    private crudservice: CrudService,
    private router: Router,
    private afAuth: AngularFireAuth,
    private modal: NgbModal,
    public formbuilder: FormBuilder
  ) {
    this.productosFrom = this.formbuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      discountPercentage: ['', [Validators.required]],
      stock: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      category: ['', [Validators.required]],
    });
  }
  searchPerformed: boolean = false;
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

    this.afAuth.authState.subscribe((user) => {
      this.user = user as FirebaseUser;
      if (user) {
        this.user = user as FirebaseUser;
        this.photoURL = user.photoURL;
        this.email = user.email;
      }
    });

    // Mostrar todos los productos al cargar la página
    this.searchProducts();
  }

  getProductos() {
    this.crudservice.getProduct().subscribe((data) => {
      this.products = data.products; // Asignar los productos a la variable products
      this.searchResults = this.products; // Asignar los productos a searchResults
      console.log(data.products);
    });
  }

  actualizarProducto(data: any) {
    this.crudservice.updateProduct(data, this.id).subscribe((res) => {
      console.log(res);
    });
  }

  deleteProducto(id: any) {
    this.crudservice.deleteProduct(id).subscribe((res) => {
      this.getProductos();
      console.log(res);
    });
  }
  createProducto(dato: any) {
    this.crudservice.createProduct(dato).subscribe((res) => {
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

  openSm(contenido: any) {
    this.productosFrom.reset();
    this.modal.open(contenido, { size: 'lg' });
  }

  generateUpdateForm(product: any) {
    this.id = product.id;
    this.productosFrom.controls['title'].setValue(product.title);
    this.productosFrom.controls['description'].setValue(product.description);
    this.productosFrom.controls['price'].setValue(product.price);
    this.productosFrom.controls['discountPercentage'].setValue(
      product.discountPercentage
    );
    this.productosFrom.controls['stock'].setValue(product.stock);
    this.productosFrom.controls['brand'].setValue(product.brand);
    this.productosFrom.controls['category'].setValue(product.category);
  }

  actualizarproduct(product: any, update: any) {
    this.product = product;
    this.generateUpdateForm(product);
    this.modal.open(update, { size: 'xl' });
  }

  searchProducts() {
    this.searchPerformed = true; // Establecer searchPerformed en true antes de la búsqueda

    if (this.searchTerm) {
      // Realizar la búsqueda por nombre o precio
      this.searchResults = this.products.filter(
        (product) =>
          product.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          product.price.toString().includes(this.searchTerm)
      );
    } else {
      // Mostrar todos los productos si el término de búsqueda está vacío
      this.searchResults = this.products;
    }
  }
}
