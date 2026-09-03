"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Inbox, RefreshCw, SearchX } from "lucide-react";

import { TicketFilterBar } from "@/components/tickets/ticket-filter-bar";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { getServices } from "@/services/services";
import { getAllTickets } from "@/services/tickets";

import { AdminTicketCard } from "./admin-ticket-card";
import { TicketListSkeleton } from "./ticket-list-skeleton";

export default function AdminTicketsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [department, setDepartment] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const {
    data: tickets,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["admin-tickets"],
    queryFn: getAllTickets,
  });

  const { data: services } = useQuery({
    queryKey: ["services"],
    queryFn: getServices,
  });

  const departments = useMemo(() => (services ?? []).map((service) => service.name), [services]);

  function clearFilters() {
    setSearch("");
    setStatus("");
    setDepartment("");
    setDateFrom("");
    setDateTo("");
  }

  const filteredTickets = useMemo(() => {
    if (!tickets) return [];

    const searchTerm = search.trim().toLowerCase();

    return tickets.filter((ticket) => {
      if (
        searchTerm &&
        !ticket.title.toLowerCase().includes(searchTerm) &&
        !ticket.student.fullname.toLowerCase().includes(searchTerm)
      ) {
        return false;
      }

      if (status && ticket.status !== status) return false;
      if (department && ticket.department !== department) return false;

      const createdAt = new Date(ticket.created_at);

      if (dateFrom && createdAt < new Date(dateFrom)) return false;

      if (dateTo) {
        const dateToEnd = new Date(dateTo);
        dateToEnd.setHours(23, 59, 59, 999);
        if (createdAt > dateToEnd) return false;
      }

      return true;
    });
  }, [tickets, search, status, department, dateFrom, dateTo]);

  return (
    <Section>
      <Container className="flex flex-col gap-8">
        <h1 className="text-h1 text-text-primary">Admin Panel — Bütün Müraciətlər</h1>

        {tickets && tickets.length > 0 && (
          <TicketFilterBar
            search={search}
            onSearchChange={setSearch}
            status={status}
            onStatusChange={setStatus}
            departments={departments}
            department={department}
            onDepartmentChange={setDepartment}
            dateFrom={dateFrom}
            onDateFromChange={setDateFrom}
            dateTo={dateTo}
            onDateToChange={setDateTo}
          />
        )}

        {isPending && <TicketListSkeleton />}

        {isError && (
          <div className="flex flex-col items-center gap-4 rounded-card bg-surface p-16 text-center shadow-sm">
            <p className="text-body text-text-secondary">
              Müraciətlər yüklənərkən xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.
            </p>
            <Button onClick={() => refetch()}>
              <RefreshCw className="size-4" aria-hidden="true" />
              Yenidən cəhd et
            </Button>
          </div>
        )}

        {tickets && tickets.length === 0 && (
          <div className="flex flex-col items-center gap-4 rounded-card bg-surface p-16 text-center shadow-sm">
            <Inbox className="size-6 text-text-secondary" aria-hidden="true" />
            <p className="text-body text-text-secondary">Hələ heç bir müraciət yoxdur.</p>
          </div>
        )}

        {tickets && tickets.length > 0 && filteredTickets.length === 0 && (
          <div className="flex flex-col items-center gap-4 rounded-card bg-surface p-16 text-center shadow-sm">
            <SearchX className="size-6 text-text-secondary" aria-hidden="true" />
            <p className="text-body text-text-secondary">Axtarışa uyğun nəticə tapılmadı.</p>
            <Button variant="secondary" onClick={clearFilters}>
              Filtrləri təmizlə
            </Button>
          </div>
        )}

        {filteredTickets.length > 0 && (
          <div className="flex flex-col gap-4">
            {filteredTickets.map((ticket) => (
              <AdminTicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
