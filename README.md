# 🛍️ Sistema de Gestión de Productos - Frontend Angular

Frontend desarrollado en Angular para un sistema de gestión de productos y categorías, consumiendo API RESTful de Laravel con diseño moderno y responsivo.

## 🔗 Integración con Backend

Este frontend está diseñado para trabajar con un backend en Laravel:

**[Repositorio Backend Laravel](https://github.com/Lemoonautt/laravel-api-backend)**

## 👨‍💻 Desarrollado por Limberg Edgar Montes Tancara

📧 **Correo:** limberg.tancara@uab.edu.bo

---

## 🚀 Características principales

* ✨ Interfaz con diseño verde turquesa/lima
* 📱 Diseño responsivo
* 📊 Tabla de productos con hover effects
* 📝 Formulario de creación de productos con validación
* 🔄 Integración completa con API RESTful de Laravel

---

## 🛠️ Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/Lemoonautt/frontend-angular-prod.git
cd frontend-angular-prod
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar la URL del backend

Edita el archivo de configuración de servicios para apuntar a tu backend Laravel:

```typescript
// src/app/environments
private apiUrl = 'http://127.0.0.1:8000/api';
```

### 4. Iniciar servidor de desarrollo

```bash
ng serve
```

### 5. Acceder a la aplicación

Navega a: `http://localhost:4200`

---

## 🔧 Scripts disponibles

```bash
# Desarrollo
ng serve

# Build de producción
ng build --configuration production

# Ejecutar tests
ng test

# Linting
ng lint

# Análisis de código
ng build --stats-json
```
