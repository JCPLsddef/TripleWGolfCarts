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
                month: "space-y-4",
                caption: "flex justify-center pt-1 relative items-center",
                caption_label: "text-sm font-semibold text-text",
                nav: "space-x-1 flex items-center",
                nav_button: "h-7 w-7 bg-transparent hover:bg-bg-alt rounded-md transition-colors inline-flex items-center justify-center",
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse space-y-1",
                head_row: "flex",
                head_cell: "text-text-muted rounded-md w-9 font-medium text-[0.8rem]",
                row: "flex w-full mt-2",
                cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-primary/10 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                day: "h-9 w-9 p-0 font-normal hover:bg-primary/10 rounded-md transition-colors inline-flex items-center justify-center",
                day_selected: "bg-primary text-white hover:bg-primary hover:text-white focus:bg-primary focus:text-white font-semibold",
                day_today: "bg-bg-alt text-text font-semibold",
                day_outside: "text-text-muted opacity-30",
                day_disabled: "text-text-muted opacity-30 cursor-not-allowed hover:bg-transparent",
                day_range_middle: "aria-selected:bg-primary/20 aria-selected:text-text",
                day_hidden: "invisible",
              }}
            />
            <div className="mt-3 pt-3 border-t border-border text-xs text-text-muted text-center">
              Select start and end dates for your rental
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
