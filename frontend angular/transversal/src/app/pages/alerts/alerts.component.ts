import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AlertesService } from '../../services/alertes.service';

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './alerts.component.html'
})
export class AlertsComponent {
  private fb = inject(FormBuilder);
  private alertes = inject(AlertesService);

  // Formulaire de création d’alerte (adapte les champs à ton backend si besoin)
  form = this.fb.group({
    typeIncidentId: ['', Validators.required],
    description: ['', Validators.required],
    latitude: <number | null>(null),
    longitude: <number | null>(null),
    citoyenId: <string | null>(null),
    adresse: <string | null>(null),
  });

  loadingCreate = signal(false);
  loadingSend = signal(false);
  errorCreate = signal<string | null>(null);
  errorSend = signal<string | null>(null);

  // Feedbacks
  lastCreatedAlertId = signal<string | number | null>(null);
  lastCreateResponse = signal<any>(null);
  sendToPoliceId = '';
  sendToPoliceResponse = signal<any>(null);

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loadingCreate.set(true);
    this.errorCreate.set(null);
    this.lastCreatedAlertId.set(null);
    this.lastCreateResponse.set(null);

    const payload = this.form.value; // conforme à AlertesService.createAlert(payload)
    this.alertes.createAlert(payload).subscribe({
      next: (res: any) => {
        // essaie de récupérer l'id de la ressource créée si disponible
        const id = res?.id ?? res?.alertId ?? res?.data?.id ?? null;
        this.lastCreatedAlertId.set(id);
        this.lastCreateResponse.set(res);
        this.loadingCreate.set(false);
      },
      error: (e) => {
        this.errorCreate.set(e?.error?.message || 'Erreur lors de la création de l’alerte');
        this.loadingCreate.set(false);
      }
    });
  }

  sendToPolice() {
    if (!this.sendToPoliceId) {
      this.errorSend.set('Veuillez renseigner un ID d’alerte.');
      return;
    }
    this.loadingSend.set(true);
    this.errorSend.set(null);
    this.sendToPoliceResponse.set(null);

    this.alertes.sendToPolice(this.sendToPoliceId).subscribe({
      next: (res) => {
        this.sendToPoliceResponse.set(res);
        this.loadingSend.set(false);
      },
      error: (e) => {
        this.errorSend.set(e?.error?.message || 'Erreur lors de l’envoi à la police');
        this.loadingSend.set(false);
      }
    });
  }

  useMyLocation() {
    if (!('geolocation' in navigator)) {
      this.errorCreate.set('Géolocalisation non supportée par ce navigateur.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        this.form.patchValue({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      () => this.errorCreate.set('Impossible de récupérer la position GPS.')
    );
  }

  resetCreate() {
    this.form.reset();
    this.lastCreatedAlertId.set(null);
    this.lastCreateResponse.set(null);
    this.errorCreate.set(null);
  }
}
