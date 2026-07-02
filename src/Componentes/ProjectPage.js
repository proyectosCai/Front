// ProjectPage.js
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "react-modal";
import "../ProjectPage.css";
//
Modal.setAppElement("#root");

function ProjectPage() {
  const { boxNumber, projectId } = useParams();
  let nombre = "";

  if (boxNumber === "TPM - GPI") {
    nombre = "JORNADA I";
  } else if (boxNumber === "TPM - GPI") {
      nombre = "JORNADA II";
    
    }  else {
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
      Nombre: "Evaluación Proyectos I Trimestre - 2026",
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
      
   
      
    ]
      , "JORNADA II": [
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

  const projects = projectsByFicha[boxNumber] || [];
  const project = projects.find((p) => p.name);

  const categories = [
    {
      name: "EVALUAR",
      color: "#9b59b6",
      questions: [
        "¿El proyecto tiene objetivos claros y bien definidos que guían el desarrollo?",
        "¿La metodología empleada es adecuada y bien explicada para lograr los objetivos del proyecto?",
        "¿El proyecto tiene un propósito significativo y puede generar un impacto positivo en su área de aplicación?",
        "¿El proyecto presenta conclusiones y recomendaciones coherentes con los resultados obtenidos?",
        "¿Los resultados del proyecto están bien fundamentados y son consistentes con los objetivos planteados?",
        "¿La presentación sigue una estructura lógica  y facilita la comprensión?",
        "¿El expositor demuestra conocimiento del tema y lo explica con claridad?",
        "¿La presentación visual (diapositivas, prototipos, gráficos) es atractiva y complementa la explicación del proyecto?",
        "¿El expositor utiliza recursos (contacto visual, lenguaje corporal, tono) que involucran al público?",
        "¿El expositor administra adecuadamente el tiempo asignado para la presentación?",
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
              <option value="Diana Carolina Vargas">
                Diana Carolina Vargas
              </option>
              <option value="Valentina Hernandez">
             Valentina Hernandez
              </option>
              <option value="Juan Camilo Gomez">
             Juan Camilo Gomez
              </option>
              <option value="Adriana Tabares">
             Adriana Tabares
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
