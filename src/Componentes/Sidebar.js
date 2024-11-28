import {  NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import '../Sidebar.css'

const events = [
  { id: 1, title: "Evento Cientifico SENNOVA 2024", path: "/event/" }

];

function Sidebar({ isOpen, toggleSidebar }) {
  const [isEventsOpen, setIsEventsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/" || location.pathname === "/home";
  const isEvent = location.pathname.includes('/event/');
  const hideMenu = isHome && !isEvent;

    return (
      <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={toggleSidebar}>×</button>
        {(isHome || isEvent) && (
          <>
            <button 
              className="dropdown-toggle"
              onClick={() => setIsEventsOpen(!isEventsOpen)}
            >
              Próximos Eventos
              {isEventsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {isEventsOpen && (
              <ul className="dropdown-menu">
                {events.map(event => (
                  <li key={event.id}>
                    <NavLink 
                      to={event.path} 
                      onClick={toggleSidebar}
                      className="event-link"
                    >
                      {event.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
        {!hideMenu && (
        <ul>
          <li><NavLink to="/rate-project" onClick={toggleSidebar}>Calificar Proyecto</NavLink></li>
          <li><NavLink to="/graphs" onClick={toggleSidebar}>Resultados</NavLink></li>
          <li><NavLink to="/project-results-table" onClick={toggleSidebar}>Resultados Proyectos</NavLink></li>
          <li><NavLink to="/" onClick={toggleSidebar}>Inicio</NavLink></li>
          
        </ul>
         )}
      </nav>
    );
  }
  
  export default Sidebar;