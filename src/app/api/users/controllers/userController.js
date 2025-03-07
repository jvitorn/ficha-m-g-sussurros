import { NextResponse } from 'next/server';
import { UserService } from '../business/userService';

export class UserController {
  constructor() {
    this.userService = new UserService(); // Instância do UserService
  }

  // Lista todos os usuários
  async listUsers() {
    try {
      const users = await this.userService.listUsers();
      return NextResponse.json(users);
    } catch (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
  }

}