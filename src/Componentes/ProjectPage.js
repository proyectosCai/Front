// ProjectPage.js
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "react-modal";
import "../ProjectPage.css";

Modal.setAppElement("#root");

function ProjectPage() {
  const { boxNumber, projectId } = useParams();
  let nombre = '';

  if (boxNumber === '2901432 ') {
    nombre = ' IMPLEMENTACION DE INFRAESTRUCTURA DE TECNOLOGIAS DE LA INFORMACION Y LAS COMUNICACIONES';
  } else if (boxNumber === '2931657 ') {
    nombre = 'MODELADO DIGITAL DE PRODUCTOS INDUSTRIALES';
  } else if (boxNumber === '2673191 ') {
    nombre = 'DISEÑO E INTEGRACIÓN DE AUTOMATISMOS MECATRÓNICOS';
  } else if (boxNumber === '2697737  ') {
    nombre = 'DISEÑO E INTEGRACIÓN DE AUTOMATISMOS MECATRÓNICOS';
  } 
  else {
    nombre = 'Otra Página';
  }
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [evaluator, setEvaluator] = useState("");
  const [scores, setScores] = useState({});
  const [totalScores, setTotalScores] = useState({});
  const [showThankYou, setShowThankYou] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  const [isSubmitting, setIsSubmitting] = useState(false);

const submitEvaluation = async () => {
  // Validaciones previas
  if (isSubmitting) return; // Previene múltiples clics
  
  if (!evaluator) {
    alert("Por favor, seleccione un evaluador");
    return;
  }

  const allQuestionsScored = currentCategory.questions.every(question => 
    scores[currentCategory.name]?.[question]
  );

  if (!allQuestionsScored) {
    alert("Por favor, califique todas las preguntas");
    return;
  }

  setIsSubmitting(true); // Bloquea envíos adicionales

  const evaluationData = {
    Nombre: "Evento Sennova 2024",
    Proyecto: projectId,
    Centro: boxNumber,
    Evaluador: evaluator,
    Total: parseInt(totalScores["EVALUAR"]),
  };

  try {
    const response = await fetch(`${apiUrl}/sennova`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(evaluationData),
    });

    if (response.ok) {
      setShowThankYou(true);
      setTimeout(() => {
        setShowThankYou(false);
        closeModal();
        navigate("/rate-project");
      }, 2000);
    } else {
      alert("Error al enviar la evaluación");
      setIsSubmitting(false); // Desbloquea si hay error
    }
  } catch (error) {
    console.error("Error:", error);
    alert("No se pudo enviar la evaluación. Verifique su conexión.");
    setIsSubmitting(false); // Desbloquea si hay error
  }
};
  // Este objeto debería ser el mismo que en BoxPage.js
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

  const projects = projectsByFicha[boxNumber] || [];
  const project = projects.find((p) => p.name);

  const categories = [
    {
      name: "EVALUAR",
      color: "#9b59b6",
      questions: [
        "¿El proyecto tiene objetivos claros y bien definidos que guían el desarrollo?",
        "¿La metodología empleada es adecuada y bien explicada para lograr los objetivos del proyecto?",
        "¿Los resultados del proyecto están bien fundamentados y son consistentes con los objetivos planteados?",
        "¿El proyecto tiene un propósito significativo y puede generar un impacto positivo en su área de aplicación?",
        "¿El proyecto incluye soluciones técnicamente viables, utilizando herramientas, conceptos o tecnologías adecuadas a su propósito?",
        "¿El proyecto demuestra creatividad en su diseño, metodología o solución propuesta? ",
        "¿El proyecto presenta  impactos positivos en el ámbito social, económico y/o ambiental?",
        "¿La presentación sigue una estructura lógica y facilita la comprensión?",

        "¿Los expositores demuestran conocimiento del tema y lo explican con claridad?",
        "¿La presentación visual (diapositivas, prototipos, gráficos) es atractiva y complementa la explicación del proyecto?",

        "¿Los expositores utilizan recursos (contacto visual, lenguaje corporal, tono) que involucran al público?",
        "¿Los expositores se expresa con claridad, utilizan un tono adecuado y muestran seguridad al presentar?"
      ],
    },
  ];

  useEffect(() => {
    const newTotalScores = {};
    Object.keys(scores).forEach((category) => {
      const categoryScores = Object.values(scores[category]).map(Number);
      const total = categoryScores.reduce((sum, score) => sum + score, 0);
      newTotalScores[category] = total;
    });
    setTotalScores(newTotalScores);
  }, [scores]);

  const openModal = (category) => {
    setCurrentCategory(category);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentCategory(null);
  };

  const handleScoreChange = (question, score) => {
    setScores((prev) => ({
      ...prev,
      [currentCategory.name]: {
        ...prev[currentCategory.name],
        [question]: score,
      },
    }));
  };
