"use client";

import { useMemo } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardTitle } from "@/components/ui/card";
import type { AdminTicket } from "@/types/ticket";
import { formatDayMonth } from "@/utils/format-date";

const DAYS_WINDOW = 30;

interface DailyActivity {
  dateKey: string;
  label: string;
  count: number;
}

function buildDailyActivity(tickets: AdminTicket[]): DailyActivity[] {
  const today = new Date();
  const days: DailyActivity[] = [];

  for (let offset = DAYS_WINDOW - 1; offset >= 0; offset--) {
    const date = new Date(
      Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - offset),
    );
    const iso = date.toISOString();

    days.push({ dateKey: iso.slice(0, 10), label: formatDayMonth(iso), count: 0 });
  }

  const dayByKey = new Map(days.map((day) => [day.dateKey, day]));

  for (const ticket of tickets) {
    const dateKey = new Date(ticket.created_at).toISOString().slice(0, 10);
    const day = dayByKey.get(dateKey);
    if (day) day.count += 1;
  }

  return days;
}

interface LineChartActivityProps {
  tickets: AdminTicket[];
}

export function LineChartActivity({ tickets }: LineChartActivityProps) {
  const data = useMemo(() => buildDailyActivity(tickets), [tickets]);

  return (
    <Card>
      <CardTitle>Son 30 Günün Aktivliyi</CardTitle>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="var(--color-border)" />
          <XAxis
            dataKey="label"
            tick={{ fill: "var(--color-text-secondary)", fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: "var(--color-border)" }}
            interval={3}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fill: "var(--color-text-secondary)", fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            width={32}
          />
          <Tooltip
            cursor={{ stroke: "var(--color-border)" }}
            contentStyle={{
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--color-border)",
              boxShadow: "var(--shadow-sm)",
              fontSize: 12,
            }}
            labelStyle={{ color: "var(--color-text-primary)", fontWeight: 500 }}
            itemStyle={{ color: "var(--color-ku-green)" }}
            formatter={(value) => [value, "Müraciət"]}
          />
          <Line
            type="monotone"
            dataKey="count"
            name="Müraciət"
            stroke="var(--color-ku-green)"
            strokeWidth={2}
            dot={false}
            activeDot={{
              r: 4,
              fill: "var(--color-ku-green)",
              stroke: "var(--color-surface)",
              strokeWidth: 2,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
