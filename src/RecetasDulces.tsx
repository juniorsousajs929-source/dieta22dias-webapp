import { useState } from 'react';
import { sweetRecipes, type Recipe } from './data/recipes';

export default function RecetasDulces({ onNavigate }: { onNavigate: (view: any) => void }) {
  const [hasDulces, setHasDulces] = useState(localStorage.getItem('hasDulcesAuth') === 'true');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showPaywall, setShowPaywall] = useState(false);
  const [vipCode, setVipCode] = useState('');
  const [codeError, setCodeError] = useState(false);

  const handleUnlock = () => {
    if (vipCode.toUpperCase().trim() === 'VIPDOCES' || vipCode.toUpperCase().trim() === 'DOCESVIP') {
      localStorage.setItem('hasDulcesAuth', 'true');
      setHasDulces(true);
      setShowPaywall(false);
    } else {
      setCodeError(true);
      setTimeout(() => setCodeError(false), 3000);
    }
  };

  const handleRecipeClick = (recipe: Recipe, index: number) => {
    if(index < 3 || hasDulces) {
      setSelectedRecipe(recipe);
    } else {
      setShowPaywall(true);
    }
  };

  // Exibindo apenas a galeria premium
  return (
    <div className="dashboard-screen" style={{ backgroundColor: '#Fef9f6', position: 'relative' }}>
      {showPaywall && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="recipe-card-full" style={{ maxWidth: '500px', textAlign: 'center', padding: '40px' }}>
             <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🔒</div>
             <h2 style={{ color: '#a03b5b', marginBottom: '16px' }}>Receta Premium Bloqueada</h2>
             <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Para acceder a esta receta y al catálogo completo de las 100 Recetas Dulces Sin Azúcar, debes adquirir la expansión por solo <strong>$9.90</strong>.</p>
             <a href="https://pay.hotmart.com/X90800354F?off=h6bmjn3q&checkoutMode=10" target="_blank" rel="noreferrer" className="btn-accent" style={{ background: '#a03b5b', width: '100%', marginBottom: '16px', display: 'block', textDecoration: 'none' }}>
               Adquirir Ahora - $9.90
             </a>
             
             <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(0,0,0,0.02)', borderRadius: '12px' }}>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '8px' }}>¿Ya compraste la expansión y tienes tu Código VIP?</p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input 
                    type="text" 
                    placeholder="Escribe tu Código..." 
                    value={vipCode}
                    onChange={(e) => setVipCode(e.target.value)}
                    style={{ flex: 1, padding: '12px', borderRadius: '8px', border: codeError ? '2px solid red' : '1px solid #ccc' }}
                  />
                  <button onClick={handleUnlock} style={{ padding: '0 20px', borderRadius: '8px', background: '#333', color: 'white', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>✅</button>
                </div>
                {codeError && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '8px' }}>Código incorrecto</p>}
             </div>

             <button className="btn-secondary" style={{ width: '100%', marginTop: '24px' }} onClick={() => setShowPaywall(false)}>
               Volver a las recetas gratis
             </button>
          </div>
        </div>
      )}

      <nav className="navbar">
        <div className="nav-logo">D22D <span className="ai-badge" style={{ background: '#a03b5b' }}>DULCES</span></div>
        <div className="nav-actions">
          <button className="nav-link" onClick={() => onNavigate('dashboard')}>Programa</button>
          <button className="nav-link" onClick={() => onNavigate('upsell')}>Mejoras</button>
          <button className="nav-link" onClick={() => onNavigate('scanner')}>Escáner AI</button>
          <button className="nav-link active" style={{ color: '#a03b5b' }}>Postres</button>
        </div>
      </nav>

      {selectedRecipe ? (
        <div className="recipe-viewer">
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
             <button className="btn-secondary" onClick={() => setSelectedRecipe(null)}>
               ← Volver a la Biblioteca
             </button>
             {hasDulces && <span className="offer-tag" style={{ background: '#a03b5b', color: 'white', margin: 0 }}>🌟 Sócio Premium</span>}
           </div>
           <div className="recipe-card-full glass-panel">
             <div className="recipe-head">
                <div className="recipe-emoji-huge">{selectedRecipe.emoji}</div>
                <h2>{selectedRecipe.title}</h2>
                <div className="recipe-metrics">
                   <span>🔥 {selectedRecipe.calories} kcal</span>
                   <span>⏱️ {selectedRecipe.time} prep</span>
                </div>
             </div>
             
             <div className="recipe-body">
                <div className="ingredients-box">
                   <h3>Ingredientes Requeridos</h3>
                   <ul>
                     {selectedRecipe.ingredients.map((ing, i) => (
                       <li key={i}>{ing}</li>
                     ))}
                   </ul>
                </div>
                
                <div className="instructions-box">
                   <h3>Paso a Paso Magistral</h3>
                   <p>{selectedRecipe.instructions}</p>
                </div>
             </div>
             
             <div className="recipe-footer">
               <p>Esta receta te mantiene en la fase de quemar grasa acelerada y no bloquea tu progreso en los 22 Días. ✨</p>
             </div>
           </div>
        </div>
      ) : (
        <div className="recipes-library">
          <div className="library-header">
            <h1 style={{ color: '#a03b5b' }}>100 Recetas Dulces Sin Azúcar</h1>
            <p>Volumen 1: La Colección Premium Exclusiva. ¡Come tus postres favoritos mientras bajas de peso rápido y sin culpa!</p>
          </div>

          <div className="recipe-grid">
            {sweetRecipes.map((recipe, index) => {
              const isLocked = !hasDulces && index >= 3;
              return (
              <div className="recipe-thumb" key={recipe.id} onClick={() => handleRecipeClick(recipe, index)} style={{ opacity: isLocked ? 0.85 : 1, position: 'relative' }}>
                <div className="thumb-emoji">{recipe.emoji}</div>
                <div className="thumb-info">
                   <h4>{recipe.title}</h4>
                   <p>{recipe.time} • {recipe.calories} kcal</p>
                </div>
                {!isLocked ? (
                  <div className="thumb-action">Ver Receta →</div>
                ) : (
                  <div className="thumb-action" style={{ color: '#e03531' }}>🔒 Desbloquear Receta</div>
                )}
              </div>
            )})}
            
            <div className="recipe-thumb upcoming-vol">
               <div className="thumb-emoji">⏳</div>
               <div className="thumb-info">
                  <h4>Volumen 2 (75 restantes)</h4>
                  <p>En desarrollo. Manten tu membresía para desbloquear en breve.</p>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
