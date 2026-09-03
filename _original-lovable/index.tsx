import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Building2,
  ChevronRight,
  Flame,
  HardHat,
  Mail,
  MessageCircle,
  Phone,
  ShieldCheck,
  Zap,
} from "lucide-react";
import heroImage from "@/assets/hero-oilfield.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Black Diamond Corporation Services | Infraestrutura e Petróleo",
      },
      {
        name: "description",
        content:
          "Consultoria internacional que conecta engenheiros e especialistas técnicos a projetos de infraestrutura, energia e extração petrolífera na Venezuela.",
      },
      {
        property: "og:title",
        content: "Black Diamond Corporation Services | Infraestrutura e Petróleo",
      },
      {
        property: "og:description",
        content:
          "Consultoria estratégica e viabilização de talentos para projetos de óleo, gás, obras rodoviárias e energia na Venezuela.",
      },
    ],
  }),
  component: Index,
});

const navLinks = [
  { label: "Sobre", href: "#sobre" },
  { label: "Áreas de Atuação", href: "#areas" },
  { label: "Como Funciona", href: "#processo" },
  { label: "Contato", href: "#contato" },
];

const areas = [
  {
    icon: HardHat,
    title: "Engenharia & Obras Rodoviárias",
    text: "Suporte e consultoria para projetos de logística, malha viária e acessos a campos de extração.",
  },
  {
    icon: Building2,
    title: "Infraestrutura Operacional & Loteamentos",
    text: "Estruturação de bases operacionais, alojamentos técnicos e loteamentos industriais.",
  },
  {
    icon: Flame,
    title: "Extração & Produção Petrolífera",
    text: "Conexão e direcionamento para funções ligadas à perfuração, refino, manutenção e suporte de campo.",
  },
  {
    icon: Zap,
    title: "Energia & Redes Elétricas",
    text: "Projetos e contratação para suporte à rede elétrica, usinas e infraestrutura de suporte aos poços.",
  },
];

const steps = [
  {
    number: "01",
    title: "Avaliação de Perfil",
    text: "Análise do currículo e adequação técnica às demandas vigentes dos projetos.",
  },
  {
    number: "02",
    title: "Suporte Regulatório",
    text: "Orientação sobre documentação, licenças e conformidade contratual internacional.",
  },
  {
    number: "03",
    title: "Conexão com Projetos",
    text: "Mapeamento e apresentação do perfil diretamente às oportunidades ativas no setor.",
  },
  {
    number: "04",
    title: "Apoio de Mobilização",
    text: "Orientação sobre logística de deslocamento, integração e instalação.",
  },
];

const fieldClass =
  "w-full rounded-md border border-input bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/30";

function Index() {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 lg:px-8">
          <a href="#top" className="font-display text-sm font-extrabold uppercase leading-tight tracking-[0.18em]">
            Black Diamond <span className="text-primary">Corporation</span>
            <span className="block text-[0.65rem] font-semibold tracking-[0.4em] text-muted-foreground">
              Services
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
            Falar com Consultor
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
                <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                Consultoria Internacional
              </span>
              <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                Soluções Estratégicas em Infraestrutura e Operações Petrolíferas na{" "}
                <span className="text-primary">Venezuela</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Conectamos profissionais técnicos, engenheiros e especialistas às maiores
                oportunidades de expansão energética, obras de base e logística do setor.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href="#contato"
                  className="btn-ruby inline-flex items-center gap-3 rounded-md px-7 py-4 text-base font-bold uppercase tracking-wide"
                >
                  <MessageCircle className="h-5 w-5" />
                  Falar com a Equipe Black Diamond
                </a>
                <a
                  href="#areas"
                  className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-4 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  Áreas de Atuação
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SOBRE */}
        <section id="sobre" className="border-y border-border bg-surface/40 py-24">
          <div className="mx-auto max-w-5xl px-5 lg:px-8">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Autoridade
            </p>
            <h2 className="mt-4 text-center text-3xl font-bold tracking-tight sm:text-4xl">
              Quem somos
            </h2>
            <div className="card-industrial mt-10 rounded-xl p-8 sm:p-12">
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                A <span className="font-semibold text-foreground">Black Diamond Corporation Services</span>{" "}
                atua na consultoria estratégica e viabilização de talentos para projetos de alta
                complexidade na Venezuela. Nosso foco é garantir o direcionamento correto,
                regularização e suporte logístico para profissionais e fornecedores que buscam
                inserção direta no mercado de óleo, gás e reconstrução estrutural.
              </p>
            </div>
          </div>
        </section>

        {/* ÁREAS */}
        <section id="areas" className="py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Setores</p>
            <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
              Áreas de Atuação
            </h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {areas.map((area) => (
                <article key={area.title} className="card-industrial rounded-xl p-7">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-primary/12 text-primary">
                    <area.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-lg font-bold leading-snug">{area.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{area.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESSO */}
        <section id="processo" className="border-y border-border bg-surface/40 py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Processo</p>
            <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
              O fluxo da consultoria
            </h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step) => (
                <article key={step.number} className="card-industrial relative rounded-xl p-7">
                  <span className="font-display text-4xl font-extrabold text-primary/25">
                    {step.number}
                  </span>
                  <h3 className="mt-4 text-lg font-bold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FORMULÁRIO */}
        <section id="contato" className="py-24">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1fr_1.1fr] lg:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Contato</p>
              <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                Inicie seu processo de avaliação com a Black Diamond
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
                Preencha os dados abaixo. Nossa equipe analisa o perfil técnico e retorna com o
                direcionamento adequado às oportunidades ativas no setor.
              </p>
              <ul className="mt-8 space-y-4 text-sm text-muted-foreground">
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-primary" />
                  contato@blackdiamondcs.com
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-primary" />
                  Atendimento comercial em horário estendido
                </li>
                <li className="flex items-center gap-3">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  Dados tratados com confidencialidade
                </li>
              </ul>
            </div>

            <form
              className="card-industrial rounded-xl p-7 sm:p-9"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <div className="grid gap-5">
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
                  className="btn-ruby mt-2 inline-flex w-full items-center justify-center gap-2 rounded-md px-6 py-4 text-sm font-bold uppercase tracking-wide"
                >
                  Solicitar Avaliação de Perfil
                  <ArrowRight className="h-4 w-4" />
                </button>
                {sent && (
                  <p className="text-center text-sm font-medium text-primary" role="status">
                    Solicitação registrada. Nossa equipe entrará em contato.
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
            <p className="font-display text-xs font-extrabold uppercase tracking-[0.2em] text-foreground">
              Black Diamond <span className="text-primary">Corporation</span> Services
            </p>
            <p className="mt-3">© Black Diamond Corporation Services – Todos os direitos reservados.</p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground/70">
              Isenção de responsabilidade sobre trâmites migratórios e contratações de terceiros.
            </p>
          </div>
          <nav className="flex gap-6">
            <a href="#sobre" className="transition-colors hover:text-primary">
              Políticas de Privacidade
            </a>
            <a href="#sobre" className="transition-colors hover:text-primary">
              Termos de Uso
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
