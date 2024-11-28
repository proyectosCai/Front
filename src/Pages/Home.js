import React from "react";
import Logo3 from "../invest.png";

const Home = () => {
  return (
    <div className="  min-h-screen  ppl-64 md:pl-0">
      {/* Hero Section - Ajustado el min-h y añadido py-12 en lugar de p-8 */}
      <section className="flex flex-col md:flex-row items-center justify-center py-20 px-8 bg-[radial-gradient(circle,_#f8fbf2,_#ceff96)]">
        {/* Contenedor de texto */}
        <div className="md:w-1/2 max-w-4xl text-justify text-[#080808] font-bold mb-8 md:mb-0">
          <p className="text-xl text-[#39a800] mb-8 text-center">
            La plataforma definitiva para impulsar y visibilizar la
            investigación!
          </p>
          <p>
            Project-App es mucho más que una herramienta de gestión: es un
            espacio diseñado para transformar cómo se crean, presentan y evalúan
            los proyectos en el ámbito investigativo y formativo.
            <br/>
            <br/>
          
            Centraliza y optimiza el seguimiento de cada etapa, facilitando el
            acceso a evaluaciones detalladas y visualizaciones impactantes que
            dan vida a cada iniciativa. Además, con nuestro módulo de difusión,
            los eventos y hallazgos pueden llegar a la audiencia correcta,
            impulsando el intercambio de conocimiento y la colaboración entre
            profesionales y estudiantes. 
          </p>
        </div>

        {/* Contenedor de la imagen */}
        <img src={Logo3} alt="Imagen decorativa" className=" w-full max-w-xs" />
      </section>

      {/* Services Section 
      <section className="py-20 px-8 bg-[#fffee7]">
        <h2 className="text-3xl font-bold text-center text-[#39a800] mb-12">
          Nuestros Servicios
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {['Servicio 1', 'Servicio 2', 'Servicio 3'].map((service, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-[#39a800]/20"
            >
              <h3 className="text-xl font-semibold text-[#39a800] mb-4">
                {service}
              </h3>
              <p className="text-gray-600">
                Descripción del servicio y sus beneficios principales para los usuarios.
              </p>
            </div>
          ))}
        </div>
      </section>
*/}
      {/* About Section 
      <section className="py-20 px-8 bg-[radial-gradient(circle,_#f8fbf2,_#ceff96)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Sobre Nosotros
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-[#fffee7] rounded-lg h-64 flex items-center justify-center shadow-md">
              <span className="text-[#39a800]">Imagen/Video</span>
            </div>
            <div>
              <p className="text-white leading-relaxed">
                Aquí puedes incluir información sobre tu empresa, historia, valores
                y lo que te hace único en el mercado. Esta sección ayuda a construir
                confianza con tus visitantes.
              </p>
            </div>
          </div>
        </div>
      </section>*/}

      {/* Contact Section 
      <section className="py-20 px-8 bg-[#fffee7]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#39a800] mb-12">
            Contáctanos
          </h2>
          <div className="bg-white p-8 rounded-lg shadow-md border border-[#39a800]/20">
            <p className="text-[#39a800] mb-8">
              ¿Tienes alguna pregunta? Estamos aquí para ayudarte
            </p>
            <form className="max-w-md mx-auto flex flex-col gap-4">
              <input
                type="text"
                placeholder="Nombre"
                className="w-full p-3 rounded-lg border border-[#39a800]/30 focus:ring-2 focus:ring-[#39a800] focus:border-transparent outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 rounded-lg border border-[#39a800]/30 focus:ring-2 focus:ring-[#39a800] focus:border-transparent outline-none"
              />
              <textarea
                placeholder="Mensaje"
                rows={4}
                className="w-full p-3 rounded-lg border border-[#39a800]/30 focus:ring-2 focus:ring-[#39a800] focus:border-transparent outline-none"
              />
              <button className="bg-[#39a800] hover:bg-[#2d8400] text-white font-bold py-3 px-8 rounded-lg transition-colors self-center">
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </section>*/}
    </div>
  );
};

export default Home;
