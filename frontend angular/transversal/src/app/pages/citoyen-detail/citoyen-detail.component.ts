// src/app/pages/citoyen-detail/citoyen-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CitoyensService } from '../../services/citoyens.service';
import { Citoyen } from '../../models/citoyen';

@Component({
  selector: 'app-citoyen-detail',
  templateUrl: './citoyen-detail.component.html'
})
export class CitoyenDetailComponent implements OnInit {
  citoyen?: Citoyen;
  error = '';
  loading = false;

  constructor(private route: ActivatedRoute, private citoyensService: CitoyensService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.loading = true;
    this.citoyensService.getById(id).subscribe({
      next: (c) => { this.citoyen = c; this.loading = false; },
      error: () => { this.error = 'Introuvable'; this.loading = false; }
    });
  }
}
