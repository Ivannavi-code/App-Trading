# 🚀 TRADING SIGNALS - REACT NATIVE PURO

## ✅ SIN EXPO - CÓDIGO PURO

Esta es la versión **React Native pura** (sin Expo) lista para compilar en CodeMagic.

---

## 🔥 CONEXIONES

### **Firebase:**
- ✅ Firestore en tiempo real
- ✅ Cloud Messaging (notificaciones push)
- ✅ Configurado con `google-services.json`

### **Railway:**
- ✅ API para registrar dispositivos
- ✅ Health checks
- ✅ Estadísticas del worker

---

## 📦 ESTRUCTURA

```
trading-rn-pure/
├── android/                    # Configuración Android
│   ├── app/
│   │   ├── build.gradle        # Build config
│   │   └── google-services.json # Firebase
│   └── build.gradle            # Root config
├── src/
│   ├── screens/                # Pantallas
│   │   ├── DashboardScreen.js
│   │   ├── SignalDetailScreen.js
│   │   └── SettingsScreen.js
│   ├── services/               # Servicios
│   │   ├── firebase.js         # Firebase service
│   │   └── railway.js          # Railway API
│   └── config/                 # Configuración
├── App.js                      # App principal
├── package.json                # Dependencias
└── codemagic.yaml              # Config CodeMagic
```

---

## 🚀 COMPILAR CON CODEMAGIC

### **1. Subir a GitHub**

```bash
# Inicializar git
git init
git add .
git commit -m "Initial commit"

# Crear repo en GitHub
# Subir código
git remote add origin https://github.com/TU-USUARIO/trading-signals.git
git push -u origin main
```

### **2. Configurar CodeMagic**

1. Ve a https://codemagic.io
2. **Sign up with GitHub**
3. **Add application**
4. Selecciona: `trading-signals`
5. CodeMagic detecta `codemagic.yaml`

### **3. Configurar Variables**

En CodeMagic → Environment variables:

```
RAILWAY_API_URL=https://tu-worker.railway.app
```

### **4. Start Build**

Click **"Start new build"**

**Proceso:**
```
[1/5] Cloning...              (1 min)
[2/5] Installing deps...       (3 min)
[3/5] Building Android...      (10 min)
[4/5] Packaging APK...         (2 min)
[5/5] Publishing...            (1 min)

✅ APK listo!
```

---

## 🔥 SERVICIOS CONFIGURADOS

### **Firebase Service (`src/services/firebase.js`)**

```javascript
// Escuchar señales en tiempo real
subscribeToSignals((signals) => {
  console.log('Nuevas señales:', signals);
});

// Configurar notificaciones
const token = await setupNotifications();

// Manejar notificaciones
onMessageReceived((message) => {
  console.log('Notificación:', message);
});
```

### **Railway Service (`src/services/railway.js`)**

```javascript
// Registrar dispositivo
await registerDevice(fcmToken);

// Obtener estadísticas
const stats = await getWorkerStats();

// Health check
const isHealthy = await checkWorkerHealth();
```

---

## 🎯 CONFIGURAR RAILWAY API

En tu worker de Python (Railway), agrega estos endpoints:

### **`/api/register-device` (POST)**

```python
@app.route('/api/register-device', methods=['POST'])
def register_device():
    data = request.json
    token = data.get('token')
    platform = data.get('platform')
    
    # Guardar token en Firebase o base de datos
    # Para enviar notificaciones después
    
    return jsonify({'success': True})
```

### **`/api/stats` (GET)**

```python
@app.route('/api/stats', methods=['GET'])
def get_stats():
    return jsonify({
        'signals_today': 12,
        'accuracy': 85.5,
        'pairs_monitored': 6
    })
```

### **`/api/health` (GET)**

```python
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'ok'})
```

---

## 📱 FLUJO COMPLETO

```
1. Usuario abre app
   ↓
2. App se conecta a Firebase
   ↓
3. Escucha señales en tiempo real
   ↓
4. Cuando hay señal nueva en Firestore
   ↓
5. App la muestra automáticamente
   ↓
6. App registra token FCM en Railway
   ↓
7. Worker Python detecta señal nueva
   ↓
8. Worker envía notificación push
   ↓
9. Usuario recibe notificación
```

---

## 🔧 MODIFICAR URL DE RAILWAY

Edita `src/services/railway.js`:

```javascript
const RAILWAY_API_URL = 'https://tu-worker.railway.app/api';
```

Reemplaza con tu URL real de Railway.

---

## ⏱️ TIEMPO DE COMPILACIÓN

```
Subir a GitHub:     5 min
Configurar CodeMagic: 3 min
Build automático:   15 min
──────────────────────────
TOTAL:             23 min
```

---

## 💰 COSTOS

```
GitHub:         $0
CodeMagic:      $0 (500 min/mes)
Firebase:       $0 (plan gratis)
Railway:        $0 (trial)
───────────────────────────
TOTAL:         $0 ✅
```

---

## ✅ VENTAJAS VS EXPO

| Aspecto | Expo | RN Puro |
|---------|------|---------|
| Tamaño APK | ~40MB | ~15MB |
| Firebase nativo | ❌ Limitado | ✅ Completo |
| Notificaciones | ⚠️ Limitadas | ✅ Nativas |
| Personalización | ❌ Limitada | ✅ Total |
| Build en CodeMagic | ⚠️ Complejo | ✅ Simple |

---

## 🎯 PRÓXIMOS PASOS

1. **Sube a GitHub**
2. **Conecta con CodeMagic**
3. **Configura variables**
4. **Start build**
5. **Descarga APK**
6. **¡Listo!**

---

## 🆘 AYUDA

Si necesitas:
- Configurar endpoints en Railway
- Enviar notificaciones push desde Python
- Modificar la app

¡Avísame! 🚀
