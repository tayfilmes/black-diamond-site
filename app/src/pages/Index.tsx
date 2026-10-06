import { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  Building2,
  ChevronDown,
  ChevronRight,
  Flame,
  HardHat,
  Mail,
  MessageCircle,
  Phone,
  ShieldCheck,
  Zap,
} from "lucide-react";
import heroImage from "@/assets/hero-oilfield-day.jpg";
import areaEngenharia from "@/assets/areas/engenharia-v2.jpg";
import areaInfraestrutura from "@/assets/areas/infraestrutura.jpg";
import areaPetroleo from "@/assets/areas/petroleo.jpg";
import areaEnergia from "@/assets/areas/energia.jpg";
import logoChevron from "@/assets/partners/chevron.svg";
import logoRepsol from "@/assets/partners/repsol.svg";
import logoShell from "@/assets/partners/shell.svg";

const oilCompanies = [
  { name: "Chevron", logo: logoChevron, heightClass: "h-[4.5rem]" },
  { name: "Repsol", logo: logoRepsol, heightClass: "h-12" },
  { name: "Shell", logo: logoShell, heightClass: "h-14" },
];

const videos = [
  { id: "LFY5eX2wEpo", title: "O que muda com a nova lei do petróleo na Venezuela?", author: "Brasil de Fato" },
  { id: "l11IyAZvHRE", title: "Trump anuncia possível investimento de US$ 100 bilhões no petróleo venezuelano", author: "SBT News" },
  { id: "rAgz_Y0b_0s", title: "Delcy diz que acordo com EUA preserva petróleo da Venezuela e prevê US$ 209 bilhões", author: "O POVO" },
  { id: "oi4LEkLFfqE", title: "Após acordo, EUA poderá explorar 20% do petróleo da Venezuela e quer dobrar produção em 5 anos", author: "UOL" },
];

const navLinks = [
  { label: "Sobre", href: "#sobre" },
  { label: "Áreas de Atuação", href: "#areas" },
  { label: "Como Funciona", href: "#processo" },
  { label: "FAQ", href: "#faq" },
  { label: "Contato", href: "#contato" },
];

const areas = [
  {
    icon: HardHat,
    title: ["Engenharia &", "Obras Rodoviárias"],
    text: "Suporte e consultoria para projetos de logística, malha viária e acessos a campos de extração.",
    accent: "red",
    photo: areaEngenharia,
  },
  {
    icon: Building2,
    title: ["Infraestrutura Operacional &", "Loteamentos"],
    text: "Estruturação de bases operacionais, alojamentos técnicos e loteamentos industriais.",
    accent: "blue",
    photo: areaInfraestrutura,
  },
  {
    icon: Flame,
    title: ["Extração &", "Produção Petrolífera"],
    text: "Conexão e direcionamento para funções ligadas à perfuração, refino, manutenção e suporte de campo.",
    accent: "red",
    photo: areaPetroleo,
  },
  {
    icon: Zap,
    title: ["Energia &", "Redes Elétricas"],
    text: "Projetos e contratação para suporte à rede elétrica, usinas e infraestrutura de suporte aos poços.",
    accent: "blue",
    photo: areaEnergia,
  },
] as const;

const steps = [
  {
    number: "01",
    title: "Triagem Inicial",
    text: "Avaliamos seu currículo e conversamos com você para entender sua experiência e ver se seu perfil combina com as vagas disponíveis.",
  },
  {
    number: "02",
    title: "Contrato e Documentos",
    text: "Assinamos o contrato de prestação de serviço e reunimos seus documentos pessoais para dar início ao processo.",
  },
  {
    number: "03",
    title: "Preparação da Documentação",
    text: "Cuidamos da legalização e tradução dos documentos necessários e apresentamos seu perfil ao contratante na Venezuela.",
  },
  {
    number: "04",
    title: "Visto e Logística",
    text: "Acompanhamos todo o processo do visto de trabalho e te damos uma orientação completa antes da viagem.",
  },
  {
    number: "05",
    title: "Embarque e Início",
    text: "Organizamos sua viagem e chegada, e confirmamos que você está integrado ao novo projeto.",
  },
];

