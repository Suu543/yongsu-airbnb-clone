# yongsu-airbnb-clone

## Register Functionality, MongoDB, Prisma Setup

```bash
npm install -D prisma
npx prisma init
npx prisma db push
npm install next-auth @prisma/client @next-auth/prisma-adapter
npm install bcrypt
npm install -D @types/bcrypt
```

## Github

1. Github Settings
2. Developer Settings
3. OAuth Apps

- Application Name: yongsu-airbnb-clone
- Homepage URL: http://localhost:3000/
- Authorization callback URL: http://localhost:3000/

## Google

1. Google Developer Console
2. Select a project
3. New Project

- Project Name
- Location

4. Enabled APIs
5. OAuth consent screen
6. User Type: 외부(External)

7. 다 끝나고 좌측 패널에서 Credentials 클릭
8. Create OAuth Client ID
9. Authorized redirect URIs

- http://localhost:3000/api/auth/callback/google
