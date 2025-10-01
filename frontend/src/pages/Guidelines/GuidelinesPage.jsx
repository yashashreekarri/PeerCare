import { Shield, Heart, AlertTriangle, Users, MessageCircle, Flag } from 'lucide-react';

const GuidelinesPage = () => {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fadeIn">
          <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-2">
            Community Guidelines
          </h1>
          <p className="text-gray-600 text-lg">
            Creating a safe and supportive environment for all IIT students
          </p>
        </div>

        {/* Important Notice */}
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-2xl p-6 mb-8 animate-fadeIn">
          <div className="flex items-start space-x-4">
            <AlertTriangle className="w-8 h-8 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold mb-2">Important: Peer Support, Not Therapy</h2>
              <p className="text-yellow-50 mb-2">
                <strong>PeerCare IIT is a peer support platform, NOT a substitute for professional mental health services.</strong>
              </p>
              <ul className="list-disc list-inside text-yellow-50 space-y-1">
                <li>We are <strong>fellow students</strong>, not licensed therapists or counselors</li>
                <li>This platform provides <strong>peer connection and mutual support</strong></li>
                <li>For professional help, contact <strong>IIT Counseling Services: (312) 567-3484</strong></li>
                <li>In crisis? Call <strong>988</strong> (Suicide & Crisis Lifeline) or <strong>911</strong></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Guidelines Sections */}
        <div className="space-y-6">
          {/* Respectful Communication */}
          <div className="glass rounded-2xl p-6 animate-fadeIn">
            <div className="flex items-start space-x-4 mb-4">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-xl">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Respectful Communication</h2>
              </div>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-purple-600 mr-3">✓</span>
                <span>Be kind, empathetic, and non-judgmental in all interactions</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-3">✓</span>
                <span>Listen actively and validate others' feelings and experiences</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-3">✓</span>
                <span>Use "I" statements to share your own experiences without giving advice</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-3">✗</span>
                <span>No harassment, bullying, hate speech, or discriminatory language</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-3">✗</span>
                <span>No unsolicited advice or telling others what they "should" do</span>
              </li>
            </ul>
          </div>

          {/* Privacy & Confidentiality */}
          <div className="glass rounded-2xl p-6 animate-fadeIn">
            <div className="flex items-start space-x-4 mb-4">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-3 rounded-xl">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Privacy & Confidentiality</h2>
              </div>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">✓</span>
                <span>Respect others' privacy - don't share their information outside the platform</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">✓</span>
                <span>Share only what you're comfortable sharing</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">✓</span>
                <span>Use anonymous or first-name-only if you prefer</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-3">✗</span>
                <span>Don't screenshot or share private conversations</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-3">✗</span>
                <span>Don't pressure others to share personal information</span>
              </li>
            </ul>
          </div>

          {/* Safety First */}
          <div className="glass rounded-2xl p-6 animate-fadeIn">
            <div className="flex items-start space-x-4 mb-4">
              <div className="bg-gradient-to-br from-red-500 to-pink-500 p-3 rounded-xl">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Safety First</h2>
              </div>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-red-600 mr-3">✓</span>
                <span>If you're in crisis, contact professional help immediately</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-3">✓</span>
                <span>Know your limits - it's okay to take breaks or step back</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-3">✓</span>
                <span>Report any concerning behavior using the report feature</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-3">✗</span>
                <span>Don't attempt to provide professional diagnosis or treatment</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-3">✗</span>
                <span>Don't meet peers in person without proper safety precautions</span>
              </li>
            </ul>
          </div>

          {/* Boundaries */}
          <div className="glass rounded-2xl p-6 animate-fadeIn">
            <div className="flex items-start space-x-4 mb-4">
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-3 rounded-xl">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Healthy Boundaries</h2>
              </div>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-600 mr-3">✓</span>
                <span>Communicate your boundaries clearly and respect others' boundaries</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-3">✓</span>
                <span>It's okay to decline connection requests or end conversations</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-3">✓</span>
                <span>Take care of your own mental health first</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-3">✗</span>
                <span>Don't become overly dependent on peer support</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-3">✗</span>
                <span>Don't send excessive messages or pressure for immediate responses</span>
              </li>
            </ul>
          </div>

          {/* Reporting */}
          <div className="glass rounded-2xl p-6 animate-fadeIn">
            <div className="flex items-start space-x-4 mb-4">
              <div className="bg-gradient-to-br from-orange-500 to-yellow-500 p-3 rounded-xl">
                <Flag className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Report Inappropriate Content</h2>
              </div>
            </div>
            <div className="bg-orange-50 rounded-xl p-4 mb-4">
              <p className="text-gray-700 mb-2">
                <strong>Report any behavior that violates these guidelines, including:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Harassment, threats, or abusive language</li>
                <li>Sharing explicit or inappropriate content</li>
                <li>Impersonation or false information</li>
                <li>Spam, advertising, or solicitation</li>
                <li>Concerns about someone's immediate safety</li>
              </ul>
            </div>
            <p className="text-gray-700">
              To report: Click the flag icon on any message or profile, or contact the platform administrators. 
              All reports are reviewed confidentially.
            </p>
          </div>

          {/* Consequences */}
          <div className="glass rounded-2xl p-6 animate-fadeIn bg-gradient-to-br from-gray-50 to-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-3">Consequences for Violations</h2>
            <p className="text-gray-700 mb-3">
              Violations of these guidelines may result in:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="font-bold mr-2">1.</span>
                <span>Warning and required review of guidelines</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">2.</span>
                <span>Temporary suspension of account</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">3.</span>
                <span>Permanent ban from the platform</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">4.</span>
                <span>Referral to IIT administration in severe cases</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Acknowledgment */}
        <div className="glass rounded-2xl p-6 mt-8 text-center">
          <p className="text-gray-700 mb-4">
            By using PeerCare IIT, you agree to follow these Community Guidelines and understand that 
            this is a <strong>peer support platform, not professional therapy</strong>.
          </p>
          <p className="text-sm text-gray-600">
            Last updated: September 2025 • Questions? Contact support@peercare-iit.edu
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuidelinesPage;