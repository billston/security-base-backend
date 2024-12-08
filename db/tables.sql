-- Crear la base de datos
CREATE DATABASE security_db;

-- Conectarse a la base de datos creada
\c security_db;

-- Tabla para empleados (opcional, útil para datos personales)
CREATE TABLE empleado (
    empleado_id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    fecha_nacimiento DATE,
    documento_identidad VARCHAR(50) UNIQUE,
    cargo VARCHAR(100),
    telefono VARCHAR(20),
    created_by INT NOT NULL, -- Usuario que creó el registro
    updated_by INT, -- Usuario que actualizó el registro
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla para usuarios
CREATE TABLE usuario (
    usuario_id SERIAL PRIMARY KEY,
    auth0_user_id VARCHAR(255) UNIQUE NOT NULL, -- ID único asignado por Auth0
    empleado_id INT UNIQUE, -- Relación opcional con empleado
    FOREIGN KEY (empleado_id) REFERENCES empleado(empleado_id),
    created_by INT NOT NULL, -- Usuario que creó el registro
    updated_by INT, -- Usuario que actualizó el registro
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla para perfiles
CREATE TABLE perfil (
    perfil_id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE NOT NULL,
    descripcion TEXT,
    created_by INT NOT NULL, -- Usuario que creó el registro
    updated_by INT, -- Usuario que actualizó el registro
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla para opciones de menú
CREATE TABLE menu (
    menu_id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    ruta VARCHAR(255) UNIQUE NOT NULL, -- Ruta asociada a la opción del menú
    icono VARCHAR(100), -- Nombre del icono para UI (opcional)
    created_by INT NOT NULL, -- Usuario que creó el registro
    updated_by INT, -- Usuario que actualizó el registro
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla intermedia para definir qué menús puede ver cada perfil
CREATE TABLE perfil_menu (
    perfil_id INT NOT NULL,
    menu_id INT NOT NULL,
    PRIMARY KEY (perfil_id, menu_id),
    FOREIGN KEY (perfil_id) REFERENCES perfil(perfil_id) ON DELETE CASCADE,
    FOREIGN KEY (menu_id) REFERENCES menu(menu_id) ON DELETE CASCADE
);

-- Tabla intermedia para definir los perfiles asignados a cada usuario
CREATE TABLE usuario_perfil (
    usuario_id INT NOT NULL,
    perfil_id INT NOT NULL,
    PRIMARY KEY (usuario_id, perfil_id),
    FOREIGN KEY (usuario_id) REFERENCES usuario(usuario_id) ON DELETE CASCADE,
    FOREIGN KEY (perfil_id) REFERENCES perfil(perfil_id) ON DELETE CASCADE
);

-- Índices recomendados para mejorar el rendimiento
CREATE INDEX idx_usuario_auth0_user_id ON usuario(auth0_user_id);
CREATE INDEX idx_empleado_email ON empleado(email);
CREATE INDEX idx_menu_ruta ON menu(ruta);