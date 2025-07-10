import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create or update admin user
  const adminPassword = await bcrypt.hash('Sam99sonite', 10);
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'tiran@tirandagan.com' },
    update: {
      password: adminPassword,
      role: 'ADMIN',
      registrationStatus: 'APPROVED',
    },
    create: {
      email: 'tiran@tirandagan.com',
      name: 'Tiran Dagan',
      title: 'Global Head of Industry & Product Innovation',
      phone: '9088732425',
      password: adminPassword,
      role: 'ADMIN',
      registrationStatus: 'APPROVED',
      emailVerified: new Date(),
    },
  });

  console.log('✅ Admin user created/updated:', adminUser.email);

  // Seed chapters from the report
  const chapters = [
    {
      title: 'Executive Summary',
      slug: 'executive-summary',
      order: 0,
      description: 'Strategic overview of how I will transform Comcast into a data-driven powerhouse, unlocking $2B+ in new revenue streams while reducing operational costs by 30% through AI-powered automation.',
      content: 'Content will be loaded from markdown files',
    },
    {
      title: 'Data & AI at Comcast - Current State and Vision',
      slug: 'data-ai-current-state-vision',
      order: 1,
      description: 'An executive overview of Comcast\'s data assets, current AI initiatives, and the transformative vision for becoming a data-driven powerhouse generating $2B+ in new revenue streams.',
      content: 'Content will be loaded from markdown files',
    },
    {
      title: 'Data & AI Maturity Assessment',
      slug: 'data-ai-maturity-assessment',
      order: 2,
      description: 'A comprehensive assessment of Comcast\'s current data and AI capabilities, competitive benchmarking, and strategic gap analysis to identify our path to AI leadership.',
      content: 'Content will be loaded from markdown files',
    },
    {
      title: 'Strategic Data Platform Architecture',
      slug: 'strategic-data-platform-architecture',
      order: 3,
      description: 'The blueprint for Comcast Intelligence Platform (CIP) - a unified data fabric that integrates all data sources, enables AI at scale, and ensures privacy by design.',
      content: 'Content will be loaded from markdown files',
    },
    {
      title: 'AI Innovation Portfolio & Roadmap',
      slug: 'ai-innovation-portfolio-roadmap',
      order: 4,
      description: 'High-impact AI use cases across customer experience, network operations, content & media, and enterprise solutions with $500M+ revenue potential.',
      content: 'Content will be loaded from markdown files',
    },
    {
      title: 'Building the AI-First Organization',
      slug: 'building-ai-first-organization',
      order: 5,
      description: 'Leveraging my proven ISG model from Cognizant to build Comcast\'s AI Center of Excellence, transform culture, and develop 5,000 AI practitioners.',
      content: 'Content will be loaded from markdown files',
    },
    {
      title: 'Implementation Strategy & Quick Wins',
      slug: 'implementation-strategy-quick-wins',
      order: 6,
      description: '100-day sprint plan with immediate $50M impact, year-one roadmap targeting $600M value, and long-term vision for $2B+ annual revenue generation.',
      content: 'Content will be loaded from markdown files',
    },
  ];

  for (const chapter of chapters) {
    await prisma.chapter.upsert({
      where: { slug: chapter.slug },
      update: {},
      create: chapter,
    });
  }

  console.log(`✅ ${chapters.length} chapters seeded`);
  console.log('🌱 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });