import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../services/users.service';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
  private usersService = inject(UsersService);

  id: string | null = null;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  avatar: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.loadPosts();
  }

  loadPosts() {
    this.usersService.getUsers(null, this.id).subscribe({
      next: (users: any) => {
        this.firstName = users.data.first_name;
        this.lastName = users.data.last_name;
        this.email = users.data.email;
        this.avatar = users.data.avatar;
      },
      error: (error) => console.log('Error Fetching Users: ', error),
    });
  }
}
