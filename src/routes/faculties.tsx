import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { DotBackground } from "@/components/dot-background";
import { Card3D, Card3DItem } from "@/components/card-3d";
import { Mail, Phone, Compass, HeartHandshake, Lightbulb, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/faculties")({
  head: () => ({
    meta: [
      { title: "Faculties — School of IT Skills, MSDC Manipal" },
      {
        name: "description",
        content:
          "Meet the faculty of School of IT Skills, Manipal Skill Development Centre — led by Centre Head Rajalaxmi Anandan, mentoring learners across IT, data and AI programs.",
      },
      { property: "og:title", content: "Faculties — School of IT Skills" },
      {
        property: "og:description",
        content:
          "Mentors and educators behind School of IT Skills at Manipal Skill Development Centre.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Faculties,
});

const values = [
  {
    icon: Compass,
    title: "Mentor-led guidance",
    text: "Every learner is guided personally — from the first line of code to the final project review.",
  },
  {
    icon: Lightbulb,
    title: "Industry-current teaching",
    text: "Curriculum shaped by real workplace tools, refreshed as the technology moves.",
  },
  {
    icon: HeartHandshake,
    title: "Patient, human pace",
    text: "School children and professionals learn side by side, each at a pace that respects them.",
  },
];

function Faculties() {
  return (
    <div>
      <DotBackground>
        <Reveal as="section" className="mx-auto max-w-6xl page-x pb-14 pt-6">
          <SectionHeading
            eyebrow="Our people"
            title="The faculty behind every skill we teach."
            description="A small, deliberate team of educators at Manipal Skill Development Centre — teaching with clarity, care and craft."
          />
        </Reveal>

        <Reveal as="section" className="mx-auto max-w-6xl page-x pb-20">
          <Card3D className="rounded-[2rem]" intensity={14}>
            <div className="glass corner-glow relative overflow-hidden rounded-[2rem] p-8 sm:p-12">
              <div className="aurora-mesh pointer-events-none absolute inset-0 opacity-60" aria-hidden />
              <div className="relative grid gap-10 md:grid-cols-[auto_1fr] md:items-center">
                <Card3DItem z={120} className="mx-auto md:mx-0">
                  <div className="relative grid h-40 w-40 place-items-center rounded-full bg-secondary text-secondary-foreground shadow-[0_25px_70px_-30px_color-mix(in_oklab,var(--color-primary)_80%,transparent)]">
                    <span className="text-4xl font-bold tracking-tight">RA</span>
                    <span className="absolute inset-0 rounded-full border border-border/70" aria-hidden />
                  </div>
                </Card3DItem>

                <Card3DItem z={70}>
                  <div className="text-center md:text-left">
                    <span className="eyebrow">Centre Head</span>
                    <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                      Rajalaxmi Anandan
                    </h2>
                    <p className="mt-2 text-sm font-medium text-primary">
                      Centre Head — School of IT Skills, MSDC
                    </p>
                    <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
                      Rajalaxmi leads the School of IT Skills at Manipal Skill Development
                      Centre, shaping how every program is designed, taught and mentored —
                      from school-level foundations to advanced data, AI and full-stack tracks.
                    </p>
                    <div className="mt-7 flex flex-wrap justify-center gap-3 md:justify-start">
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
                      >
                        <Mail className="h-4 w-4" /> Get in touch
                      </Link>
                      <a
                        href="tel:+919187974688"
                        className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold transition-transform hover:scale-105"
                      >
                        <Phone className="h-4 w-4" /> +91 91879 74688
                      </a>
                    </div>
                  </div>
                </Card3DItem>
              </div>
            </div>
          </Card3D>
        </Reveal>
      </DotBackground>

      <Reveal as="section" className="mx-auto max-w-6xl page-x pb-20">
        <div className="grid gap-5 md:grid-cols-3">
          {values.map((v) => (
            <div
              key={v.title}
              className="glow-ring bulge rounded-3xl border border-border bg-card p-7"
            >
              <v.icon className="h-5 w-5 text-primary" />
              <h3 className="mt-4 text-lg font-semibold tracking-tight">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" className="mx-auto max-w-6xl page-x pb-20">
        <h2 className="text-xl font-semibold tracking-tight">More faculty, joining soon</h2>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Profiles of our subject faculty are being added. Share their details and they will
          appear here in the same format.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="rounded-3xl border border-dashed border-border/80 bg-card/50 p-7"
            >
              <div className="h-16 w-16 animate-pulse rounded-full bg-muted" />
              <div className="mt-5 h-4 w-32 animate-pulse rounded-full bg-muted" />
              <div className="mt-3 h-3 w-44 animate-pulse rounded-full bg-muted/70" />
              <div className="mt-6 space-y-2">
                <div className="h-2.5 w-full animate-pulse rounded-full bg-muted/60" />
                <div className="h-2.5 w-4/5 animate-pulse rounded-full bg-muted/60" />
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" className="mx-auto max-w-6xl page-x pb-24">
        <div className="glass corner-glow flex flex-col items-start justify-between gap-6 rounded-3xl p-8 sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Want to teach with us?</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              We welcome experienced trainers across IT, data, AI and accounting.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground transition-transform hover:scale-105"
          >
            Contact us <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
