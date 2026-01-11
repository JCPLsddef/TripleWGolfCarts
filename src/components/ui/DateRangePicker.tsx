'use client';

import { useState } from 'react';
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

  const handleSelect = (selectedRange: DateRange | undefined) => {
    setRange(selectedRange);
    onDateChange(selectedRange?.from, selectedRange?.to);

    // Auto-close when both dates are selected
    if (selectedRange?.from && selectedRange?.to) {
      setTimeout(() => setIsOpen(false), 300);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRange(undefined);
    onDateChange(undefined, undefined);
  };

  const formatDateDisplay = () => {
    if (range?.from) {
      if (range.to) {
        return `${format(range.from, 'MMM dd, yyyy')} - ${format(range.to, 'MMM dd, yyyy')}`;
      }
      return format(range.from, 'MMM dd, yyyy');
    }
    return 'Select dates';
  };

  return (
    <div className="relative">
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
          <span className={range?.from ? 'text-text font-medium' : 'text-text-muted'}>
            {formatDateDisplay()}
          </span>
        </div>
        {range?.from && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            className="p-1 hover:bg-bg-alt rounded transition-colors"
          >
            <X className="w-4 h-4 text-text-muted" />
          </button>
        )}
      </button>

      {isOpen && !disabled && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-border z-50 p-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <DayPicker
              mode="range"
              selected={range}
              onSelect={handleSelect}
              disabled={{ before: new Date() }}
              numberOfMonths={1}
              className="premium-calendar"
              classNames={{
                months: "flex flex-col",
                month: "space-y-4 w-full",
                caption: "flex justify-center pt-1 relative items-center mb-4",
                caption_label: "text-base font-bold text-text",
                nav: "space-x-1 flex items-center",
                nav_button: "h-8 w-8 bg-transparent hover:bg-bg-alt rounded-md transition-colors inline-flex items-center justify-center text-primary",
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse",
                head_row: "grid grid-cols-7 gap-1 mb-2",
                head_cell: "text-text-muted font-semibold text-xs uppercase text-center w-full flex items-center justify-center",
                row: "grid grid-cols-7 gap-1 mt-1",
                cell: "text-center text-sm relative [&:has([aria-selected])]:bg-primary/10 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                day: "h-10 w-full p-0 font-medium hover:bg-primary/10 rounded-md transition-colors inline-flex items-center justify-center text-text",
                day_selected: "bg-primary text-white hover:bg-primary hover:text-white focus:bg-primary focus:text-white font-bold",
                day_today: "bg-bg-alt text-primary font-bold ring-1 ring-primary/30",
                day_outside: "text-text-muted opacity-30",
                day_disabled: "text-text-muted opacity-30 cursor-not-allowed hover:bg-transparent",
                day_range_middle: "aria-selected:bg-primary/20 aria-selected:text-text",
                day_hidden: "invisible",
              }}
            />
            <div className="mt-4 pt-3 border-t border-border">
              <p className="text-xs text-text-muted text-center mb-3">
                Select start and end dates for your rental
              </p>
              <label className="flex items-start gap-3 p-3 rounded-lg border-2 border-primary/20 bg-primary/5 cursor-pointer hover:border-primary/40 transition-colors">
                <input
                  type="checkbox"
                  checked={true}
                  readOnly
                  className="w-5 h-5 mt-0.5 rounded border-primary text-primary focus:ring-primary cursor-pointer pointer-events-none"
                />
                <span className="text-sm text-text font-medium flex-1">
                  I agree to the rental duration minimum of 3 days
                </span>
              </label>
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
