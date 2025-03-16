import { config } from "dotenv";
config({ path: ".env.local" });
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";
import { ClassSchema } from "../src/lib/schemas/classSchema.js";
import { SubclassSchema } from "../src/lib/schemas/subclassSchema.js";
import { LevelSchema } from "../src/lib/schemas/levelSchema.js";
import { RaceSchema } from "../src/lib/schemas/raceSchema.js";
import { SpellSchema } from "../src/lib/schemas/spellSchema.js";
import { UserSchema } from "../src/lib/schemas/userSchema.js";

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.MONGODB_DBNAME;

// Configuração das collections
const COLLECTIONS = {
  CLASSES: "classes",
  SUBCLASSES: "subclasses",
  LEVELS: "levels",
  RACES: "races",
  SPELLS: "spells",
  USERS: "users",
};

// Função de validação
const validateWithSchema = (data, schema) => {
  const result = schema.safeParse(data);
  if (!result.success) {
    console.error("Erro de validação:", {
      errors: result.error.issues,
      data: JSON.parse(JSON.stringify(data)),
    });
    throw new Error("Dados inválidos");
  }
  return data;
};

// Função para limpar collections
const cleanDatabase = async (db) => {
  console.log("🧼 Iniciando limpeza do banco...");
  await Promise.all(
    Object.values(COLLECTIONS).map(async (col) => {
      await db.collection(col).deleteMany({});
      console.log(`🗑️  ${col} limpa`);
    })
  );
};

// Dados para seed
const seedData = {
  [COLLECTIONS.USERS]: [
    {
      username: "gamemaster",
      password: "Gmaster1234",
      email: "gamemaster@gmail.com",
      role: "gm",
    },
    {
      username: "playercomum",
      password: "Player1234",
      email: "player@gmail.com",
      role: "player",
    },
  ],
  [COLLECTIONS.CLASSES]: [
    {
      name: "Mago",
      description: "Usuário de magia arcana",
      advantages: ["Dano mágico elevado", "Versatilidade"],
      disadvantages: ["Defesa baixa", "Dependência de mana"],
      receipt: [
        {
          name: "HP",
          structure: "10 + (CM x 2) + Nivel x 6",
          atributes: ["CM"],
          useLevel: true,
        },
        {
          name: "MP",
          structure: "(Nivel x 3) + (POM x 2) + (CG x 2)",
          atributes: ["POM", "CG"],
          useLevel: true,
        },
        {
          name: "DEF",
          structure: "CM / 3",
          atributes: ["CM"],
          useLevel: false,
        },
      ],
    },
    {
      name: "Guerreiro",
      description: "Especialista em combate físico",
      advantages: ["Alta defesa", "Dano consistente"],
      disadvantages: ["Alcance curto", "Dependência de equipamento"],
      receipt: [
        {
          name: "HP",
          structure: "20 + (CM x 3) + Nivel x 4",
          atributes: ["CM"],
          useLevel: true,
        },
        {
          name: "DEF",
          structure: "(AGI / 2) + (CM / 2)",
          atributes: ["AGI", "CM"],
          useLevel: false,
        },
      ],
    },
    {
      name: "Criação",
      description: "Especialista em invocações e construções",
      advantages: ["Versatilidade tática", "Defesa mágica"],
      disadvantages: ["Dependência de preparação", "Recursos limitados"],
      receipt: [
        {
          name: "HP",
          structure: "10 + (CM x 2) + Nivel x 6",
          atributes: ["CM"],
          useLevel: true,
        },
        {
          name: "MP",
          structure: "CG * 2",
          atributes: ["CG"],
          useLevel: false,
        },
      ],
    },
  ],
  [COLLECTIONS.SUBCLASSES]: [
    {
      name: "Mago do Caos",
      description: "Manipulador de energias instáveis",
      advantages: ["Dano explosivo", "Efeitos aleatórios"],
      disadvantages: ["Risco de auto-dano", "Dificuldade de controle"],
      classId: null, // Será preenchido dinamicamente
    },
    {
      name: "Cavaleiro da Luz",
      description: "Defensor da justiça e da ordem",
      advantages: ["Proteção divina", "Resistência aumentada"],
      disadvantages: ["Restrições morais", "Dependência de fé"],
      classId: null, // Será preenchido dinamicamente
    },
  ],
  [COLLECTIONS.SPELLS]: [
    {
      name: "Bola de Fogo",
      description: "Conjura uma esfera de fogo explosiva",
      unique: false,
      levelSpell: [
        { level: 1, ptUso: 3, description: "3m de raio, 2d6 de dano" },
        { level: 3, ptUso: 5, description: "5m de raio, 4d6 de dano" },
      ],
      classId: null, // Será preenchido dinamicamente
      subclassId: null, // Será preenchido dinamicamente
    },
    {
      name: "Cura Divina",
      description: "Restaura a saúde usando energia divina",
      unique: false,
      levelSpell: [
        { level: 1, ptUso: 2, description: "Cura 1d8 pontos de vida" },
        { level: 2, ptUso: 4, description: "Cura 2d8 pontos de vida" },
      ],
      classId: null, // Será preenchido dinamicamente
      subclassId: null, // Será preenchido dinamicamente
    },
  ],
  [COLLECTIONS.LEVELS]: [
    { name: "Nível 1", attributePoints: 20, value: 1 },
    { name: "Nível 2", attributePoints: 24, value: 2 },
  ],
  [COLLECTIONS.RACES]: [
    {
      name: "Humano",
      description: "Raça versátil e adaptável",
      advantages: ["Bônus em habilidades sociais", "Versatilidade"],
      disadvantages: ["Sem bônus específicos", "Progressão linear"],
    },
    {
      name: "Elfo",
      description: "Raça mágica e longeva",
      advantages: ["Afinação mágica", "Sentidos aguçados"],
      disadvantages: ["Fragilidade física", "Vulnerabilidade ao ferro"],
    },
  ],
};

