export const KNOWN_PACKAGES: Record<string, string> = {
  // Frameworks & meta-frameworks
  next: 'Next.js',
  nuxt: 'Nuxt',
  remix: 'Remix',
  gatsby: 'Gatsby',
  astro: 'Astro',
  sveltekit: '@sveltejs/kit',

  // UI libraries
  react: 'React',
  vue: 'Vue',
  svelte: 'Svelte',
  solid: 'Solid.js',
  preact: 'Preact',
  '@angular/core': 'Angular',
  'lit-element': 'Lit',
  lit: 'Lit',

  // Styling
  tailwindcss: 'Tailwind CSS',
  sass: 'Sass',
  'styled-components': 'styled-components',
  '@emotion/react': 'Emotion',
  'vanilla-extract': 'Vanilla Extract',

  // State management
  redux: 'Redux',
  '@reduxjs/toolkit': 'Redux Toolkit',
  zustand: 'Zustand',
  jotai: 'Jotai',
  recoil: 'Recoil',
  mobx: 'MobX',
  xstate: 'XState',

  // Data fetching
  'react-query': 'React Query',
  '@tanstack/react-query': 'TanStack Query',
  swr: 'SWR',
  apollo: 'Apollo',
  '@apollo/client': 'Apollo Client',
  urql: 'urql',

  // Backend frameworks
  express: 'Express',
  fastify: 'Fastify',
  hono: 'Hono',
  koa: 'Koa',
  nestjs: 'NestJS',
  '@nestjs/core': 'NestJS',
  'socket.io': 'Socket.io',
  elysia: 'Elysia',

  // Databases & ORMs
  prisma: 'Prisma',
  drizzle: 'Drizzle',
  'drizzle-orm': 'Drizzle',
  mongoose: 'Mongoose',
  typeorm: 'TypeORM',
  sequelize: 'Sequelize',
  knex: 'Knex',
  '@neondatabase/serverless': 'Neon',
  pg: 'PostgreSQL',
  mysql2: 'MySQL',
  'better-sqlite3': 'SQLite',
  ioredis: 'Redis',
  redis: 'Redis',

  // Auth
  'next-auth': 'NextAuth',
  '@auth/core': 'Auth.js',
  '@clerk/nextjs': 'Clerk',
  '@supabase/supabase-js': 'Supabase',
  passport: 'Passport',
  'lucia-auth': 'Lucia',
  lucia: 'Lucia',

  // Testing
  vitest: 'Vitest',
  jest: 'Jest',
  '@testing-library/react': 'Testing Library',
  playwright: 'Playwright',
  cypress: 'Cypress',

  // Build tools & bundlers
  vite: 'Vite',
  webpack: 'Webpack',
  esbuild: 'esbuild',
  rollup: 'Rollup',
  turbopack: 'Turbopack',
  parcel: 'Parcel',

  // Languages & runtimes (via devDeps)
  typescript: 'TypeScript',

  // AI / ML
  openai: 'OpenAI',
  '@anthropic-ai/sdk': 'Anthropic',
  ai: 'Vercel AI SDK',
  langchain: 'LangChain',
  '@langchain/core': 'LangChain',
  ollama: 'Ollama',

  // Mobile
  'react-native': 'React Native',
  expo: 'Expo',

  // Cloud & infra
  '@vercel/og': 'Vercel',
  '@aws-sdk/client-s3': 'AWS',
  '@google-cloud/storage': 'Google Cloud',

  // GraphQL
  graphql: 'GraphQL',
  'graphql-yoga': 'GraphQL Yoga',
  'type-graphql': 'TypeGraphQL',

  // Validation
  zod: 'Zod',
  yup: 'Yup',
  joi: 'Joi',
  valibot: 'Valibot',

  // Utilities (only the ones worth surfacing)
  trpc: 'tRPC',
  '@trpc/server': 'tRPC',
  'date-fns': 'date-fns',
  dayjs: 'Day.js',
  rxjs: 'RxJS',
};

export const PRIORITY_PACKAGES = new Set([
  'react',
  'vue',
  'svelte',
  'next',
  'nuxt',
  'remix',
  'astro',
  '@angular/core',
  'react-native',
  'expo',
  'typescript',
  'tailwindcss',
]);
