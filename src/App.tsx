import { useState } from 'react';
import ScannerAI from './ScannerAI';
import RecetasDulces from './RecetasDulces';
import aiMockup from './assets/ai_scanner_mockup.png';
import dulcesMockup from './assets/dulces_mockup.png';
import './App.css';

type ViewState = 'login' | 'dashboard' | 'upsell' | 'module' | 'scanner' | 'dulces';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('login');

  return (
    <div className="app-container">
      {currentView === 'login' && <Login onLogin={() => setCurrentView('dashboard')} />}
      {currentView === 'dashboard' && <Dashboard onNavigate={setCurrentView} />}
      {currentView === 'upsell' && <Upsell onNavigate={setCurrentView} />}
      {currentView === 'scanner' && <ScannerAI onNavigate={setCurrentView} />}
      {currentView === 'dulces' && <RecetasDulces onNavigate={setCurrentView} />}
    </div>
  );
}

function Login({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase().trim() === 'empezar22') {
      onLogin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <div className="login-screen">
      <div className="login-card glass-panel">
        <h1 className="brand-logo-text">Dieta de <span className="accent">22 dias</span></h1>
        <p className="login-subtitle">Área Exclusiva de Miembros</p>
        
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Correo Electrónico</label>
            <input type="email" placeholder="tu@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Contraseña VIP</label>
            <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          {error && <p style={{ color: '#ff4d4d', fontSize: '0.9rem', marginBottom: '16px', textAlign: 'center' }}>Contraseña incorrecta. Revisa tu correo de bienvenida.</p>}
          <button type="submit" className="btn-primary login-btn">Entrar al Programa</button>
        </form>
      </div>
    </div>
  );
}

function Dashboard({ onNavigate }: { onNavigate: (view: ViewState) => void }) {
  const materials = [
    { title: 'Libro Principal: Dieta de 22 Días', desc: 'Guía paso a paso', file: 'DIETA_DE_22_DIAS_LIBRO.pdf', icon: '📖' },
    { title: 'Primera Fase (8 Días)', desc: 'Desafío y Desintoxicación', file: 'PRIMERA_FASE.pdf', icon: '🔥' },
    { title: 'Segunda Fase (7 Días)', desc: 'Segunda Semana de Mantenimiento', file: 'SEGUNDA_FASE.pdf', icon: '🚀' },
    { title: 'Tercera Fase Oficial', desc: 'Finaliza tus 22 días con éxito', file: 'TERCERA_FASE.pdf', icon: '🏆' },
    { title: 'Lista de Compras y Alimentos', desc: 'Prepara tu despensa con lo necesario', file: 'LISTA_COMPRAS.pdf', icon: '🛒' },
    { title: 'Jugos Detox - Bebida Bomba', desc: 'Acelera tu metabolismo', file: 'JUGOS_DETOX.pdf', icon: '🥤' },
    { title: 'Sopas Saludables', desc: 'Para calentarte y adelgazar', file: 'SOPAS_SALUDABLES.pdf', icon: '🥣' },
    { title: 'Loncheras Fitness', desc: 'Lleva tus comidas a cualquier parte', file: 'LONCHERAS_FITNESS.pdf', icon: '🍱' },
    { title: '200 Recetas para Adelgazar', desc: 'No te quedes sin ideas', file: '200_RECETAS.pdf', icon: '🥗' },
  ];

  return (
    <div className="dashboard-screen">
      <nav className="navbar">
        <div className="nav-logo">D22D</div>
        <div className="nav-actions">
          <button className="nav-link active" onClick={() => onNavigate('dashboard')}>Programa</button>
          <button className="nav-link" onClick={() => onNavigate('upsell')} style={{ color: 'var(--secondary)' }}>✨ Mejoras</button>
          <button className="nav-link" onClick={() => onNavigate('login')}>Salir</button>
        </div>
      </nav>

      <header className="dashboard-header">
        <h1>Bienvenido a tu Transformación</h1>
        <p>Sigue el programa y usa los recetarios para obtener mejores resultados.</p>
      </header>

      <div className="days-grid">
        <div className="day-card" style={{ background: 'var(--primary)', color: 'white', border: 'none' }}>
           <h3 style={{ color: 'white' }}>🌟 Empieza Aquí</h3>
           <p style={{ color: 'rgba(255,255,255,0.8)' }}>Abre el Libro Principal y la Lista de Compras para empezar hoy mismo.</p>
           <a href="/materiais/DIETA_DE_22_DIAS_LIBRO.pdf" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ marginTop: '10px', padding: '10px 20px', display: 'inline-block', textDecoration: 'none' }}>Leer Libro Principal</a>
        </div>
        
        {materials.map((item, i) => (
          <a href={`/materiais/${item.file}`} target="_blank" rel="noopener noreferrer" className="day-card" key={i} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
            <span className="day-badge">{item.icon} Material Oficial</span>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
            <div className="day-action">Ver Documento PDF</div>
          </a>
        ))}
      </div>
    </div>
  );
}

function Upsell({ onNavigate }: { onNavigate: (view: ViewState) => void }) {
  return (
    <div className="dashboard-screen">
      <nav className="navbar">
        <div className="nav-logo">D22D</div>
        <div className="nav-actions">
          <button className="nav-link" onClick={() => onNavigate('dashboard')}>Programa</button>
          <button className="nav-link active" onClick={() => onNavigate('upsell')} style={{ color: 'var(--secondary)' }}>✨ Mejoras</button>
          <button className="nav-link" onClick={() => onNavigate('login')}>Salir</button>
        </div>
      </nav>

      <header className="upsell-header">
        <h1>Acelera tus Resultados</h1>
        <p>Productos exclusivos pensados para complementar tu dieta.</p>
      </header>

      <div className="offers-list">
        
        {/* Nova Oferta Irresistível */}
        <div className="offer-card" style={{ borderColor: 'var(--secondary)', boxShadow: '0 10px 30px rgba(224, 53, 49, 0.2)' }}>
          <img className="offer-image" src={aiMockup} alt="Mockup Escáner" />
          <div className="offer-content">
            <span className="offer-tag" style={{ background: 'var(--secondary)', color: 'white' }}>Oferta Irresistible</span>
            <h3>Nutricionista AI De Bolsillo (Escáner de Platos)</h3>
            <p>¿No sabes si tu plato es saludable? Toma una foto de tu almuerzo o cena y nuestra Inteligencia Artificial calculará al instante cuántas calorías y carbohidratos tiene de forma automática. ¡Cero matemáticas!</p>
            <div className="offer-price" style={{ color: 'var(--primary)' }}>
              $9.99<span style={{ fontSize: '1rem', color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 'bold' }}>/mes</span> <span style={{ marginLeft: '12px' }}>$49.90</span>
            </div>
            <a href="https://pay.hotmart.com/O99924863P?checkoutMode=10" target="_blank" rel="noreferrer" className="btn-accent" style={{ background: 'linear-gradient(135deg, var(--secondary), #ff4d4d)', textDecoration: 'none', display: 'inline-block' }}>
              Desbloquear Escáner AI
            </a>
          </div>
        </div>

        <div className="offer-card">
          <img className="offer-image" src={dulcesMockup} alt="Mockup Recetas Dulces" />
          <div className="offer-content">
            <span className="offer-tag">Más Vendido</span>
            <h3>100 Recetas Dulces Sin Azúcar</h3>
            <p>No abandones los postres. Descubre cómo hacer deliciosas tartas, galletas y helados que te ayudan a adelgazar sin culpa.</p>
            <div className="offer-price">
              $9.90 <span>$29.90</span>
            </div>
            <button className="btn-accent" style={{ background: '#a03b5b' }} onClick={() => onNavigate('dulces')}>
              Abrir Biblioteca de Recetas
            </button>
          </div>
        </div>

        <div className="offer-card">
          <div className="offer-image">
            💪
          </div>
          <div className="offer-content">
            <span className="offer-tag">Nuevo</span>
            <h3>Reto de Glúteos 22 Días</h3>
            <p>Rutinas de ejercicios de 15 minutos diarios para tonificar y aumentar glúteos en casa y sin equipo.</p>
            <div className="offer-price">
              $9.90 <span>$19.90</span>
            </div>
            <a href="#" className="btn-accent" style={{ textDecoration: 'none', display: 'inline-block' }}>
              Añadir a mi cuenta
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
