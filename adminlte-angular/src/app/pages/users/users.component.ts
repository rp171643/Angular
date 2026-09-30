import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface UserItem {
  id: number;
  name: string;
  email: string;
  role: 'Administrator' | 'Editor' | 'Author' | 'Subscriber';
  roleBadgeClass: string;
  status: 'Active' | 'Pending';
  created: string;
  avatar: string;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './users.component.html'
})
export class UsersComponent {
  searchQuery = signal<string>('');
  selectedRole = signal<string>('all');

  users = signal<UserItem[]>([
    {
      id: 1,
      name: 'Alexander Pierce',
      email: 'alexander.pierce@example.com',
      role: 'Administrator',
      roleBadgeClass: 'text-bg-danger',
      status: 'Active',
      created: 'Mar 12, 2025',
      avatar: '/assets/img/user1-128x128.jpg'
    },
    {
      id: 2,
      name: 'Sarah Bullock',
      email: 'sarah.bullock@example.com',
      role: 'Editor',
      roleBadgeClass: 'text-bg-primary',
      status: 'Active',
      created: 'Apr 3, 2025',
      avatar: '/assets/img/user3-128x128.jpg'
    },
    {
      id: 3,
      name: 'Daniel Cooper',
      email: 'daniel.cooper@example.com',
      role: 'Author',
      roleBadgeClass: 'text-bg-info',
      status: 'Pending',
      created: 'Apr 28, 2025',
      avatar: '/assets/img/user6-128x128.jpg'
    },
    {
      id: 4,
      name: 'Nora Vans',
      email: 'nora.vans@example.com',
      role: 'Editor',
      roleBadgeClass: 'text-bg-primary',
      status: 'Active',
      created: 'May 9, 2025',
      avatar: '/assets/img/user4-128x128.jpg'
    },
    {
      id: 5,
      name: 'Jane Holland',
      email: 'jane.holland@example.com',
      role: 'Subscriber',
      roleBadgeClass: 'text-bg-secondary',
      status: 'Active',
      created: 'May 21, 2025',
      avatar: '/assets/img/user7-128x128.jpg'
    },
    {
      id: 6,
      name: 'John Pierce',
      email: 'john.pierce@example.com',
      role: 'Subscriber',
      roleBadgeClass: 'text-bg-secondary',
      status: 'Pending',
      created: 'Jun 14, 2025',
      avatar: '/assets/img/user8-128x128.jpg'
    }
  ]);

  filteredUsers = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    const role = this.selectedRole();

    return this.users().filter(u => {
      const matchRole = role === 'all' || u.role === role;
      const matchQuery = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
      return matchRole && matchQuery;
    });
  });

  openAddModal(): void {
    const name = prompt('Enter new user full name:');
    if (!name) return;
    const email = prompt('Enter email address:') || 'user@example.com';
    this.users.update(list => [
      {
        id: Date.now(),
        name,
        email,
        role: 'Subscriber',
        roleBadgeClass: 'text-bg-secondary',
        status: 'Active',
        created: 'Just now',
        avatar: '/assets/img/user2-160x160.jpg'
      },
      ...list
    ]);
  }

  editUser(user: UserItem): void {
    const newName = prompt('Edit user name:', user.name);
    if (newName) {
      this.users.update(list => list.map(u => u.id === user.id ? { ...u, name: newName } : u));
    }
  }

  deleteUser(user: UserItem): void {
    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
      this.users.update(list => list.filter(u => u.id !== user.id));
    }
  }
}

