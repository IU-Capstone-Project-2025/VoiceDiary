# 🎙️Voice Diary - React Frontend

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## 📑 Table of Contents

- [Project Setup with Docker](#project-setup-with-docker)
  - [Prerequisites](#prerequisites)
  - [🐳 Quick Start with Docker](#-quick-start-with-docker)
- [🔥 Development Mode with Docker](#-development-mode-with-docker)
- [📦 Available Scripts](#-available-scripts)
- [SSL Certificate Setup](#ssl-certificate-setup-for-local-development-windows)
- [🤝 Contributing](#-contributing)
  - [Guidelines:](#guidelines)

## Project Setup with Docker

### Prerequisites

- Docker installed ([Install Docker](https://docs.docker.com/get-docker/))
- Node.js (optional, for development without Docker)

### 🐳 Quick Start with Docker

1. **Build the Docker image**:

   ```bash
   docker build -t voice-diary-frontend .
   ```

2. **Run the container:**

   ```bash
   docker run -d -p 3000:80 voice-diary-frontend
   ```

3. **Access the application:**

   🌐 Open http://localhost:3000 in your browser

## 🔥 Development Mode with Docker

For development with hot-reload:

```bash
docker build -t voice-diary-dev -f Dockerfile.dev .

docker run -p 3000:3000 -v $(pwd):/app voice-diary-dev
```

## 📦 Available Scripts

| Command          | Description                               |     |
| ---------------- | ----------------------------------------- | --- |
| `npm start`      | Launch development server with hot-reload | 🚀  |
| `npm run build`  | Create optimized production build         | 🏗️  |
| `npm test`       | Run test suite in interactive watch mode  | 🧪  |
| `npm run format` | Format code with Prettier (if configured) | 🎨  |


## SSL Certificate Setup for Local Development (Windows)

### Prerequisites
- Windows 10/11
- Git Bash (recommended) or WSL installed
- OpenSSL (comes with Git for Windows)

### Step 1: Generate SSL Certificates

1. Open Git Bash as Administrator
2. Run these commands:

```bash
cd nginx/ssl

openssl req -x509 -nodes -newkey rsa:2048 \
    -keyout localhost.key \
    -out localhost.crt \
    -subj "/C=US/ST=California/L=San Francisco/O=VoiceDiary/CN=localhost" \
    -addext "subjectAltName=DNS:localhost,IP:127.0.0.1" \
    -days 365
```

### Step 2: Install the Certificate in Windows Trust Store

1. **Locate the certificate file**:
   - Navigate to `./nginx/ssl/localhost.crt` in File Explorer

2. **Install the certificate**:
   - Right-click `localhost.crt` → "Install Certificate"
   - Select "Local Machine" → Click "Next"
   - Choose "Place all certificates in the following store"
   - Click "Browse" → Select "Trusted Root Certification Authorities"
   - Click "OK" → "Next" → "Finish"

3. **Verify installation**:
   - Press `Win + R`, type `certlm.msc` and hit Enter
   - Navigate to:
     ```
     Trusted Root Certification Authorities → Certificates
     ```
   - Look for "localhost" or "VoiceDiary" in the list

### Step 3: Configure Browsers

### For Chrome/Edge:
```bash
1. Navigate to:
   chrome://flags/#allow-insecure-localhost
2. Enable the flag:
   "Allow invalid certificates for resources loaded from localhost"
3. Restart the browser
```

## 🤝 Contributing

We welcome all contributions! Here's how to help:

1. **Fork** the repository 🍴

2. **Clone** your fork locally:

   ```bash
   git clone https://github.com/IU-Capstone-Project-2025/VoiceDiary.git
   ```

3. Create a feature branch:

   ```bash
   git checkout -b feature/your-feature
   ```

4. Commit your changes:

   ```bash
   git commit -m "feat: add amazing feature"
   ```

5. Push to your fork:
   ```bash
   git push origin feature/your-feature
   ```
6. Open a Pull Request with clear description

#### Guidelines:

- Follow existing code style
- Write meaningful commit messages
- Update documentation when needed
- Keep PRs focused on single purpose
