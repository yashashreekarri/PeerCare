// frontend/src/components/auth/RegisterForm.jsx
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Calendar, Loader, AlertCircle, FileText } from 'lucide-react';

const RegisterForm = ({ onToggle }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    bio: '',
    struggles: [],
    interests: [],
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Illinois Tech Email Validation
    if (!formData.email.endsWith('@hawk.iit.edu') && !formData.email.endsWith('@iit.edu')) {
      setError('Please use your Illinois Tech email address (@hawk.iit.edu or @iit.edu)');
      setLoading(false);
      return;
    }

    // Age validation
    const age = parseInt(formData.age);
    if (age < 13 || age > 100) {
      setError('Age must be between 13 and 100');
      setLoading(false);
      return;
    }

    // Password validation
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      // Prepare data for API
      const registrationData = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        age: parseInt(formData.age),
        bio: formData.bio.trim() || '',
        struggles: formData.struggles,
        interests: formData.interests,
      };

      const response = await register(registrationData);
      
      if (response.success) {
        navigate('/dashboard');
      } else {
        setError(response.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold gradient-text mb-2">Join PeerCare</h2>
        <p className="text-gray-600">Start your journey to better mental health</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-start space-x-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <div>
          <label className="block text-gray-700 font-medium mb-2">Full Name *</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              placeholder="John Doe"
              required
              disabled={loading}
              minLength="2"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">IIT Email *</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              placeholder="your.email@iit.edu"
              required
              disabled={loading}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">Use your @hawk.iit.edu or @iit.edu email</p>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Password *</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              placeholder="••••••••"
              minLength="6"
              required
              disabled={loading}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Age *</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              placeholder="18"
              min="13"
              max="100"
              required
              disabled={loading}
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Bio <span className="text-gray-400 text-sm">(Optional)</span>
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition resize-none"
              placeholder="Tell us a bit about yourself..."
              rows="3"
              disabled={loading}
              maxLength="500"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">{formData.bio.length}/500 characters</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              <span>Creating account...</span>
            </>
          ) : (
            <span>Create Account</span>
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Already have an account?{' '}
          <button
            onClick={onToggle}
            className="text-purple-600 font-medium hover:text-purple-700 transition"
            disabled={loading}
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;