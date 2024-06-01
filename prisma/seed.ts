import { PrismaClient } from '@prisma/client';
import {faker} from '@faker-js/faker'

const prisma = new PrismaClient()
async function main() {
  let i = 0
  while(i < 10000) {
    const properties = await prisma.property.create({
      data : {
        name: faker.lorem.words(5),
        title: faker.lorem.words(5),
        price: faker.number.int({ min: 1000, max: 100000 }),
        bedrooms: faker.number.int({ min: 1, max: 5}),
        area: faker.number.float({ min: 10, max: 100, multipleOf: 0.02 }),
        description: faker.lorem.lines(2),
        images: {
          create : [
            {
              url: faker.image.urlLoremFlickr({ category: 'room', height: 480, width: 640 }) 
            },
            {
              url: faker.image.urlLoremFlickr({ category: 'room', height: 480, width: 640 }) 
            },
            {
              url: faker.image.urlLoremFlickr({ category: 'room', height: 480, width: 640 }) 
            },
            {
              url: faker.image.urlLoremFlickr({ category: 'room', height: 480, width: 640 }) 
            },
            {
              url: faker.image.urlLoremFlickr({ category: 'room', height: 480, width: 640 }) 
            },
          ]
        },
        propertyCategory: faker.helpers.arrayElement(['RENT', 'SALE'])
      }
    })
    i++;
  }
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })