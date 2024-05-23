## Comandos Prisma

- `Projeto para a faculdade:` O objetivo era poder realizar login, registro e cadastro de itens com o software, utilizando express.js e outras bibliotecas, como o prisma. É importante constatar que o projeto segue normas de segurança para senha, com bcrypt e JWT, para manter o usuário logado. Testes realizados em PostMan!

## Comandos Prisma

- `npx prisma studio`: Abre interface gráfica do prisma

---

## Exemplo de schema prisma

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  email     String   @unique
  name      String?
  role      Role     @default(USER)
  posts     Post[]
}

model Post {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  published Boolean  @default(false)
  title     String   @db.VarChar(255)
  author    User?    @relation(fields: [authorId], references: [id])
  authorId  Int?
}

enum Role {
  USER
  ADMIN
}
```
