import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // List all users
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      registrationStatus: true,
      createdAt: true,
    },
  });

  console.log('\n=== All Users ===');
  users.forEach(user => {
    console.log(`
ID: ${user.id}
Name: ${user.name}
Email: ${user.email}
Role: ${user.role}
Status: ${user.registrationStatus}
Created: ${user.createdAt.toLocaleString()}
---`);
  });

  // Check for pending users
  const pendingUsers = users.filter(u => u.registrationStatus === 'PENDING');
  
  if (pendingUsers.length > 0) {
    console.log(`\n=== ${pendingUsers.length} Pending Users ===`);
    
    // Auto-approve t@tirandagan.com if found
    const tUser = pendingUsers.find(u => u.email === 't@tirandagan.com');
    if (tUser) {
      console.log(`\nAuto-approving ${tUser.email}...`);
      
      await prisma.user.update({
        where: { id: tUser.id },
        data: { registrationStatus: 'APPROVED' },
      });
      
      await prisma.registrationApproval.updateMany({
        where: { userId: tUser.id },
        data: { 
          status: 'APPROVED',
          approvedBy: users.find(u => u.role === 'ADMIN')?.id,
        },
      });
      
      console.log('✓ Approved successfully!');
    }
  }
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });