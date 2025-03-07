import { UserSchema } from '@/lib/schemas/userSchema';

describe('User Schema Validation', () => {
  const baseUser = {
    username: 'johndoe',
    email: 'john@example.com',
    password: 'senhasegura'
  };

  // Teste de objeto válido
  test('Deve validar um usuário correto', () => {
    const user = { ...baseUser };
    const result = UserSchema.safeParse(user);
    expect(result.success).toBe(true);
  });

  // Testes para username
  describe('Validação de username', () => {
    test.each([
      ['muito curto', 'ab'],          // 2 caracteres
      ['muito longo', 'a'.repeat(31)], // 31 caracteres
      ['com espaços', 'john doe'],     // espaço no meio
      ['com maiúsculas', 'JohnDoe']    // letras maiúsculas
    ])('Deve falhar para username %s', (_, username) => {
      const user = { ...baseUser, username };
      const result = UserSchema.safeParse(user);
      expect(result.success).toBe(false);
    });

    test('Deve passar para username válido', () => {
      const validUsernames = ['johndoe', 'john123', 'john_doe'];
      validUsernames.forEach(username => {
        const user = { ...baseUser, username };
        expect(() => UserSchema.parse(user)).not.toThrow();
      });
    });
  });

  // Testes para campos automáticos
  describe('Campos automáticos', () => {
    test('Deve gerar timestamps automaticamente', () => {
      const user = { ...baseUser };
      const parsed = UserSchema.parse(user);
      
      expect(parsed.createdAt).toBeInstanceOf(Date);
      expect(parsed.updatedAt).toBeInstanceOf(Date);
      expect(parsed.createdAt.getTime()).toBeCloseTo(Date.now(), -3);
    });

    test('Deve usar updatedAt fornecido manualmente', () => {
      const customDate = new Date('2023-01-01');
      const user = UserSchema.parse({
        ...baseUser,
        updatedAt: customDate
      });
      
      expect(user.updatedAt).toEqual(customDate);
    });
  });

  // Teste de mensagem de erro customizada
  test('Deve retornar mensagens de erro específicas', () => {
    const invalidUsers = [
      {
        input: { ...baseUser, username: 'john doe' },
        errorMessage: '🚫 Nome de usuário não pode conter espaços'
      },
      {
        input: { ...baseUser, username: 'JohnDoe' },
        errorMessage: 'Nome de usuário deve ser em minúsculas'
      }
    ];

    invalidUsers.forEach(({ input, errorMessage }) => {
      const result = UserSchema.safeParse(input);
      expect(result.error.issues[0].message).toBe(errorMessage);
    });
  });
});