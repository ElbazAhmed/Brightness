import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { NavbarComponent } from './navbar/navbar.component';
import { ApiService } from './api.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, HttpClientModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService]
})
export class AppComponent {
  title = 'brightness';
  themeToggleDarkIcon!: HTMLElement | null;
  themeToggleLightIcon!: HTMLElement | null;
  themeToggleBtn!: HTMLElement | null;

  buildings: any[] = [];
  newBuildingName: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    initFlowbite();
    this.fetchBuildings();
    this.themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    this.themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
    this.themeToggleBtn = document.getElementById('theme-toggle');

    // Ensure the elements are available before using them
    if (!this.themeToggleDarkIcon || !this.themeToggleLightIcon || !this.themeToggleBtn) {
      console.error('One or more DOM elements are missing.');
      return;
    }

    // Change the icons inside the button based on previous settings
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      this.themeToggleLightIcon.classList.remove('hidden');
    } else {
      this.themeToggleDarkIcon.classList.remove('hidden');
    }

    this.themeToggleBtn.addEventListener('click', () => {
      // Toggle icons inside button
      this.themeToggleDarkIcon!.classList.toggle('hidden');
      this.themeToggleLightIcon!.classList.toggle('hidden');

      // If set via local storage previously
      if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
          document.documentElement.classList.add('dark');
          localStorage.setItem('color-theme', 'dark');
        } else {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('color-theme', 'light');
        }
      } else {
        // If NOT set via local storage previously
        if (document.documentElement.classList.contains('dark')) {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('color-theme', 'light');
        } else {
          document.documentElement.classList.add('dark');
          localStorage.setItem('color-theme', 'dark');
        }
      }
    });
  }

  fetchBuildings() {
    this.apiService.getBuildings().subscribe(
      (data) => {
        console.log('Buildings fetched:', data); // Debugging
        this.buildings = data; // Ensure this line correctly updates the array
      },
      (error) => {
        console.error('Error fetching buildings:', error);
      }
    );
  }

  addBuilding() {
    if (this.newBuildingName.trim()) {
      this.apiService.addBuilding(this.newBuildingName).subscribe(() => {
        this.newBuildingName = ''; // Clear the input field
        this.fetchBuildings(); // Refresh the buildings list
      });
    }
  }

  
}
