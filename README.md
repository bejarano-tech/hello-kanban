# Hello Kanban

Next.js Project with Prisma, Tailwind CSS, react-beautiful-dnd, NextAuth.js, Shadcn, and Zod

## Introduction

This project is a full-stack application built using Next.js, styled with Tailwind CSS, and features drag-and-drop functionality with react-beautiful-dnd. It utilizes Prisma as an ORM to interact with the database, NextAuth.js for handling authentication, Shadcn for UI components, and Zod for schema validation.

## Features

- **Next.js**: Server-side rendering and static site generation.
- **Prisma**: Robust ORM for database management.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **react-beautiful-dnd**: Beautiful and accessible drag and drop for lists.
- **NextAuth.js**: Complete open-source authentication solution for Next.js applications.
- **Shadcn**: A set of reusable React component library for faster and easier web development.
- **Zod**: TypeScript-first schema validation with static type inference.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js 18.x or higher
- npm/yarn
- A supported SQL database (e.g., PostgreSQL, MySQL, SQLite)

## Installation

Clone the repository:

```bash
git clone https://github.com/bejarano-tech/hello-kanban.git
cd hello-kanban
```

### Install dependencies:


```bash
npm install
```

### Setup the environment variables:

```bash
cp .env.example .env.local
```

### Database Setup

Initialize your database using Prisma:

```bash
npx prisma generate
npx prisma db push
```

### Running the Application

To start the development server, run:

```bash
npm run dev
```
