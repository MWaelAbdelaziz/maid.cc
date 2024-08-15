import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { UserDetail } from '../interfaces/user-detail';
import { UserData } from '../interfaces/user-detail';
import { NgIf, NgFor, NgOptimizedImage } from '@angular/common';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-content',
  standalone: true,
  imports: [NgOptimizedImage, NgFor, NgIf, NgClass],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css',
})
export class ContentComponent implements OnInit {
  private usersService = inject(UsersService);
  users: UserData[] = [];
  page: number = 1;
  showingTo?: number;
  total?: number;
  totalPages?: number;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadPosts();
  }
  next(): void {
    this.page++;
    this.loadPosts();
  }

  back(): void {
    if (this.page > 0) {
      this.page--;
    }
    this.loadPosts();
  }

  navigateToPage(): void {
    this.router.navigate(['user-page'], {
      state: { data: 'hi' },
    });
  }

  changePage(page: number): void {
    this.page = page;
    this.loadPosts();
  }

  loadPosts() {
    this.usersService.getUsers(this.page).subscribe({
      next: (users: any) => {
        this.users = users.data;
        this.showingTo = users.per_page;
        this.total = users.per_page * users.total_pages;
        this.totalPages = users.total_pages;
      },
      error: (error) => console.log('Error Fetching Users: ', error),
    });
  }
}
