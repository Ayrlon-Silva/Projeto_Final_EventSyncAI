# EventSync - Plataforma de Gestão de Eventos

O **EventSync** é uma aplicação completa para gerenciamento de eventos, permitindo que organizadores criem e administrem eventos e que participantes se inscrevam e acompanhem suas atividades. O projeto foi desenvolvido com foco em arquitetura robusta, separação de responsabilidades e código limpo.

---

## 🚀 Tecnologias Utilizadas

O projeto é dividido em dois grandes monólitos (Backend e Frontend) integrados via API REST.

### Backend (Server-side)
* **Framework:** [NestJS](https://nestjs.com/) (Node.js)
* **Linguagem:** TypeScript
* **Banco de Dados:** PostgreSQL
* **ORM:** TypeORM
* **Autenticação:** JWT (JSON Web Token) & Passport
* **Arquitetura:** Modular (Services, Controllers, DTOs, Entities)

### Frontend (Client-side)
* **Framework:** [Next.js 13+](https://nextjs.org/) (App Router)
* **Linguagem:** TypeScript
* **Estilização:** Tailwind CSS
* **Ícones:** Lucide React
* **Comunicação HTTP:** Axios
* **Gerenciamento de Estado:** Context API 

---

## 🤖 Transparência no uso de IA

Este projeto foi desenvolvido adotando uma abordagem híbrida, combinando conhecimentos de engenharia de software com o auxílio de ferramentas de Inteligência Artificial Generativa para aceleração do desenvolvimento.

Conforme as diretrizes do projeto, detalho abaixo o uso das ferramentas:

### 1. Ferramentas Utilizadas
* **Gemini (Google):** Atuou como um "Par Programador" na estruturação inicial e lógica do Backend.
* **ChatGPT (OpenAI):** Utilizado para suporte em dúvidas pontuais de sintaxe e refatoração de funções específicas.
* **V0 (Vercel):** Utilizado para gerar a interface do usuário (UI) e componentes do Frontend.

### 2. Aplicação no Projeto
* **Backend (NestJS):** O Gemini auxiliou na definição da arquitetura de pastas e na criação dos módulos principais (Users, Events, Inscriptions). O ChatGPT e a documentação oficial do NestJS foram consultados para resolver erros e tirar duvidas pontuais.
* **Frontend (Next.js):** A plataforma V0 foi essencial para criar o design visual (Landing Page, Login e Dashboard) de forma ágil, permitindo focar na integração com a API.

---

## ✨ Funcionalidades Principais

* **Gestão de Eventos:**
    * Criar evento (Rascunho/Publicado).
    * Editar e Listar eventos.
* **Inscrições:**
    * Fluxo de solicitação de inscrição.
    * Visualização de "Meus Eventos" e "Minhas Inscrições".
* **Segurança:** Rotas protegidas por Token Bearer (JWT).

---
