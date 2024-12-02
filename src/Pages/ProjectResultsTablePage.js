import React, { useState, useEffect } from 'react';
import { utils, writeFile } from 'xlsx';
import '../ProjectResultsTablePage.css';


function ProjectResultsTablePage() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [projectResults, setProjectResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/sennova`);
        const projectsData = await response.json();
        const processedData = processProjectData(projectsData);
        setProjectResults(processedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [apiUrl]);

  const processProjectData = (projects) => {
    const categories = ['Total'];
    const projectTotals = {};

    projects.forEach(project => {
      const projectKey = `${project.Ficha}-${project.Proyecto}`;
      if (!projectTotals[projectKey]) {
        projectTotals[projectKey] = {
          Ficha: project.Ficha,
          Proyecto: project.Proyecto,
          Total: { sum: 0, count: 0 }
        };
      }

      categories.forEach(category => {
        if (project[category] !== undefined && project[category] !== null) {
          projectTotals[projectKey][category].sum += project[category];
          projectTotals[projectKey][category].count += 1;
        }
      });
    });

    return Object.values(projectTotals).map(project => {
      const processedProject = {
        Ficha: project.Ficha,
        Proyecto: project.Proyecto,
      };

      let totalSum = 0;
      categories.forEach(category => {
        const average = project[category].count > 0
          ? project[category].sum / project[category].count
          : 0;
        processedProject[category] = Number(average.toFixed(2));
        totalSum += processedProject[category];
      });

      processedProject.Total = Number(totalSum.toFixed(2));
      return processedProject;
    });
  };

  const exportToExcel = () => {
    const ws = utils.json_to_sheet(projectResults);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Resultados de Proyectos");
    writeFile(wb, "ResultadosProyectos.xlsx");
  };

  return (
    <div className="project-results-container">


      <div className="grid-box">
        <div className="box-content">
          <span className="ficha">Resultados de Proyectos</span>
        </div>
      </div>
      <button onClick={exportToExcel} className="export-button">Exportar a Excel</button>
      <div className="table-container">
        <table className="results-table">
          <thead>
            <tr>

            <th>Ficha</th>
           
              <th>Proyecto</th>
                        
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {projectResults.map((project, index) => (
              <tr key={index}>

              <td>{project.Ficha}</td>
               
                <td>{project.Proyecto}</td>
               
                <td>{project.Total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProjectResultsTablePage;