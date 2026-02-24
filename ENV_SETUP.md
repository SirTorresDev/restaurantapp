# Configuración de Variables de Entorno

## Configuración Inicial

Para proteger las credenciales de Firebase, este proyecto utiliza variables de entorno con react-native-dotenv.

### 1. Copiar el archivo de ejemplo

```bash
cp .env.example .env
```

### 2. Completar las credenciales

Edita el archivo `.env` y reemplaza los valores de ejemplo con tus credenciales reales de Firebase:

```
FIREBASE_API_KEY=tu_api_key_real
FIREBASE_AUTH_DOMAIN=tu_auth_domain_real
FIREBASE_PROJECT_ID=tu_project_id_real
FIREBASE_STORAGE_BUCKET=tu_storage_bucket_real
FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id_real
FIREBASE_APP_ID=tu_app_id_real
FIREBASE_MEASUREMENT_ID=tu_measurement_id_real
```

### 3. Limpiar cache y reiniciar Metro

Después de crear/modificar el archivo `.env`, limpia la cache y reinicia:

```bash
npx react-native start --reset-cache
```

En otra terminal:

```bash
# Para Android
npx react-native run-android

# Para iOS
npx react-native run-ios
```

## ⚠️ Importante

- **NUNCA** commitees el archivo `.env` a Git
- El archivo `.env` está incluido en `.gitignore`
- Comparte solo el archivo `.env.example` en el repositorio
- Cada desarrollador debe crear su propio archivo `.env` local
- Si modificas `.env`, debes reiniciar Metro con `--reset-cache`
