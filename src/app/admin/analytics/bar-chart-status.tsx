"use client";

import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardTitle } from "@/components/ui/card";
import { TICKET_STATUSES } from "@/constants/tickets";
import type { AdminTicket } from "@/types/ticket";

// Reuses the same status → color mapping as the ticket badges elsewhere in
// the admin panel (TICKET_STATUS_BADGE_VARIANT), so a status always reads
// the same color across the whole app.
const STATUS_COLORS: Record<string, string> = {
  "Gözləmədə": "var(--color-warning)",
  "Baxılır": "var(--color-ku-blue-light)",
  "Həll olundu": "var(--color-success)",
};
const DEFAULT_STATUS_COLOR = "var(--color-border)";

interface StatusCount {
  status: string;
  count: number;
  color: string;
}

function buildStatusCounts(tickets: AdminTicket[]): StatusCount[] {
  return TICKET_STATUSES.map((status) => ({
    status,
    count: tickets.filter((ticket) => ticket.status === status).length,
    color: STATUS_COLORS[status] ?? DEFAULT_STATUS_COLOR,
  }));
}

interface BarChartStatusProps {
  tickets: AdminTicket[];
}

export function BarChartStatus({ tickets }: BarChartStatusProps) {
  const data = useMemo(() => buildStatusCounts(tickets), [tickets]);

  return (
    <Card>
      <CardTitle>Status Göstəriciləri</CardTitle>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="var(--color-border)" />
          <XAxis
            dataKey="status"
            tick={{ fill: "var(--color-text-secondary)", fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: "var(--color-border)" }}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fill: "var(--color-text-secondary)", fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            width={32}
          />
          <Tooltip
            cursor={{ fill: "var(--color-background)" }}
            contentStyle={{
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--color-border)",
              boxShadow: "var(--shadow-sm)",
              fontSize: 12,
            }}
            labelStyle={{ color: "var(--color-text-primary)", fontWeight: 500 }}
            itemStyle={{ color: "var(--color-text-primary)" }}
            formatter={(value) => [value, "Müraciət"]}
          />
          <Bar dataKey="count" name="Müraciət" radius={[4, 4, 0, 0]} maxBarSize={24}>
            {data.map((entry) => (
              <Cell key={entry.status} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
