import { NgOptimizedImage } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css',
})
export class UserCardComponent {
  @Input() avatar?: string;
  @Input() firstName?: string;
  @Input() lastName?: string;
  @Input() id?: number;

  constructor(private router: Router) {}

  viewProfile(id: string) {
    this.router.navigate(['/user', id]);
  }
}
