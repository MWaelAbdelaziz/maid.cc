import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { UserData } from '../interfaces/user-detail';
import { NgIf, NgFor } from '@angular/common';
import { NgClass } from '@angular/common';
import { UserCardComponent } from '../user-card/user-card.component';

import { PaginationComponent } from '../pagination/components/pagination/pagination.component';
@Component({
  selector: 'app-content',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, PaginationComponent, UserCardComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css',
})
export class ContentComponent implements OnInit {
  private usersService = inject(UsersService);
  users: UserData[] = [];
  page: number = 1;
  total: number = 1;
  totalPages: number = 1;
  limit: number = 1;

  ngOnInit(): void {
    this.loadPosts();
  }

  changePage(page: number): void {
    this.page = page;
    this.loadPosts();
  }

  loadPosts() {
    this.usersService.getUsers(this.page, null).subscribe({
      next: (users: any) => {
        this.limit = users.per_page;
        this.users = users.data;
        this.total = users.per_page * users.total_pages;
        this.totalPages = users.total_pages;
      },
      error: (error) => console.log('Error Fetching Users: ', error),
    });
  }
}
