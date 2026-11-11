# Lab 5.1 - Práctica Individual: API REST con Integración Continua (CI)

[![CI Pipeline](https://github.com/adrianOvando/Lab5.1_Ejercicio4/actions/workflows/ci.yml/badge.svg)](https://github.com/adrianOvando/Lab5.1_Ejercicio4/actions/workflows/ci.yml)

API RESTful profesional construida con **Node.js** y **Express** para la gestión de productos, con una suite completa de pruebas unitarias e integración con **Jest** y **Supertest**, y un pipeline automatizado de **Integración Continua (CI)** mediante **GitHub Actions**.

---

## 📋 Descripción del Proyecto

Este proyecto corresponde a la **Práctica Individual (Ejercicio 4)** del Laboratorio 5.1 (COM-610). Implementa:
- Una entidad de dominio completa (`Product`) con operaciones CRUD.
- Validaciones rigurosas de datos de entrada y manejo estándar de códigos de estado HTTP.
- Análisis estático de código con **ESLint** (reglas actualizadas para Node y Jest).
- Cobertura de pruebas automatizada al **100% de líneas y funciones**.
- Pipeline de Integración Continua en GitHub Actions que audita cada commit y pull request hacia la rama `main`.
- Reglas de protección de rama (`Branch Protection Rules`) que impiden integrar código que no pase las pruebas o el linter.

---

## 🚀 Tecnologías Utilizadas

- **Entorno de ejecución**: Node.js (LTS v20)
- **Framework Web**: Express.js 4.x
- **Linter / Análisis estático**: ESLint 9.x
- **Framework de pruebas**: Jest 29.x
- **Pruebas de integración HTTP**: Supertest 7.x
- **CI / CD**: GitHub Actions

---

## 📦 Estructura del Repositorio

```text
Lab5.1_Ejercicio4/
├── .github/
│   └── workflows/
│       └── ci.yml             # Pipeline de Integración Continua
├── docs/
│   └── screenshots/           # Capturas de pantalla para el informe
├── src/
│   ├── app.js                 # Configuración de Express y middlewares
│   ├── server.js              # Punto de entrada y arranque del servidor
│   ├── controllers/
│   │   └── productController.js # Lógica de validación y control HTTP
│   ├── models/
│   │   └── productModel.js    # Modelo y operaciones en memoria
│   └── routes/
│       └── productRoutes.js   # Definición de rutas CRUD
├── tests/
│   ├── health.test.js         # Pruebas del endpoint /health y 404
│   └── products.test.js       # Pruebas unitarias e integrales del CRUD
├── eslint.config.mjs          # Configuración plana de ESLint 9
├── package.json               # Dependencias y scripts
├── README.md                  # Información general del proyecto
└── INFORME.md                 # Informe detallado del laboratorio
```

---

## 🛠️ Endpoints de la API

| Método | Endpoint | Descripción | Códigos HTTP |
|---|---|---|---|
| `GET` | `/health` | Estado del servicio y tiempo activo | `200` |
| `GET` | `/api/products` | Lista todos los productos (soporta filtros `?category=` y `?search=`) | `200` |
| `GET` | `/api/products/:id` | Obtiene un producto por su ID | `200`, `400`, `404` |
| `POST` | `/api/products` | Crea un nuevo producto (valida campos) | `201`, `400` |
| `PUT` | `/api/products/:id` | Actualiza un producto existente | `200`, `400`, `404` |
| `DELETE` | `/api/products/:id` | Elimina un producto por su ID | `200`, `400`, `404` |

---

## 💻 Instalación y Ejecución Local

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/adrianOvando/Lab5.1_Ejercicio4.git
   cd Lab5.1_Ejercicio4
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Ejecutar el servidor en desarrollo:**
   ```bash
   npm start
   ```
   El servidor estará disponible en `http://localhost:3000`.

4. **Ejecutar el análisis estático (Linting):**
   ```bash
   npm run lint
   ```

5. **Ejecutar las pruebas unitarias e integración con cobertura:**
   ```bash
   npm run test:coverage
   ```

---

## 📑 Documentación del Laboratorio

Puedes encontrar el informe completo con capturas de pantalla y evidencias en el siguiente enlace:

- [Ver informe del laboratorio](./INFORME.md)

