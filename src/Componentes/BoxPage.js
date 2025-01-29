// BoxPage.js
import React from "react";
import { useParams, Link } from "react-router-dom";
import "../BoxPage.css";

function BoxPage() {
  const { boxNumber } = useParams();
  let nombre = "";

  if (boxNumber === "1") {
    nombre = "Desarrollo de prototipos de sistemas embebidos para pequeños y microproductores, integrados con fuentes de generación energética renovable.";
  } else if (boxNumber === "2") {
      nombre = "Control de calidad en procesos industriales adecuando visión artificial en la modernización del ambiente de formación FMS";
    }
    else if (boxNumber === "3") {
      nombre = "Tecnificación de una microempresa en uso de tecnologías 4.0 para la vigilancia y control del proceso";
    } 
    else if (boxNumber === "4") {
      nombre = " Creación de maquina de impresión 3D de 5 ejes diseño SENA";
    } 
    else if (boxNumber === "5") {
      nombre = " Desarrollo de aplicaciones a la medida que faciliten la unificación de herramientas tecnológicas de apoyo a procesos administrativos en diferentes sectores productivos";
    } 
    
    
    else {
    nombre = "Otra Página";
  }

  // Objeto que mapea cada número de ficha a sus proyectos
  const projectsByFicha = {
    1: [
      { id: 1, name: "Desarrollo de prototipos de sistemas embebidos para pequeños y microproductores, integrados con fuentes de generación energética renovable." },
      
      
    ],2: [
      { id: 2, name: "Control de calidad en procesos industriales adecuando visión artificial en la modernización del ambiente de formación FMS" },
      
      
    ],
    3: [
      { id: 3, name: "Tecnificación de una microempresa en uso de tecnologías 4.0 para la vigilancia y control del proceso" },
      
      
    ],
    4: [
      { id: 4, name: " Creación de maquina de impresión 3D de 5 ejes diseño SENA" },
      
      
    ],
    5: [
      { id: 5, name: "Desarrollo de aplicaciones a la medida que faciliten la unificación de herramientas tecnológicas de apoyo a procesos administrativos en diferentes sectores productivos" },
      
      
    ],
  };

  // Obtiene los proyectos para la ficha actual
  const projects = projectsByFicha[boxNumber] || [];

  return (
    <div className="  min-h-screen  ppl-64 md:pl-0">
      <div className="grid-box">
        <div className="box-content">
          <span className="ficha">{'Proyecto N° '}{boxNumber}</span>
        </div>
      </div>

      {projects.length > 0 ? (
        <div className="project-grid">
          {projects.map((project) => (
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
