import Link from "next/link";

import { Container } from "@/components/ui/container";
import { NAV_LINKS } from "@/constants/navigation";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ku-green-dark text-white">
      <Container className="tablet:py-16 py-12">
        <div className="tablet:grid-cols-3 grid grid-cols-1 gap-8">
          <div>
            <p className="text-h4 text-white">COMPATH</p>
            <p className="text-small mt-2 max-w-xs text-white/70">
              Tələbənin problemini avtomatik doğru universitet xidmətinə
              yönləndirən platforma.
            </p>
          </div>

          <div>
            <h3 className="text-small font-semibold tracking-wide text-white uppercase">
              Sürətli linklər
            </h3>
            <ul className="mt-4 flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-small hover:text-ku-cream focus-visible:ring-ku-cream focus-visible:ring-offset-ku-green-dark rounded-lg text-white/70 transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-small font-semibold tracking-wide text-white uppercase">
              Əlaqə
            </h3>
            <p className="text-small mt-4 text-white/70">info@compath.edu.az</p>
            <p className="text-small text-danger mt-2 font-medium">
              Təcili yardım: dəstək xətti tezliklə aktivləşəcək
            </p>
          </div>
        </div>

        <p className="text-caption mt-12 text-white/60">
          © {year} COMPATH. Bütün hüquqlar qorunur.
        </p>
      </Container>
    </footer>
  );
}

export { Footer };
