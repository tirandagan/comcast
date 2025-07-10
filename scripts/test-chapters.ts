import { parseFullReport, getAllChapterSlugs } from '../src/lib/report-content';

console.log('Testing chapter parsing...\n');

const chapters = parseFullReport();
console.log(`Found ${chapters.length} chapters:\n`);

chapters.forEach((chapter, index) => {
  console.log(`${index + 1}. ${chapter.title}`);
  console.log(`   Slug: ${chapter.slug}`);
  console.log(`   Content length: ${chapter.content.length} chars`);
  console.log(`   Sections: ${chapter.sections.length}`);
  console.log('');
});

console.log('\nAll chapter slugs:');
const slugs = getAllChapterSlugs();
slugs.forEach(slug => console.log(`- ${slug}`));