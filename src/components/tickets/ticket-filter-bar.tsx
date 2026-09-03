"use client";

import { ChevronDown, Search } from "lucide-react";

import { inputVariants } from "@/components/ui/input";
import { TICKET_STATUSES } from "@/constants/tickets";
import { cn } from "@/utils/cn";

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}

function SelectField({ id, label, value, onChange, children }: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-2 tablet:w-48">
      <label htmlFor={id} className="text-small font-medium text-text-primary">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={cn(inputVariants(), "appearance-none pr-8")}
        >
          {children}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-text-secondary"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

export interface TicketFilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  departments?: string[];
  department?: string;
  onDepartmentChange?: (value: string) => void;
  priorities?: string[];
  priority?: string;
  onPriorityChange?: (value: string) => void;
  dateFrom?: string;
  onDateFromChange?: (value: string) => void;
  dateTo?: string;
  onDateToChange?: (value: string) => void;
}

export function TicketFilterBar({
  search,
  onSearchChange,
  status,
  onStatusChange,
  departments,
  department,
  onDepartmentChange,
  priorities,
  priority,
  onPriorityChange,
  dateFrom,
  onDateFromChange,
  dateTo,
  onDateToChange,
}: TicketFilterBarProps) {
  const showDepartment = departments !== undefined && onDepartmentChange !== undefined;
  const showPriority = priorities !== undefined && onPriorityChange !== undefined;
  const showDateRange = onDateFromChange !== undefined && onDateToChange !== undefined;

  return (
    <div className="flex flex-col gap-4 rounded-card bg-surface p-6 shadow-sm tablet:flex-row tablet:flex-wrap tablet:items-end">
      <div className="flex min-w-0 flex-1 flex-col gap-2 tablet:min-w-60">
        <label htmlFor="ticket-search" className="text-small font-medium text-text-primary">
          Axtarış
        </label>
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-secondary"
            aria-hidden="true"
          />
          <input
            id="ticket-search"
            type="text"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Ad, soyad və ya başlığa görə axtar"
            className={cn(inputVariants(), "pl-12")}
          />
        </div>
      </div>

      <SelectField id="ticket-status-filter" label="Status" value={status} onChange={onStatusChange}>
        <option value="">Bütün statuslar</option>
        {TICKET_STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </SelectField>

      {showDepartment && (
        <SelectField
          id="ticket-department-filter"
          label="Şöbə"
          value={department ?? ""}
          onChange={(value) => onDepartmentChange?.(value)}
        >
          <option value="">Bütün şöbələr</option>
          {departments?.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </SelectField>
      )}

      {showPriority && (
        <SelectField
          id="ticket-priority-filter"
          label="Prioritet"
          value={priority ?? ""}
          onChange={(value) => onPriorityChange?.(value)}
        >
          <option value="">Bütün prioritetlər</option>
          {priorities?.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </SelectField>
      )}

      {showDateRange && (
        <div className="flex gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="ticket-date-from" className="text-small font-medium text-text-primary">
              Başlanğıc
            </label>
            <input
              id="ticket-date-from"
              type="date"
              value={dateFrom ?? ""}
              onChange={(event) => onDateFromChange?.(event.target.value)}
              className={inputVariants()}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="ticket-date-to" className="text-small font-medium text-text-primary">
              Bitmə
            </label>
            <input
              id="ticket-date-to"
              type="date"
              value={dateTo ?? ""}
              onChange={(event) => onDateToChange?.(event.target.value)}
              className={inputVariants()}
            />
          </div>
        </div>
      )}
    </div>
  );
}
