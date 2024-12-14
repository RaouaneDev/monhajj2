import React from 'react';
import { Link } from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop';
import { scrollToTop } from '../utils/scrollUtils';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section 
        className="relative h-[80vh] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://cdn.pixabay.com/photo/2018/10/30/03/05/islam-3782623_1280.jpg")'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60" />
        <div className="relative container-custom h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Votre Voyage Spirituel Commence Ici
            </h1>
            <p className="text-xl mb-8">
              Découvrez nos forfaits Omra 2025 et réservez votre voyage dès maintenant.
            </p>
            <Link to="/packages" className="btn-primary">
              Voir les Forfaits
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-black">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-4 text-yellow-500">Pourquoi Nous Choisir</h2>
          <p className="text-center text-yellow-300 mb-12 max-w-2xl mx-auto">
            Notre agence s'engage à vous offrir une expérience spirituelle authentique et confortable
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-6 rounded-xl shadow-xl transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl mb-4 text-black">🕌</div>
              <h3 className="text-xl font-bold mb-2 text-black">Expertise Religieuse</h3>
              <p className="text-black/80">
                Guides religieux qualifiés pour vous accompagner dans tous les rituels
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-6 rounded-xl shadow-xl transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl mb-4 text-black">⭐</div>
              <h3 className="text-xl font-bold mb-2 text-black">Service Premium</h3>
              <p className="text-black/80">
                Hôtels 5 étoiles à proximité des lieux saints et transport VIP
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-6 rounded-xl shadow-xl transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl mb-4 text-black">🤝</div>
              <h3 className="text-xl font-bold mb-2 text-black">Accompagnement 24/7</h3>
              <p className="text-black/80">
                Une équipe disponible à tout moment pour votre confort et sécurité
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-6 rounded-xl shadow-xl transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl mb-4 text-black">💯</div>
              <h3 className="text-xl font-bold mb-2 text-black">Satisfaction Garantie</h3>
              <p className="text-black/80">
                Des milliers de pèlerins satisfaits depuis plus de 15 ans
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-4 text-yellow-500">Témoignages</h2>
          <p className="text-center text-yellow-300 mb-12 max-w-2xl mx-auto">
            Ce que nos pèlerins disent de leur expérience avec nous
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black border border-yellow-500 p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center mb-4">
                <img
                  src="https://picsum.photos/100/100?random=1"
                  alt="Ahmed"
                  className="w-16 h-16 rounded-full border-2 border-yellow-500 mr-4"
                />
                <div>
                  <h3 className="text-yellow-500 font-bold">Ahmed Benali</h3>
                  <p className="text-yellow-300 text-sm">Hajj 2023</p>
                </div>
              </div>
              <p className="text-gray-300 italic">
                "Une organisation parfaite du début à la fin. Les guides étaient très professionnels et attentionnés. Je recommande vivement cette agence pour votre pèlerinage."
              </p>
              <div className="mt-4 text-yellow-500">
                ⭐⭐⭐⭐⭐
              </div>
            </div>

            <div className="bg-black border border-yellow-500 p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center mb-4">
                <img
                  src="https://picsum.photos/100/100?random=2"
                  alt="Fatima"
                  className="w-16 h-16 rounded-full border-2 border-yellow-500 mr-4"
                />
                <div>
                  <h3 className="text-yellow-500 font-bold">Fatima Zahra</h3>
                  <p className="text-yellow-300 text-sm">Omra Ramadan 2023</p>
                </div>
              </div>
              <p className="text-gray-300 italic">
                "Un voyage spirituel inoubliable. L'hébergement était excellent et proche des lieux saints. Le personnel était à l'écoute de nos besoins 24h/24."
              </p>
              <div className="mt-4 text-yellow-500">
                ⭐⭐⭐⭐⭐
              </div>
            </div>

            <div className="bg-black border border-yellow-500 p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center mb-4">
                <img
                  src="https://picsum.photos/100/100?random=3"
                  alt="Karim"
                  className="w-16 h-16 rounded-full border-2 border-yellow-500 mr-4"
                />
                <div>
                  <h3 className="text-yellow-500 font-bold">Karim Mansouri</h3>
                  <p className="text-yellow-300 text-sm">Omra 2024</p>
                </div>
              </div>
              <p className="text-gray-300 italic">
                "Merci pour cette magnifique expérience. Le guide était très compétent et nous a parfaitement accompagnés dans tous les rituels. Je reviendrai pour le Hajj insha'Allah."
              </p>
              <div className="mt-4 text-yellow-500">
                ⭐⭐⭐⭐⭐
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à Commencer Votre Voyage ?</h2>
          <p className="text-xl mb-8">Réservez maintenant pour vivre une expérience spirituelle unique</p>
          <Link 
            to="/booking" 
            onClick={scrollToTop}
            className="inline-block bg-black text-white px-8 py-3 rounded-lg hover:bg-black/80 transition duration-300 font-bold"
          >
            Réserver Maintenant
          </Link>
        </div>
      </section>

      <ScrollToTop />
    </div>
  );
};

export default Home;
