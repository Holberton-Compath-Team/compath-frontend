"use client";

import * as React from "react";
import { Copy, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

interface Coordinates {
  latitude: number;
  longitude: number;
}

type LocationState = "idle" | "loading" | "success" | "error";

function getGeolocationErrorMessage(error: GeolocationPositionError): string {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      return "Lokasiya icazəsi rədd edildi. Brauzer ayarlarından icazə verə bilərsiniz.";
    case error.POSITION_UNAVAILABLE:
      return "Lokasiya məlumatı mövcud deyil. Cihazınız bunu dəstəkləməyə bilər.";
    case error.TIMEOUT:
      return "Lokasiya müəyyənləşdirilərkən vaxt bitdi. Yenidən cəhd edin.";
    default:
      return "Lokasiya müəyyənləşdirilə bilmədi.";
  }
}

function LocationFinder() {
  const [state, setState] = React.useState<LocationState>("idle");
  const [coordinates, setCoordinates] = React.useState<Coordinates | null>(
    null,
  );
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [copyError, setCopyError] = React.useState<string | null>(null);

  function handleFindLocation() {
    setCopyError(null);

    if (!navigator.geolocation) {
      setState("error");
      setErrorMessage("Bu brauzer lokasiya xidmətini dəstəkləmir.");
      return;
    }

    setState("loading");
    setErrorMessage(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          latitude: Number(position.coords.latitude.toFixed(5)),
          longitude: Number(position.coords.longitude.toFixed(5)),
        });
        setState("success");
      },
      (error) => {
        setState("error");
        setErrorMessage(getGeolocationErrorMessage(error));
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
    );
  }

  async function handleCopyCoordinates() {
    if (!coordinates) return;

    setCopyError(null);

    try {
      await navigator.clipboard.writeText(
        `${coordinates.latitude}, ${coordinates.longitude}`,
      );
    } catch {
      setCopyError(
        "Kopyalama uğursuz oldu. Koordinatları əl ilə seçib kopyalaya bilərsiniz.",
      );
    }
  }

  const mapsHref = coordinates
    ? `https://www.google.com/maps?q=${coordinates.latitude},${coordinates.longitude}`
    : null;

  return (
    <Card>
      <CardTitle>Lokasiyamı göstər</CardTitle>
      <CardDescription>
        Lokasiyanız yalnız ekranınızda göstərilir — heç bir yerə göndərilmir
        və saxlanmır.
      </CardDescription>

      <Button
        type="button"
        variant="secondary"
        onClick={handleFindLocation}
        isLoading={state === "loading"}
        className="min-h-12 self-start"
      >
        <MapPin className="size-4" aria-hidden="true" />
        Lokasiyamı göstər
      </Button>

      {state === "success" && coordinates && (
        <div className="flex flex-col gap-3">
          <p className="text-small text-text-primary">
            Enlik: {coordinates.latitude} · Uzunluq: {coordinates.longitude}
          </p>
          <div className="flex flex-wrap gap-3">
            {mapsHref && (
              <a
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-small text-ku-green focus-visible:ring-ring flex min-h-12 items-center rounded-lg font-semibold underline underline-offset-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                Xəritədə aç
              </a>
            )}
            <Button
              type="button"
              variant="secondary"
              onClick={handleCopyCoordinates}
              className="min-h-12"
            >
              <Copy className="size-4" aria-hidden="true" />
              Koordinatları kopyala
            </Button>
          </div>
          {copyError && (
            <p role="alert" className="text-small text-danger">
              {copyError}
            </p>
          )}
        </div>
      )}

      {state === "error" && errorMessage && (
        <p role="alert" className="text-small text-danger">
          {errorMessage}
        </p>
      )}
    </Card>
  );
}

export { LocationFinder };
