"use client";

import { useMemo } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { Card, CardTitle } from "@/components/ui/card";
import type { AdminTicket } from "@/types/ticket";

const OTHER_LABEL = "Digər";
const MAX_SLICES = 5;

// Fixed order, never cycled — a 6th+ department folds into "Digər" instead of
// generating a new hue outside the KUDS token set.
const DEPARTMENT_COLORS = [
  "var(--color-ku-green)",
  "var(--color-ku-green-dark)",
  "var(--color-ku-blue-light)",
  "var(--color-ku-cream)",
  "var(--color-ku-green-soft)",
];
const DEPARTMENT_SWATCH_CLASSES = [
  "bg-ku-green",
  "bg-ku-green-dark",
  "bg-ku-blue-light",
  "bg-ku-cream",
  "bg-ku-green-soft",
];
const OTHER_COLOR = "var(--color-border)";
const OTHER_SWATCH_CLASS = "bg-border";

interface DepartmentSlice {
  name: string;
  value: number;
  color: string;
  swatchClass: string;
}

function buildDepartmentSlices(tickets: AdminTicket[]): DepartmentSlice[] {
  const countByDepartment = new Map<string, number>();

  for (const ticket of tickets) {
    const department = ticket.department || "Naməlum";
    countByDepartment.set(department, (countByDepartment.get(department) ?? 0) + 1);
  }

  const sorted = [...countByDepartment.entries()].sort((a, b) => b[1] - a[1]);

  const slices: DepartmentSlice[] = sorted.slice(0, MAX_SLICES).map(([name, value], index) => ({
    name,
    value,
    color: DEPARTMENT_COLORS[index],
    swatchClass: DEPARTMENT_SWATCH_CLASSES[index],
  }));

  const rest = sorted.slice(MAX_SLICES);
  if (rest.length > 0) {
    const otherTotal = rest.reduce((sum, [, value]) => sum + value, 0);
    slices.push({
      name: OTHER_LABEL,
      value: otherTotal,
      color: OTHER_COLOR,
      swatchClass: OTHER_SWATCH_CLASS,
    });
  }

  return slices;
}

interface DonutChartDepartmentsProps {
  tickets: AdminTicket[];
}

export function DonutChartDepartments({ tickets }: DonutChartDepartmentsProps) {
  const data = useMemo(() => buildDepartmentSlices(tickets), [tickets]);

  return (
    <Card>
      <CardTitle>Şöbələr Üzrə Yük</CardTitle>
      <div className="flex flex-col items-center gap-6 tablet:flex-row">
        <div className="shrink-0">
          <ResponsiveContainer width={200} height={200}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={2}
                stroke="var(--color-surface)"
                strokeWidth={2}
              >
                {data.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
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
            </PieChart>
          </ResponsiveContainer>
        </div>

        <ul className="flex w-full flex-1 flex-col gap-3">
          {data.map((entry) => (
            <li key={entry.name} className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 text-small text-text-primary">
                <span
                  className={`size-3 shrink-0 rounded-full ${entry.swatchClass}`}
                  aria-hidden="true"
                />
                {entry.name}
              </span>
              <span className="text-small font-medium text-text-secondary">{entry.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
