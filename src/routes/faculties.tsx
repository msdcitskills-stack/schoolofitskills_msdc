import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { DotBackground } from "@/components/dot-background";
import { Card3D, Card3DItem } from "@/components/card-3d";
import {
  Mail,
  Phone,
  Compass,
  HeartHandshake,
  Lightbulb,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";

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

const faculty = [
  {
    name: "Swathi K",
    emp: "MSDC074",
    role: "Skill Trainer",
    link: "https://swathiemp-card.vercel.app",
  },
  {
    name: "Anisha Shenoy",
    emp: "MSDC053",
    role: "Counsellor & Tally Trainer",
    link: "https://anishashenoyemp-card.vercel.app/",
  },
  {
    name: "Riya",
    emp: "MSDC053",
    role: "Skill Trainer",
    link: "https://riyaaminemp-card.vercel.app/",
  },
  {
    name: "Shubharaksha",
    emp: "MSDC",
    role: "Skill Trainer",
    link: "https://shubharakshaemp-card.vercel.app/",
  },
  {
    name: "Puneeth Acharya",
    emp: "MSDC379",
    role: "Skills Trainer",
    link: "https://puneethacharyaempcard.vercel.app/",
  },
  {
    name: "Ananya V Hegde",
    emp: "MSDC065",
    role: "Technical Trainer",
    link: "https://ananyaemp-card.vercel.app/",
  },
  {
    name: "Veetrag",
    emp: "MSDC075",
    role: "Skills Trainer",
    link: "https://veetragjainemp-card.vercel.app",
  },
  {
    name: "Anusha Naik",
    emp: "MSDC077",
    role: "Skills Trainer",
    link: "https://anushanaikemp-card.vercel.app/",
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
        <SectionHeading
          eyebrow="Faculty ID cards"
          title="The trainers you will learn with."
          description="Tap any card to open that faculty member's official employee card."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {faculty.map((f) => (
            <a
              key={f.name}
              href={f.link}
              target="_blank"
              rel="noreferrer"
              className="group relative block outline-none"
            >
              <Card3D className="rounded-[1.75rem]" intensity={10}>
                <div className="glass corner-glow relative h-full overflow-hidden rounded-[1.75rem] border border-border p-6 transition-shadow duration-300 group-focus-visible:ring-2 group-focus-visible:ring-ring">
                  <div
                    className="aurora-mesh pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-500 group-hover:opacity-80"
                    aria-hidden
                  />
                  {/* lanyard slot */}
                  <span
                    className="absolute left-1/2 top-3 h-1.5 w-14 -translate-x-1/2 rounded-full bg-muted"
                    aria-hidden
                  />
                  <div className="relative mt-5 flex items-start gap-4">
                    <Card3DItem z={70}>
                      <div className="relative grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-secondary text-secondary-foreground shadow-[0_18px_45px_-25px_color-mix(in_oklab,var(--color-primary)_80%,transparent)]">
                        <span className="text-lg font-bold tracking-tight">
                          {f.name
                            .split(" ")
                            .map((p) => p[0])
                            .slice(0, 2)
                            .join("")}
                        </span>
                      </div>
                    </Card3DItem>
                    <Card3DItem z={40} className="min-w-0">
                      <h3 className="truncate text-lg font-semibold tracking-tight">{f.name}</h3>
                      <p className="mt-1 text-sm font-medium text-primary">{f.role}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        School of IT Skills, MSDC
                      </p>
                    </Card3DItem>
                  </div>

                  <div className="relative mt-6 flex items-end justify-between gap-3 border-t border-border/70 pt-4">
                    <div>
                      <span className="eyebrow text-muted-foreground">Emp No</span>
                      <p className="font-mono text-sm font-semibold tracking-wider">{f.emp}</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/70 px-3 py-1.5 text-xs font-semibold transition-transform duration-300 group-hover:translate-x-1">
                      View card <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                  <span
                    className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    aria-hidden
                  />
                </div>
              </Card3D>
            </a>
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
