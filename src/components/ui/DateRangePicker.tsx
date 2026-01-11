'use client';

import { useState, useEffect } from 'react';
import { DayPicker, DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import { Calendar, X } from 'lucide-react';
import 'react-day-picker/style.css';

interface DateRangePickerProps {
  startDate?: Date;
  endDate?: Date;
  onDateChange: (startDate: Date | undefined, endDate: Date | undefined) => void;
  disabled?: boolean;
  error?: string;
}

export function DateRangePicker({
  startDate,
  endDate,
  onDateChange,
  disabled = false,
  error = '',
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [range, setRange] = useState<DateRange | undefined>({
    from: startDate,
    to: endDate,
  });

  // Sync with parent state
  useEffect(() => {
    setRange({
      from: startDate,
      to: endDate,
    });
  }, [startDate, endDate]);

  const handleSelect = (selectedRange: DateRange | undefined) => {
    // PREMIUM UX: Never auto-close, stay open for visual feedback
    setRange(selectedRange);
    onDateChange(selectedRange?.from, selectedRange?.to);
    
    // Calendar stays OPEN even when both dates selected
    // User sees the full range visual feedback
    // They can clear or adjust if needed
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRange(undefined);
    onDateChange(undefined, undefined);
  };

  const formatDateDisplay = () => {
    // PREMIUM UX: Only show dates when BOTH are selected
    // User taps first date → nothing shows yet (calendar stays open)
    // User taps second date → full range displays: "January 13 – January 18, 2026"
    if (range?.from && range?.to) {
      return `${format(range.from, 'MMMM dd')} – ${format(range.to, 'MMMM dd, yyyy')}`;
    }
    // Show placeholder if no dates or only start date selected
    return 'Select rental dates';
  };

  return (
    <div className="relative">
      {/* READ-ONLY input - NO manual typing allowed */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border transition-all ${
          error
            ? 'border-red-500 bg-red-50'
            : disabled
            ? 'border-border bg-bg-alt opacity-50 cursor-not-allowed'
            : isOpen
            ? 'border-primary bg-white shadow-sm ring-2 ring-primary/20'
            : 'border-border bg-white hover:border-primary/50'
        }`}
      >
        <div className="flex items-center gap-2">
          <Calendar className={`w-4 h-4 ${error ? 'text-red-500' : 'text-text-muted'}`} />
          <span className={range?.from && range?.to ? 'text-text font-medium' : 'text-text-muted'}>
            {formatDateDisplay()}
          </span>
        </div>
        {range?.from && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            className="p-1 hover:bg-bg-alt rounded transition-colors"
            aria-label="Clear dates"
          >
            <X className="w-4 h-4 text-text-muted hover:text-text" />
          </button>
        )}
      </button>

      {isOpen && !disabled && (
        <>
          {/* Backdrop - clicking closes calendar */}
          <div
            className="fixed inset-0 z-40 bg-black/10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Calendar Modal - PREMIUM UX */}
          <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 md:absolute md:inset-x-auto md:top-full md:left-0 md:right-0 md:translate-y-0 md:mt-2 bg-white rounded-2xl shadow-2xl border border-border z-50 overflow-hidden max-w-sm mx-auto md:max-w-md animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="p-4 md:p-6">
              <DayPicker
                mode="range"
                selected={range}
                onSelect={handleSelect}
                disabled={{ before: new Date() }}
                numberOfMonths={1}
                className="rdp-custom"
                classNames={{
                  months: "w-full",
                  month: "w-full space-y-4",
                  caption: "flex items-center justify-center relative mb-4",
                  caption_label: "text-base font-bold text-text",
                  nav: "flex items-center gap-1",
                  nav_button: "inline-flex items-center justify-center w-9 h-9 rounded-lg hover:bg-bg-alt transition-colors text-primary disabled:opacity-30 disabled:cursor-not-allowed",
                  nav_button_previous: "absolute left-0",
                  nav_button_next: "absolute right-0",
                  table: "w-full border-collapse",
                  head_row: "grid grid-cols-7 gap-0 mb-2",
                  head_cell: "text-xs font-bold text-text-muted uppercase text-center flex items-center justify-center h-10",
                  row: "grid grid-cols-7 gap-0",
                  cell: "relative text-center p-0",
                  day: "w-full h-11 md:h-12 flex items-center justify-center text-sm font-medium rounded-lg hover:bg-primary/10 transition-all duration-150 cursor-pointer",
                  day_selected: "!bg-primary !text-white font-bold hover:!bg-primary-hover",
                  day_today: "font-bold text-primary ring-2 ring-primary/30 ring-inset",
                  day_outside: "text-text-muted/30 cursor-default hover:bg-transparent",
                  day_disabled: "text-text-muted/30 cursor-not-allowed hover:bg-transparent line-through",
                  day_range_start: "!bg-primary !text-white rounded-lg",
                  day_range_end: "!bg-primary !text-white rounded-lg",
                  day_range_middle: "!bg-primary/20 !text-text rounded-none hover:!bg-primary/30",
                  day_hidden: "invisible",
                }}
              />
              
              {/* Bottom Info Bar */}
              <div className="mt-4 pt-4 border-t border-border">
                <div className="mb-3">
                  <label className="flex items-start gap-3 p-3 rounded-lg border-2 border-primary/20 bg-primary/5 cursor-pointer hover:border-primary/40 transition-colors">
                    <input
                      type="checkbox"
                      checked={true}
                      readOnly
                      className="w-5 h-5 mt-0.5 rounded border-primary text-primary focus:ring-primary cursor-pointer pointer-events-none flex-shrink-0"
                    />
                    <span className="text-sm text-text font-medium flex-1">
                      I understand the minimum rental period is 3 days
                    </span>
                  </label>
                </div>
                
                {/* Dynamic helper text based on selection state */}
                <p className="text-xs text-text-muted text-center">
                  {!range?.from && 'Tap a date to start your rental'}
                  {range?.from && !range?.to && 'Now tap your return date'}
                  {range?.from && range?.to && 'Perfect! Your dates are selected'}
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {error && (
        <p className="text-xs text-red-600 mt-1">{error}</p>
      )}
    </div>
  );
}
