import React, { useState } from 'react';

type Frase = { id: number; texto: string };

const frases: Frase[] = [
  { id: 1, texto: "Publicar una foto con tus amigos en Instagram" },
  { id: 2, texto: "Compartir información personal con desconocidos" },
  { id: 3, texto: "Ayudar a un compañero con sus tareas" },
  { id: 4, texto: "Hacer comentarios ofensivos en redes sociales" },
  { id: 5, texto: "Crear un grupo para organizar actividades escolares" },
  { id: 6, texto: "Excluir a alguien de un chat grupal" },
  { id: 7, texto: "Denunciar contenido inapropiado en redes" },
  { id: 8, texto: "Compartir memes sin consentimiento" },
  { id: 9, texto: "Felicitaciones públicas por logros escolares" },
  { id: 10, texto: "Difundir rumores o noticias falsas" }
];

const colores = [
  { nombre: "", color: "red" },
  { nombre: "", color: "yellow" },
  { nombre: "", color: "green" }
];

function App() {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [frasesDisponibles, setFrasesDisponibles] = useState<Frase[]>(frases);
  const [semaforo, setSemaforo] = useState<Frase[][]>([[], [], []]);
  const [fraseSeleccionada, setFraseSeleccionada] = useState<Frase | null>(null);

  const handleFraseClick = (frase: Frase) => {
    setFraseSeleccionada(frase);
  };

  const handleLuzSeleccionada = (colorIdx: number) => {
    if (!fraseSeleccionada) return;
    setFrasesDisponibles(frasesDisponibles.filter(f => f.id !== fraseSeleccionada.id));
    setSemaforo(semaforo.map((arr, idx) => idx === colorIdx ? [...arr, fraseSeleccionada] : arr));
    setFraseSeleccionada(null);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #23243a 0%, #2c2f4a 100%)',
      color: '#fff',
      fontFamily: 'sans-serif'
    }}>
      {/* Navbar */}
      <nav style={{
        width: '100%',
        background: 'rgba(30,32,50,0.95)',
        padding: '10px 0',
        boxShadow: '0 2px 8px #0004',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 2000
      }}>
        <img
          src="/logo.png"
          alt="Logo PRoA"
          style={{
            height: 44,
            marginRight: 12,
            borderRadius: '50%',
            background: '#fff',
            boxShadow: '0 2px 8px #0002'
          }}
        />
        <span style={{
          fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
          fontWeight: 'bold',
          letterSpacing: 2,
          color: '#fff'
        }}>
          Escuela Experimental PRoA
        </span>
      </nav>

      <div style={{
        paddingTop: 40,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
      }}>
        <h2 style={{
          textAlign: 'center',
          marginBottom: 10,
          fontSize: 'clamp(1.2rem, 4vw, 2rem)'
        }}>
          Semáforo de Convivencia Escolar y Redes Sociales
        </h2>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          marginBottom: 20
        }}>
          <button onClick={() => setModalAbierto(true)} style={{
            padding: '10px 20px',
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            background: '#3b3e5a',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            boxShadow: '0 2px 8px #0002',
            cursor: 'pointer',
            margin: '0 auto',
            display: 'block'
          }}>
            Ver frases
          </button>
        </div>
        {/* Semáforo rectangular */}
        <div style={{
          background: '#222',
          width: '90vw',
          maxWidth: 340,
          padding: '30px 0',
          borderRadius: '40px',
          margin: '30px auto',
          boxShadow: '0 0 20px #000',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '30px'
        }}>
          {colores.map((c, idx) => (
            <div
              key={c.color}
              style={{
                background: c.color,
                width: '70vw',
                maxWidth: 220,
                height: '70vw',
                maxHeight: 220,
                borderRadius: '50%',
                boxShadow: `0 0 20px ${c.color}`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                color: c.color === 'yellow' ? '#222' : '#fff',
                overflowY: 'auto',
                padding: 10,
                border: '3px solid #fff'
              }}>
              <span>{c.nombre}</span>
              {semaforo[idx].map(f => (
                <div key={f.id} style={{
                  background: '#fff',
                  color: '#222',
                  margin: '8px 0',
                  padding: '8px 12px',
                  borderRadius: 8,
                  fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                  boxShadow: '0 1px 4px #0002',
                  border: '2px solid #888',
                  cursor: 'default',
                  wordBreak: 'break-word',
                  maxWidth: '90%'
                }}>
                  {f.texto}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Modal de frases */}
      {modalAbierto && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: '#0008',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#23243a',
            padding: 20,
            borderRadius: 16,
            minWidth: '70vw',
            maxWidth: 400,
            boxShadow: '0 4px 24px #0005',
            maxHeight: '80vh',
            overflowY: 'auto',
            position: 'relative',
            color: '#fff'
          }}>
            <h3 style={{ fontSize: 'clamp(1.1rem, 2vw, 1.3rem)' }}>Frases para acomodar en el semáforo</h3>
            <button onClick={() => setModalAbierto(false)} style={{
              position: 'absolute',
              top: 10,
              right: 15,
              fontSize: 22,
              background: 'none',
              border: 'none',
              color: '#fff',
              cursor: 'pointer'
            }}>✖</button>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {frasesDisponibles.map(f => (
                <li
                  key={f.id}
                  onClick={() => handleFraseClick(f)}
                  style={{
                    background: '#2c2f4a',
                    margin: '10px 0',
                    padding: '10px 15px',
                    borderRadius: 8,
                    border: '2px solid #888',
                    cursor: 'pointer',
                    fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                    boxShadow: '0 1px 4px #0001',
                    transition: 'background 0.2s',
                    userSelect: 'none',
                    wordBreak: 'break-word'
                  }}
                >
                  {f.texto}
                </li>
              ))}
            </ul>
            <p style={{ fontSize: 13, color: '#bbb', marginTop: 10 }}>
              Hacé click en una frase y elegí la luz donde la querés poner.
            </p>
          </div>
        </div>
      )}

      {/* Modal para elegir luz */}
      {fraseSeleccionada && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: '#0008',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1100
        }}>
          <div style={{
            background: '#23243a',
            padding: 20,
            borderRadius: 16,
            minWidth: '60vw',
            maxWidth: 350,
            boxShadow: '0 4px 24px #0005',
            textAlign: 'center',
            color: '#fff'
          }}>
            <h4 style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}>¿Dónde querés poner esta frase?</h4>
            <div style={{
              margin: '20px 0',
              padding: '10px 15px',
              borderRadius: 8,
              border: '2px solid #888',
              background: '#2c2f4a',
              fontSize: 'clamp(1rem, 2vw, 1.1rem)',
              wordBreak: 'break-word'
            }}>
              {fraseSeleccionada.texto}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
              {colores.map((c, idx) => (
                <button
                  key={c.color}
                  onClick={() => handleLuzSeleccionada(idx)}
                  style={{
                    background: c.color,
                    color: c.color === 'yellow' ? '#222' : '#fff',
                    border: 'none',
                    borderRadius: 8,
                    padding: '10px 18px',
                    fontWeight: 'bold',
                    fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                    boxShadow: `0 0 8px ${c.color}`,
                    cursor: 'pointer',
                    marginBottom: 10
                  }}
                >
                  {c.nombre}
                </button>
              ))}
            </div>
            <button onClick={() => setFraseSeleccionada(null)} style={{
              marginTop: 20,
              background: '#3b3e5a',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '8px 16px',
              cursor: 'pointer'
            }}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;