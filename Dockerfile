# Base oficial Node.js
FROM node:18

# Diretório de trabalho dentro do container
WORKDIR /app

# Copiar apenas arquivos de dependência primeiro (para cache)
# Isso melhora o tempo de build se apenas o código mudar, mas não as dependências.
COPY package*.json ./

# Instala as dependências (incluindo devDependencies, pois 'next dev' as utiliza)
RUN npm install

# Copiar o restante do projeto.
# Mesmo com volumes, copiar o código aqui garante que a imagem possa ser construída
# e que o 'npx prisma generate' tenha acesso aos arquivos necessários.
COPY . .

# Gerar cliente do Prisma
# É bom executar isso após copiar todo o código e instalar as dependências.
RUN npx prisma generate

# Expõe a porta que o Next.js usa por padrão para desenvolvimento.
# Por padrão, 'next dev' usa a porta 3000.
# Seu Dockerfile original tinha 3001. Se você configurou o Next.js para rodar na 3001
# em desenvolvimento (ex: no script 'dev' do package.json com 'next dev -p 3001'),
# então mantenha 3001. Caso contrário, 3000 é o padrão.
# Vou usar 3000 aqui, ajuste se necessário.
EXPOSE 3001

# Comando padrão para iniciar a aplicação em modo de desenvolvimento.
# Este comando será usado se você não especificar um 'command' no docker-compose.yml.
# No nosso caso, o docker-compose.yml que discutimos irá sobrescrever isso com 'npm run dev'.
CMD ["npm", "run", "dev"]