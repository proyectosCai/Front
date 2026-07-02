// BoxPage.js
import React from "react";
import { useParams, Link } from "react-router-dom";
import "../BoxPage.css";
//
function BoxPage() {
  const { boxNumber } = useParams();
  let nombre = "";


  if (boxNumber === "TPM - GPI") {
    nombre = "JORNADA I";
  } else if (boxNumber === "TPM - GPI") {
      nombre = "JORNADA II";
    }

    
    
    
    else {
    nombre = "Otra Página";
  }

  // Objeto que mapea cada número de ficha a sus proyectos
 const projectsByFicha = {
       
    "JORNADA I": [
      { id: 1, name: "ESSENTIAL ZENN "},
      { id: 2, name: "VITAL GROUND"},
      { id: 3, name: "GRIEKOS "},
      { id: 4, name: "DRINK SPORT"},
      { id: 5, name: "RENATA"},
      { id: 6, name: "IKIGAI"},
      
    
     
      { id: 7, name: "BIOCICLO"},
      { id:8, name: "VOP"},
      { id: 9, name: "MAZAPANA"},
      
    ],
   "JORNADA II": [
      { id: 1, name: "COFFE CREAM"},
      { id: 2, name: "REVIVE"},
      { id: 3, name: "HEALTHY JUICE"},
      { id: 4, name: "COCAFE"},
      { id: 5, name: "GELATTE"},
      { id: 6, name: "FALAFELES"},
      
   
      { id: 7, name: "ECOCAFE"},
      { id: 8, name: "VOPECOBLOCKS"},
      { id: 9, name: "OVOSKIN"},
      { id: 10, name: "NUTRIFLOUR"},

    
      
    ],
  
  };

  // Obtiene los proyectos para la ficha actual
  const projects = projectsByFicha[boxNumber] || [];

  return (
    <div className="  min-h-screen  ppl-64 md:pl-0">
      <div className="grid-box">
        <div className="box-content">
          <span className="ficha">{boxNumber}</span>
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
