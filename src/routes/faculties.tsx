import type { CSSProperties } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { DotBackground } from "@/components/dot-background";
import { Card3D, Card3DItem } from "@/components/card-3d";
import rajalaxmiPhoto from "@/assets/faculty/Rajalaxmi.webp.asset.json";
import swathiPhoto from "@/assets/faculty/Swathi.webp.asset.json";
import anishaPhoto from "@/assets/faculty/Anisha.webp.asset.json";
import riyaPhoto from "@/assets/faculty/Riya.webp.asset.json";
import shubharakshaPhoto from "@/assets/faculty/Shubharaksha.webp.asset.json";
import puneethPhoto from "@/assets/faculty/Puneeth.webp.asset.json";
import ananyaPhoto from "@/assets/faculty/Ananya.webp.asset.json";
import veetragPhoto from "@/assets/faculty/Veetrag.jpg.asset.json";
import anushaPhoto from "@/assets/faculty/Anusha.webp.asset.json";
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
    photo: swathiPhoto.url,
    emp: "MSDC074",
    role: "Skill Trainer",
    link: "https://swathiemp-card.vercel.app",
  },
  {
    name: "Anisha Shenoy",
    photo: anishaPhoto.url,
    emp: "MSDC053",
    role: "Counsellor & Tally Trainer",
    link: "https://anishashenoyemp-card.vercel.app/",
  },
  {
    name: "Riya",
    photo: riyaPhoto.url,
    emp: "MSDC053",
    role: "Skill Trainer",
    link: "https://riyaaminemp-card.vercel.app/",
  },
  {
    name: "Shubharaksha",
    photo: shubharakshaPhoto.url,
    emp: "MSDC",
    role: "Skill Trainer",
    link: "https://shubharakshaemp-card.vercel.app/",
  },
  {
    name: "Puneeth Acharya",
    photo: puneethPhoto.url,
    emp: "MSDC379",
    role: "Skills Trainer",
    link: "https://puneethacharyaempcard.vercel.app/",
  },
  {
    name: "Ananya V Hegde",
    photo: ananyaPhoto.url,
    emp: "MSDC065",
    role: "Technical Trainer",
    link: "https://ananyaemp-card.vercel.app/",
  },
  {
    name: "Veetrag",
    photo: veetragPhoto.url,
    emp: "MSDC075",
    role: "Skills Trainer",
    link: "https://veetragjainemp-card.vercel.app",
  },
  {
    name: "Anusha Naik",
    photo: anushaPhoto.url,
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
          <Card3D className="orbit-border rounded-[2rem]" intensity={14}>
            <div className="glass corner-glow relative overflow-hidden rounded-[2rem] p-8 sm:p-12">
              <div className="aurora-mesh pointer-events-none absolute inset-0 opacity-60" aria-hidden />
              <div className="relative grid gap-10 md:grid-cols-[auto_1fr] md:items-center">
                <Card3DItem z={120} className="mx-auto md:mx-0">
                  <div
                    className="orbit-border relative rounded-full"
                    style={{ "--orbit-speed": "8s", "--orbit-hue": "40deg" } as CSSProperties}
                  >
                    <div className="live-float relative grid h-44 w-44 place-items-center overflow-hidden rounded-full bg-secondary shadow-[0_25px_70px_-30px_color-mix(in_oklab,var(--color-primary)_80%,transparent)] sm:h-52 sm:w-52">
                      <img
                        src={rajanmiUrl}
                        alt="Rajalaxmi Anandan, Centre Head — School of IT Skills, MSDC"
                        width={420}
                        height={420}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full scale-[1.02] object-cover object-top transition-transform duration-700 ease-out group-hover/head:scale-[1.07] motion-reduce:transition-none motion-reduce:group-hover/head:scale-100"
                      />
                      <span className="live-sheen" aria-hidden />
                      <span
                        className="pointer-events-none absolute inset-0 rounded-full"
                        style={{
                          boxShadow:
                            "inset 0 0 0 1px color-mix(in oklab, var(--color-border) 80%, transparent), inset 0 -30px 50px -30px color-mix(in oklab, var(--color-primary) 45%, transparent)",
                        }}
                        aria-hidden
                      />
                      <span className="live-twinkle absolute right-4 top-4" aria-hidden />
                    </div>
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
          {values.map((v, i) => (
            <div
              key={v.title}
              className="orbit-border bulge rounded-3xl border border-border bg-card p-7"
              style={{
                "--orbit-speed": "11s",
                "--orbit-delay": `${i * -3.6}s`,
                "--orbit-hue": `${i * 110}deg`,
              } as CSSProperties}
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
          eyebrow="Our faculty"
          title="The trainers you will learn with."
          description="Meet the educators bringing experience, care and curiosity to every classroom."
        />
        <div className="mt-10 grid gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {faculty.map((f, i) => (
            <a
              key={f.name}
              href={f.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${f.name}'s employee card`}
              style={{
                "--orbit-speed": "9s",
                "--orbit-delay": `${-(i % 4) * 2.4}s`,
                "--orbit-hue": `${(i % 4) * 90}deg`,
                "--live-delay": `${i * 0.55}s`,
                "--live-dur": `${5.5 + (i % 3) * 0.9}s`,
                "--sheen-dur": `${6.5 + (i % 4)}s`,
              } as CSSProperties}
              className="group live-float live-aura relative block min-w-0 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              <Card3D className="orbit-border h-full rounded-lg" intensity={4}>
                <article className="glare-card h-full overflow-hidden rounded-lg border border-border bg-card transition-colors duration-300 group-hover:border-primary/40">
                  <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                    <img
                      src={f.photo}
                      alt={f.name}
                      width={640}
                      height={800}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.035] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                    <span className="live-wash" aria-hidden />
                    <span className="live-sheen" aria-hidden />
                    <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-md border border-border bg-background/95 px-2.5 py-1.5 font-mono text-xs font-medium text-foreground">
                      <span className="live-twinkle" aria-hidden />
                      {f.emp}
                    </span>
                  </div>
                  <div className="p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="live-underline w-fit text-xl font-semibold">{f.name}</h3>
                        <p className="mt-1.5 min-h-10 text-sm font-medium text-primary">{f.role}</p>
                      </div>
                      <ArrowUpRight aria-hidden className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary motion-reduce:transform-none" />
                    </div>
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-4">
                      <p className="text-xs text-muted-foreground">School of IT Skills · MSDC</p>
                      <span className="text-xs font-medium text-foreground">View ID card</span>
                    </div>
                  </div>
                </article>
              </Card3D>
            </a>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" className="mx-auto max-w-6xl page-x pb-24">
        <div className="orbit-border glass flex flex-col items-start justify-between gap-6 rounded-3xl p-8 sm:flex-row sm:items-center sm:p-10">
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
