import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Hajj Travel</h3>
            <p className="text-gray-300">
              Votre partenaire de confiance pour un pèlerinage serein et spirituel.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Liens Rapides</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/packages" className="text-gray-300 hover:text-white transition-colors">
                  Nos Forfaits
                </Link>
              </li>
              <li>
                <Link to="/guide" className="text-gray-300 hover:text-white transition-colors">
                  Guide Hajj
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Téléphone: +33 1 23 45 67 89</li>
              <li>Email: contact@hajjtravel.com</li>
              <li>Adresse: 123 Rue du Commerce, Paris</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Suivez-nous</h4>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-yellow-light hover:text-primary">
                <span className="sr-only">Facebook</span>
                <FaFacebook className="text-xl" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-yellow-light hover:text-primary">
                <span className="sr-only">Twitter</span>
                <FaInstagram className="text-xl" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-yellow-light hover:text-primary">
                <span className="sr-only">Instagram</span>
                <FaWhatsapp className="text-xl" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Hajj Travel. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
