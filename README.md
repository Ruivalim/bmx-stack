# **BMX-Stack**

BMX-Stack: It's not just about riding bikes—it's about riding the **web development rails**! 🚴💻

This modern boilerplate combines **Bun**, **Mongoose**, **Express**, and **TypeScript** to give you the thrill of speed and control while building web applications. Whether you're racing through REST APIs or performing tricks with static routes, BMX-Stack is here to help you land clean every time.

---

## **Features**

- **🛠️ REST Route Generator**: Automate the creation of models, controllers, and routes for REST APIs with built-in validation.
- **📄 Static Route Generator**: Quickly scaffold HTML pages and serve them with Express.
- **🚀 Fast Runtime**: Powered by Bun for unparalleled speed and performance.
- **💾 MongoDB Integration**: Effortless database connectivity and schema management with Mongoose.
- **📜 TypeScript Support**: Type-safe development for smoother rides.
- **📦 Docker Support**: Easily containerize your application with the provided Dockerfile and Docker Compose setup.

---

## **Getting Started**

### Prerequisites

- **[Bun](https://bun.sh/)** installed
- **MongoDB** instance (local or cloud)
- **Docker** (optional, for containerization)

---

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Ruivalim/bmx-stack.git
   cd bmx-stack
   ```

2. **Install Dependencies**

   ```bash
   bun install
   ```

3. **Set Up Environment Variables**

   Create a `.env` file in the root directory and configure the following:

   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/bmx_stack
   ```

4. **Run the Project**

   Start the development server:

   ```bash
   bun run dev
   ```

   The server will start on `http://localhost:5000`.

---

### Project Structure

```
bmx-stack/
├── Dockerfile                # Docker configuration
├── bun.lockb                 # Bun lock file
├── docker-compose.yaml       # Docker Compose setup
├── generate.ts               # Route and model generation script
├── package.json              # Project dependencies and scripts
├── public/                   # Static HTML files
├── src/                      # Application source code
│   ├── app.ts                # Express app setup
│   ├── config/               # Database configuration
│   │   └── database.ts
│   ├── controllers/          # Route controllers
│   ├── middleware/           # Custom middleware
│   │   └── validationMiddleware.ts
│   ├── models/               # Mongoose models
│   ├── routes/               # API and static routes
│   ├── server.ts             # Server entry point
│   └── validations/          # Reusable validation functions
│       ├── boolean.ts
│       ├── date.ts
│       ├── email.ts
│       ├── number.ts
│       └── string.ts
└── tsconfig.json             # TypeScript configuration
```

---

## **Usage**

### Generate a Static Route

Generate a new static route and HTML file:

```bash
bun run generate
```

1. Select **Static Route**.
2. Enter the name of the route.
3. The script will create:
   - A static HTML file in `public/`.
   - A route file in `src/routes/`.

---

### Generate a RESTful Route

Generate a RESTful route with a model, controller, and validation:

```bash
bun run generate
```

1. Select **REST Route**.
2. Enter the name of the model (in PascalCase).
3. The script will create:
   - A Mongoose model in `src/models/`.
   - A controller with CRUD operations in `src/controllers/`.
   - A RESTful route with basic validation in `src/routes/`.

---

## **Running with Docker**

1. **Build the Docker Image**

   ```bash
   docker-compose build
   ```

2. **Start the Application**
   ```bash
   docker-compose up
   ```

The application will be accessible on `http://localhost:5000`.

---

## **API Endpoints**

### Example: User Resource

| Method | Endpoint         | Description             | Body Requirements  |
| ------ | ---------------- | ----------------------- | ------------------ |
| GET    | `/api/users`     | Get all users           | None               |
| GET    | `/api/users/:id` | Get a single user by ID | None               |
| POST   | `/api/users`     | Create a new user       | `{ name: string }` |
| PUT    | `/api/users/:id` | Update a user by ID     | `{ name: string }` |
| DELETE | `/api/users/:id` | Delete a user by ID     | None               |

---

## **Scripts**

| Command             | Description                           |
| ------------------- | ------------------------------------- |
| `bun run dev`       | Start the development server          |
| `bun run generate`  | Generate a new route (REST or static) |
| `docker-compose up` | Start the app in Docker containers    |

---

## **Contributing**

We welcome contributions! If you'd like to improve BMX-Stack, please feel free to fork the repository, create a feature branch, and submit a pull request.

---

## **License**

This project is licensed under the [MIT License](LICENSE).

---

## **Author**

Created by **[Rui Valim](https://github.com/Ruivalim)**.
Feel free to reach out with suggestions, feedback, or just to say hi! 🚴💻
