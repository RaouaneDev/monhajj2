import React, { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formulaire soumis:', formData);
  };

  return (
    <div className="bg-secondary min-h-screen">
      <div className="container-custom py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Contactez-Nous</h1>
          <p className="text-xl text-yellow-light">
            Notre équipe est à votre disposition pour répondre à toutes vos questions
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Informations de contact */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-dark-300 p-6 rounded-lg shadow-xl">
              <h3 className="text-xl font-semibold text-primary mb-4">Nos Coordonnées</h3>
              <div className="space-y-4 text-yellow-light">
                <p>📍 123 Rue du Pèlerinage, 75001 Paris</p>
                <p>📞 +33 1 23 45 67 89</p>
                <p>✉️ contact@monhajj.fr</p>
              </div>
            </div>

            <div className="bg-dark-300 p-6 rounded-lg shadow-xl">
              <h3 className="text-xl font-semibold text-primary mb-4">Horaires d'Ouverture</h3>
              <div className="space-y-2 text-yellow-light">
                <p>Lundi - Vendredi: 9h - 18h</p>
                <p>Samedi: 10h - 16h</p>
                <p>Dimanche: Fermé</p>
              </div>
            </div>
          </div>

          {/* Formulaire de contact */}
          <div className="md:col-span-2">
            <div className="bg-dark-300 p-8 rounded-lg shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-yellow-light mb-2">Nom</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full rounded-md border-primary bg-dark-200 text-primary placeholder-yellow-light/50 focus:border-yellow focus:ring-yellow"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-yellow-light mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full rounded-md border-primary bg-dark-200 text-primary placeholder-yellow-light/50 focus:border-yellow focus:ring-yellow"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-yellow-light mb-2">Téléphone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full rounded-md border-primary bg-dark-200 text-primary placeholder-yellow-light/50 focus:border-yellow focus:ring-yellow"
                  />
                </div>

                <div>
                  <label className="block text-yellow-light mb-2">Sujet</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full rounded-md border-primary bg-dark-200 text-primary placeholder-yellow-light/50 focus:border-yellow focus:ring-yellow"
                    required
                  />
                </div>

                <div>
                  <label className="block text-yellow-light mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full rounded-md border-primary bg-dark-200 text-primary placeholder-yellow-light/50 focus:border-yellow focus:ring-yellow"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn-primary w-full">
                  Envoyer le Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
