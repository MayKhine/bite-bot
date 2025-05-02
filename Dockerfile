# Use a lightweight Node.js image
FROM node:20-slim

# Set the working directory
WORKDIR /app

COPY ./packages/backend/dist ./backend
COPY ./packages/frontend/dist ./frontend

EXPOSE 4000

CMD ["node", "./backend/main.cjs"]
