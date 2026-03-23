# 📝 Guía de Local Storage – Código JS y Ejemplos

Local Storage permite guardar datos persistentes en el navegador.  
Solo almacena **strings**, por lo que para objetos o arrays se debe usar:

```js
JSON.stringify(obj); // para guardar
JSON.parse(str); // para leer
```

## 1️⃣ Guardar datos

Guardar un string

```js
localStorage.setItem("nombre", "Ana");
```

Guardar un objeto

```js
const usuario = { nombre: "Juan", edad: 25 };
localStorage.setItem("usuario", JSON.stringify(usuario));
```

## 2️⃣ Recuperar datos

Recuperar un string

```js
const nombre = localStorage.getItem("nombre");
console.log(nombre); // "Ana"
```

Recuperar un objeto

```js
const usuario = JSON.parse(localStorage.getItem("usuario"));
console.log(usuario.nombre); // "Juan"
```

## 3️⃣ Actualizar datos

Simplemente sobrescribe la clave existente:

```js
// Sobrescribir un valor
localStorage.setItem("nombre", "Pedro");
```

## 4️⃣ Eliminar datos

Eliminar un item específico

```js
localStorage.removeItem("nombre");
```

Limpiar todo Local Storage

```js
localStorage.clear();
```

## 5️⃣ Ver y explorar datos

Ver todas las claves y valores

```js
console.log(localStorage);
```

Contar cantidad de items

```js
console.log(localStorage.length);
```

Obtener clave por índice

```js
console.log(localStorage.key(0));
```

## 6️⃣ Ejemplo completo – Usuario

```js
// Guardar un usuario
localStorage.setItem(
  "usuario",
  JSON.stringify({ nombre: "Juan", correo: "juan@correo.com" }),
);

// Recuperar usuario
let usuario = JSON.parse(localStorage.getItem("usuario"));
console.log(usuario.nombre); // "Juan"

// Actualizar usuario
usuario.nombre = "Pedro";
localStorage.setItem("usuario", JSON.stringify(usuario));

// Eliminar usuario
localStorage.removeItem("usuario");

// Limpiar todo
localStorage.clear();

// Ver todas las claves
console.log(localStorage);

// Número de items guardados
console.log(localStorage.length);

const usuarios = [
  { correo: "ana@gmail.com", nombre: "Ana", edad: 25 },
  { correo: "juan@gmail.com", nombre: "Juan", edad: 30 },
  { correo: "maria@gmail.com", nombre: "María", edad: 22 },
];
```

## 7️⃣ Ejemplo – Múltiples usuarios

```js
// Guardar cada usuario usando su correo como clave
usuarios.forEach((u) => {
  localStorage.setItem("usuario\_" + u.correo, JSON.stringify(u));
});

// Recuperar todos los usuarios
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  if (key.startsWith("usuario\_")) {
    const usuario = JSON.parse(localStorage.getItem(key));
    console.log(usuario);
  }
}
```

Recomendación: Local Storage es perfecto para carritos de compras, preferencias de usuario o demos de persistencia, pero no para información sensible o multiusuario real.

## 8️⃣ Persistencia de datos

Local Storage persiste aunque cierres el navegador.

Solo se borra si:

Se usa removeItem() o clear()

Se borra la caché del navegador

Se abre en modo incógnito (los datos desaparecen al cerrar la sesión)

Diferencia con sessionStorage:

Característica localStorage sessionStorage
Persistencia Indefinida Solo sesión activa
Compartido entre dispositivos No No
Seguridad Baja Baja
Tamaño máximo ~5-10 MB ~5 MB
