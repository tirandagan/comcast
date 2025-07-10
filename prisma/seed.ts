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
      order: 1,
      description: 'A strategic proposal for Sutherland\'s AI transformation, including the critical role of Global Head of Industry & Product Innovation and why this leadership is needed NOW to capture the $4.4 trillion AI market opportunity.',
      content: 'Content will be loaded from markdown files',
    },
    {
      title: 'Chapter 1: Company Overview and Current Landscape',
      slug: 'company-overview-and-current-landscape',
      order: 2,
      description: 'Founded in 1986, Sutherland Global Services has evolved from a traditional BPO provider to a digital transformation partner for global enterprises...',
      content: 'Content will be loaded from markdown files',
    },
    {
      title: 'Chapter 2: SWOT Analysis for Innovation',
      slug: 'swot-analysis-for-innovation',
      order: 3,
      description: 'A comprehensive analysis of Sutherland\'s strengths, weaknesses, opportunities, and threats in the context of AI-driven innovation...',
      content: 'Content will be loaded from markdown files',
    },
    {
      title: 'Chapter 3: Competitive Landscape - AI Innovation Gaps',
      slug: 'competitive-landscape-ai-innovation-gaps',
      order: 4,
      description: 'Understanding how competitors are approaching AI innovation and identifying gaps that Sutherland can exploit...',
      content: 'Content will be loaded from markdown files',
    },
    {
      title: 'Chapter 4: Industry Vertical Deep-Dive',
      slug: 'industry-vertical-deep-dive',
      order: 5,
      description: 'Detailed analysis of AI opportunities across Sutherland\'s nine primary industry verticals...',
      content: 'Content will be loaded from markdown files',
    },
    {
      title: 'Chapter 5: The ISG Model Applied to Sutherland',
      slug: 'the-isg-model-applied-to-sutherland',
      order: 6,
      description: 'Leveraging proven methodologies from Cognizant\'s Industry Solutions Group to create Sutherland\'s innovation framework...',
      content: 'Content will be loaded from markdown files',
    },
    {
      title: 'Chapter 6: AI Rapid Prototyping Framework',
      slug: 'ai-rapid-prototyping-framework',
      order: 7,
      description: 'A detailed framework for achieving 2-4 week prototype cycles using modern AI development tools...',
      content: 'Content will be loaded from markdown files',
    },
    {
      title: 'Chapter 7: Strategic Implementation Roadmap',
      slug: 'strategic-implementation-roadmap',
      order: 8,
      description: 'Phase-by-phase implementation plan with timelines, milestones, and success metrics...',
      content: 'Content will be loaded from markdown files',
    },
    {
      title: 'Chapter 8: Partnership Ecosystem Strategy',
      slug: 'partnership-ecosystem-strategy',
      order: 9,
      description: 'Building strategic alliances with hyperscalers, AI platforms, and innovative startups...',
      content: 'Content will be loaded from markdown files',
    },
    {
      title: 'Chapter 9: The Role and Impact',
      slug: 'the-role-and-impact',
      order: 10,
      description: 'Defining the leadership structure and organizational impact of the innovation transformation...',
      content: 'Content will be loaded from markdown files',
    },
    {
      title: 'Chapter 10: Success Metrics and KPIs',
      slug: 'success-metrics-and-kpis',
      order: 11,
      description: 'Comprehensive framework for measuring innovation success and ROI...',
      content: 'Content will be loaded from markdown files',
    },
    {
      title: 'Conclusion: The Path Forward',
      slug: 'conclusion-the-path-forward',
      order: 12,
      description: 'Final recommendations and immediate next steps for Sutherland\'s AI innovation journey...',
      content: 'Content will be loaded from markdown files',
    },
    {
      title: 'Appendices',
      slug: 'appendices',
      order: 13,
      description: 'Supporting documentation including financial projections, organizational charts, technology stack recommendations, and detailed implementation guides...',
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