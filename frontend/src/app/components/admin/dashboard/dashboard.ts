import { Component, OnInit, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-admin-dashboard',
  imports: [DecimalPipe, MatCardModule, MatProgressSpinnerModule, MatIconModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class AdminDashboard implements OnInit {
  private readonly api = inject(ApiService);

  stats: any = null;
  loading = true;
  error = '';

  ngOnInit(): void {
    this.api.getAdminStats().subscribe({
      next: (data) => {
        this.stats = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar las estadísticas.';
        this.loading = false;
      }
    });
  }
}
