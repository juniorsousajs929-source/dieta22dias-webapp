import { useState } from 'react';
import ScannerAI from './ScannerAI';
import RecetasDulces from './RecetasDulces';
import aiMockup from './assets/ai_scanner_mockup.png';
import dulcesMockup from './assets/dulces_mockup.png';
import './App.css';

type ViewState = 'login' | 'dashboard' | 'upsell' | 'module' | 'scanner' | 'dulces';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>(
    localStorage.getItem('isLoggedIn') === 'true' ? 'dashboard' : 'login'
  );

  const handleLoginSuccess = () => {
    localStorage.setItem('isLoggedIn', 'true');
    setCurrentView('dashboard');
  };

  const handleNavigate = (view: ViewState) => {
    if (view === 'login') {
      localStorage.removeItem('isLoggedIn');
    }
    setCurrentView(view);
  };

  return (
    <div className="app-container">
      {currentView === 'login' && <Login onLogin={handleLoginSuccess} />}
      {currentView === 'dashboard' && <Dashboard onNavigate={handleNavigate} />}
      {currentView === 'upsell' && <Upsell onNavigate={handleNavigate} />}
      {currentView === 'scanner' && <ScannerAI onNavigate={handleNavigate} />}
      {currentView === 'dulces' && <RecetasDulces onNavigate={handleNavigate} />}
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
          <button className="nav-link" onClick={() => onNavigate('scanner')} style={{ color: '#2ecc71', fontWeight: 'bold' }}>🤖 Escáner AI</button>
          <button className="nav-link" onClick={() => onNavigate('dulces')} style={{ color: '#a03b5b', fontWeight: 'bold' }}>🍓 Postres VIP</button>
          <button className="nav-link" onClick={() => onNavigate('login')}>Salir</button>
        </div>
      </nav>

      <header className="dashboard-header">
        <h1>Bienvenido a tu Transformación</h1>
        <p>Sigue el programa y usa las herramientas premium para obtener los mejores resultados.</p>
      </header>
      
      <div className="premium-banners" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '30px' }}>
         <div className="day-card glass-panel" style={{ background: 'linear-gradient(135deg, #111, #2c3e50)', border: '1px solid #2ecc71', padding: '24px', cursor: 'pointer', textAlign: 'center' }} onClick={() => onNavigate('scanner')}>
            <img src={aiMockup} alt="Nutricionista AI" style={{ width: '100%', maxWidth: '250px', maxHeight: '200px', objectFit: 'contain', marginBottom: '16px', filter: 'drop-shadow(0 10px 15px rgba(46,204,113,0.2))' }} />
            <h2 style={{ color: '#2ecc71', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>Nutricionista AI (Escáner)</h2>
            <p style={{ color: '#ddd', marginTop: '10px', marginBottom: '20px' }}>Toma una foto de tu plato y descubre si rompe la dieta. Analiza Calorías y Carbohidratos con Inteligencia Artificial.</p>
            <button className="btn-primary" style={{ background: '#2ecc71', width: '100%' }}>Desbloquear / Entrar</button>
         </div>
         <div className="day-card glass-panel" style={{ background: 'linear-gradient(135deg, #2a0815, #4a1525)', border: '1px solid #a03b5b', padding: '24px', cursor: 'pointer', textAlign: 'center' }} onClick={() => onNavigate('dulces')}>
            <img src={dulcesMockup} alt="100 Postres VIP" style={{ width: '100%', maxWidth: '250px', maxHeight: '200px', objectFit: 'contain', marginBottom: '16px', filter: 'drop-shadow(0 10px 15px rgba(160,59,91,0.3))' }} />
            <h2 style={{ color: '#eabfb9', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>100 Postres VIP</h2>
            <p style={{ color: '#eabfb9', opacity: 0.8, marginTop: '10px', marginBottom: '20px' }}>No sufras de antojos. Libera la colección completa de 100 Postres Dulces Sin Azúcar que queman grasa.</p>
            <button className="btn-primary" style={{ background: '#a03b5b', width: '100%' }}>Desbloquear / Ver Catálogo</button>
         </div>
      </div>

      <div className="days-grid">
        <div className="day-card" style={{ background: 'var(--primary)', color: 'white', border: 'none' }}>
           <h3 style={{ color: 'white' }}>🌟 Empieza Aquí (Módulo Base)</h3>
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
