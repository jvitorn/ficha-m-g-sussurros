import { NextResponse } from 'next/server';
import { UserService } from '../business/userService';

export class UserAuthenticateController {
  constructor() {
    this.userService = new UserService(); // Instância do UserService
  }

  async auth(req) {
    try {
      const { username, password } = await req.json();
      
      if (!username || !password) {
        return NextResponse.json(
          { error: 'Credenciais inválidas' },
          { status: 400 }
        );
      }

      const token = await this.userService.authenticate(username, password);
      return NextResponse.json(token);

    } catch (error) {
      console.error('Erro na autenticação:', error);
      return NextResponse.json(
        { error: error.message || 'Erro interno no servidor' },
        { status: error.status || 500 }
      );
    }
  }

}