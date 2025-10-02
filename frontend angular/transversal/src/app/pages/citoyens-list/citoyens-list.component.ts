import { Component, OnInit } from '@angular/core';
import { CitoyensService } from '../../services/citoyens.service';
import { Citoyen } from '../../models/citoyen';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-citoyens-list',
  templateUrl: './citoyens-list.component.html',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],})
export class CitoyensListComponent implements OnInit {
  citoyens: Citoyen[] = [];
  loading = false;
  error = '';

  constructor(private citoyensService: CitoyensService) {}

  ngOnInit(): void {
    this.loading = true;
    this.citoyensService.list().subscribe({
      next: (data) => { this.citoyens = data; this.loading = false; },
      error: (e) => { this.error = 'Erreur de chargement'; this.loading = false; }
    });
  }
}
