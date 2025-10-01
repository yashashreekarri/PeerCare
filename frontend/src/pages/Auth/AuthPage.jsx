import { useState } from 'react';
import LoginForm from '../../components/auth/LoginForm';
import RegisterForm from '../../components/auth/RegisterForm';
import { Heart, Users, BookOpen, MessageCircle } from 'lucide-react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 via-pink-500 to-purple-700 p-12 flex-col justify-center">
        <div className="max-w-lg">
          <div className="flex items-center space-x-3 mb-8">
            <div className="bg-white p-3 rounded-xl">
              <Heart className="w-10 h-10 text-purple-600" />
            </div>
            <h1 className="text-4xl font-bold text-white">PeerCare</h1>
          </div>

          <h2 className="text-3xl font-bold text-white mb-4">
            You're Not Alone in This Journey
          </h2>
          <p className="text-purple-100 text-lg mb-12">
            Connect with peers who understand your struggles. Share, support, and heal together in a safe space.
          </p>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Peer Support</h3>
                <p className="text-purple-100 text-sm">
                  Connect one-on-one with people who truly understand
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Personal Journal</h3>
                <p className="text-purple-100 text-sm">
                  Track your emotions and progress privately
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Safe Conversations</h3>
                <p className="text-purple-100 text-sm">
                  Chat anonymously in a judgment-free zone
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center space-x-2 mb-8">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold gradient-text">PeerCare</h1>
          </div>

          {/* Auth Forms */}
          <div className="animate-fadeIn">
            {isLogin ? (
              <LoginForm onToggle={() => setIsLogin(false)} />
            ) : (
              <RegisterForm onToggle={() => setIsLogin(true)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;