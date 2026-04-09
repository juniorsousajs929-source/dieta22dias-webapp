import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

export default function ScannerAI({ onNavigate }: { onNavigate: (view: any) => void }) {
  const [hasScanner, setHasScanner] = useState(localStorage.getItem('hasScannerAuth') === 'true');
  const [vipCode, setVipCode] = useState('');
  const [codeError, setCodeError] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Guardamos la llave de forma local si el usuario la provee
  const [apiKey, setApiKey] = useState(localStorage.getItem('gemini_api_key') || '');
  const [showConfig, setShowConfig] = useState(!localStorage.getItem('gemini_api_key'));

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleSaveKey = () => {
    localStorage.setItem('gemini_api_key', apiKey);
    setShowConfig(false);
  };

  // Convert file to base64
  function fileToGenerativePart(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = (reader.result as string).split(',')[1];
        resolve({
          inlineData: {
            data: base64data,
            mimeType: file.type
          }
        });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  const analyzeImage = async () => {
    if (!image || !apiKey) return;
    
    setLoading(true);
    setResult(null);

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const imagePart = await fileToGenerativePart(image);

      const prompt = `
        Eres una nutricionista profesional, estricta y experta del programa "Dieta de los 22 Días". 
        Tu objetivo es garantizar resultados, por lo que tu tono es directo, seguro y muy conciso (sin textos largos ni cansativos).
        Analiza la imagen de la comida y responde ÚNICAMENTE con esta estructura rápida:

        🍲 **Plato:** (Qué identificas de forma breve)
        🔥 **Estimación:** ~[X] kcal | [X]g Carbohidratos
        ⚖️ **Veredicto:** (Si el plato es incorrecto o rompe la dieta, dile que necesita realinear inmediatamente su comida para seguir firme en el proyecto. Si está bien, elógiala brevemente).
        🍽️ **Próxima Comida:** (Deduce qué comida sigue según el plato de la foto. Ofrece SIEMPRE sugerencias variadas, dinámicas y deliciosas para que el usuario nunca se aburra de comer lo mismo. Luego dile: *"Recuerda que este platillo o sus variaciones las tienes paso a paso en tu Libro Oficial de 200 Recetas"*).
        💪 **Ejercicio Rápido:** (Sugiere una mini-serie de ejercicios cortos para acompañar la digestión de este plato).

        Regla de oro: Respuestas súper cortas, directas y variadas en cada interacción. Fáciles de leer en un celular.
      `;

      const modelsToTry = [
        "gemini-2.5-flash", 
        "gemini-2.5-pro", 
        "gemini-2.0-flash"
      ];
      let text = "";
      let rawRespObj: any = null;
      let errorsDetails = "";

      for (const modelName of modelsToTry) {
        try {
          const model = genAI.getGenerativeModel({ model: modelName });
          const result = await model.generateContent([prompt, imagePart as any]);
          const response = await result.response;
          rawRespObj = response;
          text = response.text();
          if (!text) {
             throw new Error("Respuesta vacia del modelo. Raw: " + JSON.stringify(response));
          }
          break; // Sucesso, quebra o loop!
        } catch (err: any) {
          console.warn(`Model ${modelName} falló:`, err.message || err);
          errorsDetails += `[Fallo ${modelName}]: ${err.message || err.toString()}\n`;
        }
      }

      if (!text) {
        throw new Error("Múltiples fallos o respuesta vacia: \n" + errorsDetails + "\nRaw Data: " + JSON.stringify(rawRespObj));
      }
      
      setResult(text);
    } catch (error: any) {
      console.error(error);
      
      // Auto-diagnóstico de la clave
      let diagMsg = `❌ Hubo un error de conexión.\nDetalle: ${error?.message || error}`;
      try {
         const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
         if (resp.ok) {
            const data = await resp.json();
            const allowedModels = data.models ? data.models.map((m: any) => m.name).join(", ") : "Ninguno";
            diagMsg += `\n\n🔍 Modelos permitidos en tu clave:\n${allowedModels.substring(0, 300)}...`;
         } else {
            const errData = await resp.json();
            diagMsg += `\n\n⚠️ Tu clave no parce ser válida o no tiene permisos: ${errData.error?.message}`;
         }
      } catch (e) {
         // ignora o erro secundário
      }
      
      setResult(diagMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleUnlock = () => {
    if (vipCode.toUpperCase().trim() === 'VIPSCANNER' || vipCode.toUpperCase().trim() === 'SCANNERVIP') {
      localStorage.setItem('hasScannerAuth', 'true');
      setHasScanner(true);
    } else {
      setCodeError(true);
      setTimeout(() => setCodeError(false), 3000);
    }
  };

  return (
    <div className="dashboard-screen">
      {!hasScanner && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.9)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="recipe-card-full" style={{ maxWidth: '500px', textAlign: 'center', padding: '40px', background: '#1c1c1e', border: '1px solid #333' }}>
             <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🤖🔒</div>
             <h2 style={{ color: 'var(--secondary)', marginBottom: '16px' }}>Nutricionista AI Bloqueada</h2>
             <p style={{ color: '#aaa', marginBottom: '32px' }}>Para utilizar la Inteligencia Artificial y analizar tus platos, debes adquirir el Pase Premium Mensual por <strong>$9.99/mes</strong>.</p>
             <a href="https://pay.hotmart.com/O99924863P?checkoutMode=10" target="_blank" rel="noreferrer" className="btn-accent" style={{ background: 'linear-gradient(135deg, var(--secondary), #ff4d4d)', width: '100%', marginBottom: '16px', display: 'block', textDecoration: 'none' }}>
               Adquirir Ahora - $9.99
             </a>
             
             <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                <p style={{ fontSize: '0.9rem', color: '#888', marginBottom: '8px' }}>¿Ya tienes tu Código VIP?</p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input 
                    type="text" 
                    placeholder="Escribe tu Código..." 
                    value={vipCode}
                    onChange={(e) => setVipCode(e.target.value)}
                    style={{ flex: 1, padding: '12px', borderRadius: '8px', border: codeError ? '2px solid red' : '1px solid #444', background: '#2c2c2e', color: '#fff' }}
                  />
                  <button onClick={handleUnlock} style={{ padding: '0 20px', borderRadius: '8px', background: '#a03b5b', color: 'white', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>✅</button>
                </div>
                {codeError && <p style={{ color: '#ff4d4d', fontSize: '0.8rem', marginTop: '8px' }}>Código incorrecto</p>}
             </div>

             <button className="btn-secondary" style={{ width: '100%', marginTop: '24px', background: '#333', color: '#fff' }} onClick={() => onNavigate('dashboard')}>
               Volver al Programa
             </button>
          </div>
        </div>
      )}

      <nav className="navbar">
        <div className="nav-logo">D22D <span className="ai-badge">AI</span></div>
        <div className="nav-actions">
          <button className="nav-link" onClick={() => onNavigate('dashboard')}>Programa</button>
          <button className="nav-link" onClick={() => onNavigate('upsell')}>✨ Mejoras</button>
          <button className="nav-link active" style={{ color: 'var(--primary)' }}>Escáner AI</button>
          <button className="nav-link" onClick={() => onNavigate('login')}>Salir</button>
        </div>
      </nav>

      <div className="scanner-container">
        <div className="scanner-header">
          <h1>Nutricionista AI De Bolsillo {hasScanner && <span style={{fontSize: '0.8rem', background: '#a03b5b', color: 'white', padding: '4px 8px', borderRadius: '8px', verticalAlign: 'middle', marginLeft: '8px'}}>VIP</span>}</h1>
          <p>Toma una foto de tu plato y descubre las calorías y carbohidratos en segundos.</p>
        </div>

        {showConfig ? (
          <div className="api-key-config glass-panel">
             <h3>⚙️ Configuración del Escáner</h3>
             <p>Ingresa tu clave de IA para activar la cámara mágica. Solo el administrador necesita hacer esto la primera vez.</p>
             <input 
               type="password" 
               placeholder="Pega la API Key aquí..." 
               value={apiKey} 
               onChange={(e) => setApiKey(e.target.value)}
             />
             <button className="btn-primary" onClick={handleSaveKey}>Activar Inteligencia Artificial</button>
          </div>
        ) : (
          <div className="scanner-app glass-panel">
            {!previewUrl ? (
              <div className="upload-zone">
                <div className="upload-icon">📸</div>
                <p>Toca para tomar una foto del plato<br/> o subir una imagen</p>
                <input type="file" accept="image/*" onChange={handleImageChange} />
              </div>
            ) : (
              <div className="preview-zone">
                <img src={previewUrl} alt="Plato" className="dish-preview" />
                <div className="preview-actions">
                  <button className="btn-secondary" onClick={() => { setPreviewUrl(null); setImage(null); setResult(null); }}>Cambiar foto</button>
                  <button className="btn-accent" onClick={analyzeImage} disabled={loading}>
                    {loading ? "Analizando plato... ⏳" : "Evaluar Nutrientes 🤖"}
                  </button>
                </div>
              </div>
            )}

            {result && (
              <div className="ai-result">
                <h3>👩‍⚕️ Tu Nutricionista Dice:</h3>
                <div className="result-content" style={{ whiteSpace: 'pre-wrap' }}>
                  {result}
                </div>
                {result.includes("❌ Hubo un error") && (
                  <button className="btn-secondary" style={{ marginTop: '20px' }} onClick={() => setShowConfig(true)}>
                    ⚙️ Reconfigurar Llave de IA
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