/*
  const submitEvaluation2 = () => {
    const evaluationData = {
      nombre,
      projectName: projectId,
      evaluator,
      scores,
      totalScores,
    };

    // Aquí deberías enviar evaluationData a tu backend
    console.log("Datos de evaluación:", evaluationData);
    console.log("REA:", totalScores["Responsabilidad social y ambiental"]);

    // Cerrar el modal y reiniciar los estados
    closeModal();
    setScores({});
    setEvaluator("");
  };

  if (!project) {
    return <div>Proyecto no encontrado</div>;
  }*/

  return (
    <div className="  min-h-screen  ppl-64 md:pl-0">
      <div className="grid-box">
        <div className="box-content">
          <span className="ficha">{projectId}</span>
          <span className="ficha">{'Ficha: '}{boxNumber}</span>
        </div>
      </div>

      <div className="category-grid">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => openModal(category)}
            className="category-box"
            style={{ backgroundColor: category.color }}
          >
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Evaluación Modal"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        {" "}
        {showThankYou ? (
          <div className="thank-you-message fullscreen-thank-you">
            <h2>¡Gracias por su evaluación!</h2>
          </div>
        ) : (
          <>
            <h2>Seleccione una única opción por pregunta</h2>
            <select value={evaluator} onChange={(e) => setEvaluator(e.target.value)}>
            <option value="">Evaluador</option>
  <option value="Andrea Cotrini Valencia">Andrea Cotrini Valencia</option>
  <option value="Andrés Espitia Cardona">Andrés Espitia Cardona</option>
  <option value="Andrés Felipe Aguirre García">Andrés Felipe Aguirre García</option>
  <option value="Carlos Alejandro Ramírez Gómez">Carlos Alejandro Ramírez Gómez</option>
  <option value="Carlos Duber Villa González">Carlos Duber Villa González</option>
  <option value="Christian Zetty Arenas">Christian Zetty Arenas</option>
  <option value="Diana Carolina Galvez Coy">Diana Carolina Galvez Coy</option>
  <option value="Diana Carolina Vargas Giraldo">Diana Carolina Vargas Giraldo</option>
  <option value="Guillermo Hernán Zapata Castellanos">Guillermo Hernán Zapata Castellanos</option>
  <option value="Jorge Víctor Buriticá Calderón">Jorge Víctor Buriticá Calderón</option>
  <option value="José David López Álzate">José David López Álzate</option>
  <option value="Leidy Johanna Forero Rincón">Leidy Johanna Forero Rincón</option>
  <option value="Luis Edier Gañan Gañan">Luis Edier Gañan Gañan</option>
  <option value="Valentina Hernández Piedrahita">Valentina Hernández Piedrahita</option>
</select>


            {currentCategory?.questions.map((question) => (
              <div key={question} className="question-container">
                <p>{question}</p>
                <div className="radio-group">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
                    <label key={score} className="radio-label">
                      <input
                        type="radio"
                        name={question}
                        value={score}
                        checked={
                          scores[currentCategory.name]?.[question] ===
                          score.toString()
                        }
                        onChange={(e) =>
                          handleScoreChange(question, e.target.value)
                        }
                      />
                      <span>{score}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <div className="button-group">
            <button 
  onClick={submitEvaluation} 
  disabled={isSubmitting}
>
  {isSubmitting ? 'Enviando...' : 'Enviar Evaluación'}
</button>
              <button onClick={closeModal}>Cerrar</button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}

export default ProjectPage;
