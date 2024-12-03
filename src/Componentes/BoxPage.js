// BoxPage.js
import React from "react";
import { useParams, Link } from "react-router-dom";
import "../BoxPage.css";

function BoxPage() {
  const { boxNumber } = useParams();
  let nombre = "";

  if (boxNumber === "2673191") {
    nombre = "DISEÑO E INTEGRACIÓN DE AUTOMATISMOS MECATRÓNICOS";
  } else if (boxNumber === "2697737") {
    nombre = "DISEÑO E INTEGRACIÓN DE AUTOMATISMOS MECATRÓNICOS";
  } else if (boxNumber === "2931657") {
    nombre = "MODELADO DIGITAL DE PRODUCTOS INDUSTRIALES";
  } else if (boxNumber === "2901432") {
    nombre = "IMPLEMENTACION DE INFRAESTRUCTURA DE TECNOLOGIAS DE LA INFORMACION Y LAS COMUNICACIONES";
  } else {
    nombre = "Otra Página";
  }

  // Objeto que mapea cada número de ficha a sus proyectos
  const projectsByFicha = {
    2901432: [
      { id: 1, name: "Acceso instantáneo, Identidad garantizada" },
      {
        id: 2,
        name: "ParqueaTech",
      },
      {
        id: 3,
        name: "SmartLight: Movilidad Eficiente",
      },
   
      {
        id: 4,
        name: "Semáforos inteligentes.",
      },
      {
        id: 5,
        name: "Manizales 360 Postes de seguridad.",
      },
      {
        id: 6,
        name: "Paradero inteligente.",
      },
      {
        id: 7,
        name: "IITIC RENOVANDO VIDAS.",
      },
      
    ],

    2931657: [
      {
        id: 1,
        name: "Llevo- llevo Carretillas de carga municipio de Chinchiná",
      },
    ],

    2673191: [
      {
        id: 1,
        name: "Automatización de mezcladora industrial.",
      },
      {
        id: 2,
        name: "Automatización de gallinero.",
      },
      {
        id: 3,
        name: "Automatizar selección de productos conformes o no conformes en máquinas de rayos x.",
      },
      {
        id: 4,
        name: "Desarrollo de prototipo didáctico de generación de energía eólica por túnel de viento.",
      },
      {
        id: 5,
        name: "Diseño, ensamble y programación de un sistema de taladrado de piezas automático.",
      },
      {
        id: 6,
        name: "Automatización del sistema de llenado de tanques",
      },
    ],
    2697737: 
    [
      {
        id: 1,
        name: "Dosificador de alimentos automático para aves y especies menores.",
      },
      {
        id: 2,
        name: "Unidad integrada de control y maniobra para invernadero.",
      },
      {
        id: 3,
        name: "Diseño y construcción de procesadora de alimentos cárnicos.",
      },
      {
        id: 4,
        name: "Diseño e implementación de un sistema de lavado Automático de vehículos con tecnología PLC.",
      },
      
    ],
  };

  // Obtiene los proyectos para la ficha actual
  const projects = projectsByFicha[boxNumber] || [];

  return (
    <div className="  min-h-screen  ppl-64 md:pl-0">
      <div className="grid-box">
        <div className="box-content">
          <span className="ficha">{nombre}</span>
          <span className="ficha">{'Ficha: '}{boxNumber}</span>
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
