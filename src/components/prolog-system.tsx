import React, { useState } from 'react';

const PrologSystem = () => {
  const [activeTab, setActiveTab] = useState('menu');
  const [ejecutando, setEjecutando] = useState(false);
  const [consultaInput, setConsultaInput] = useState('');
  const [resultadoConsulta, setResultadoConsulta] = useState([]);
  const [historialConsultas, setHistorialConsultas] = useState([]);

  // Simulación de la base de datos de Prolog
  const departamentos = [
    "alta_verapaz", "baja_verapaz", "chimaltenango", "chiquimula", "peten", 
    "progreso", "quiche", "escuintla", "guatemala", "huehuetenango", 
    "izabal", "jalapa", "jutiapa", "quetzaltenango", "retalhuleu", 
    "sacatepequez", "san_marcos", "santa_rosa", "solola", 
    "suchitepequez", "totonicapan", "zacapa"
  ];

  const poblaciones = {
    "alta_verapaz": { mujeres: 4458, hombres: 200 },
    "baja_verapaz": { mujeres: 100, hombres: 200 },
    "chimaltenango": { mujeres: 2563, hombres: 2054 },
    "chiquimula": { mujeres: 2563, hombres: 2054 },
    "peten": { mujeres: 545, hombres: 2254 },
    "progreso": { mujeres: 4546, hombres: 4564 },
    "quiche": { mujeres: 54654, hombres: 5454 },
    "escuintla": { mujeres: 546, hombres: 878 },
    "guatemala": { mujeres: 5487, hombres: 5485 },
    "huehuetenango": { mujeres: 7878, hombres: 548 },
    "izabal": { mujeres: 7895, hombres: 4454 },
    "jalapa": { mujeres: 548, hombres: 4532 },
    "jutiapa": { mujeres: 5465, hombres: 546 },
    "quetzaltenango": { mujeres: 8545, hombres: 44 },
    "retalhuleu": { mujeres: 5465, hombres: 54545 },
    "sacatepequez": { mujeres: 54454, hombres: 5487 },
    "san_marcos": { mujeres: 4178, hombres: 8579 },
    "santa_rosa": { mujeres: 8786, hombres: 787 },
    "solola": { mujeres: 8798, hombres: 1234 },
    "suchitepequez": { mujeres: 546, hombres: 58746 },
    "totonicapan": { mujeres: 4123, hombres: 1232 },
    "zacapa": { mujeres: 4785, hombres: 7890 }
  };

  const paises = {
    "guatemala": { superficie: 1235412 },
    "salvador": { superficie: 7458522 },
    "honduras": { superficie: 22000458 },
    "nicaragua": { superficie: 999888 },
    "costa_rica": { superficie: 333584 },
    "panama": { superficie: 1000001 }
  };

  const paisesHermanos = [
    ["guatemala", "salvador"],
    ["guatemala", "honduras"],
    ["nicaragua", "guatemala"],
    ["costa_rica", "guatemala"],
    ["guatemala", "panama"]
  ];

  // Simulador de consultas Prolog
  const ejecutarConsulta = () => {
    if (!consultaInput.trim()) return;
    
    setEjecutando(true);
    setResultadoConsulta([]);
    
    // Simulamos un pequeño retraso para dar sensación de procesamiento
    setTimeout(() => {
      const consulta = consultaInput.trim();
      let resultados = [];
      
      try {
        // Verificar si es una consulta de departamento
        if (consulta.match(/^es_un_departamento\((\w+)\)\.?$/i)) {
          const dep = consulta.match(/^es_un_departamento\((\w+)\)\.?$/i)[1];
          if (departamentos.includes(dep)) {
            resultados.push({ 
              consulta: `es_un_departamento(${dep}).`,
              resultado: "true.",
              tipo: "exito"
            });
          } else {
            resultados.push({ 
              consulta: `es_un_departamento(${dep}).`,
              resultado: "false.",
              tipo: "fallo"
            });
          }
        }
        
        // Verificar si es una consulta para listar todos los departamentos
        else if (consulta.match(/^es_un_departamento\(X\)\.?$/i)) {
          departamentos.forEach(dep => {
            resultados.push({ 
              consulta: `X = ${dep}`,
              resultado: "true ;",
              tipo: "exito"
            });
          });
          resultados.push({ 
            consulta: "",
            resultado: "false.",
            tipo: "fin"
          });
        }
        
        // Verificar si es una consulta de población
        else if (consulta.match(/^poblacion\((\w+),\s*(\w+),\s*(\w+)\)\.?$/i)) {
          const match = consulta.match(/^poblacion\((\w+),\s*(\w+),\s*(\w+)\)\.?$/i);
          const dep = match[1];
          const mVar = match[2];
          const hVar = match[3];
          
          if (departamentos.includes(dep)) {
            const pobDep = poblaciones[dep];
            resultados.push({ 
              consulta: `poblacion(${dep}, ${mVar}, ${hVar}).`,
              resultado: `${mVar} = mujeres_${pobDep.mujeres}, ${hVar} = hombres_${pobDep.hombres}`,
              tipo: "exito"
            });
          } else {
            resultados.push({ 
              consulta: `poblacion(${dep}, ${mVar}, ${hVar}).`,
              resultado: "false.",
              tipo: "fallo"
            });
          }
        }
        
        // Verificar si es una consulta de hermandad
        else if (consulta.match(/^hermanos\((\w+),\s*(\w+)\)\.?$/i)) {
          const match = consulta.match(/^hermanos\((\w+),\s*(\w+)\)\.?$/i);
          const pais1 = match[1];
          const pais2 = match[2];
          
          const esHermano = paisesHermanos.some(([p1, p2]) => 
            (p1 === pais1 && p2 === pais2) || (p1 === pais2 && p2 === pais1)
          );
          
          if (esHermano) {
            resultados.push({ 
              consulta: `hermanos(${pais1}, ${pais2}).`,
              resultado: "true.",
              tipo: "exito"
            });
          } else {
            resultados.push({ 
              consulta: `hermanos(${pais1}, ${pais2}).`,
              resultado: "false.",
              tipo: "fallo"
            });
          }
        }
        
        // Verificar si es una consulta de países pequeños
        else if (consulta.match(/^paises_pequenos\((\w+)\)\.?$/i)) {
          const paisVar = consulta.match(/^paises_pequenos\((\w+)\)\.?$/i)[1];
          
          if (paisVar === "X") {
            // Listar todos los países pequeños
            Object.entries(paises).forEach(([nombre, data]) => {
              if (data.superficie < 1000000) {
                resultados.push({ 
                  consulta: `X = ${nombre}`,
                  resultado: "true ;",
                  tipo: "exito"
                });
              }
            });
            resultados.push({ 
              consulta: "",
              resultado: "false.",
              tipo: "fin"
            });
          } else {
            // Verificar un país específico
            if (paises[paisVar] && paises[paisVar].superficie < 1000000) {
              resultados.push({ 
                consulta: `paises_pequenos(${paisVar}).`,
                resultado: "true.",
                tipo: "exito"
              });
            } else {
              resultados.push({ 
                consulta: `paises_pequenos(${paisVar}).`,
                resultado: "false.",
                tipo: "fallo"
              });
            }
          }
        }
        
        // Consulta no reconocida
        else {
          resultados.push({ 
            consulta: consulta,
            resultado: "ERROR: Consulta no reconocida o sintaxis incorrecta.",
            tipo: "error"
          });
        }
        
        setResultadoConsulta(resultados);
        setHistorialConsultas(prev => [...prev, { consulta, resultados }]);
        
      } catch (error) {
        setResultadoConsulta([{ 
          consulta: consulta,
          resultado: `ERROR: ${error.message}`,
          tipo: "error"
        }]);
      } finally {
        setEjecutando(false);
      }
    }, 800);
  };

  // Ejemplo de consultas predefinidas
  const ejemplosConsulta = [
    "es_un_departamento(guatemala).",
    "es_un_departamento(X).",
    "poblacion(quetzaltenango, M, H).",
    "hermanos(guatemala, honduras).",
    "paises_pequenos(X)."
  ];

  // Para el menú de ayuda
  const ayudaConsultas = [
    { titulo: "Consultar departamento", descripcion: "es_un_departamento(nombre).", ejemplo: "es_un_departamento(guatemala)." },
    { titulo: "Listar departamentos", descripcion: "es_un_departamento(X).", ejemplo: "es_un_departamento(X)." },
    { titulo: "Consultar población", descripcion: "poblacion(departamento, M, H).", ejemplo: "poblacion(quetzaltenango, M, H)." },
    { titulo: "Verificar países hermanos", descripcion: "hermanos(pais1, pais2).", ejemplo: "hermanos(guatemala, honduras)." },
    { titulo: "Listar países pequeños", descripcion: "paises_pequenos(X).", ejemplo: "paises_pequenos(X)." }
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-500 p-4 text-white">
          <h1 className="text-3xl font-bold text-center">Sistema de Consulta de Guatemala</h1>
          <p className="text-center mt-2">Interfaz interactiva para consultas en Prolog</p>
        </div>
        
        {/* Navegación por pestañas */}
        <div className="flex border-b">
          <button 
            className={`px-4 py-3 font-medium ${activeTab === 'menu' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setActiveTab('menu')}
          >
            Consultas
          </button>
          <button 
            className={`px-4 py-3 font-medium ${activeTab === 'mapa' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setActiveTab('mapa')}
          >
            Mapa
          </button>
          <button 
            className={`px-4 py-3 font-medium ${activeTab === 'estadisticas' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setActiveTab('estadisticas')}
          >
            Estadísticas
          </button>
          <button 
            className={`px-4 py-3 font-medium ${activeTab === 'ayuda' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setActiveTab('ayuda')}
          >
            Ayuda
          </button>
          <button 
            className={`px-4 py-3 font-medium ${activeTab === 'codigo' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setActiveTab('codigo')}
          >
            Código Prolog
          </button>
        </div>
        
        {/* Contenido de las pestañas */}
        <div className="p-4">
          {/* Pestaña de Consultas */}
          {activeTab === 'menu' && (
            <div>
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-3">Ejecutar Consulta Prolog</h2>
                <div className="flex">
                  <input 
                    type="text"
                    value={consultaInput}
                    onChange={(e) => setConsultaInput(e.target.value)}
                    placeholder="Ingresa tu consulta Prolog (ej: es_un_departamento(guatemala).)"
                    className="flex-grow p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                    onKeyPress={(e) => e.key === 'Enter' && ejecutarConsulta()}
                  />
                  <button 
                    onClick={ejecutarConsulta}
                    disabled={ejecutando}
                    className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 focus:outline-none disabled:opacity-50"
                  >
                    {ejecutando ? "Ejecutando..." : "Ejecutar"}
                  </button>
                </div>
                
                <div className="mt-2">
                  <p className="text-sm text-gray-600 mb-1">Ejemplos de consultas:</p>
                  <div className="flex flex-wrap gap-2">
                    {ejemplosConsulta.map((ejemplo, index) => (
                      <button
                        key={index}
                        className="text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded text-gray-700 font-mono"
                        onClick={() => setConsultaInput(ejemplo)}
                      >
                        {ejemplo}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Resultados */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-3">Resultados</h2>
                <div className="bg-black text-green-400 p-4 rounded-lg font-mono min-h-32 max-h-64 overflow-y-auto">
                  {ejecutando ? (
                    <div className="animate-pulse">Ejecutando consulta...</div>
                  ) : resultadoConsulta.length > 0 ? (
                    resultadoConsulta.map((resultado, index) => (
                      <div key={index} className="mb-1">
                        <span className="text-blue-400">?- </span>
                        <span>{resultado.consulta}</span>
                        <br/>
                        <span className={`ml-4 ${resultado.tipo === 'exito' ? 'text-green-400' : resultado.tipo === 'fallo' ? 'text-red-400' : resultado.tipo === 'error' ? 'text-yellow-400' : 'text-gray-400'}`}>
                          {resultado.resultado}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">Ingresa una consulta y presiona "Ejecutar"</p>
                  )}
                </div>
              </div>
              
              {/* Historial */}
              {historialConsultas.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold mb-3">Historial de Consultas</h2>
                  <div className="bg-gray-100 p-4 rounded-lg max-h-40 overflow-y-auto">
                    {historialConsultas.map((item, index) => (
                      <div 
                        key={index}
                        className="mb-2 p-2 bg-white rounded cursor-pointer hover:bg-blue-50"
                        onClick={() => setConsultaInput(item.consulta)}
                      >
                        <div className="font-mono text-sm">{item.consulta}</div>
                        <div className="text-xs text-gray-500">
                          {item.resultados[0].tipo === 'exito' ? '✅' : item.resultados[0].tipo === 'error' ? '⚠️' : '❌'}
                          {' '}Resultados: {item.resultados.length}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Pestaña de Mapa */}
          {activeTab === 'mapa' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Mapa de Guatemala y Países Hermanos</h2>
              <div className="flex justify-center">
                <img src="/api/placeholder/800/600" alt="Mapa de Guatemala y Países Hermanos" className="max-w-full h-auto rounded-lg shadow-md" />
              </div>
              <div className="mt-4 text-center text-sm text-gray-600">
                Mapa ilustrativo de Guatemala y los países centroamericanos hermanos.
              </div>
            </div>
          )}
          
          {/* Pestaña de Estadísticas */}
          {activeTab === 'estadisticas' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Estadísticas de Población</h2>
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Habitantes por Departamento</h3>
                <div className="flex justify-center">
                  <img src="/api/placeholder/800/400" alt="Gráfico de población por departamento" className="max-w-full h-auto rounded-lg shadow-md" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="text-lg font-medium mb-2">Departamentos con mayor población femenina</h3>
                  <ol className="list-decimal pl-5">
                    <li>Sacatepequez - 54,454 mujeres</li>
                    <li>Quiche - 54,654 mujeres</li>
                    <li>Solola - 8,798 mujeres</li>
                    <li>Santa Rosa - 8,786 mujeres</li>
                    <li>Quetzaltenango - 8,545 mujeres</li>
                  </ol>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="text-lg font-medium mb-2">Departamentos con mayor población masculina</h3>
                  <ol className="list-decimal pl-5">
                    <li>Suchitepequez - 58,746 hombres</li>
                    <li>Retalhuleu - 54,545 hombres</li>
                    <li>San Marcos - 8,579 hombres</li>
                    <li>Zacapa - 7,890 hombres</li>
                    <li>Sacatepequez - 5,487 hombres</li>
                  </ol>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Superficies de los países centroamericanos</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left">País</th>
                        <th className="px-4 py-2 text-right">Superficie (km²)</th>
                        <th className="px-4 py-2 text-center">Tamaño relativo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(paises).map(([nombre, data], index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="px-4 py-2 font-medium capitalize">{nombre.replace('_', ' ')}</td>
                          <td className="px-4 py-2 text-right">{data.superficie.toLocaleString()}</td>
                          <td className="px-4 py-2">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-blue-600 h-2 rounded-full" style={{
                                width: `${Math.min(100, (data.superficie / 22000458) * 100)}%`
                              }}></div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {/* Pestaña de Ayuda */}
          {activeTab === 'ayuda' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Ayuda - Consultas en Prolog</h2>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">¿Qué es Prolog?</h3>
                <p className="text-gray-700">
                  Prolog es un lenguaje de programación lógica utilizado para resolver problemas que implican objetos y las relaciones entre ellos. 
                  Es especialmente útil para sistemas expertos, procesamiento del lenguaje natural y representación del conocimiento.
                </p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Tipos de consultas disponibles</h3>
                <div className="space-y-4">
                  {ayudaConsultas.map((item, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow">
                      <h4 className="font-medium text-blue-600">{item.titulo}</h4>
                      <p className="text-gray-600 mt-1 mb-2">Formato: <code className="bg-gray-100 px-1 py-0.5 rounded">{item.descripcion}</code></p>
                      <div className="flex">
                        <code className="bg-gray-100 px-2 py-1 rounded font-mono text-sm">{item.ejemplo}</code>
                        <button 
                          className="ml-2 text-blue-500 hover:text-blue-700 text-sm"
                          onClick={() => {
                            setConsultaInput(item.ejemplo);
                            setActiveTab('menu');
                          }}
                        >
                          Probar →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                <h3 className="text-lg font-medium text-yellow-800 mb-2">Solución de problemas comunes</h3>
                <ul className="list-disc pl-5 text-yellow-700 space-y-1">
                  <li>Asegúrate de terminar tus consultas con un punto (.)</li>
                  <li>Usa guiones bajos para nombres compuestos (ej: alta_verapaz)</li>
                  <li>Las variables deben comenzar con mayúscula (ej: X, Nombre)</li>
                  <li>Ten cuidado con los espacios entre argumentos</li>
                  <li>Si obtienes un error sobre "paises_pequeños", usa "paises_pequenos" (sin tilde)</li>
                </ul>
              </div>
            </div>
          )}
          
          {/* Pestaña de Código Prolog */}
          {activeTab === 'codigo' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Código Prolog Completo</h2>
              <div className="bg-gray-800 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`% ************GUATEMALA SUS DEPARTAMENTOS Y PAÍSES HERMANOS ************
 
%INICIALIZACION DEL PROGRAMA PROLOG // DEPARTAMENTOS DE GUATEMALA //
 
es_un_departamento(alta_verapaz).
es_un_departamento(baja_verapaz).
es_un_departamento(chimaltenango).
es_un_departamento(chiquimula).
es_un_departamento(peten).
es_un_departamento(progreso).
es_un_departamento(quiche).
es_un_departamento(escuintla).
es_un_departamento(guatemala).
es_un_departamento(huehuetenango).
es_un_departamento(izabal).
es_un_departamento(jalapa).
es_un_departamento(jutiapa).
es_un_departamento(quetzaltenango).
es_un_departamento(retalhuleu).
es_un_departamento(sacatepequez).
es_un_departamento(san_marcos).
es_un_departamento(santa_rosa).
es_un_departamento(solola).
es_un_departamento(suchitepequez).
es_un_departamento(totonicapan).
es_un_departamento(zacapa).
 
%POBLACION 2015 ACTUALIZADA DE LOS DEPARTAMENTOS DE GUATEMALA
 
poblacion(alta_verapaz, mujeres_4458, hombres_200).
poblacion(baja_verapaz, mujeres_100, hombres_200).
poblacion(chimaltenango, mujeres_2563, hombres_2054).
poblacion(chiquimula, mujeres_2563, hombres_2054).
poblacion(peten, mujeres_545, hombres_2254).
poblacion(progreso, mujeres_4546, hombres_4564).
poblacion(quiche, mujeres_54654, hombres_5454).
poblacion(escuintla, mujeres_546, hombres_878).
poblacion(guatemala, mujeres_5487, hombres_5485).
poblacion(huehuetenango, mujeres_7878, hombres_548).
poblacion(izabal, mujeres_7895, hombres_4454).
poblacion(jalapa, mujeres_548, hombres_4532).
poblacion(jutiapa, mujeres_5465, hombres_546).
poblacion(quetzaltenango, mujeres_8545, hombres_44).
poblacion(retalhuleu, mujeres_5465, hombres_54545).
poblacion(sacatepequez, mujeres_54454, hombres_5487).
poblacion(san_marcos, mujeres_4178, hombres_8579).
poblacion(santa_rosa, mujeres_8786, hombres_787).
poblacion(solola, mujeres_8798, hombres_1234).
poblacion(suchitepequez, mujeres_546, hombres_58746).
poblacion(totonicapan, mujeres_4123, hombres_1232).
poblacion(zacapa, mujeres_4785, hombres_7890).
 
%TOTAL DE POBLACION EN GUATEMALA
 
habitantes_guatemala(total, 15000000).
 
% PAISES HERMANOS DE GUATEMALA
 
pais_hermano(guatemala, salvador).
pais_hermano(guatemala, honduras).
pais_hermano(nicaragua, guatemala).
pais_hermano(costa_rica, guatemala).
pais_hermano(guatemala, panama).
 
hermanos(X, Y):- pais_hermano(X, Y); % OR en Prolog (;)
                 pais_hermano(Y, X).
 
%SUPERFICIES DE LOS PAISES HERMANOS DE GUATEMALA
 
superficie_pais(guatemala, 1235412).
superficie_pais(salvador, 7458522).
superficie_pais(honduras, 22000458).
superficie_pais(nicaragua, 999888).
superficie_pais(costa_rica, 333584).
superficie_pais(panama, 1000001).
 
paises_pequenos(X):- superficie_pais(X, Y),
                     Y < 1000000.`}</pre>
              </div>
              
              <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-blue-800 mb-2">Notas sobre el código</h3>
                <ul className="list-disc pl-5 text-blue-700 space-y-1">
                  <li>Se ha corregido el nombre del predicado a "paises_pequenos" (sin tilde) para evitar problemas de compatibilidad.</li>
                  <li>Los nombres de departamentos y países utilizan guiones bajos para separar palabras (ej: alta_verapaz).</li>
                <li>El operador ";" en la regla "hermanos" representa una disyunción lógica (OR).</li>
                <li>La población está separada por género y cada departamento tiene sus propios datos.</li>
                <li>Se ha corregido la consistencia en los nombres de departamentos.</li>
              </ul>
            </div>
            
            <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="text-lg font-medium text-green-800 mb-2">Consultas recomendadas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <button 
                  className="text-left p-2 bg-white rounded border border-green-300 hover:bg-green-100"
                  onClick={() => {
                    setConsultaInput("hermanos(guatemala, X).");
                    setActiveTab('menu');
                  }}
                >
                  <span className="font-mono text-sm">hermanos(guatemala, X).</span>
                  <p className="text-xs text-gray-600">Listar todos los países hermanos de Guatemala</p>
                </button>
                
                <button 
                  className="text-left p-2 bg-white rounded border border-green-300 hover:bg-green-100"
                  onClick={() => {
                    setConsultaInput("poblacion(quiche, M, H).");
                    setActiveTab('menu');
                  }}
                >
                  <span className="font-mono text-sm">poblacion(quiche, M, H).</span>
                  <p className="text-xs text-gray-600">Ver población masculina y femenina de Quiché</p>
                </button>
                
                <button 
                  className="text-left p-2 bg-white rounded border border-green-300 hover:bg-green-100"
                  onClick={() => {
                    setConsultaInput("paises_pequenos(X).");
                    setActiveTab('menu');
                  }}
                >
                  <span className="font-mono text-sm">paises_pequenos(X).</span>
                  <p className="text-xs text-gray-600">Listar países con superficie menor a 1,000,000</p>
                </button>
                
                <button 
                  className="text-left p-2 bg-white rounded border border-green-300 hover:bg-green-100"
                  onClick={() => {
                    setConsultaInput("es_un_departamento(X).");
                    setActiveTab('menu');
                  }}
                >
                  <span className="font-mono text-sm">es_un_departamento(X).</span>
                  <p className="text-xs text-gray-600">Listar todos los departamentos de Guatemala</p>
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="bg-gray-800 text-white p-4 text-center text-sm">
          <p>Sistema de consultas Prolog para Guatemala y países centroamericanos</p>
          <p className="mt-1">© 2025 - Proyecto educativo</p>
        </div>
      </div>
    </div>
  );
};

export default PrologSystem;