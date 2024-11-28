import React from 'react';
import '../Footer.css'; // Asegúrate de tener este archivo CSS
import logo from '../LogoAI.png';

function Footer() {
  return (
    <footer className="footer">
      <img src={logo} alt="Logo" className="logo" />
      
     
      
      {/* Texto sobre el semillero */}
      <p className="development-text">
        Project-APP  es un software en desarrollo por el Semillero de Investigación BIOMETRONICA del Centro de Automatización Industrial 
      <br/>Prohibida su difusión y utilización sin previa autorización
      <br/> SENA - Caldas - 2024
      </p>
      
    </footer>
  );
}

export default Footer;
