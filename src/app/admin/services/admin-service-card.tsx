"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";

import { Card, CardActions, CardContent, CardTitle } from "@/components/ui/card";
import { ApiError } from "@/lib/api-client";
import { deleteService } from "@/services/services";
import type { Service } from "@/types/service";

interface AdminServiceCardProps {
  service: Service;
}

function resolveErrorMessage(error: unknown): string {
  return error instanceof ApiError ? error.message : "Əməliyyat uğursuz oldu. Yenidən cəhd edin.";
}

export function AdminServiceCard({ service }: AdminServiceCardProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => deleteService(service.id),
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ["admin-services"] }),
        queryClient.invalidateQueries({ queryKey: ["services"] }),
      ]),
  });

  function handleDelete() {
    if (window.confirm("Bu xidməti silmək istədiyinizə əminsiniz?")) {
      deleteMutation.mutate();
    }
  }

  return (
    <Card>
      <CardTitle className="min-w-0 break-words">{service.name}</CardTitle>
      <CardContent className="text-small text-text-secondary">
        {service.description}
      </CardContent>
      <CardActions>
        <button
          type="button"
          aria-label="Xidməti sil"
          onClick={handleDelete}
          disabled={deleteMutation.isPending}
          className="text-text-secondary hover:text-danger focus-visible:ring-ring flex size-9 items-center justify-center rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
        >
          <Trash2 className="size-4" aria-hidden="true" />
        </button>
      </CardActions>
      {deleteMutation.isError && (
        <p role="alert" className="text-small text-danger">
          {resolveErrorMessage(deleteMutation.error)}
        </p>
      )}
    </Card>
  );
}
