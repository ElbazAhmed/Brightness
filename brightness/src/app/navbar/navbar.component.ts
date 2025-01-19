import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  themeToggleDarkIcon!: HTMLElement | null;
  themeToggleLightIcon!: HTMLElement | null;
  themeToggleBtn!: HTMLElement | null;

  
  ngOnInit(): void {
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
}
