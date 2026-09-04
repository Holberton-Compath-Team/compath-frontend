"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";

import { Button } from "@/components/ui/button";
import type { FaqItem } from "@/constants/faq";
import { cn } from "@/utils/cn";

interface TicketFaqAccordionProps {
  items: FaqItem[];
  onContinue: () => void;
}

export function TicketFaqAccordion({ items, onContinue }: TicketFaqAccordionProps) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          const panelId = `${baseId}-panel-${index}`;
          const buttonId = `${baseId}-button-${index}`;

          return (
            <div
              key={item.question}
              className={cn(
                "flex flex-col gap-3 rounded-card border border-border p-4 transition-colors",
                isOpen ? "bg-ku-green-soft/20" : "bg-surface",
              )}
            >
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 text-left text-body font-medium text-text-primary"
              >
                {item.question}
                <ChevronDown
                  className={cn("size-4 shrink-0 text-text-secondary transition-transform", isOpen && "rotate-180")}
                  aria-hidden="true"
                />
              </button>
              {isOpen && (
                <p id={panelId} role="region" aria-labelledby={buttonId} className="text-small text-text-secondary">
                  {item.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <Button type="button" variant="secondary" onClick={onContinue} className="w-full">
        Axtardığım cavabı tapmadım, yeni müraciət yarat
      </Button>
    </div>
  );
}
