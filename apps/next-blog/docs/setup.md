# Project Setup

## NextJs 
``` pnpx create-next-app@latest ``` 

## Prisma with Sqlite

``` pnpm add -D prisma ``` add prisma cli  
``` pnpx prisma init --datasource-provider sqlite ``` init & configure sqlite.  
  
then in prisma/schema.prisma add models & add db path in .env  
  
``` prisma migrate dev ``` to run the migrations  

if we do any chages to prisma/schema.prisma then we need to run the above migration command  