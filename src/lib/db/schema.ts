import { boolean, index, jsonb, pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const planEnum = pgEnum('plan', ['free', 'pro']);

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  clerkId: text('clerk_id').unique().notNull(),
  email: text('email').notNull(),
  plan: planEnum('plan').default('free').notNull(),
  stripeCustomerId: text('stripe_customer_id'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const projects = pgTable(
  'projects',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),
    repoUrl: text('repo_url').notNull(),
    repoOwner: text('repo_owner').notNull(),
    repoName: text('repo_name').notNull(),
    fetchedAt: timestamp('fetched_at'),
    // Raw + parsed (regenerated on re-fetch)
    readmeRaw: text('readme_raw'),
    sectionsParsed: jsonb('sections_parsed'),
    techStackParsed: text('tech_stack_parsed').array(),
    descriptionParsed: text('description_parsed'),
    demoUrlParsed: text('demo_url_parsed'),
    // User overrides (preserved across re-fetch)
    nameOverride: text('name_override'),
    descriptionOverride: text('description_override'),
    sectionsOverrides: jsonb('sections_overrides'),
    techStackOverride: text('tech_stack_override').array(),
    demoUrlOverride: text('demo_url_override'),
    // Publishing
    slug: text('slug').unique(),
    isPublished: boolean('is_published').default(false).notNull(),
    publishedAt: timestamp('published_at'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => [index('projects_user_id_idx').on(table.userId)],
);
