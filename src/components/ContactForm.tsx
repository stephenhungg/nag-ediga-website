import { useState, FormEvent } from 'react';
import { cn } from '@/lib/utils';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    // Simulate form submission (replace with actual backend call)
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-berkeley-blue focus:ring-2 focus:ring-berkeley-blue/20 transition-all duration-200 outline-none"
          placeholder="Your name"
        />
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-berkeley-blue focus:ring-2 focus:ring-berkeley-blue/20 transition-all duration-200 outline-none"
          placeholder="your.email@example.com"
        />
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-berkeley-blue focus:ring-2 focus:ring-berkeley-blue/20 transition-all duration-200 outline-none resize-none"
          placeholder="Your message..."
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'sending'}
        className={cn(
          'w-full py-3 px-6 rounded-lg font-medium transition-all duration-300',
          status === 'sending'
            ? 'bg-gray-400 text-white cursor-not-allowed'
            : status === 'success'
            ? 'bg-green-600 text-white'
            : 'bg-berkeley-blue text-white hover:bg-berkeley-blue/90 hover:shadow-lg hover:scale-105'
        )}
      >
        {status === 'sending' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Message'}
      </button>

      {/* Status Messages */}
      {status === 'error' && (
        <p className="text-red-600 text-sm text-center">
          Failed to send message. Please try again.
        </p>
      )}
    </form>
  );
};

export default ContactForm;
