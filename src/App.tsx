import React, { useState } from 'react';
import { CreditCard, Loader2, AlertCircle, Phone, Globe, Search, CreditCardIcon, Building2, MapPin, ShieldCheck } from 'lucide-react';

interface BinData {
  number: {
    iin: string;
    length: number;
    luhn: boolean;
  };
  scheme: string;
  type: string;
  category: string;
  country: {
    alpha2: string;
    alpha3: string;
    name: string;
    emoji: string;
  };
  bank: {
    name: string;
    phone: string;
    url: string;
  };
  success: boolean;
}

function App() {
  const [bin, setBin] = useState('');
  const [binData, setBinData] = useState<BinData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (bin.length < 6) {
      setError('Please enter at least 6 digits');
      return;
    }

    setLoading(true);
    setError('');
    setBinData(null);

    try {
      const response = await fetch(`https://binlist.io/lookup/${bin}`);
      if (!response.ok) {
        throw new Error('Invalid BIN number or API error');
      }
      const data = await response.json();
      setBinData(data);
    } catch (err) {
      setError('Failed to fetch BIN information. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] -z-10" />
      <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-200"></div>
              <div className="relative bg-white p-5 rounded-full shadow-2xl transform transition duration-200 group-hover:scale-105">
                <CreditCard className="h-14 w-14 text-indigo-600" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6 tracking-tight">
            BIN Checker Pro
          </h1>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto leading-relaxed">
            Professional BIN lookup tool for credit card verification and bank identification
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl p-8 mb-10 border border-gray-100/50 transform transition-all duration-200 hover:shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <label htmlFor="bin" className="block text-lg font-semibold text-gray-800 mb-3">
                Enter BIN Number
              </label>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-200"></div>
                <div className="relative">
                  <input
                    type="text"
                    id="bin"
                    value={bin}
                    onChange={(e) => setBin(e.target.value.replace(/\D/g, '').slice(0, 8))}
                    className="w-full pl-14 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-lg"
                    placeholder="Enter first 6-8 digits (e.g., 601120)"
                    maxLength={8}
                  />
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" />
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-8 rounded-2xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-all duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed transform hover:-translate-y-0.5"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="animate-spin h-6 w-6 mr-3" />
                  Processing...
                </span>
              ) : (
                'Verify BIN'
              )}
            </button>
          </form>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-2xl mb-10 animate-fade-in">
            <div className="flex items-center">
              <AlertCircle className="h-6 w-6 text-red-400 mr-3 flex-shrink-0" />
              <p className="text-red-700 text-lg">{error}</p>
            </div>
          </div>
        )}

        {binData && (
          <div className="space-y-8 animate-fade-in">
            {/* Card Type Section */}
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-gray-100/50 transform transition-all duration-200 hover:shadow-2xl">
              <div className="flex items-center gap-5 mb-8">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
                  <CreditCardIcon className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Card Information</h2>
                  <p className="text-gray-500 text-lg">Detailed card specifications</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 transform transition-all duration-200 hover:scale-105">
                  <p className="text-blue-600 font-semibold mb-2">Card Scheme</p>
                  <p className="text-2xl font-bold text-gray-900">{binData.scheme}</p>
                </div>
                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-6 transform transition-all duration-200 hover:scale-105">
                  <p className="text-indigo-600 font-semibold mb-2">Card Type</p>
                  <p className="text-2xl font-bold text-gray-900">{binData.type}</p>
                </div>
                <div className="bg-gradient-to-br from-violet-50 to-violet-100 rounded-2xl p-6 transform transition-all duration-200 hover:scale-105">
                  <p className="text-violet-600 font-semibold mb-2">Category</p>
                  <p className="text-2xl font-bold text-gray-900">{binData.category}</p>
                </div>
              </div>
            </div>

            {/* Bank Information */}
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-gray-100/50 transform transition-all duration-200 hover:shadow-2xl">
              <div className="flex items-center gap-5 mb-8">
                <div className="p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl">
                  <Building2 className="h-8 w-8 text-indigo-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Issuing Institution</h2>
                  <p className="text-gray-500 text-lg">Bank details and contact information</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 transform transition-all duration-200 hover:scale-105">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">{binData.bank.name}</h3>
                  <div className="space-y-4">
                    <a
                      href={`tel:${binData.bank.phone}`}
                      className="flex items-center gap-3 text-indigo-600 hover:text-indigo-800 transition-colors text-lg"
                    >
                      <Phone className="h-5 w-5" />
                      <span>{binData.bank.phone}</span>
                    </a>
                    <a
                      href={`https://${binData.bank.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-indigo-600 hover:text-indigo-800 transition-colors text-lg"
                    >
                      <Globe className="h-5 w-5" />
                      <span>{binData.bank.url}</span>
                    </a>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 transform transition-all duration-200 hover:scale-105">
                  <div className="flex items-center gap-3 mb-6">
                    <MapPin className="h-6 w-6 text-gray-600" />
                    <h3 className="text-2xl font-bold text-gray-900">Location</h3>
                  </div>
                  <p className="text-3xl mb-4 flex items-center gap-3">
                    <span>{binData.country.emoji}</span>
                    <span className="font-bold">{binData.country.name}</span>
                  </p>
                  <div className="flex gap-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-800">
                      {binData.country.alpha2}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-800">
                      {binData.country.alpha3}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Number Details */}
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-gray-100/50 transform transition-all duration-200 hover:shadow-2xl">
              <div className="flex items-center gap-5 mb-8">
                <div className="p-4 bg-gradient-to-br from-violet-50 to-violet-100 rounded-2xl">
                  <ShieldCheck className="h-8 w-8 text-violet-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Verification Details</h2>
                  <p className="text-gray-500 text-lg">Card number specifications and validation</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 transform transition-all duration-200 hover:scale-105">
                  <p className="text-emerald-600 font-semibold mb-2">IIN/BIN</p>
                  <p className="text-2xl font-bold text-gray-900">{binData.number.iin}</p>
                </div>
                <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl p-6 transform transition-all duration-200 hover:scale-105">
                  <p className="text-teal-600 font-semibold mb-2">Card Length</p>
                  <p className="text-2xl font-bold text-gray-900">{binData.number.length} digits</p>
                </div>
                <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-2xl p-6 transform transition-all duration-200 hover:scale-105">
                  <p className="text-cyan-600 font-semibold mb-2">Luhn Algorithm</p>
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center px-4 py-2 rounded-full text-base font-semibold ${
                      binData.number.luhn ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {binData.number.luhn ? 'Valid' : 'Invalid'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;