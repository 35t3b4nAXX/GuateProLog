import React, { useState, useRef, useEffect } from 'react';

const SistemaGuatemala = () => {
  const [consulta, setConsulta] = useState('');
  const [resultado, setResultado] = useState([]);
  const [tipoConsulta, setTipoConsulta] = useState('departamentos');
  const [mensajeError, setMensajeError] = useState('');
  const [loading, setLoading] = useState(false);
  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState('');
  
  // Referencias a los elementos SVG
  const departamentosRef = useRef({});

  // Base de datos simulada
  const departamentos = [
    { nombre: 'alta_verapaz', poblacionM: 4458, poblacionH: 200 },
    { nombre: 'baja_verapaz', poblacionM: 100, poblacionH: 200 },
    { nombre: 'chimaltenango', poblacionM: 2563, poblacionH: 2054 },
    { nombre: 'chiquimula', poblacionM: 2563, poblacionH: 2054 },
    { nombre: 'peten', poblacionM: 545, poblacionH: 2254 },
    { nombre: 'progreso', poblacionM: 4546, poblacionH: 4564 },
    { nombre: 'quiche', poblacionM: 54654, poblacionH: 5454 },
    { nombre: 'escuintla', poblacionM: 546, poblacionH: 878 },
    { nombre: 'guatemala', poblacionM: 5487, poblacionH: 5485 },
    { nombre: 'huehuetenango', poblacionM: 7878, poblacionH: 548 },
    { nombre: 'izabal', poblacionM: 7895, poblacionH: 4454 },
    { nombre: 'jalapa', poblacionM: 548, poblacionH: 4532 },
    { nombre: 'jutiapa', poblacionM: 5465, poblacionH: 546 },
    { nombre: 'quetzaltenango', poblacionM: 8545, poblacionH: 44 },
    { nombre: 'retalhuleu', poblacionM: 5465, poblacionH: 54545 },
    { nombre: 'sacatepequez', poblacionM: 54454, poblacionH: 5487 },
    { nombre: 'san_marcos', poblacionM: 4178, poblacionH: 8579 },
    { nombre: 'santa_rosa', poblacionM: 8786, poblacionH: 787 },
    { nombre: 'solola', poblacionM: 8798, poblacionH: 1234 },
    { nombre: 'suchitepequez', poblacionM: 546, poblacionH: 58746 },
    { nombre: 'totonicapan', poblacionM: 4123, poblacionH: 1232 },
    { nombre: 'zacapa', poblacionM: 4785, poblacionH: 7890 }
  ];

  const paises = [
    { nombre: 'guatemala', superficie: 1235412, esHermano: true },
    { nombre: 'salvador', superficie: 7458522, esHermano: true },
    { nombre: 'honduras', superficie: 22000458, esHermano: true },
    { nombre: 'nicaragua', superficie: 999888, esHermano: true },
    { nombre: 'costa_rica', superficie: 333584, esHermano: true },
    { nombre: 'panama', superficie: 1000001, esHermano: true }
  ];

  // Efecto para inicializar las referencias a los elementos del SVG
  useEffect(() => {
    // Reiniciar colores de todos los departamentos
    departamentos.forEach(dep => {
      const el = document.getElementById(dep.nombre);
      if (el) {
        departamentosRef.current[dep.nombre] = el;
        el.style.fill = "#c6f6d5"; // Color original/base
      }
    });

    // Resaltar departamento seleccionado si existe
    if (departamentoSeleccionado) {
      const el = departamentosRef.current[departamentoSeleccionado];
      if (el) {
        el.style.fill = "#34d399"; // Color destacado para el departamento seleccionado
      }
    }
  }, [departamentoSeleccionado]);

  const ejecutarConsulta = () => {
    setLoading(true);
    setMensajeError('');
    setResultado([]);
    
    setTimeout(() => {
      try {
        // Simula consultas Prolog
        if (tipoConsulta === 'departamentos') {
          // Limpiar selección previa
          setDepartamentoSeleccionado('');
          
          if (consulta === '') {
            setResultado(departamentos.map(d => ({ 
              texto: `es_un_departamento(${d.nombre}).`, 
              valor: 'true' 
            })));
          } else {
            const dep = departamentos.find(d => d.nombre === consulta.toLowerCase());
            if (dep) {
              setResultado([{ 
                texto: `es_un_departamento(${consulta}).`, 
                valor: 'true' 
              }]);
              // Marcar el departamento en el mapa
              setDepartamentoSeleccionado(consulta.toLowerCase());
            } else {
              setResultado([{ 
                texto: `es_un_departamento(${consulta}).`, 
                valor: 'false' 
              }]);
            }
          }
        }
        else if (tipoConsulta === 'poblacion') {
          if (consulta === '') {
            setResultado(departamentos.map(d => ({ 
              texto: `poblacion(${d.nombre}, mujeres_${d.poblacionM}, hombres_${d.poblacionH}).`, 
              valor: 'true' 
            })));
          } else {
            const dep = departamentos.find(d => d.nombre === consulta.toLowerCase());
            if (dep) {
              setResultado([{ 
                texto: `poblacion(${consulta}, mujeres_${dep.poblacionM}, hombres_${dep.poblacionH}).`, 
                valor: 'true' 
              }]);
              // También marcamos el departamento consultado
              setDepartamentoSeleccionado(consulta.toLowerCase());
            } else {
              setResultado([{ 
                texto: `poblacion(${consulta}, Mujeres, Hombres).`, 
                valor: 'false' 
              }]);
            }
          }
        }
        else if (tipoConsulta === 'paises_hermanos') {
          // Limpiar selección para consultas de países
          setDepartamentoSeleccionado('');
          
          if (consulta === '') {
            // Lista todos los países hermanos
            setResultado(paises.filter(p => p.esHermano && p.nombre !== 'guatemala').map(p => ({ 
              texto: `hermanos(guatemala, ${p.nombre}).`, 
              valor: 'true' 
            })));
          } else {
            const pais = paises.find(p => p.nombre === consulta.toLowerCase());
            if (pais && pais.esHermano) {
              setResultado([{ 
                texto: `hermanos(guatemala, ${consulta}).`, 
                valor: 'true' 
              }]);
            } else {
              setResultado([{ 
                texto: `hermanos(guatemala, ${consulta}).`, 
                valor: 'false' 
              }]);
            }
          }
        }
        else if (tipoConsulta === 'paises_pequenos') {
          // Limpiar selección para consultas de países
          setDepartamentoSeleccionado('');
          
          const pequeños = paises.filter(p => p.superficie < 1000000);
          setResultado(pequeños.map(p => ({ 
            texto: `paises_pequenos(${p.nombre}).`, 
            valor: 'true' 
          })));
        }
      } catch (error) {
        setMensajeError('Error al ejecutar la consulta: ' + error.message);
      } finally {
        setLoading(false);
      }
    }, 500); // Simula tiempo de procesamiento
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6 text-green-700">Sistema de Consulta de Guatemala</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          {/* Selector de tipo de consulta */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Tipo de Consulta:
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <button 
                className={`p-2 rounded ${tipoConsulta === 'departamentos' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
                onClick={() => setTipoConsulta('departamentos')}
              >
                Departamentos
              </button>
              <button 
                className={`p-2 rounded ${tipoConsulta === 'poblacion' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
                onClick={() => setTipoConsulta('poblacion')}
              >
                Población
              </button>
              <button 
                className={`p-2 rounded ${tipoConsulta === 'paises_hermanos' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
                onClick={() => setTipoConsulta('paises_hermanos')}
              >
                Países Hermanos
              </button>
              <button 
                className={`p-2 rounded ${tipoConsulta === 'paises_pequenos' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
                onClick={() => setTipoConsulta('paises_pequenos')}
              >
                Países Pequeños
              </button>
            </div>
          </div>
          
          {/* Input de consulta */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Parámetro de consulta:
            </label>
            <div className="flex">
              <input
                type="text"
                value={consulta}
                onChange={(e) => setConsulta(e.target.value)}
                placeholder={tipoConsulta === 'departamentos' ? "Nombre del departamento (o vacío para listar todos)" : 
                          tipoConsulta === 'poblacion' ? "Nombre del departamento" :
                          tipoConsulta === 'paises_hermanos' ? "Nombre del país" : ""}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                disabled={tipoConsulta === 'paises_pequenos'}
              />
              <button
                onClick={ejecutarConsulta}
                className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                disabled={loading}
              >
                {loading ? "Procesando..." : "Ejecutar"}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {tipoConsulta === 'departamentos' ? "Ej: guatemala, alta_verapaz, zacapa, etc." : 
              tipoConsulta === 'poblacion' ? "Ej: guatemala, quetzaltenango, zacapa, etc." :
              tipoConsulta === 'paises_hermanos' ? "Ej: honduras, salvador, etc." : 
              "Mostrará países con superficie < 1,000,000"}
            </p>
          </div>
          
          {/* Resultado */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-3">Resultado de la consulta:</h2>
            {mensajeError && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
                {mensajeError}
              </div>
            )}
            
            <div className="bg-black text-green-500 font-mono p-4 rounded overflow-auto max-h-64">
              {loading ? (
                <p>Ejecutando consulta...</p>
              ) : resultado.length > 0 ? (
                resultado.map((res, index) => (
                  <div key={index} className="mb-1">
                    <span className="text-blue-400">?- </span>
                    <span>{res.texto}</span>
                    <span className="text-yellow-400 ml-2">{res.valor}</span>
                  </div>
                ))
              ) : (
                <p>Selecciona un tipo de consulta y haz clic en "Ejecutar"</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Mapa de Guatemala */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-3 text-center">Mapa de Guatemala</h2>
          <p className="text-sm text-gray-600 mb-3 text-center">
            {departamentoSeleccionado ? 
              `Mostrando el departamento: ${departamentoSeleccionado}` : 
              "Consulta un departamento para verlo resaltado en el mapa"}
          </p>
          
          <div className="bg-blue-50 p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
              {/* Fondo del mapa */}
              <rect width="500" height="500" fill="#f0f9ff" />
              
              {/* Departamentos de Guatemala (simplificado) */}
              <g stroke="#333" stroke-width="1">
                {/* Petén */}
                <path id="peten" d="M150,50 L250,60 L260,120 L200,150 L130,140 Z" fill="#c6f6d5" />
                
                {/* Alta Verapaz */}
                <path id="alta_verapaz" d="M200,150 L260,120 L300,170 L240,190 Z" fill="#c6f6d5" />
                
                {/* Izabal */}
                <path id="izabal" d="M300,170 L380,160 L360,210 L320,220 L290,190 Z" fill="#c6f6d5" />
                
                {/* Quiché */}
                <path id="quiche" d="M130,140 L200,150 L220,220 L140,200 Z" fill="#c6f6d5" />
                
                {/* Baja Verapaz */}
                <path id="baja_verapaz" d="M200,150 L240,190 L220,220 Z" fill="#c6f6d5" />
                
                {/* Huehuetenango */}
                <path id="huehuetenango" d="M80,160 L130,140 L140,200 L90,190 Z" fill="#c6f6d5" />
                
                {/* San Marcos */}
                <path id="san_marcos" d="M60,200 L90,190 L100,230 L70,230 Z" fill="#c6f6d5" />
                
                {/* Quetzaltenango */}
                <path id="quetzaltenango" d="M90,190 L140,200 L130,230 L100,230 Z" fill="#c6f6d5" />
                
                {/* Totonicapán */}
                <path id="totonicapan" d="M140,200 L175,180 L160,210 L130,230 Z" fill="#c6f6d5" />
                
                {/* Sololá */}
                <path id="solola" d="M175,180 L190,210 L160,230 L160,210 Z" fill="#c6f6d5" />
                
                {/* Chimaltenango */}
                <path id="chimaltenango" d="M190,210 L220,220 L210,250 L160,230 Z" fill="#c6f6d5" />
                
                {/* Sacatepéquez */}
                <path id="sacatepequez" d="M180,240 L210,250 L200,270 L170,260 Z" fill="#c6f6d5" />
                
                {/* Guatemala */}
                <path id="guatemala" d="M210,250 L240,240 L250,270 L200,270 Z" fill="#c6f6d5" />
                
                {/* Jalapa */}
                <path id="jalapa" d="M240,240 L280,230 L290,260 L250,270 Z" fill="#c6f6d5" />
                
                {/* El Progreso */}
                <path id="progreso" d="M220,220 L270,210 L280,230 L240,240 Z" fill="#c6f6d5" />
                
                {/* Zacapa */}
                <path id="zacapa" d="M270,210 L320,220 L310,250 L280,230 Z" fill="#c6f6d5" />
                
                {/* Chiquimula */}
                <path id="chiquimula" d="M280,230 L310,250 L320,270 L290,260 Z" fill="#c6f6d5" />
                
                {/* Santa Rosa */}
                <path id="santa_rosa" d="M200,270 L250,270 L240,310 L190,300 Z" fill="#c6f6d5" />
                
                {/* Jutiapa */}
                <path id="jutiapa" d="M250,270 L290,260 L320,270 L280,300 L240,310 Z" fill="#c6f6d5" />
                
                {/* Escuintla */}
                <path id="escuintla" d="M170,260 L200,270 L190,300 L150,290 Z" fill="#c6f6d5" />
                
                {/* Suchitepéquez */}
                <path id="suchitepequez" d="M130,230 L160,230 L170,260 L150,290 L120,270 Z" fill="#c6f6d5" />
                
                {/* Retalhuleu */}
                <path id="retalhuleu" d="M100,230 L130,230 L120,270 L90,260 Z" fill="#c6f6d5" />
              </g>
              
              {/* Etiquetas de departamentos (algunos ejemplos) */}
              <text x="170" y="100" font-size="10" text-anchor="middle">Petén</text>
              <text x="230" y="170" font-size="10" text-anchor="middle">Alta Verapaz</text>
              <text x="330" y="190" font-size="10" text-anchor="middle">Izabal</text>
              <text x="160" y="170" font-size="10" text-anchor="middle">Quiché</text>
              <text x="290" y="230" font-size="10" text-anchor="middle">Zacapa</text>
              <text x="220" y="260" font-size="10" text-anchor="middle">Guatemala</text>
              
              {/* Fronteras con países vecinos */}
              <path d="M60,160 L30,180 L40,240 L70,230" fill="none" stroke="#666" stroke-dasharray="5,3" />
              <path d="M380,160 L410,180 L390,230 L360,210" fill="none" stroke="#666" stroke-dasharray="5,3" />
              <path d="M320,270 L350,290 L280,300" fill="none" stroke="#666" stroke-dasharray="5,3" />
              
              {/* Nombres de países vecinos */}
              <text x="20" y="200" font-size="10" text-anchor="middle">México</text>
              <text x="410" y="190" font-size="10" text-anchor="middle">Belice</text>
              <text x="350" y="270" font-size="10" text-anchor="middle">Honduras</text>
              <text x="320" y="290" font-size="10" text-anchor="middle">El Salvador</text>
              
              {/* Océano Pacífico */}
              <path d="M40,240 L90,260 L120,270 L150,290 L190,300 L240,310 L280,300 L350,290 L360,330 L30,330 Z" fill="#cbe8fa" />
              <text x="190" y="320" font-size="12" text-anchor="middle">Océano Pacífico</text>
            </svg>
          </div>
          
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Probar con departamentos:</h3>
            <div className="grid grid-cols-3 gap-2">
              <button 
                onClick={() => {
                  setConsulta('zacapa');
                  setTipoConsulta('departamentos');
                  ejecutarConsulta();
                }}
                className="p-2 text-sm bg-blue-100 hover:bg-blue-200 rounded"
              >
                Zacapa
              </button>
              <button 
                onClick={() => {
                  setConsulta('guatemala');
                  setTipoConsulta('departamentos');
                  ejecutarConsulta();
                }}
                className="p-2 text-sm bg-blue-100 hover:bg-blue-200 rounded"
              >
                Guatemala
              </button>
              <button 
                onClick={() => {
                  setConsulta('izabal');
                  setTipoConsulta('departamentos');
                  ejecutarConsulta();
                }}
                className="p-2 text-sm bg-blue-100 hover:bg-blue-200 rounded"
              >
                Izabal
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Ayuda */}
      <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <h3 className="text-lg font-semibold text-yellow-800 mb-2">Ayuda de Consultas:</h3>
        <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
          <li><strong>Departamentos:</strong> Consulta si un nombre es un departamento de Guatemala</li>
          <li><strong>Población:</strong> Muestra la población de hombres y mujeres de un departamento</li>
          <li><strong>Países Hermanos:</strong> Verifica si un país es "hermano" de Guatemala</li>
          <li><strong>Países Pequeños:</strong> Lista los países con superficie menor a 1,000,000</li>
        </ul>
        <p className="mt-2 text-sm text-gray-600">Deja el campo de consulta vacío para listar todos los resultados disponibles.</p>
      </div>
    </div>
  );
};

export default SistemaGuatemala;