const faqs = [
  {
    question: "Preciso ter experiência internacional para participar?",
    answer:
      "Não. Avaliamos seu perfil técnico e sua experiência no setor — engenharia, óleo e gás, infraestrutura ou energia — independentemente de você já ter trabalhado fora do país.",
  },
  {
    question: "Como funciona a legalização para trabalhar na Venezuela?",
    answer:
      "Nossa equipe orienta e acompanha toda a parte documental: vistos, licenças de trabalho e conformidade contratual internacional, para que sua atuação no país esteja sempre dentro da lei.",
  },
  {
    question: "O pagamento é realmente feito em dólar?",
    answer:
      "Sim. Os projetos que direcionamos seguem a prática do setor de óleo, gás e infraestrutura na região, com remuneração em dólar conforme o contrato de cada oportunidade.",
  },
  {
    question: "Quais áreas profissionais vocês atendem?",
    answer:
      "Engenharia e obras rodoviárias, infraestrutura operacional, extração e produção petrolífera, e energia e redes elétricas — sempre buscando compatibilidade entre o seu perfil técnico e os projetos ativos.",
  },
  {
    question: "Quanto tempo leva do cadastro até a mobilização?",
    answer:
      "O prazo varia conforme seu perfil e a disponibilidade de vagas ativas no momento. Assim que você envia o formulário, nossa equipe já inicia a avaliação e mantém contato em cada etapa.",
  },
  {
    question: "A avaliação inicial tem algum custo?",
    answer:
      "A avaliação de perfil é gratuita. Qualquer custo relacionado a documentação ou mobilização é informado de forma transparente antes de qualquer etapa seguir adiante.",
  },
];

const fieldClass =
  "w-full rounded-md border border-input bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-colors focus:border-accent-blue focus:ring-2 focus:ring-ring/30";

