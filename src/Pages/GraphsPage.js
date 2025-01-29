import React, { useState, useEffect } from 'react';
import '../BoxPage.css';
import '../GraphsPage.css';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend, 
  ArcElement 
} from 'chart.js';
import { FaMedal } from 'react-icons/fa';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function GraphsPage() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [data, setData] = useState(null);
  const [topProjects, setTopProjects] = useState({});
  const [topThreeProjects, setTopThreeProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/sennova`);
        const projectsData = await response.json();

        const processedData = processData(projectsData);
        setData(processedData);

        const top = findTopProjects(processedData.projectAverages);
        setTopProjects(top);

        const topThree = findTopThreeProjects(processedData.projectTotals, projectsData);
        setTopThreeProjects(topThree);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [apiUrl]);

  const processData = (projects) => {
    const categories = ['Total'];
    const categoryCounts = {};
    const categoryScores = {};
    const projectAverages = {};
    const projectTotals = {};

    categories.forEach(category => {
      categoryCounts[category] = 0;
      categoryScores[category] = 0;
    });

    projects.forEach(project => {
      if (!projectAverages[project.Proyecto]) {
        projectAverages[project.Proyecto] = {};
        categories.forEach(category => {
          projectAverages[project.Proyecto][category] = { sum: 0, count: 0 };
        });
      }

      categories.forEach(category => {
        if (project[category] !== null) {
          projectAverages[project.Proyecto][category].sum += project[category];
          projectAverages[project.Proyecto][category].count += 1;
          categoryCounts[category]++;
          categoryScores[category] += project[category];
        }
      });
    });

    Object.keys(projectAverages).forEach(project => {
      projectTotals[project] = 0;
      categories.forEach(category => {
        const { sum, count } = projectAverages[project][category];
        const average = count > 0 ? sum / count : null;
        projectAverages[project][category] = average;
        if (average !== null) {
          projectTotals[project] += average;
        }
      });
    });

    const averageScores = categories.map(category => 
      categoryCounts[category] > 0 ? categoryScores[category] / categoryCounts[category] : 0
    );

    const projectDistribution = categories.map(category => 
      (categoryCounts[category] / projects.length) * 100
    );

    return {
      categories,
      averageScores,
      projectDistribution,
      projectAverages,
      projectTotals
    };
  };

  const findTopProjects = (projectAverages) => {
    const categories = ['Total'];
    const topProjects = {};

    categories.forEach(category => {
      let topProject = null;
      let topScore = -Infinity;

      Object.entries(projectAverages).forEach(([projectName, scores]) => {
        if (scores[category] !== null && scores[category] > topScore) {
          topScore = scores[category];
          topProject = { Proyecto: projectName, [category]: topScore };
        }
      });

      if (topProject) {
        topProjects[category] = topProject;
      }
    });

    return topProjects;
  };

  const findTopThreeProjects = (projectTotals, projects) => {
    const sortedProjects = Object.entries(projectTotals)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([project, score]) => {
        const projectDetails = projects.find(p => p.Proyecto === project);
        return { 
          project, 
          score, 
          centro: projectDetails?.Centro || 'N/A'
        };
      });

    return sortedProjects;
  };
/*
  const barChartData = {
    labels: data?.categories || [],
    datasets: [
      {
        label: 'Puntuación Promedio',
        data: data?.averageScores || [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: data?.categories || [],
    datasets: [
      {
        data: data?.projectDistribution || [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
*/
  console.log ("data: ", topProjects)

  return (
    <div className="graphs-container">

<div className="grid-box">
        <div className="box-content">
          <span className="ficha">RESULTADOS</span>
        </div>
      </div>
      
      <div className="podium">
        {topThreeProjects.map((project, index) => (
          <div key={project.project} className={`podium-place place-${index + 1}`}>
            <FaMedal className="medal-icon" />
            <h2 style={{fontWeight: 'bold', color:'black', fontSize:'24px'}}>{index === 0 ? "Primer Lugar" : index === 1 ? "Segundo Lugar" : "Tercer Lugar"}</h2>
            <h3 style={{textTransform: "uppercase",textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",fontSize:'20px', fontWeight: 'bold', color:'#202020', fontStyle:'italic'}}>{project.project}</h3>
            <br/><p style={{fontWeight: 'bold', fontSize:'16px'}}><strong>Puntaje Total:</strong> {project.score.toFixed(2)}</p>
            <br/>
            <p style={{textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",fontWeight: 'bold', fontSize:'16px', color:'#292923'}}>{'Proyecto N° '}{project.centro}</p>
          </div>
        ))}
      </div>
      
      
     
    </div>
  );
}

export default GraphsPage;