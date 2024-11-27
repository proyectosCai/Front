// BoxPage.js
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import '../BoxPage.css';


function BoxPage() {
  const { boxNumber } = useParams();
  let nombre = '';

  if (boxNumber === '9112') {
    nombre = 'CENTRO PARA LA FORMACIÓN CAFETERA';
  } else if (boxNumber === '9219') {
    nombre = 'CENTRO DE AUTOMATIZACIÓN INDUSTRIAL';
  } else if (boxNumber === '9515') {
    nombre = 'CENTRO PECUARIO Y AGROEMPRESARIAL';
  } else {
    nombre = 'Otra Página';
  }

  // Objeto que mapea cada número de ficha a sus proyectos
  const projectsByFicha = {
    '9112': [
      { id: 1, name: "Desarrollo de un prototipo de harina alimenticia a partir de productos y subproductos agrícolas como aporte a la seguridad alimentaria de la región de caldas" },
      { id: 2, name: "Efecto de la harina de cascara de plátano verde (Musa paradisiaca) en la rentabilidad y asimilación de la dieta de gallinas ponedoras" },
      { id: 3, name: "Obtención de principios activos de plantas medicinales " },
     
    ],
    '9219': [
      { id: 1, name: "Producción de Aceite de Palma con enfoque de sostenibilidad ambiental y resiliencia al cambio climático." },
     
    ],
    '9515': [
      { id: 1, name: "Diagnóstico del sistema turístico de La Dorada, Caldas para su desarrollo integrado con los espacios rurales" },
      { id: 2, name: "Análisis integral del sistema turístico de la Dorada, Caldas: oportunidades y desafíos" },
      { id: 3, name: "Estudios de Capacidad de Carga Turística en rutas para el Aviturismo del Magdalena Caldense" },
      { id: 4, name: "Percepción de los habitantes de la vereda  el Japón frente al cambio climático " },
      { id: 5, name: "Tecnología y naturaleza: realidad aumentada para la educación ambiental y la conservación de fauna silvestre en La Dorada, Caldas" },
      { id: 6, name: "Ganadería sostenible: elaboración de biofertilizantes para el mejoramiento de pasturas en la Dorada, Caldas." },
      { id: 7, name: "Desarrollo de emprendimiento socio-ambiental de base circular, mediado por e-learning" },
      { id: 8, name: "Desarrollo de un aplicativo integral para la optimización de reservas hoteleras e información turistica en el magdalena medio." },

    ],
    
  };

  // Obtiene los proyectos para la ficha actual
  const projects = projectsByFicha[boxNumber] || [];

  return (
    <div className="  min-h-screen  ppl-64 md:pl-0">
      <div className="grid-box">
        <div className="box-content">
          <span className="ficha">{nombre}</span>
        </div>
      </div>

      {projects.length > 0 ? (
        <div className="project-grid">
          {projects.map(project => (
            <Link
              key={project.id}
              to={`/box/${boxNumber}/project/${project.name}`}
              className="project-box"
            >
              {project.name}
            </Link>
          ))}
        </div>
      ) : (
        <p>No hay proyectos disponibles para este centro.</p>
      )}
    </div>
  );
}

export default BoxPage;