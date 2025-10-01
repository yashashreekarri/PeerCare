import { Phone, AlertCircle, Heart, ExternalLink, MapPin, Mail } from 'lucide-react';

const EmergencyPage = () => {
  const iitResources = [
    {
      id: 1,
      name: "IIT Counseling Services",
      phone: "(312) 567-3484",
      location: "IIT Tower, 10 W 35th St, Suite 1700, Chicago, IL",
      description: "Professional counseling services for IIT students",
      hours: "Mon-Fri: 8:30 AM - 5:00 PM",
      isIIT: true
    },
    {
      id: 2,
      name: "IIT Public Safety (Campus Emergency)",
      phone: "(312) 808-6363",
      description: "24/7 campus emergency response",
      hours: "24/7 Available",
      isIIT: true
    },
    {
      id: 3,
      name: "National Suicide Prevention Lifeline",
      phone: "988",
      description: "24/7 free and confidential crisis support",
      hours: "24/7 Available"
    },
    {
      id: 4,
      name: "Crisis Text Line",
      phone: "Text HOME to 741741",
      description: "24/7 text support for people in crisis",
      hours: "24/7 Available"
    },
    {
      id: 5,
      name: "Chicago Mobile Crisis Team",
      phone: "(312) 747-5680",
      description: "Mobile crisis intervention services in Chicago",
      hours: "24/7 Available"
    },
    {
      id: 6,
      name: "SAMHSA National Helpline",
      phone: "1-800-662-4357",
      description: "Treatment referral and information service",
      hours: "24/7 Available"
    }
  ];

  const chicagoHospitals = [
    {
      name: "Rush University Medical Center",
      phone: "(312) 942-5000",
      distance: "1.5 miles from IIT"
    },
    {
      name: "Mercy Hospital & Medical Center",
      phone: "(312) 567-2000",
      distance: "1 mile from IIT"
    }
  ];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Warning Banner */}
        <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl p-6 mb-8 animate-fadeIn">
          <div className="flex items-start space-x-4">
            <AlertCircle className="w-8 h-8 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold mb-2">In Crisis? Get Help Now</h2>
              <p className="text-red-50 mb-4">
                If you're experiencing a mental health emergency or having thoughts of self-harm, 
                please reach out immediately. You are not alone, and help is available.
              </p>
              <p className="font-bold text-lg">
                🚨 <strong>Immediate Danger:</strong> Call 911 or IIT Public Safety: (312) 808-6363
              </p>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8 animate-fadeIn">
          <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-2">
            Emergency Resources
          </h1>
          <p className="text-gray-600 text-lg flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            IIT Chicago Campus & Local Resources
          </p>
        </div>

        {/* IIT-Specific Resources Highlight */}
        <div className="glass rounded-2xl p-6 mb-8 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-purple-300">
          <h2 className="text-xl font-bold text-purple-800 mb-4 flex items-center">
            <Heart className="w-6 h-6 mr-2" />
            IIT Student Resources
          </h2>
          <div className="space-y-4">
            {iitResources.filter(r => r.isIIT).map((resource) => (
              <div key={resource.id} className="bg-white rounded-xl p-4 shadow-md">
                <h3 className="text-lg font-bold text-gray-800 mb-2">{resource.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
                {resource.location && (
                  <p className="text-sm text-gray-600 mb-2 flex items-start">
                    <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                    {resource.location}
                  </p>
                )}
                <p className="text-sm text-purple-600 mb-3">
                  <strong>Hours:</strong> {resource.hours}
                </p>
                <a
                  href={`tel:${resource.phone.replace(/[^0-9]/g, '')}`}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 smooth-transition font-bold"
                >
                  <Phone className="w-5 h-5" />
                  <span>{resource.phone}</span>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* National & Local Helplines */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">24/7 Crisis Helplines</h2>
        <div className="space-y-4 mb-8">
          {iitResources.filter(r => !r.isIIT).map((resource, index) => (
            <div
              key={resource.id}
              className="glass rounded-2xl p-6 card-hover animate-fadeIn"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-br from-red-500 to-pink-500 p-3 rounded-xl flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{resource.name}</h3>
                  <p className="text-gray-600 mb-3">{resource.description}</p>
                  <p className="text-sm text-gray-500 mb-3">
                    <strong>Availability:</strong> {resource.hours}
                  </p>
                  <a
                    href={`tel:${resource.phone.replace(/[^0-9+]/g, '')}`}
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:from-red-600 hover:to-pink-600 smooth-transition font-bold"
                  >
                    <Phone className="w-5 h-5" />
                    <span>{resource.phone}</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Nearby Hospitals */}
        <div className="glass rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <MapPin className="w-6 h-6 mr-2 text-red-600" />
            Nearby Emergency Rooms
          </h2>
          <div className="space-y-3">
            {chicagoHospitals.map((hospital, index) => (
              <div key={index} className="p-4 bg-gradient-to-br from-red-50 to-pink-50 rounded-xl">
                <h3 className="font-bold text-gray-800">{hospital.name}</h3>
                <p className="text-sm text-gray-600">{hospital.distance}</p>
                <a
                  href={`tel:${hospital.phone.replace(/[^0-9]/g, '')}`}
                  className="text-red-600 font-semibold hover:text-red-700"
                >
                  {hospital.phone}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Resources */}
        <div className="glass rounded-2xl p-8 animate-fadeIn">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Heart className="w-6 h-6 mr-2 text-red-500" />
            Additional Support Resources
          </h2>
          
          <div className="space-y-6">
            {/* Online Resources */}
            <div>
              <h3 className="font-bold text-gray-800 mb-3">Online Crisis Support</h3>
              <div className="space-y-3">
                <a
                  href="https://www.crisistextline.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl hover:shadow-md smooth-transition"
                >
                  <span className="font-medium text-gray-800">Crisis Text Line</span>
                  <ExternalLink className="w-5 h-5 text-purple-600" />
                </a>
                <a
                  href="https://www.7cups.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl hover:shadow-md smooth-transition"
                >
                  <span className="font-medium text-gray-800">7 Cups - Free Emotional Support</span>
                  <ExternalLink className="w-5 h-5 text-purple-600" />
                </a>
                <a
                  href="https://www.betterhelp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl hover:shadow-md smooth-transition"
                >
                  <span className="font-medium text-gray-800">BetterHelp - Online Therapy</span>
                  <ExternalLink className="w-5 h-5 text-purple-600" />
                </a>
              </div>
            </div>

            {/* Self-Care Tips */}
            <div>
              <h3 className="font-bold text-gray-800 mb-3">Immediate Self-Care Steps</h3>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 font-bold">1.</span>
                    <span><strong>Reach out:</strong> Call a helpline or contact someone you trust</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 font-bold">2.</span>
                    <span><strong>Stay safe:</strong> Remove any means of self-harm from your immediate environment</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 font-bold">3.</span>
                    <span><strong>Ground yourself:</strong> Try deep breathing - inhale for 4, hold for 4, exhale for 4</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 font-bold">4.</span>
                    <span><strong>Stay present:</strong> Focus on your five senses to anchor yourself in the moment</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 font-bold">5.</span>
                    <span><strong>Don't isolate:</strong> Stay in a public place or with others until you feel safer</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Remember */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
              <h3 className="font-bold text-green-800 mb-3 text-lg">Remember:</h3>
              <p className="text-gray-700 leading-relaxed">
                <strong>This feeling is temporary.</strong> You've survived 100% of your worst days so far. 
                Professional help is available, and things can get better. You deserve support and you deserve to feel better.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyPage;