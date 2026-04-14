# EC2 Deployment

This app runs as:

- Vite frontend built into `dist/`
- Express API from `artifacts/api-server/src/index.ts`
- One Node process serves both the frontend and `/api/*`

## 1. Install on EC2

```bash
git clone <your-repo-url>
cd skyrich-tech-solutions
npm ci
```

Use `npm ci`, not `npm ci --omit=dev`, because `tsx` is required to run the server.

## 2. Configure environment

Create `.env` on the EC2 instance:

```env
PORT=3003
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DB_NAME
JWT_SECRET=replace-with-a-long-random-secret
ALLOWED_ORIGINS=https://your-domain.com,http://your-ec2-public-ip
```

Notes:

- `PORT` is the runtime port the Node server listens on.
- `JWT_SECRET` must be set in production or admin logins will break after restart.
- `ALLOWED_ORIGINS` should contain your final frontend domain.

## 3. Build and run

```bash
npm run build
npm start
```

## 4. Run with PM2

```bash
npm install -g pm2
pm2 start npm --name skyrich-site -- start
pm2 save
pm2 startup
```

## 5. Nginx reverse proxy

Example Nginx site config:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:3003;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

After editing Nginx:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

## 6. Optional database schema push

If this is a fresh database:

```bash
npm run db:push
```
