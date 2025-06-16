# Expedição Motoboy Frontend

## 🏁 Inicio 
Bem-vindo ao frontend do sistema de expedição para motoboys! Este projeto foi desenvolvido com React + TypeScript, focando na criação de uma interface simples, intuitiva e responsiva para facilitar o gerenciamento logístico e o dia a dia dos motoboys e supervisores.
<br>

- 🛠️ Tecnologias Utilizadas
- ⚛️ React
- ✨ TypeScript
- 🧰 Vite
- 🎨 Tailwind CSS
- 🔐 Integração com autenticação JWT
- 📦 Axios (para requisições HTTP)
- 🌐 React Router DOM (navegação SPA)
- 📋 Funcionalidades
- 🔐 Login com autenticação JWT
- 👨‍💼 Interface diferenciada para cada tipo de usuário (Supervisor, Motoboy)
- 🧾 Visualização de entregas
- 🧑‍💼 Listagem e cadastro de usuários
- ✅ Controle de permissões baseado na role do usuário
- ⚡ Navegação SPA rápida e fluída
- 🧠 Feedback visual claro (loading, erros, sucesso)

## 👥 Cargos e Permissões

- SUPERVISOR/COORDENADOR	Visualiza todos os usuários e entregas, cadastra motoboys
visualiza suas entregas, percusos e status.

## 🔄 Fluxo de Autenticação
- Usuário acessa a tela de login.

- Informa e-mail e senha → Envio para o backend via /auth/login.

- Recebe token JWT e armazena no localStorage ou sessionStorage.

- Token é usado automaticamente nos headers das requisições seguintes via Axios.

- A navegação e componentes são adaptados conforme a role do usuário.

## 🎯 Objetivo do Projeto
- Este sistema busca organizar de forma eficiente o processo de expedição por motoboys, permitindo que supervisores tenham uma visão completa das entregas e motoboys, enquanto os próprios entregadores conseguem acompanhar suas atividades em tempo real. Tudo isso com segurança, performance e uma boa experiência de uso.

## 🙋‍♂️ Autor
- Desenvolvido por Gabriel De Sá Ramos 👨‍💻
Frontend + Backend Developer |

