# Cozil - Random Video & Text Chat Platform

**Cozil** is an Omegle-style platform where users can connect randomly for text and video chats. This project is a hands-on learning journey through the full stack development process—from frontend challenges to backend complexities.

---

## 🚀 Project Vision

Cozil is being built to:

- Tackle the challenges of using pure HTML/CSS/JS in large projects
- Understand security in real-time communication apps
- Learn how to scale from monoliths to distributed systems
- Prepare for advanced architectures by first mastering the basics

---

## 🔧 Current Tech Stack (Phase 1)

### Frontend

- **HTML5** – Semantic structure
- **CSS3 / Tailwind CSS** – Styling (with glassmorphism effects)
- **Vanilla JavaScript** – To experience core pain points before adopting frameworks
- **WebRTC** – Real-time video/audio communication

### Backend (Planned)

- **Node.js / Express** – Initial backend for fundamentals
- **Socket.IO** – Real-time event handling
- **JWT** – Authentication

---

## 🌟 Future Architecture (Phase 2+)

After core features are complete, the plan is to migrate to:

### Frontend

- **React / Remix or Next.js** – For maintainable UI
- **TypeScript** – Type safety

### Backend

- **Microservices Architecture**:
    - **NestJS** – Structured Node.js services
    - **FastAPI** – Python-based services
- **Multi-Database**:
    - **PostgreSQL** – Relational data
    - **MongoDB** – Document storage
    - **Redis** – Caching and real-time features

---

## 🛠 Development Approach

1. **AI-Assisted Coding**: Used AI tools for initial code scaffolding
2. **Manual Debugging**: Personally debugged and refactored all code
3. **Security-First**:
     - End-to-end encryption
     - Robust moderation tools
     - Following OWASP guidelines
4. **Progressive Enhancement**:
     - Start simple to understand core concepts
     - Gradually add complexity

---

## 🧠 Learning Objectives

### Frontend

- DOM manipulation at scale
- State management without frameworks
- Real-time UI updates
- Cross-browser compatibility

### Backend

- Session management
- Rate limiting
- Database optimization
- API design patterns

### DevOps

- Containerization (Docker)
- CI/CD pipelines
- Load testing
- Distributed system monitoring

---

## 🛡 Security Measures

1. **Content Moderation**:
     - Real-time message filtering
     - User reporting system
2. **Privacy Protection**:
     - No persistent message storage
     - IP address anonymization
3. **Authentication**:
     - Optional guest accounts
     - Email verification for registered users

---

## 🚧 Challenges Faced

1. **Pure JS State Management** – Challenging without frameworks
2. **WebRTC Configuration** – Handling NAT traversal and ICE candidates
3. **Performance Optimization** – Managing memory leaks in long-running chats
4. **Cross-Browser Testing** – Especially for WebRTC features

---

## 📚 Resources Used

- WebRTC Documentation
- Tailwind CSS Docs
- OWASP Security Guidelines
- AI coding assistants (for initial scaffolding)

---

## ➡️ Next Steps

1. Implement basic text chat functionality
2. Add user matching algorithm
3. Develop moderation tools
4. Create admin dashboard
5. Plan microservice decomposition

---

## 🧩 Installation

To run the **Cozil Frontend** locally:

### 1. Clone the Repository

```bash
git clone https://github.com/theshantanusingh/cozil-frontend.git
cd cozil-frontend
```

### 2. Install Dependencies

Ensure Node.js and npm are installed, then run:

```bash
npm install
```

### 3. Build Tailwind CSS

```bash
npm run build
```

This will generate the CSS at `./src/output.css`.

### 4. Start the Server

```bash
npm start
```