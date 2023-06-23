import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'reto';

  constructor(private router: Router, private afAuth: AngularFireAuth) {}
  ngOnInit(): void {
    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        // Usuario logeado
        // this.router.navigate(['/crud']); // Redirige a la página de CRUD
      } else {
        // Usuario no logeado
        this.router.navigate(['/login']); // Redirige a la página de inicio de sesión
      }
    });
  }
}
