import { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  Building2,
  ChevronDown,
  ChevronRight,
  Flame,
  HardHat,
  Image,
  Mail,
  MessageCircle,
  Phone,
  PlayCircle,
  ShieldCheck,
  Zap,
} from "lucide-react";
import heroImage from "@/assets/hero-oilfield.jpg";

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
  },
  {
    icon: Building2,
    title: ["Infraestrutura Operacional &", "Loteamentos"],
    text: "Estruturação de bases operacionais, alojamentos técnicos e loteamentos industriais.",
    accent: "blue",
  },
  {
    icon: Flame,
    title: ["Extração &", "Produção Petrolífera"],
    text: "Conexão e direcionamento para funções ligadas à perfuração, refino, manutenção e suporte de campo.",
    accent: "red",
  },
  {
    icon: Zap,
    title: ["Energia &", "Redes Elétricas"],
    text: "Projetos e contratação para suporte à rede elétrica, usinas e infraestrutura de suporte aos poços.",
    accent: "blue",
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
      <header className="fixed inset-x-0 top-1 z-50 border-b border-border bg-background/85 backdrop-blur-md">
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
            className="btn-ruby hidden items-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold sm:inline-flex"
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
            alt="Campo de extração petrolífera ao anoitecer com torre de perfuração e dutos industriais"
            width={1920}
            height={1088}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="hero-overlay absolute inset-0" />
          <div className="relative mx-auto w-full max-w-7xl px-5 py-20 lg:px-8">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-accent-blue" />
                Reconstrução Nacional em Curso
              </span>
              <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                A Venezuela Está Sendo Reconstruída.{" "}
                <span className="text-accent-blue">Trabalhe Legalizado</span> e Ganhe em Dólar
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
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
                  className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-4 text-sm font-semibold text-foreground transition-colors hover:border-accent-blue hover:text-accent-blue"
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
          <div className="mx-auto max-w-5xl px-5 lg:px-8">
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

          <div className="mx-auto mt-16 grid max-w-7xl gap-10 px-5 lg:grid-cols-[3fr_2fr] lg:items-start lg:px-8">
            <div>
              <h3 className="text-2xl font-bold">Conheça a Venezuela</h3>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Depois do forte terremoto que atingiu a região de Caracas em junho de 2026 e de uma
                recente transição de governo, a Venezuela entrou em um intenso processo de
                reconstrução. Esse novo momento tem gerado uma demanda real por infraestrutura,
                energia e profissionais técnicos qualificados — e é exatamente aí que a Black
                Diamond atua, conectando você a essas oportunidades com remuneração em dólar e
                suporte completo em toda a parte legal.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-5">
                <div className="rounded-lg border border-border bg-card p-4">
                  <span className="block text-xs uppercase tracking-wider text-muted-foreground">Capital</span>
                  <span className="mt-1 block text-base font-semibold text-foreground">Caracas</span>
                </div>
                <div className="rounded-lg border border-border bg-card p-4">
                  <span className="block text-xs uppercase tracking-wider text-muted-foreground">População</span>
                  <span className="mt-1 block text-base font-semibold text-foreground">~28,6 milhões</span>
                </div>
                <div className="rounded-lg border border-border bg-card p-4">
                  <span className="block text-xs uppercase tracking-wider text-muted-foreground">Fronteiras</span>
                  <span className="mt-1 block text-base font-semibold text-foreground">Brasil, Colômbia e Guiana</span>
                </div>
                <div className="rounded-lg border border-border bg-card p-4">
                  <span className="block text-xs uppercase tracking-wider text-muted-foreground">Moeda</span>
                  <span className="mt-1 block text-base font-semibold text-foreground">Dólar americano</span>
                </div>
              </div>
            </div>
            <div className="grid gap-5">
              <div className="flex min-h-44 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-surface p-6 text-center text-muted-foreground">
                <Image className="h-8 w-8 opacity-60" />
                <span className="text-xs leading-relaxed">
                  Foto de um ponto turístico da Venezuela (a inserir)
                </span>
              </div>
              <div className="flex min-h-44 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-surface p-6 text-center text-muted-foreground">
                <PlayCircle className="h-8 w-8 opacity-60" />
                <span className="text-xs leading-relaxed">Espaço reservado para vídeo</span>
              </div>
            </div>
          </div>
        </section>

        {/* ÁREAS */}
        <section id="areas" className="py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-blue">Setores</p>
            <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
              Áreas de Atuação
            </h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {areas.map((area) => (
                <article
                  key={area.title.join(" ")}
                  className="card-industrial overflow-hidden rounded-xl text-center"
                >
                  <div
                    className="relative flex h-[7.5rem] items-center justify-center"
                    style={{
                      clipPath: "polygon(0 0, 100% 0, 100% 68%, 0 100%)",
                      backgroundImage: area.accent === "red" ? "var(--gradient-red)" : "var(--gradient-blue)",
                    }}
                  >
                    <area.icon className="h-12 w-12" style={{ color: "oklch(1 0 0 / .3)" }} />
                  </div>
                  <div className="px-7 pb-7 pt-3">
                    <div
                      className="relative z-10 -mt-7 inline-flex h-14 w-14 items-center justify-center rounded-full bg-card shadow-elegant"
                      style={{ border: "3px solid var(--background)" }}
                    >
                      <area.icon
                        className="h-6 w-6"
                        style={{ color: area.accent === "red" ? "var(--primary)" : "var(--accent-blue)" }}
                      />
                    </div>
                    <h3 className="mt-3 min-h-[3.25rem] text-lg font-bold leading-snug">
                      {area.title.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </h3>
                    <p className="mt-3 text-left text-sm leading-relaxed text-muted-foreground">{area.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESSO */}
        <section id="processo" className="border-y border-border bg-surface/40 py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-blue">Processo</p>
            <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
              O fluxo da consultoria
            </h2>
            <div
              ref={timelineRef}
              className="relative mx-10 mt-14 hidden h-0.5 items-center justify-between bg-border md:flex"
            >
              <div
                aria-label="Brasil"
                className="h-6 w-9 shrink-0 overflow-hidden rounded-sm"
                style={{ boxShadow: "0 0 0 2px var(--background)" }}
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
                style={{ boxShadow: "0 0 0 2px var(--background)" }}
              >
                <svg viewBox="0 0 24 16" className="block h-full w-full">
                  <rect width="24" height="5.33" fill="#FFCC00" />
                  <rect y="5.33" width="24" height="5.33" fill="#00247D" />
                  <rect y="10.66" width="24" height="5.34" fill="#CF142B" />
                </svg>
              </div>
              <div
                aria-hidden="true"
                className="absolute top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 text-accent-blue transition-[left] duration-[2400ms] ease-in-out motion-reduce:transition-none"
                style={{ left: timelineInView ? "100%" : "0%" }}
              >
                <svg viewBox="0 0 24 24" className="h-full w-full fill-current">
                  <path d="M12 2 L14 9 L21 12 L14 12.5 L13 20 L15 22 L12 21 L9 22 L11 20 L10 12.5 L3 12 L10 9 Z" />
                </svg>
              </div>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {steps.map((step) => (
                <article key={step.number} className="card-industrial relative rounded-xl p-7">
                  <span className="font-display text-4xl font-extrabold text-accent-blue/25">
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
          <div className="mx-auto max-w-4xl px-5 lg:px-8">
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
              <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
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
                  <p className="text-center text-sm font-medium text-primary" role="status">
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
            <p className="flex items-center gap-2 font-display text-xs font-extrabold uppercase tracking-[0.2em] text-foreground">
              <svg width="20" height="20" viewBox="4 6 26 23" className="shrink-0" aria-hidden="true">
                <path d="M11 27 L19 27 L15 15 Z" fill="var(--accent-blue)" />
                <circle cx="24" cy="11" r="3" fill="var(--accent-blue)" />
                <line x1="6" y1="19" x2="24" y2="11" stroke="var(--accent-blue)" strokeWidth="2.2" strokeLinecap="round" />
                <line x1="6" y1="19" x2="6" y2="25" stroke="var(--accent-blue)" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Black Diamond <span className="text-accent-blue">Corporation</span> Services
            </p>
            <p className="mt-3">© Black Diamond Corporation Services – Todos os direitos reservados.</p>
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