// Função principal do seed
async function runSeed() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    const db = client.db(DB_NAME);

    // 1. Limpar o banco
    await cleanDatabase(db);

    // 2. Inserir usuários (com senhas criptografadas)
    console.log("\n🌱 Inserindo usuários...");
    const users = await processCollection(
      db,
      COLLECTIONS.USERS,
      UserSchema,
      seedData[COLLECTIONS.USERS]
    );

    // 3. Inserir classes
    console.log("\n🌱 Inserindo classes...");
    const classes = await processCollection(
      db,
      COLLECTIONS.CLASSES,
      ClassSchema,
      seedData[COLLECTIONS.CLASSES]
    );

    // 4. Inserir subclasses (vinculadas às classes)
    console.log("\n🌱 Inserindo subclasses...");
    const subclasses = await processCollection(
      db,
      COLLECTIONS.SUBCLASSES,
      SubclassSchema,
      seedData[COLLECTIONS.SUBCLASSES].map((sub, index) => ({
        ...sub,
        classId: classes[index], // Vincula à classe correspondente
      }))
    );

    // 5. Inserir magias (vinculadas a classes ou subclasses)
    console.log("\n🌱 Inserindo magias...");
    const spells = await processCollection(
      db,
      COLLECTIONS.SPELLS,
      SpellSchema,
      seedData[COLLECTIONS.SPELLS].map((spell, index) => ({
        ...spell,
        classId: index === 0 ? classes[0] : null, // Bola de Fogo -> Mago
        subclassId: index === 1 ? subclasses[1] : null, // Cura Divina -> Cavaleiro da Luz
      }))
    );

    // 6. Inserir níveis e raças
    console.log("\n🌱 Inserindo níveis e raças...");
    const [levels, races] = await Promise.all([
      processCollection(
        db,
        COLLECTIONS.LEVELS,
        LevelSchema,
        seedData[COLLECTIONS.LEVELS]
      ),
      processCollection(
        db,
        COLLECTIONS.RACES,
        RaceSchema,
        seedData[COLLECTIONS.RACES]
      ),
    ]);

    // 7. Relatório final
    console.log("\n✅ Seed concluído com sucesso!");
    console.table({
      Usuários: users.length,
      Classes: classes.length,
      Subclasses: subclasses.length,
      Magias: spells.length,
      Níveis: levels.length,
      Raças: races.length,
    });
  } catch (error) {
    console.error("\n❌ Falha no seed:", error.message);
  } finally {
    await client.close();
  }
}

// Função genérica para processar collections (com criptografia de senha)
async function processCollection(db, collectionName, schema, rawData) {
  const processedData = await Promise.all(
    rawData.map(async (item) => {
      const newItem = { ...item };

      // Criptografa senha se existir no documento
      if (newItem.password) {
        newItem.password = await bcrypt.hash(newItem.password, 10);
      }

      // Adiciona timestamps
      newItem.createdAt = new Date();
      newItem.updatedAt = new Date();

      return newItem;
    })
  );

  const validatedData = processedData.map((data) =>
    validateWithSchema(data, schema)
  );
  const result = await db.collection(collectionName).insertMany(validatedData);

  console.log(`✔️ ${collectionName}: ${validatedData.length} inseridos`);
  return Object.values(result.insertedIds); // Retorna os IDs gerados
}

// Executar o seed
runSeed();
