# **BMX-Stack**

BMX-Stack: It's not just about riding bikes—it's about riding the **web development rails**! 🚴💻

This modern boilerplate combines **Bun**, **Mongoose**, **Express**, and **TypeScript** to give you the thrill of speed and control while building web applications. Whether you're racing through REST APIs or performing tricks with static routes, BMX-Stack is here to help you land clean every time.

---

## **Features**

- **🛠️ REST Route Generator**: Automate the creation of models, controllers, and routes for REST APIs with built-in validation.
- **📄 Static Route Generator**: Quickly scaffold HTML pages and serve them with Express.
- **🖼️ Handlebars Support**: Dynamically render HTML templates using Handlebars for robust server-side rendering.
- **🚀 Fast Runtime**: Powered by Bun for unparalleled speed and performance.
- **💾 MongoDB Integration**: Effortless database connectivity and schema management with Mongoose.
- **📜 TypeScript Support**: Type-safe development for smoother rides.
- **📦 Docker Support**: Easily containerize your application using the provided Dockerfile and Docker Compose setup.
- **📈 Production Optimization**: Build highly optimized production-ready Docker images.

---

## **Getting Started**

### Prerequisites

- **[Bun](https://bun.sh/)** installed
- **MongoDB** instance (local or cloud)
- **Docker** (super recommended for ease of setup and production builds)

---

### Installation

1. **Create Project with Bun Create**

   ```bash
   bun create https://github.com/Ruivalim/bmx-stack ./myproj
   cd ./myproj
   ```

2. **Set Up Environment Variables**

   Create a `.env` file in the root directory and configure the following:

   ```env
   PORT=3000
   MONGO_URI=mongodb://mongo:27017/bmx-stack
   NODE_ENV=development
   ```

3. **Run the Project**

   Start the development server:

   ```bash
   docker compose up --watch
   ```

   The server will start on `http://localhost:3000`.

---

### Project Structure

```
bmx-stack/
├── Dockerfile                # Production-ready Docker configuration
├── bun.lockb                 # Bun lock file
├── dev.Dockerfile            # Docker configuration for development
├── docker-compose.yaml       # Docker Compose setup
├── public/                   # Static HTML files and assets
├── scripts/                  # Utility scripts
│   ├── build.sh              # Production build script
│   ├── generate.ts           # Route and model generation script
│   └── generateStaticRoutes.ts # Static route generator script
├── src/                      # Application source code
│   ├── app.ts                # Express app setup
│   ├── config/               # Database configuration
│   │   └── database.ts
│   ├── controllers/          # Route controllers
│   │   └── healthController.ts
│   ├── middleware/           # Custom middleware
│   │   └── validationMiddleware.ts
│   ├── models/               # Mongoose models
│   ├── routes/               # API and static routes
│   │   └── healthRoute.ts
│   ├── routesLoader.ts       # Dynamic route loader
│   ├── server.ts             # Server entry point
│   ├── validations/          # Reusable validation functions
│   │   ├── boolean.ts
│   │   ├── date.ts
│   │   ├── email.ts
│   │   ├── number.ts
│   │   ├── objectId.ts
│   │   └── string.ts
│   └── views/                # Handlebars templates
│       ├── home.handlebars   # Main page template
│       ├── layouts/          # Handlebars layouts
│       │   └── main.handlebars
│       └── partials/         # Handlebars partials
│           ├── footer.handlebars
│           └── header.handlebars
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

### Handlebars Support

Handlebars templates are located in the `src/views/` directory, with support for layouts and partials.

#### Example Usage:
Render a Handlebars template in your route:
```typescript
res.render('home', { title: 'Welcome!', message: 'Hello, Handlebars!' });
```

Use the `main` layout (`layouts/main.handlebars`) and include reusable partials (e.g., `partials/header.handlebars`).

---

## **Production Optimization**

The `build.sh` script prepares your project for production by:
- Compiling the application using **Bun**.
- Minifying JavaScript and CSS assets.
- Copying the necessary files to a `dist` directory.

### Steps to Build a Production Image
1. Build the Docker image:
   ```bash
   docker build . -t image:tag
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 image:tag
   ```

The resulting image is optimized for production.

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