export default function Index() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [timelineInView, setTimelineInView] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = timelineRef.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimelineInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch("/enviar.php", { method: "POST", body: new FormData(form) });
      const data = await res.json();
      if (data.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-x-0 top-0 z-[60] h-1 flag-stripe" />
      <header className="fixed inset-x-0 top-1 z-50 border-b border-border bg-background/50 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 lg:px-8">
          <a
            href="#top"
            className="inline-flex items-center gap-2.5 font-display text-sm font-extrabold uppercase leading-tight tracking-[0.18em]"
          >
            <svg width="30" height="30" viewBox="4 6 26 23" className="shrink-0" aria-hidden="true">
              <path d="M11 27 L19 27 L15 15 Z" fill="#B22234" />
              <circle cx="24" cy="11" r="3" fill="#B22234" />
              <line x1="6" y1="19" x2="24" y2="11" stroke="#B22234" strokeWidth="2.2" strokeLinecap="round" />
              <line x1="6" y1="19" x2="6" y2="25" stroke="#B22234" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span>
              Black Diamond <span className="text-accent-blue">Corporation</span>
              <span className="block text-[0.65rem] font-semibold tracking-[0.4em] text-muted-foreground">
                Services
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="#contato"
            className="btn-blue hidden items-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold sm:inline-flex"
          >
            Falar com a Black Diamond
            <ChevronRight className="h-4 w-4" />
          </a>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="relative flex min-h-[92vh] items-center overflow-hidden pt-24">
          <img
            src={heroImage}
            alt="Bomba de petróleo em campo de extração sob céu azul"
            width={1920}
            height={1080}
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover object-[68%_center]"
          />
          <div className="hero-overlay absolute inset-0" />
          <div className="relative mx-auto w-full max-w-7xl px-5 py-20 lg:px-8">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white/85 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-accent-blue" />
                Reconstrução Nacional em Curso
              </span>
              <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                A Venezuela Está Sendo Reconstruída.{" "}
                <span className="text-accent-blue">Trabalhe Legalizado</span> e Ganhe em Dólar
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/85 sm:text-lg">
                O país vive uma nova realidade: obras de infraestrutura, energia e petróleo avançam
                e a demanda por profissionais qualificados nunca foi tão grande. Conectamos você a
                essas oportunidades com consultoria completa, suporte documental e garantias em
                cada etapa do processo.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href="#contato"
                  className="btn-blue inline-flex items-center gap-3 rounded-md px-7 py-4 text-base font-bold uppercase tracking-wide"
                >
                  <MessageCircle className="h-5 w-5" />
                  Falar com a Black Diamond
                </a>
                <a
                  href="#areas"
                  className="inline-flex items-center gap-2 rounded-md border border-black/30 bg-white/60 px-6 py-4 text-sm font-semibold text-foreground transition-colors hover:border-accent-blue hover:text-accent-blue"
                >
                  Áreas de Atuação
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
          <a
            href="#sobre"
            aria-label="Rolar para ver mais"
            className="scroll-hint absolute inset-x-0 bottom-7 mx-auto w-fit text-muted-foreground/75 transition-colors hover:text-muted-foreground"
          >
            <ChevronDown className="h-9 w-9" />
          </a>
        </section>

        {/* SOBRE */}
        <section id="sobre" className="border-y border-border bg-surface/40 py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-accent-blue">
              Autoridade
            </p>
            <h2 className="mt-4 text-center text-3xl font-bold tracking-tight sm:text-4xl">
              Quem somos
            </h2>
            <div className="card-industrial mt-10 rounded-xl p-8 sm:p-12">
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                A <span className="font-semibold text-foreground">Black Diamond Corporation Services</span>{" "}
                nasceu para atender quem realmente move essa nova fase: você, o profissional que vai
                ajudar a reconstruir a Venezuela. Cuidamos da avaliação técnica, da documentação
                legal e da conexão direta com projetos de óleo, gás, energia e infraestrutura —
                para que sua experiência no país aconteça de forma segura, totalmente legalizada e
                com remuneração em dólar.
              </p>
            </div>
          </div>
        </section>

        {/* VENEZUELA */}
        <section id="empresas" className="py-24">
          <div className="mx-auto max-w-7xl px-5 text-center lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-blue">Mercado</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Empresas que atuam na Venezuela</h2>
            <ul className="mt-10 grid list-none gap-5 p-0 sm:grid-cols-3">
              {oilCompanies.map((company) => (
                <li
                  key={company.name}
                  className="flex h-32 items-center justify-center rounded-xl border border-border bg-white p-6"
                >
                  <img
                    src={company.logo}
                    alt={company.name}
                    loading="lazy"
                    className={`${company.heightClass} w-auto max-w-[85%] object-contain`}
                  />
                </li>
              ))}
            </ul>
            <p className="mx-auto mt-6 text-xs leading-normal text-muted-foreground">
              Marcas registradas pertencentes aos seus respectivos proprietários, exibidas apenas para ilustrar o
              cenário do setor. Não indicam parceria, patrocínio ou vínculo com a Black Diamond Corporation Services.
            </p>
          </div>
        </section>

        {/* VÍDEOS */}
        <section id="videos" className="border-y border-border bg-surface/40 py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-blue">Vídeos</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">A Venezuela e o petróleo em pauta</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Reportagens de veículos de imprensa sobre o momento do setor de petróleo e energia na Venezuela.
              Conteúdo dos respectivos autores, exibido pelo player oficial do YouTube.
            </p>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {videos.map((video) => (
                <figure key={video.id} className="m-0 overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-elegant)]">
                  <div className="relative aspect-video bg-black">
                    <iframe
                      className="absolute inset-0 h-full w-full border-0"
                      width="560"
                      height="315"
                      src={`https://www.youtube.com/embed/${video.id}`}
                      title={video.title}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                  <figcaption className="px-5 pb-5 pt-4">
                    <strong className="block text-[0.95rem] font-bold leading-snug">{video.title}</strong>
                    <span className="mt-1.5 block text-[0.8rem] text-muted-foreground">{video.author} · YouTube</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ÁREAS */}
        <section id="areas" className="on-dark relative overflow-hidden py-24">
          <div
            aria-hidden="true"
            className="absolute -inset-16 z-0 flex"
            style={{ transform: "skewX(-9deg)" }}
          >
            {areas.map((area) => {
              const tint = area.accent === "red" ? "oklch(0.56 0.222 26.5 / .55)" : "oklch(0.55 0.19 258 / .55)";
              return (
                <div key={area.title.join(" ")} className="relative flex-1 overflow-hidden">
                  <div
                    className="absolute bg-cover bg-center"
                    style={{
                      top: "-5%",
                      bottom: "-5%",
                      left: "-30%",
                      right: "-30%",
                      transform: "skewX(9deg)",
                      backgroundImage: `linear-gradient(${tint}, ${tint}), url(${area.photo})`,
                    }}
                  />
                </div>
              );
            })}
          </div>
          <div aria-hidden="true" className="absolute inset-0 z-0" style={{ background: "oklch(0.08 0 0 / .5)" }} />
          <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground/90">Setores</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Áreas de Atuação
            </h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {areas.map((area) => (
                <article
                  key={area.title.join(" ")}
                  className="rounded-xl border p-7 text-left"
                  style={{
                    background: "oklch(0.1 0 0 / .55)",
                    borderColor: "oklch(1 0 0 / .12)",
                    backdropFilter: "blur(6px)",
                  }}
                >
                  <div
                    className="inline-flex h-12 w-12 items-center justify-center rounded-md text-white"
                    style={{ background: "oklch(1 0 0 / .12)" }}
                  >
                    <area.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 min-h-[3.25rem] text-lg font-bold leading-snug">
                    {area.title.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{area.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESSO */}
        <section id="processo" className="border-y border-border bg-surface/40 py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-blue">Processo</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              O fluxo da consultoria
            </h2>
            <div
              ref={timelineRef}
              className="relative mx-10 mt-14 hidden h-0.5 items-center justify-between bg-border md:flex"
            >
              <div
                aria-label="Brasil"
                className="h-6 w-9 shrink-0 overflow-hidden rounded-sm"
                style={{ boxShadow: "0 0 0 2px var(--surface)" }}
              >
                <svg viewBox="0 0 24 16" className="block h-full w-full">
                  <rect width="24" height="16" fill="#009739" />
                  <polygon points="12,2 22,8 12,14 2,8" fill="#FEDD00" />
                  <circle cx="12" cy="8" r="4" fill="#012169" />
                </svg>
              </div>
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-accent-blue" />
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-accent-blue" />
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-accent-blue" />
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-accent-blue" />
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-accent-blue" />
              <div
                aria-label="Venezuela"
                className="h-6 w-9 shrink-0 overflow-hidden rounded-sm"
                style={{ boxShadow: "0 0 0 2px var(--surface)" }}
              >
                <svg viewBox="0 0 24 16" className="block h-full w-full">
                  <rect width="24" height="5.33" fill="#FFCC00" />
                  <rect y="5.33" width="24" height="5.33" fill="#00247D" />
                  <rect y="10.66" width="24" height="5.34" fill="#CF142B" />
                </svg>
              </div>
              <div
                aria-hidden="true"
                className={`timeline-plane absolute top-1/2 h-6 w-6 text-accent-blue ${timelineInView ? "is-flying" : ""}`}
                style={{
                  transform: "translate(-50%, -50%) rotate(90deg)",
                  filter: "drop-shadow(0 1px 3px oklch(0 0 0 / .25))",
                }}
              >
                <svg viewBox="0 0 24 24" className="h-full w-full fill-current">
                  <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                </svg>
              </div>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {steps.map((step, i) => (
                <article key={step.number} className="card-industrial relative rounded-xl p-7">
                  <span
                    className={`font-display inline-block text-4xl font-extrabold text-accent-blue ${
                      timelineInView ? "step-pulse" : ""
                    }`}
                    style={timelineInView ? { animationDelay: `${(i + 1) * 1.2}s` } : undefined}
                  >
                    {step.number}
                  </span>
                  <h3 className="mt-4 text-lg font-bold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-blue">Dúvidas</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Perguntas Frequentes
            </h2>
            <div className="mt-12 space-y-4">
              {faqs.map((faq) => (
                <details key={faq.question} className="card-industrial group rounded-xl p-6 sm:p-7">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-bold">
                    {faq.question}
                    <ChevronDown className="h-5 w-5 shrink-0 text-accent-blue transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* FORMULÁRIO */}
        <section id="contato" className="py-24">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1fr_1.1fr] lg:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-blue">Contato</p>
              <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                Inicie seu processo de avaliação com a Black Diamond
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                Preencha os dados abaixo. Nossa equipe analisa o perfil técnico e retorna com o
                direcionamento adequado às oportunidades ativas no setor.
              </p>
              <ul className="mt-8 space-y-4 text-sm text-muted-foreground">
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-accent-blue" />
                  contato@blackdiamondcorpservices.com
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-accent-blue" />
                  Atendimento comercial em horário estendido
                </li>
                <li className="flex items-center gap-3">
                  <ShieldCheck className="h-4 w-4 text-accent-blue" />
                  Dados tratados com confidencialidade
                </li>
              </ul>
            </div>

            <form
              className="card-industrial rounded-xl p-7 sm:p-9"
              onSubmit={handleSubmit}
            >
              <div className="grid gap-5">
                <div className="absolute -left-[9999px]" aria-hidden="true">
                  <label htmlFor="website">Não preencher</label>
                  <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                </div>
                <div>
                  <label htmlFor="nome" className="mb-2 block text-sm font-medium">
                    Nome Completo
                  </label>
                  <input id="nome" name="nome" type="text" required placeholder="Seu nome completo" className={fieldClass} />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium">
                    E-mail Profissional
                  </label>
                  <input id="email" name="email" type="email" required placeholder="nome@empresa.com" className={fieldClass} />
                </div>
                <div>
                  <label htmlFor="telefone" className="mb-2 block text-sm font-medium">
                    WhatsApp / Telefone
                  </label>
                  <input id="telefone" name="telefone" type="tel" required placeholder="+55 (00) 00000-0000" className={fieldClass} />
                </div>
                <div>
                  <label htmlFor="area" className="mb-2 block text-sm font-medium">
                    Área de Atuação
                  </label>
                  <select id="area" name="area" required defaultValue="" className={fieldClass}>
                    <option value="" disabled>
                      Selecione uma área
                    </option>
                    <option>Engenharia</option>
                    <option>Extração/Petróleo</option>
                    <option>Infraestrutura/Obras</option>
                    <option>Energia</option>
                    <option>Outros</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="experiencia" className="mb-2 block text-sm font-medium">
                    Anos de Experiência
                  </label>
                  <select id="experiencia" name="experiencia" required defaultValue="" className={fieldClass}>
                    <option value="" disabled>
                      Selecione
                    </option>
                    <option>Até 2 anos</option>
                    <option>3-5 anos</option>
                    <option>5-10 anos</option>
                    <option>10+ anos</option>
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-blue mt-2 inline-flex w-full items-center justify-center gap-2 rounded-md px-6 py-4 text-sm font-bold uppercase tracking-wide disabled:opacity-60"
                >
                  {status === "sending" ? "Enviando..." : "Solicitar Avaliação de Perfil"}
                  <ArrowRight className="h-4 w-4" />
                </button>
                {status === "sent" && (
                  <p className="text-center text-sm font-medium text-accent-blue" role="status">
                    Solicitação registrada. Nossa equipe entrará em contato.
                  </p>
                )}
                {status === "error" && (
                  <p className="text-center text-sm font-medium text-destructive" role="status">
                    Não foi possível enviar agora. Tente novamente ou fale pelo WhatsApp/e-mail acima.
                  </p>
                )}
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-surface/60 py-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 text-sm text-muted-foreground lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="inline-flex items-center gap-2.5 font-display text-sm font-extrabold uppercase leading-tight tracking-[0.18em] text-foreground">
              <svg width="24" height="24" viewBox="4 6 26 23" className="shrink-0" aria-hidden="true">
                <path d="M11 27 L19 27 L15 15 Z" fill="#B22234" />
                <circle cx="24" cy="11" r="3" fill="#B22234" />
                <line x1="6" y1="19" x2="24" y2="11" stroke="#B22234" strokeWidth="2.2" strokeLinecap="round" />
                <line x1="6" y1="19" x2="6" y2="25" stroke="#B22234" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span>
                Black Diamond <span className="text-accent-blue">Corporation</span>
                <span className="block text-[0.65rem] font-semibold tracking-[0.4em] text-muted-foreground">
                  Services
                </span>
              </span>
            </p>
            <p className="mt-3">© Black Diamond Corporation Services – Todos os direitos reservados.</p>
            <p className="mt-1">CNPJ: 69.324.245/0001-70</p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground/70">
              Isenção de responsabilidade sobre trâmites migratórios e contratações de terceiros.
            </p>
          </div>
          <nav className="flex gap-6">
            <a href="/privacidade.html" className="transition-colors hover:text-accent-blue">
              Políticas de Privacidade
            </a>
            <a href="/termos.html" className="transition-colors hover:text-accent-blue">
              Termos de Uso
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
