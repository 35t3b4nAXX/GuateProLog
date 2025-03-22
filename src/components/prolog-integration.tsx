import React, { useState } from 'react';

const ProyectoGuatemala = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      <header className="bg-gradient-to-r from-green-700 to-blue-700 text-white p-6 shadow-md">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center">Guatemala y Países Centroamericanos</h1>
          <p className="text-center mt-2 text-green-100">Sistema de consulta basado en Prolog</p>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Banner Principal */}
          <div className="lg:col-span-3 bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-green-800 mb-4">Bienvenido al Sistema de Consulta de Guatemala</h2>
              <p className="text-gray-600">
                Este sistema le permite realizar consultas sobre los departamentos de Guatemala, su población
                y los países centroamericanos hermanos utilizando una interfaz que simula el funcionamiento de Prolog.
              </p>
              <div className="mt-4 flex space-x-2">
                <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition">
                  Comenzar con Consultas
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition">
                  Ver Visualizaciones
                </button>
              </div>
            </div>
          </div>
          
          {/* Mapa SVG */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Mapa de Guatemala y Países Centroamericanos</h3>
              <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
                <img src="/api/placeholder/800/450" alt="Mapa de Guatemala y Centroamérica" className="w-full h-auto" />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Guatemala comparte fronteras con México al norte y oeste, Belice al noreste, 
                Honduras al este y El Salvador al sureste. El océano Pacífico se encuentra al sur.
              </p>
            </div>
          </div>
          
          {/* Estadísticas Rápidas */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Datos Rápidos</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 text-sm font-bold">22</span>
                  </div>
                  <p className="ml-2 text-gray-600">Departamentos de Guatemala</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 text-sm font-bold">5</span>
                  </div>
                  <p className="ml-2 text-gray-600">Países hermanos centroamericanos</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-yellow-100 flex items-center justify-center">
                    <span className="text-yellow-600 text-sm font-bold">15M</span>
                  </div>
                  <p className="ml-2 text-gray-600">Habitantes en Guatemala</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center">
                    <span className="text-purple-600 text-sm font-bold">2</span>
                  </div>
                  <p className="ml-2 text-gray-600">Países con superficie menor a 1M km²</p>
                </li>
              </ul>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 focus:outline-none transition text-sm">
                  Ver todas las estadísticas
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sistema de Consulta */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Sistema de Consulta Prolog</h2>
            <p className="text-gray-600 mb-4">
              Ejecute consultas en formato Prolog para obtener información sobre Guatemala y países centroamericanos.
            </p>
            
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono">
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-xs text-gray-400">Terminal de Prolog</span>
                </div>
                <div className="border-b border-gray-700 mb-4"></div>
                
                <div className="text-sm">
                  <p className="text-gray-400">% Consultas de ejemplo:</p>
                  <p>?- <span className="text-green-400">es_un_departamento(guatemala).</span></p>
                  <p className="text-blue-300 ml-4">true.</p>
                  
                  <p className="mt-2">?- <span className="text-green-400">poblacion(quetzaltenango, M, H).</span></p>
                  <p className="text-blue-300 ml-4">M = mujeres_8545, H = hombres_44.</p>
                  
                  <p className="mt-2">?- <span className="text-green-400">hermanos(guatemala, honduras).</span></p>
                  <p className="text-blue-300 ml-4">true.</p>
                  
                  <p className="mt-2">?- <span className="text-green-400">paises_pequenos(X).</span></p>
                  <p className="text-blue-300 ml-4">X = nicaragua ;</p>
                  <p className="text-blue-300 ml-4">X = costa_rica.</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <span className="text-green-400 mr-2">?-</span>
                <input 
                  type="text"
                  className="bg-gray-800 text-white px-2 py-1 rounded flex-grow focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Ingresa tu consulta aquí..."
                />
                <button className="ml-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none text-sm">
                  Ejecutar
                </button>
              </div>
            </div>
            
            <div className="mt-4 text-sm text-gray-500">
              Prueba con: es_un_departamento(X), poblacion(guatemala, M, H), hermanos(guatemala, X), paises_pequenos(X)
            </div>
          </div>
        </div>
        
        {/* Datos de Población */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Población por Departamento</h2>
            <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
              <img src="/api/placeholder/800/400" alt="Gráfico de población por departamento" className="w-full h-auto" />
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Departamentos con mayor población femenina</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-gray-700">Quiche</span>
                    <span className="font-semibold">54,654</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-700">Sacatepequez</span>
                    <span className="font-semibold">54,454</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-700">Solola</span>
                    <span className="font-semibold">8,798</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-700">Santa Rosa</span>
                    <span className="font-semibold">8,786</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-700">Quetzaltenango</span>
                    <span className="font-semibold">8,545</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Departamentos con mayor población masculina</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-gray-700">Suchitepequez</span>
                    <span className="font-semibold">58,746</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-700">Retalhuleu</span>
                    <span className="font-semibold">54,545</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-700">San Marcos</span>
                    <span className="font-semibold">8,579</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-700">Zacapa</span>
                    <span className="font-semibold">7,890</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-700">Sacatepequez</span>
                    <span className="font-semibold">5,487</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Países Hermanos */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Países Hermanos de Guatemala</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* El Salvador */}
              <div className="bg-gradient-to-b from-blue-500 to-blue-600 text-white rounded-lg p-4 transform transition-transform hover:scale-105">
                <h3 className="font-bold text-lg">El Salvador</h3>
                <p className="text-sm text-blue-100">Superficie: 7,458,522 km²</p>
                <div className="mt-2 text-xs">País hermano</div>
              </div>
              
              {/* Honduras */}
              <div className="bg-gradient-to-b from-blue-500 to-blue-600 text-white rounded-lg p-4 transform transition-transform hover:scale-105">
                <h3 className="font-bold text-lg">Honduras</h3>
                <p className="text-sm text-blue-100">Superficie: 22,000,458 km²</p>
                <div className="mt-2 text-xs">País hermano</div>
              </div>
              
              {/* Nicaragua */}
              <div className="bg-gradient-to-b from-purple-500 to-purple-600 text-white rounded-lg p-4 transform transition-transform hover:scale-105">
                <h3 className="font-bold text-lg">Nicaragua</h3>
                <p className="text-sm text-purple-100">Superficie: 999,888 km²</p>
                <div className="mt-2 text-xs">País hermano y pequeño</div>
              </div>
              
              {/* Costa Rica */}
              <div className="bg-gradient-to-b from-purple-500 to-purple-600 text-white rounded-lg p-4 transform transition-transform hover:scale-105">
                <h3 className="font-bold text-lg">Costa Rica</h3>
                <p className="text-sm text-purple-100">Superficie: 333,584 km²</p>
                <div className="mt-2 text-xs">País hermano y pequeño</div>
              </div>
              
              {/* Panamá */}
              <div className="bg-gradient-to-b from-blue-500 to-blue-600 text-white rounded-lg p-4 transform transition-transform hover:scale-105">
                <h3 className="font-bold text-lg">Panamá</h3>
                <p className="text-sm text-blue-100">Superficie: 1,000,001 km²</p>
                <div className="mt-2 text-xs">País hermano</div>
              </div>
            </div>
            
            <div className="mt-6 bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">¿Qué es un país hermano?</h3>
              <p className="text-gray-600">
                En el contexto de este proyecto, un país hermano es aquel que forma parte de la región centroamericana 
                y comparte lazos históricos, culturales y geográficos con Guatemala.
              </p>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Consulta en Prolog: <code className="bg-gray-200 px-1 py-0.5 rounded">hermanos(guatemala, X).</code>
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Ayuda de Prolog */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Aprende a usar Prolog</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Consultas básicas</h3>
                <ul className="space-y-3">
                  <li className="bg-gray-50 p-3 rounded">
                    <code className="block font-mono text-sm mb-1">es_un_departamento(guatemala).</code>
                    <p className="text-sm text-gray-600">Verifica si Guatemala es un departamento</p>
                  </li>
                  <li className="bg-gray-50 p-3 rounded">
                    <code className="block font-mono text-sm mb-1">poblacion(quiche, M, H).</code>
                    <p className="text-sm text-gray-600">Obtiene la población femenina (M) y masculina (H) de Quiché</p>
                  </li>
                  <li className="bg-gray-50 p-3 rounded">
                    <code className="block font-mono text-sm mb-1">hermanos(guatemala, honduras).</code>
                    <p className="text-sm text-gray-600">Verifica si Guatemala y Honduras son países hermanos</p>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Consultas con variables</h3>
                <ul className="space-y-3">
                  <li className="bg-gray-50 p-3 rounded">
                    <code className="block font-mono text-sm mb-1">es_un_departamento(X).</code>
                    <p className="text-sm text-gray-600">Lista todos los departamentos de Guatemala</p>
                  </li>
                  <li className="bg-gray-50 p-3 rounded">
                    <code className="block font-mono text-sm mb-1">hermanos(guatemala, X).</code>
                    <p className="text-sm text-gray-600">Lista todos los países hermanos de Guatemala</p>
                  </li>
                  <li className="bg-gray-50 p-3 rounded">
                    <code className="block font-mono text-sm mb-1">paises_pequenos(X).</code>
                    <p className="text-sm text-gray-600">Lista todos los países con superficie menor a 1,000,000 km²</p>
                  </li>
                </ul>
                
                <div className="mt-4 bg-yellow-50 p-3 rounded border-l-4 border-yellow-400">
                  <h4 className="font-medium text-yellow-800">Consejo</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    Recuerda que en Prolog, las variables siempre comienzan con mayúscula (X, Y, Nombre, etc.)
                    y los hechos y consultas deben terminar con un punto (.).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white p-6 mt-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">Proyecto Guatemala</h3>
              <p className="text-gray-300 text-sm">
                Sistema de consulta basado en Prolog para el estudio de Guatemala,
                sus departamentos y países centroamericanos.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Enlaces rápidos</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-blue-300 hover:text-blue-100">Consultas Prolog</a></li>
                <li><a href="#" className="text-blue-300 hover:text-blue-100">Mapa interactivo</a></li>
                <li><a href="#" className="text-blue-300 hover:text-blue-100">Estadísticas de población</a></li>
                <li><a href="#" className="text-blue-300 hover:text-blue-100">Países hermanos</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Recursos</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-blue-300 hover:text-blue-100">Documentación de Prolog</a></li>
                <li><a href="#" className="text-blue-300 hover:text-blue-100">Datos geográficos</a></li>
                <li><a href="#" className="text-blue-300 hover:text-blue-100">Estadísticas oficiales</a></li>
                <li><a href="#" className="text-blue-300 hover:text-blue-100">Ayuda del sistema</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-700 text-center text-sm text-gray-400">
            <p>© 2025 Proyecto Guatemala. Sistema educativo basado en Prolog.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProyectoGuatemala;