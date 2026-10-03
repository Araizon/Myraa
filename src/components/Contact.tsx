import React, { useState } from 'react';
import { MessageCircle, Mail, Send, CheckCircle2, Clock } from 'lucide-react';
import { sendContactMessage } from '../lib/firebase';

interface ContactProps {
  onNotify: (message: string) => void;
}

export const Contact: React.FC<ContactProps> = ({ onNotify }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setStatus('sending');
    try {
      await sendContactMessage({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        timestamp: Date.now(),
        dateReadable: new Date().toLocaleString()
      });

      setStatus('sent');
      onNotify('Transmission Success. Our headquarters has received your signal.');
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => setStatus('idle'), 4000);
    } catch (err) {
      console.error(err);
      setStatus('error');
      onNotify('Error sending message. Please connect directly via WhatsApp.');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <div className="pt-28 md:pt-36 pb-24 px-4 sm:px-6 bg-[#050505] min-h-screen relative overflow-hidden contact-grid-bg">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-14 md:mb-20">
          <div className="flex items-center gap-3 mb-4">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
            </span>
            <span className="font-mono text-xs text-red-500 tracking-[0.3em] uppercase">
              System Status: Active // Global Dispatch
            </span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none cursor-default font-oswald">
            Establish<br />
            <span className="text-transparent" style={{ WebkitTextStroke: '1.5px white' }}>
              Connection
            </span>
          </h1>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Direct channels */}
          <div className="lg:col-span-5 space-y-6">
            <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-md">
              Reach out to the EVORAN studio for private orders, custom sizing consultation, collaborations, or wholesale distribution inquiries.
            </p>

            <div className="grid gap-4">
              {/* WhatsApp Card */}
              <a
                href="https://wa.me/8801604954097"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-5 p-6 bg-[#0a0a0a]/80 backdrop-blur-md rounded-2xl border border-white/10 hover:border-green-500/50 transition-all duration-300 shadow-xl"
              >
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 group-hover:bg-green-600 group-hover:text-white transition-all shrink-0">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest block mb-0.5">
                    Instant Messenger // WhatsApp
                  </span>
                  <h3 className="text-lg md:text-xl font-bold uppercase font-oswald text-white group-hover:text-green-400 transition-colors">
                    +880 1604-954097
                  </h3>
                </div>
              </a>

              {/* Email Card */}
              <a
                href="mailto:evoran952@gmail.com"
                className="group relative flex items-center gap-5 p-6 bg-[#0a0a0a]/80 backdrop-blur-md rounded-2xl border border-white/10 hover:border-red-500/50 transition-all duration-300 shadow-xl"
              >
                <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 group-hover:bg-red-600 group-hover:text-white transition-all shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest block mb-0.5">
                    Direct Electronic Mail
                  </span>
                  <h3 className="text-lg md:text-xl font-bold uppercase font-oswald text-white group-hover:text-red-400 transition-colors">
                    evoran952@gmail.com
                  </h3>
                </div>
              </a>

              {/* Operating hours info */}
              <div className="p-5 border border-white/5 bg-black/40 rounded-xl flex items-center gap-4 text-xs font-mono text-gray-400">
                <Clock className="w-4 h-4 text-red-500 shrink-0" />
                <span>Operating 24/7 for customer dispatch & order queries.</span>
              </div>
            </div>
          </div>

          {/* Contact Transmission Form */}
          <div className="lg:col-span-7 bg-[#0a0a0a]/90 backdrop-blur-md border border-white/10 p-8 md:p-12 shadow-2xl rounded-2xl relative">
            <div className="absolute top-0 left-8 w-12 h-1 bg-[#ff0000] rounded-full" />
            
            <h2 className="text-xl md:text-2xl font-bold uppercase font-oswald tracking-wider mb-6 text-white">
              Direct Transmission Form
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="font-mono text-[10px] text-gray-400 uppercase block mb-1.5">
                    Identity / Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="GUEST_USER"
                    className="w-full form-input p-3.5 text-white text-xs rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] text-gray-400 uppercase block mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="USER@DOMAIN.COM"
                    className="w-full form-input p-3.5 text-white text-xs rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono text-[10px] text-gray-400 uppercase block mb-1.5">
                  Transmission Details *
                </label>
                <textarea
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="SPECIFY YOUR INQUIRY, SIZING REQUEST OR BULK ORDER..."
                  className="w-full form-input p-3.5 text-white text-xs resize-none rounded-xl"
                />
              </div>

              {status === 'sent' && (
                <div className="p-3 bg-green-950/40 border border-green-600/30 text-green-400 text-xs font-mono flex items-center gap-2 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                  Signal transmitted successfully to EVORAN headquarters!
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-4 rounded-full bg-gradient-to-r from-red-600/80 to-[#ff0000] hover:from-red-600 hover:to-rose-600 text-white font-black uppercase tracking-[0.25em] text-xs transition-all duration-300 shadow-[0_0_20px_rgba(255,0,0,0.4)] hover:shadow-[0_0_30px_rgba(255,0,0,0.8)] border border-red-500/50 flex items-center justify-center gap-2 group cursor-pointer hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
              >
                <span>
                  {status === 'sending' ? 'TRANSMITTING...' : status === 'sent' ? 'TRANSMITTED' : 'Send Message'}
                </span>
                <Send className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
