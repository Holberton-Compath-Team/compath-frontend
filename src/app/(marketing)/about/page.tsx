import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { WHY_COMPATH_ITEMS } from "@/constants/landing";

export default function AboutPage() {
  return (
    <Section>
      <Container className="flex flex-col gap-16">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-h1 text-text-primary">Haqqımızda</h1>
          <p className="text-body text-text-secondary max-w-2xl">
            COMPATH tələbənin akademik, inzibati-maliyyə və ya şəxsi-həssas
            ehtiyacını avtomatik olaraq doğru universitet xidmətinə
            yönləndirən platformadır. Məqsədimiz — hansı qapıya müraciət
            edəcəyini bilməyən tələbəni bir neçə addımda doğru xidmətə
            çatdırmaq və bütün prosesi izlənə bilən etməkdir.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="text-h2 text-text-primary text-center">
            Problem və həllimiz
          </h2>

          <div className="flex flex-col gap-4">
            {WHY_COMPATH_ITEMS.map((item) => (
              <div
                key={item.problemTitle}
                className="tablet:grid-cols-2 grid grid-cols-1 gap-4 rounded-card bg-surface p-6 shadow-sm"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-caption font-semibold tracking-wide text-text-secondary uppercase">
                    Problem
                  </span>
                  <h3 className="text-h4 text-text-primary">{item.problemTitle}</h3>
                  <p className="text-small text-text-secondary">
                    {item.problemDescription}
                  </p>
                </div>

                <div className="flex flex-col gap-1 rounded-lg bg-ku-green-soft p-4">
                  <span className="text-caption font-semibold tracking-wide text-ku-green-dark uppercase">
                    Həll
                  </span>
                  <h3 className="text-h4 text-ku-green-dark">{item.solutionTitle}</h3>
                  <p className="text-small text-ku-green-dark">
                    {item.solutionDescription}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-h2 text-text-primary">Prinsiplərimiz</h2>
          <p className="text-body text-text-secondary max-w-2xl">
            Platformanı mobile-first məntiqlə qururuq, çünki tələbələrin
            əksəriyyəti ona telefondan müraciət edir. Xüsusilə həssas və
            təcili mövzularda təhlükəsizlik və anonimlik əsas dizayn
            prinsipimizdir — məlumatların kimə göründüyü hər zaman
            nəzarət altındadır.
          </p>
        </div>
      </Container>
    </Section>
  );
}
