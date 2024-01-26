ARG IPC_MODE=host

FROM node:20-bookworm

RUN npx -y playwright@1.41.1 install --with-deps

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json and .env
COPY ./../package.json ./
COPY ./../package-lock.json ./
COPY ./../.env ./

# Install dependencies
RUN npm ci

# Copy the rest of the application files
COPY . .

# Set the working directory
WORKDIR /app/qa

# Set the entry point for the container
ENTRYPOINT ["npx", "playwright", "test", "--workers=2"]
