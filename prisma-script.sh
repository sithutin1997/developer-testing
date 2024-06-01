#migrate prisma to database
docker exec -it property-management npx prisma migrate dev --name "init"
#pause for 5 seconds to ensure the database is ready
sleep 5

#generate prisma client
docker exec -it property-management npx prisma generate
sleep 5

#generate faker data using prisma seeder
docker exec -it property-management npx prisma db seed
sleep 10