import prisma from './prisma.client';
import { pokemons } from './data/pokemon';
import { types } from './data/types';

async function main() {
  await prisma.pokemon.deleteMany();
  await prisma.types.deleteMany();
  await prisma.types.createMany({
    data: types,
  })
  await prisma.pokemon.createMany({
    data: pokemons,
  });
}

main()
  .catch((error) => {
    console.error('Error seeding the database:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('Seeding completed successfully');
  });
