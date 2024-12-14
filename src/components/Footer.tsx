import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-300 text-yellow-light">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Colonne 1 - À propos */}
          <div>
            <h3 className="text-xl font-bold text-primary mb-4">À propos</h3>
            <p className="mb-4">
              Votre agence de confiance pour le Hajj et la Omra depuis plus de 15 ans.
              Licence n°IM075XXXXXX
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary transition-colors">
                <span className="sr-only">Facebook</span>
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <span className="sr-only">Instagram</span>
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <span className="sr-only">WhatsApp</span>
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>

          {/* Colonne 2 - Nos Services */}
          <div>
            <h3 className="text-xl font-bold text-primary mb-4">Nos Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/packages" className="hover:text-primary transition-colors">
                  Hajj 2025
                </Link>
              </li>
              <li>
                <Link to="/packages" className="hover:text-primary transition-colors">
                  Omra 2025
                </Link>
              </li>
              <li>
                <Link to="/packages" className="hover:text-primary transition-colors">
                  Omra Ramadan
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-primary transition-colors">
                  Guide Spirituel
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 3 - Informations */}
          <div>
            <h3 className="text-xl font-bold text-primary mb-4">Informations</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/conditions" className="hover:text-primary transition-colors">
                  Conditions Générales
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-primary transition-colors">
                  Politique de Confidentialité
                </Link>
              </li>
              <li>
                <Link to="/mentions-legales" className="hover:text-primary transition-colors">
                  Mentions Légales
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 4 - Contact */}
          <div>
            <h3 className="text-xl font-bold text-primary mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <i className="fas fa-phone text-primary"></i>
                <span>01 23 45 67 89</span>
              </li>
              <li className="flex items-center space-x-2">
                <i className="fas fa-envelope text-primary"></i>
                <span>contact@example.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <i className="fas fa-map-marker-alt text-primary"></i>
                <span>123 Rue Example, 75000 Paris</span>
              </li>
              <li className="flex items-center space-x-2">
                <i className="fas fa-clock text-primary"></i>
                <span>Lun-Ven: 9h-18h</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Barre de copyright */}
        <div className="mt-8 pt-8 border-t border-primary/30 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Votre Agence. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
