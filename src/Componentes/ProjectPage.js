// ProjectPage.js
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "react-modal";
import "../ProjectPage.css";

Modal.setAppElement("#root");

function ProjectPage() {
  const { boxNumber, projectId } = useParams();
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
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [evaluator, setEvaluator] = useState("");
  const [scores, setScores] = useState({});
  const [totalScores, setTotalScores] = useState({});
  const [showThankYou, setShowThankYou] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  const submitEvaluation = async () => {
    const evaluationData = {
      Nombre: "Evento Sennova 2024",
      Proyecto: projectId,
      Centro: nombre,
      Evaluador: evaluator,
      Total: parseInt(totalScores["EVALUAR"]),
     
    };

    console.log("data: ", evaluationData);

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
        console.log("Enviado");
      } else {
        console.error("Error al enviar la evaluación");
        // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
      }
    } catch (error) {
      console.error("Error:", error);
      // Aquí puedes manejar el error de red, por ejemplo, mostrando un mensaje al usuario
    }
  };

  // Este objeto debería ser el mismo que en BoxPage.js
  const projectsByFicha = {
    9112: [
      {
        id: 1,
        name: "Desarrollo de un prototipo de harina alimenticia a partir de productos y subproductos agrícolas como aporte a la seguridad alimentaria de la región de caldas",
      },
      {
        id: 2,
        name: "Efecto de la harina de cascara de plátano verde (Musa paradisiaca) en la rentabilidad y asimilación de la dieta de gallinas ponedoras",
      },
      {
        id: 3,
        name: "Obtención de principios activos de plantas medicinales ",
      },
    ],
    9219: [
      {
        id: 1,
        name: "Producción de Aceite de Palma con enfoque de sostenibilidad ambiental y resiliencia al cambio climático.",
      },
    ],
    9515: [
      {
        id: 1,
        name: "Diagnóstico del sistema turístico de La Dorada, Caldas para su desarrollo integrado con los espacios rurales",
      },
      {
        id: 2,
        name: "Análisis integral del sistema turístico de la Dorada, Caldas: oportunidades y desafíos",
      },
      {
        id: 3,
        name: "Estudios de Capacidad de Carga Turística en rutas para el Aviturismo del Magdalena Caldense",
      },
      {
        id: 4,
        name: "Percepción de los habitantes de la vereda  el Japón frente al cambio climático ",
      },
      {
        id: 5,
        name: "Tecnología y naturaleza: realidad aumentada para la educación ambiental y la conservación de fauna silvestre en La Dorada, Caldas",
      },
      {
        id: 6,
        name: "Ganadería sostenible: elaboración de biofertilizantes para el mejoramiento de pasturas en la Dorada, Caldas.",
      },
      {
        id: 7,
        name: "Desarrollo de emprendimiento socio-ambiental de base circular, mediado por e-learning",
      },
      {
        id: 8,
        name: "Desarrollo de un aplicativo integral para la optimización de reservas hoteleras e información turistica en el magdalena medio.",
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
          <div className="thank-you-message">
            <h2>¡Gracias por su evaluación!</h2>
          </div>
        ) : (
          <>
            <h2>Seleccione una única opción por pregunta</h2>
            <input
              className="radio-group1"
              type="text"
              value={evaluator}
              onChange={(e) => setEvaluator(e.target.value)}
              placeholder="Nombre evaluador"
            />

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
              <button onClick={submitEvaluation}>Enviar Evaluación</button>
              <button onClick={closeModal}>Cerrar</button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}

export default ProjectPage;
