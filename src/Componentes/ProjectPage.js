// ProjectPage.js
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "react-modal";
import "../ProjectPage.css";

Modal.setAppElement("#root");

function ProjectPage() {
  const { boxNumber, projectId } = useParams();
  let nombre = "";

  if (boxNumber === "1") {
    nombre =
      "Desarrollo de prototipos de sistemas embebidos para pequeños y microproductores, integrados con fuentes de generación energética renovable.";
  } else if (boxNumber === "2") {
    nombre =
      "Control de calidad en procesos industriales adecuando visión artificial en la modernización del ambiente de formación FMS";
  } else if (boxNumber === "3") {
    nombre =
      "Tecnificación de una microempresa en uso de tecnologías 4.0 para la vigilancia y control del proceso";
  } else if (boxNumber === "4") {
    nombre = " Creación de maquina de impresión 3D de 5 ejes diseño SENA";
  } else if (boxNumber === "5") {
    nombre =
      " Desarrollo de aplicaciones a la medida que faciliten la unificación de herramientas tecnológicas de apoyo a procesos administrativos en diferentes sectores productivos";
  } else {
    nombre = "Otra Página";
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

    const allQuestionsScored = currentCategory.questions.every(
      (question) => scores[currentCategory.name]?.[question]
    );

    if (!allQuestionsScored) {
      alert("Por favor, califique todas las preguntas");
      return;
    }

    setIsSubmitting(true); // Bloquea envíos adicionales

    const evaluationData = {
      Nombre: "Convocatoria SENNOVA - 2025",
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
    1: [
      {
        id: 1,
        name: "Desarrollo de prototipos de sistemas embebidos para pequeños y microproductores, integrados con fuentes de generación energética renovable.",
      },
    ],
    2: [
      {
        id: 2,
        name: "Control de calidad en procesos industriales adecuando visión artificial en la modernización del ambiente de formación FMS",
      },
    ],
    3: [
      {
        id: 3,
        name: "Tecnificación de una microempresa en uso de tecnologías 4.0 para la vigilancia y control del proceso",
      },
    ],
    4: [
      {
        id: 4,
        name: " Creación de maquina de impresión 3D de 5 ejes diseño SENA",
      },
    ],
    5: [
      {
        id: 5,
        name: "Desarrollo de aplicaciones a la medida que faciliten la unificación de herramientas tecnológicas de apoyo a procesos administrativos en diferentes sectores productivos",
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
        "El proyecto esta alineado con las líneas tecnológicas y los objetivos propuestos que contribuyan al fortalecimiento de los programas de formación profesional integral y desarrollo tecnológico que se oferta por el Centro de Formación en la vigencia de la convocatoria.",
        "El proyecto cuenta con una formulación técnica sólida, identificando con claridad los recursos requeridos y el talento humano adecuado con experiencia y habilidades necesarias para ejecutar el proyecto.",
        "El proyecto sustenta con claridad la inversión de recursos propios requeridos, como otras fuentes de financiamiento, que genere beneficios económicos sostenibles.",
        "El proyecto considera elementos clave como la equidad, la inclusión, el desarrollo sostenible, y su contribución al fortalecimiento del tejido social; se tendrá en cuenta de manera particular el nivel de interseccionalidad que logre el proyecto para atender las dinámicas sociales y el bienestar de personas o comunidades, como mujeres, jóvenes, comunidades indígenas y campesinos.",
        "El proyecto evalúa y controla los efectos que produce en el entorno natural, aspectos tales como la calidad del aire, agua y suelo, la biodiversidad, el uso de recursos naturales, y las condiciones ecológicas, considerando su sostenibilidad y capacidad para preservar o mejorar el equilibrio ambiental.",
        "El proyecto presenta de manera clara la posibilidad de expandirse o crecer en alcance, cobertura o impacto, manteniendo su efectividad y sostenibilidad; o en su defecto, ser reproducido en otros lugares o situaciones similares, ajustándose a las condiciones locales y logrando resultados equivalentes.",
        "Capacidad del proyecto para ofrecer soluciones o enfoques únicos que lo distingan de otros similares, aportando valor añadido y respondiendo a necesidades de manera creativa y efectiva haciendo uso de nuevas ideas y/o tecnologías.",

        "Se refieren a la identificación de posibles desafíos o problemas que podrían afectar el éxito del proyecto. Además, da cuenta de las estrategias o acciones planificadas para reducir, prevenir o manejar esos riesgos, asegurando la continuidad y efectividad del objetivo propuesto.",
        "El proyecto define indicadores específicos, medibles, alcanzables, relevantes y con un tiempo definido de manera clara y consecuente con los beneficios esperados.",

        "El proyecto permite resolver medidas interpuestas por una autoridad competente que conmina a la entidad al cumplimiento de una acción.",
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
          <span className="ficha">
            {"Proyecto N° "}
            {boxNumber}
          </span>
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
            <select
              value={evaluator}
              onChange={(e) => setEvaluator(e.target.value)}
            >
              <option value="">Evaluador</option>
              <option value="Juan Carlos Ruge">
                Juan Carlos Ruge
              </option>
              <option value="Gerardine Wilches">
              Gerardine Wilches
              </option>
              <option value="Kelly Danith Pacheco">
              Kelly Danith Pacheco
              </option>
              <option value="Gelmer Restrepo">
              Gelmer Restrepo
              </option>
              <option value="Wilson Alejandro Rojas">
              Wilson Alejandro Rojas
              </option>
              <option value="Pablo Andres Erazo Muñoz">
              Pablo Andres Erazo Muñoz
              </option>
             
              
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
              <button onClick={submitEvaluation} disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Enviar Evaluación"}
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
