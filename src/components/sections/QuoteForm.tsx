'use client';

import { useState } from 'react';
import { Phone, CheckCircle, Loader2, Plus, Minus, ChevronRight } from 'lucide-react';
import { business, whatHappensNext, cartTypes } from '@/content/siteContent';
import { submitQuoteRequest } from '@/lib/supabase';
import { DateRangePicker } from '@/components/ui/DateRangePicker';

interface QuoteFormProps {
  preselectedCartType?: string;
}

type FormStep = 1 | 2;

// Helper to parse date string in LOCAL timezone (not UTC)
// "2026-01-10" should be Jan 10 at midnight LOCAL time, not UTC
function parseLocalDate(dateString: string): Date | undefined {
  if (!dateString) return undefined;
  const [year, month, day] = dateString.split('-').map(Number);
  // Create date at noon local time to avoid timezone edge cases
  return new Date(year, month - 1, day, 12, 0, 0);
}

// Helper to format Date to YYYY-MM-DD in LOCAL timezone
function formatLocalDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function QuoteForm({ preselectedCartType }: QuoteFormProps) {
  const [step, setStep] = useState<FormStep>(1);
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    email: '',
    startDate: '',
    endDate: '',
    datesFlexible: false,
    delivery_location: '',
    number_of_carts: 1,
    cart_type: preselectedCartType || '',
    preferred_contact_method: 'text',
    notes: '',
    honeypot: '',
    understands_minimum: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleCartQuantityChange = (delta: number) => {
    setFormData(prev => ({
      ...prev,
      number_of_carts: Math.max(1, Math.min(6, prev.number_of_carts + delta)),
    }));
  };

  const validateStep1 = () => {
    const errors: Record<string, string> = {};

    if (!formData.datesFlexible && (!formData.startDate || !formData.endDate)) {
      errors.dates = 'Select dates or check "Not sure yet"';
    }

    if (!formData.delivery_location.trim()) {
      errors.delivery_location = 'Delivery location is required';
    }

    return errors;
  };

  const validateStep2 = () => {
    const errors: Record<string, string> = {};

    if (!formData.full_name.trim()) {
      errors.full_name = 'Name is required';
    }

    if (!formData.phone.trim() || formData.phone.trim().length < 10) {
      errors.phone = 'Valid phone number is required';
    }

    if (!formData.understands_minimum) {
      errors.understands_minimum = 'You must acknowledge the 3-day minimum';
    }

    return errors;
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateStep1();

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setStep(2);
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('========================================');
    console.log('🚀 FORM SUBMISSION STARTED');
    console.log('========================================');

    const errors = validateStep2();
    if (Object.keys(errors).length > 0) {
      console.log('❌ VALIDATION ERRORS:', errors);
      setValidationErrors(errors);
      document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    console.log('✅ Validation passed');

    if (formData.honeypot) {
      console.log('🍯 Honeypot triggered');
      setIsSubmitted(true);
      return;
    }

    console.log('📤 Submitting to database...');
    setIsSubmitting(true);
    setError(null);

    try {
      const cartTypeLabel = cartTypes.find(t => t.id === formData.cart_type)?.name || formData.cart_type || 'Not specified';

      const payload = {
        full_name: formData.full_name,
        phone: formData.phone,
        email: formData.email || undefined,
        rental_start_date: formData.startDate || 'Flexible',
        rental_end_date: formData.endDate || 'Flexible',
        delivery_location: formData.delivery_location,
        number_of_carts: formData.number_of_carts,
        cart_type: cartTypeLabel,
        preferred_contact_method: formData.preferred_contact_method,
        best_time_to_call: 'asap',
        notes: formData.notes || (formData.datesFlexible ? 'Dates flexible/TBD' : undefined),
        understands_minimum: formData.understands_minimum,
      };

      console.log('📦 Payload:', payload);

      await submitQuoteRequest(payload);

      console.log('========================================');
      console.log('✅ QUOTE SUBMITTED SUCCESSFULLY!');
      console.log('========================================');
      setIsSubmitted(true);
    } catch (err: any) {
      console.log('========================================');
      console.error('❌ SUBMISSION FAILED');
      console.error('Error:', err);
      console.error('Error message:', err?.message);
      console.error('Full error:', JSON.stringify(err, null, 2));
      console.log('========================================');
      console.log('💡 If you see "row-level security", check URGENT_FIX.md');
      console.log('========================================');

      if (err?.message?.includes('row-level security') || err?.message?.includes('violates')) {
        setError('Database security error. Check URGENT_FIX.md for 2-minute fix.');
      } else {
        setError('Something went wrong. Please call us directly.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="card text-center">
        <div className="w-16 h-16 bg-success-soft rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-success" />
        </div>
        <h3 className="text-xl font-bold text-text mb-2">Thank you — we'll contact you shortly</h3>
        <p className="text-text-muted mb-6">
          We received your request and will call you to confirm availability and provide your exact total. Typical response within {business.responseTime}.
        </p>
        <a
          href={business.phoneLink}
          className="btn-primary w-full"
        >
          <Phone className="w-5 h-5" />
          Call Now: {business.phone}
        </a>
      </div>
    );
  }

  return (
    <div id="quote-form" className="card">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-text">Get Your Quote</h3>
          <p className="text-sm text-text-muted">
            {step === 1 ? 'Step 1 of 2 — Rental details' : 'Step 2 of 2 — Contact info'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full transition-colors ${step >= 1 ? 'bg-primary' : 'bg-border'}`} />
          <span className={`w-2.5 h-2.5 rounded-full transition-colors ${step >= 2 ? 'bg-primary' : 'bg-border'}`} />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <input
        type="text"
        name="honeypot"
        value={formData.honeypot}
        onChange={handleChange}
        className="absolute -left-[9999px] opacity-0"
        tabIndex={-1}
        autoComplete="off"
      />

      {step === 1 ? (
        <form onSubmit={handleStep1Submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text mb-2">
              Rental Dates
            </label>
            <DateRangePicker
              startDate={parseLocalDate(formData.startDate)}
              endDate={parseLocalDate(formData.endDate)}
              onDateChange={(start, end) => {
                setFormData(prev => ({
                  ...prev,
                  startDate: start ? formatLocalDate(start) : '',
                  endDate: end ? formatLocalDate(end) : '',
                }));
                if (validationErrors.dates) {
                  setValidationErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors.dates;
                    return newErrors;
                  });
                }
              }}
              disabled={formData.datesFlexible}
              error={validationErrors.dates}
            />
            <label className="flex items-center gap-2 mt-2 cursor-pointer">
              <input
                type="checkbox"
                name="datesFlexible"
                checked={formData.datesFlexible}
                onChange={handleChange}
                className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
              />
              <span className="text-sm text-text-muted">Not sure yet</span>
            </label>
          </div>

          <div>
            <label htmlFor="delivery_location" className="block text-sm font-medium text-text mb-2">
              Delivery City / Venue
            </label>
            <input
              type="text"
              id="delivery_location"
              name="delivery_location"
              value={formData.delivery_location}
              onChange={handleChange}
              className={`input-field ${validationErrors.delivery_location ? 'input-error' : ''}`}
              placeholder="Resort, venue, or city"
            />
            {validationErrors.delivery_location && (
              <p className="text-xs text-red-600 mt-1">{validationErrors.delivery_location}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">
              Number of Carts
            </label>
            <div className="flex items-center justify-center gap-4 bg-bg-alt rounded-lg p-3">
              <button
                type="button"
                onClick={() => handleCartQuantityChange(-1)}
                disabled={formData.number_of_carts <= 1}
                className="w-10 h-10 flex items-center justify-center bg-white border border-border rounded-lg hover:bg-bg-alt disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-2xl font-bold text-text w-12 text-center">
                {formData.number_of_carts}
              </span>
              <button
                type="button"
                onClick={() => handleCartQuantityChange(1)}
                disabled={formData.number_of_carts >= 6}
                className="w-10 h-10 flex items-center justify-center bg-white border border-border rounded-lg hover:bg-bg-alt disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">
              Cart Type <span className="text-text-muted">(optional)</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {cartTypes.map(type => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, cart_type: type.id }))}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    formData.cart_type === type.id
                      ? 'bg-primary text-white'
                      : 'bg-bg-alt text-text hover:bg-border'
                  }`}
                >
                  {type.name.replace(' 4-Seater', '')}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary w-full"
          >
            Continue
            <ChevronRight className="w-5 h-5" />
          </button>
        </form>
      ) : (
        <form onSubmit={handleFinalSubmit} className="space-y-4">
          <div>
            <label htmlFor="full_name" className="block text-sm font-medium text-text mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className={`input-field ${validationErrors.full_name ? 'input-error' : ''}`}
              placeholder="Your name"
            />
            {validationErrors.full_name && (
              <p className="text-xs text-red-600 mt-1">{validationErrors.full_name}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-text mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`input-field ${validationErrors.phone ? 'input-error' : ''}`}
              placeholder="(555) 555-5555"
            />
            {validationErrors.phone && (
              <p className="text-xs text-red-600 mt-1">{validationErrors.phone}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
              Email <span className="text-text-muted">(optional)</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">
              Preferred Contact Method
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, preferred_contact_method: 'call' }))}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  formData.preferred_contact_method === 'call'
                    ? 'bg-primary text-white'
                    : 'bg-bg-alt text-text hover:bg-border'
                }`}
              >
                Call
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, preferred_contact_method: 'text' }))}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  formData.preferred_contact_method === 'text'
                    ? 'bg-primary text-white'
                    : 'bg-bg-alt text-text hover:bg-border'
                }`}
              >
                Text
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-text mb-2">
              Notes <span className="text-text-muted">(optional)</span>
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              value={formData.notes}
              onChange={handleChange}
              className="input-field resize-none"
              placeholder="Anything we should know?"
            />
          </div>

          <div>
            <label className="flex items-start gap-3 cursor-pointer p-3 rounded-lg border border-border hover:bg-bg-alt transition-colors">
              <input
                type="checkbox"
                name="understands_minimum"
                checked={formData.understands_minimum}
                onChange={handleChange}
                className="w-5 h-5 mt-0.5 rounded border-border text-primary focus:ring-primary cursor-pointer"
              />
              <span className="text-sm text-text font-medium">
                I understand that the minimum rental period is 3 days.
              </span>
            </label>
            {validationErrors.understands_minimum && (
              <p className="text-xs text-red-600 mt-2">{validationErrors.understands_minimum}</p>
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="btn-secondary px-4"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary flex-1"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                'Request Quote'
              )}
            </button>
          </div>
        </form>
      )}

      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="text-sm font-semibold text-text mb-3">What happens next</h4>
        <div className="space-y-2">
          {whatHappensNext.map((item, index) => (
            <div key={index} className="flex items-start gap-2">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center mt-0.5">
                {index + 1}
              </span>
              <p className="text-sm text-text-muted">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
