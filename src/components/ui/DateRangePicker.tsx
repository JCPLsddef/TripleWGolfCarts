'use client';

import { useState, useEffect } from 'react';
import { DayPicker, DateRange } from 'react-day-picker';
import { format, differenceInDays } from 'date-fns';
import { Calendar, X, Check } from 'lucide-react';
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

  // Calculate if 3-day minimum is met
  const calculateRentalDays = (from: Date | undefined, to: Date | undefined): number => {
    if (!from || !to) return 0;
    // Add 1 because rental includes both start and end date
    return differenceInDays(to, from) + 1;
  };

  const rentalDays = calculateRentalDays(range?.from, range?.to);
  const isMinDaysMet = rentalDays >= 3;
  const hasValidRange = range?.from && range?.to;

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

    // FIX TIMEZONE: Ensure dates stay in local timezone (not UTC)
    // DayPicker gives us dates at midnight local time
    // We keep them as-is without timezone conversion
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
            ? 'border-primary/50 bg-white'
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
          <div className="absolute left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-border z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
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
                  day_range_middle: "!text-text rounded-none",
                  day_hidden: "invisible",
                }}
              />
              
              {/* Bottom Info Bar - 3-Day Minimum Validation */}
              <div className="mt-4 pt-4 border-t border-border space-y-3">
                {/* Dynamic helper text based on selection state */}
                {!range?.from && (
                  <p className="text-sm text-text-muted text-center font-medium">
                    Tap a date to start your rental
                  </p>
                )}

                {range?.from && !range?.to && (
                  <p className="text-sm text-text-muted text-center font-medium">
                    Now tap your return date
                  </p>
                )}

                {/* Validation UI when both dates selected */}
                {hasValidRange && (
                  <div className="space-y-3">
                    {/* Days counter */}
                    <div className="text-center">
                      <p className="text-sm font-semibold text-text">
                        {rentalDays} day{rentalDays !== 1 ? 's' : ''} selected
                      </p>
                    </div>

                    {/* Warning for < 3 days */}
                    {!isMinDaysMet && (
                      <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                        <p className="text-xs text-red-700 text-center font-medium">
                          ⚠️ Minimum rental period is 3 days
                        </p>
                      </div>
                    )}

                    {/* Auto-enabled checkbox for >= 3 days */}
                    <div
                      className={`p-3 rounded-lg border-2 transition-all ${
                        isMinDaysMet
                          ? 'bg-success-soft border-success'
                          : 'bg-gray-50 border-gray-300 opacity-60'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Checkbox - auto-controlled by validation */}
                        <div
                          className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                            isMinDaysMet
                              ? 'bg-success border-success'
                              : 'bg-white border-2 border-gray-300'
                          }`}
                        >
                          {isMinDaysMet && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                        </div>

                        {/* Label text */}
                        <div className="flex-1">
                          <p className={`text-xs font-medium ${isMinDaysMet ? 'text-success' : 'text-gray-600'}`}>
                            {isMinDaysMet
                              ? '✓ Minimum rental period of 3 days confirmed'
                              : 'Minimum rental period is 3 days'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
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
