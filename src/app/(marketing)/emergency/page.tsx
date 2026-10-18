import type { Metadata } from "next";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import {
  CAMPUS_EMERGENCY_CONTACTS,
  NATIONAL_EMERGENCY_CONTACTS,
  SAFETY_GUIDES,
} from "@/constants/emergency";
import { cn } from "@/utils/cn";

import { LocationFinder } from "./location-finder";

export const metadata: Metadata = {
  title: "Təcili dəstək | COMPATH",
  description:
    "Tibbi yardım, psixoloji böhran və ya təhlükəsizlik təhdidi zamanı təcili zəng nömrələri, lokasiya və təhlükəsizlik təlimatları.",
};

const campusContacts = CAMPUS_EMERGENCY_CONTACTS.filter(
  (contact) => contact.phone !== null,
);

export default function EmergencyPage() {
  return (
    <Section>
      <Container className="flex flex-col gap-16">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-h1 text-text-primary">
            <span className="text-danger">Təcili</span> dəstək
          </h1>
          <p className="text-body text-text-secondary max-w-2xl">
            Tibbi yardım, psixoloji böhran və ya təhlükəsizlik təhdidi zamanı
            aşağıdaki nömrələrə zəng edin və təlimatları izləyin.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="text-h2 text-text-primary text-center">
            Təcili nömrələr
          </h2>
          <div className="tablet:grid-cols-2 laptop:grid-cols-4 grid grid-cols-1 gap-6">
            {NATIONAL_EMERGENCY_CONTACTS.map((contact) => (
              <Card key={contact.label} className="items-center text-center">
                <a
                  href={`tel:${contact.phone}`}
                  aria-label={`${contact.phone}-ə zəng et`}
                  className={cn(
                    buttonVariants({ variant: "danger" }),
                    "flex min-h-12 w-full flex-col gap-1 py-4",
                  )}
                >
                  <span className="text-h1">{contact.phone}</span>
                  <span className="text-small font-normal">
                    {contact.label}
                  </span>
                </a>
                <CardDescription>{contact.description}</CardDescription>
              </Card>
            ))}
          </div>
        </div>

        {campusContacts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-h2 text-text-primary text-center">
              Universitet daxili əlaqə
            </h2>
            <div className="tablet:grid-cols-3 grid grid-cols-1 gap-6">
              {campusContacts.map((contact) => (
                <Card key={contact.label} className="items-center text-center">
                  <a
                    href={`tel:${contact.phone}`}
                    aria-label={`${contact.phone}-ə zəng et`}
                    className={cn(
                      buttonVariants({ variant: "danger" }),
                      "flex min-h-12 w-full flex-col gap-1 py-4",
                    )}
                  >
                    <span className="text-h2">{contact.phone}</span>
                    <span className="text-small font-normal">
                      {contact.label}
                    </span>
                  </a>
                  <CardDescription>{contact.description}</CardDescription>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-6">
          <h2 className="text-h2 text-text-primary text-center">
            Təhlükəsizlik təlimatları
          </h2>
          <div className="tablet:grid-cols-3 grid grid-cols-1 gap-6">
            {SAFETY_GUIDES.map((guide) => (
              <Card key={guide.title}>
                <CardTitle>{guide.title}</CardTitle>
                <ol className="text-small text-text-secondary flex list-inside list-decimal flex-col gap-2">
                  {guide.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <LocationFinder />
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 rounded-card bg-surface p-6 text-center shadow-sm">
          <p className="text-body text-text-primary">
            Təcili olmayan, lakin həssas mövzular üçün:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/anonymous"
              className={buttonVariants({ variant: "secondary" })}
            >
              Anonim müraciət
            </Link>
            <Link
              href="/track"
              className={buttonVariants({ variant: "secondary" })}
            >
              Müraciəti izlə
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
