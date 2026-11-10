import { useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BRAND } from "@/components/brand/Logo";
import { useLoop, useTicker } from "@/components/fx/hooks";
import { MascotImage } from "@/components/shared/Mascot";
import { MoreLink } from "@/components/shared/MoreLink";
import { SectionHeader, type SectionHeading } from "@/components/shared/SectionHeader";
import { agentImage } from "@/config/images";
import { agents, type Agent } from "@/content/product";
import { cn } from "@/lib/utils";

const CX = 320;
const CY = 290;
const PIPE_R = 215;
const ORBIT_R = 118;
/** Pipeline nodes sweep over the top arc, left to right (degrees, SVG y-down). */
const PIPE_ANGLES = [160, 215, 270, 325, 20];

const byName = new Map<string, Agent>(agents.list.map((a) => [a.name, a]));
const pipeline = agents.pipeline
  .map((name, i) => {
    const a = byName.get(name);
    const rad = ((PIPE_ANGLES[i] ?? 0) * Math.PI) / 180;
    return a ? { agent: a, x: CX + PIPE_R * Math.cos(rad), y: CY + PIPE_R * Math.sin(rad) } : null;
  })
  .filter((n) => n !== null);
const orbiters = agents.list
  .filter((a) => !(agents.pipeline as readonly string[]).includes(a.name))
  .map((agent, i) => ({ agent, x: CX + (i === 0 ? ORBIT_R : -ORBIT_R), y: CY }));

/** Idle-float stagger (s) per agent, in roster order. */
const floatDelay = (name: string) =>
  Math.max(
    0,
    agents.list.findIndex((a) => a.name === name),
  ) * 0.55;

/** Robot centre in the 900×900 agent files, as fractions — used to crop round thumbnails. */
const ROBOT_CX = 0.5;
const ROBOT_CY = 0.48;
/** Share of the frame a round thumbnail shows (robot + a little air). */
const ROBOT_SPAN = 0.56;
const NODE_R = { lg: 34, sm: 26 } as const;

type AgentsPipelineProps = {
  heading: SectionHeading;
  /** "compact": orbital only. "full": orbital + every agent with its role and output. */
  variant?: "compact" | "full";
  link?: { label: string; href: string };
  id?: string;
};

/** The 7 agents: orbital pipeline (desktop), vertical pipeline (mobile). */
export function AgentsPipeline({ heading, variant = "compact", link, id }: AgentsPipelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const run = useLoop(ref);
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);

  useTicker(run && !touched, 3400, () => setActive((i) => (i + 1) % agents.list.length));

  const select = (name: string) => {
    const i = agents.list.findIndex((a) => a.name === name);
    if (i >= 0) {
      setActive(i);
      setTouched(true);
    }
  };
  const current = agents.list[active] ?? agents.list[0];

  return (
    <section id={id} className="relative overflow-hidden py-28 lg:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/3 size-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.681_0.147_238.6/0.14),transparent_60%)]"
      />
      <div ref={ref} data-run={run} className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader {...heading}>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">{agents.note}</p>
          </SectionHeader>
          {link && <MoreLink href={link.href} label={link.label} className="shrink-0" />}
        </div>

        <div className="mt-12 hidden items-center gap-10 lg:grid lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Orbital activeName={current?.name ?? ""} onSelect={select} />
          </div>
          <div className="lg:col-span-5">
            {current && <AgentPanel agent={current} index={active} />}
          </div>
        </div>

        <MobilePipeline activeName={current?.name ?? ""} onSelect={select} />

        {variant === "full" && <Roster />}
      </div>
    </section>
  );
}

function Orbital({ activeName, onSelect }: { activeName: string; onSelect: (n: string) => void }) {
  const orbitPaused = orbiters.some((o) => o.agent.name === activeName);
  return (
    <svg viewBox="0 0 640 560" className="w-full" role="group" aria-label="Pipeline des 7 agents">
      <defs>
        <linearGradient id="node-stroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.82 0.12 230)" />
          <stop offset="100%" stopColor="oklch(0.681 0.147 238.6 / 0.2)" />
        </linearGradient>
        <clipPath id="node-clip-lg">
          <circle r={NODE_R.lg - 2} />
        </clipPath>
        <clipPath id="node-clip-sm">
          <circle r={NODE_R.sm - 2} />
        </clipPath>
        <radialGradient id="core-glow">
          <stop offset="0%" stopColor="oklch(0.681 0.147 238.6 / 0.5)" />
          <stop offset="100%" stopColor="oklch(0.681 0.147 238.6 / 0)" />
        </radialGradient>
      </defs>

      {/* orbit ring + spokes */}
      <circle
        cx={CX}
        cy={CY}
        r={ORBIT_R}
        fill="none"
        stroke="oklch(0.681 0.147 238.6 / 0.18)"
        strokeDasharray="2 6"
      />
      <circle cx={CX} cy={CY} r={PIPE_R} fill="none" stroke="oklch(0.681 0.147 238.6 / 0.07)" />
      {pipeline.map((n) => (
        <line
          key={n.agent.name}
          x1={CX}
          y1={CY}
          x2={n.x}
          y2={n.y}
          stroke="oklch(0.681 0.147 238.6 / 0.1)"
          strokeDasharray="3 5"
        />
      ))}

      {/* pipeline connections + travelling pulses */}
      {pipeline.slice(1).map((n, i) => {
        const prev = pipeline[i];
        if (!prev) return null;
        return (
          <g key={n.agent.name}>
            <line
              x1={prev.x}
              y1={prev.y}
              x2={n.x}
              y2={n.y}
              stroke="oklch(0.681 0.147 238.6 / 0.35)"
              strokeWidth="1.5"
            />
            <circle
              r="5"
              className="animate-travel motion-hide"
              fill="oklch(0.85 0.1 230)"
              style={{
                ["--ax" as string]: `${prev.x}px`,
                ["--ay" as string]: `${prev.y}px`,
                ["--bx" as string]: `${n.x}px`,
                ["--by" as string]: `${n.y}px`,
                animationDelay: `${i}s`,
                filter: "drop-shadow(0 0 6px oklch(0.741 0.138 234.8))",
              }}
            />
          </g>
        );
      })}

      {/* core */}
      <circle cx={CX} cy={CY} r="90" fill="url(#core-glow)" />
      <image href={BRAND.emblem.src} x={CX - 46} y={CY - 46} width="92" height="92" />

      {pipeline.map((n, i) => (
        <Node
          key={n.agent.name}
          agent={n.agent}
          x={n.x}
          y={n.y}
          step={i + 1}
          active={activeName === n.agent.name}
          onSelect={onSelect}
        />
      ))}

      <g
        className="animate-orbit"
        style={{
          transformOrigin: `${CX}px ${CY}px`,
          transformBox: "view-box",
          animationPlayState: orbitPaused ? "paused" : undefined,
        }}
      >
        {orbiters.map((o) => (
          <g
            key={o.agent.name}
            className="animate-orbit-reverse"
            style={{
              transformOrigin: `${o.x}px ${o.y}px`,
              transformBox: "view-box",
              animationPlayState: orbitPaused ? "paused" : undefined,
            }}
          >
            <Node
              agent={o.agent}
              x={o.x}
              y={o.y}
              small
              active={activeName === o.agent.name}
              onSelect={onSelect}
            />
          </g>
        ))}
      </g>
    </svg>
  );
}

function Node({
  agent,
  x,
  y,
  step,
  small,
  active,
  onSelect,
}: {
  agent: Agent;
  x: number;
  y: number;
  step?: number;
  small?: boolean;
  active: boolean;
  onSelect: (n: string) => void;
}) {
  const r = small ? NODE_R.sm : NODE_R.lg;
  const img = agentImage(agent.name);
  // Full file drawn so the robot fills the ring.
  const thumbW = ((r - 2) * 2) / ROBOT_SPAN;
  const onKey = (e: KeyboardEvent<SVGGElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(agent.name);
    }
  };
  return (
    <g
      transform={`translate(${x} ${y})`}
      role="button"
      tabIndex={0}
      aria-pressed={active}
      aria-label={`${agent.name} — ${agent.role}`}
      onMouseEnter={() => onSelect(agent.name)}
      onFocus={() => onSelect(agent.name)}
      onClick={() => onSelect(agent.name)}
      onKeyDown={onKey}
      className="cursor-pointer outline-none [&:focus-visible_.node-ring]:stroke-[oklch(0.9_0.08_230)]"
    >
      <circle
        r={r + 14}
        fill="oklch(0.681 0.147 238.6 / 0.25)"
        style={{
          opacity: active ? 1 : 0,
          transform: active ? "scale(1)" : "scale(0.6)",
          transition: "opacity 300ms, transform 400ms cubic-bezier(0.22,1,0.36,1)",
          filter: "blur(8px)",
        }}
      />
      {/* ring + round thumbnail + step badge, floating gently */}
      <g className="animate-float" style={{ animationDelay: `${floatDelay(agent.name)}s` }}>
        <circle
          className="node-ring"
          r={r}
          fill="oklch(0.2 0.04 258.3)"
          stroke="url(#node-stroke)"
          strokeWidth={active ? 2 : 1}
        />
        {img && (
          <g clipPath={`url(#node-clip-${small ? "sm" : "lg"})`}>
            <image
              href={img.src}
              x={-thumbW * ROBOT_CX}
              y={-thumbW * ROBOT_CY}
              width={thumbW}
              height={thumbW}
              style={{
                transform: active ? "scale(1.12)" : "scale(1)",
                transformOrigin: "0px 0px",
                transition: "transform 400ms cubic-bezier(0.22,1,0.36,1)",
              }}
            />
          </g>
        )}
        <g transform={`translate(${r * 0.74} ${-r * 0.74})`}>
          <circle
            r={small ? 8 : 10}
            fill={active ? "oklch(0.681 0.147 238.6)" : "oklch(0.2 0.04 258.3)"}
            stroke="oklch(0.681 0.147 238.6 / 0.6)"
          />
          <text
            textAnchor="middle"
            dy="0.35em"
            className="font-mono"
            fontSize={small ? 7 : 8}
            fill={active ? "oklch(0.149 0.026 259.1)" : "oklch(0.741 0.138 234.8)"}
          >
            {step ? String(step).padStart(2, "0") : "∞"}
          </text>
        </g>
      </g>
      <text
        textAnchor="middle"
        y={r + 22}
        className="font-display"
        fontSize={small ? 13 : 15}
        fontWeight={600}
        fill={active ? "oklch(0.945 0.014 248)" : "oklch(0.715 0.042 248.4)"}
      >
        {agent.name}
      </text>
    </g>
  );
}

function AgentPanel({ agent, index }: { agent: Agent; index: number }) {
  const reduce = useReducedMotion();
  const img = agentImage(agent.name);
  return (
    <div
      className="border-light relative overflow-hidden rounded-3xl bg-navy/60 p-8"
      aria-live="polite"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={agent.name}
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="section-label">
                Agent {String(index + 1).padStart(2, "0")}/
                {String(agents.list.length).padStart(2, "0")}
              </p>
              <h3 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground">
                {agent.name}
              </h3>
              <p className="mt-1 font-mono text-sm text-primary">{agent.role}</p>
            </div>
            {img && (
              <MascotImage
                image={img}
                float
                floatDelay={floatDelay(agent.name)}
                sizes="160px"
                className="-my-6 -me-4 w-36 shrink-0 xl:w-40"
              />
            )}
          </div>
          <p className="mt-5 leading-relaxed text-muted-foreground">{agent.body}</p>
          <LogLine name={agent.name} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function LogLine({ name }: { name: string }) {
  return (
    <div className="mt-8 rounded-xl border border-border bg-background/70 p-3 font-mono text-xs">
      <p className="text-[9px] tracking-wider text-muted-foreground/70 uppercase">
        {agents.logLabel}
      </p>
      <p className="mt-1.5 text-foreground">
        <span className="text-success">›</span> {byName.get(name)?.log}
        <span className="animate-caret ms-1 inline-block h-3 w-1.5 translate-y-0.5 bg-primary" />
      </p>
    </div>
  );
}

/** Mobile: vertical pipeline with a pulse flowing down the line. */
function MobilePipeline({
  activeName,
  onSelect,
}: {
  activeName: string;
  onSelect: (n: string) => void;
}) {
  const ordered = [...pipeline.map((p) => p.agent), ...orbiters.map((o) => o.agent)];
  return (
    <ol className="relative mt-12 space-y-1 ps-10 lg:hidden">
      <span aria-hidden className="absolute inset-y-4 start-[15px] w-px overflow-hidden bg-border">
        <span
          className="animate-drop motion-hide absolute inset-x-0 top-0 h-full"
          style={{ ["--drop-distance" as string]: "100%" }}
        >
          <span className="absolute -start-[3px] top-0 size-[7px] rounded-full bg-primary-glow shadow-[0_0_10px_2px_oklch(0.741_0.138_234.8/0.8)]" />
        </span>
      </span>
      {ordered.map((a, i) => {
        const open = a.name === activeName;
        const isParallel = i >= pipeline.length;
        return (
          <li key={a.name}>
            {i === pipeline.length && (
              <p className="section-label -ms-10 pt-6 pb-2 ps-10 text-[10px]">
                {agents.parallelLabel}
              </p>
            )}
            <button
              type="button"
              onClick={() => onSelect(a.name)}
              aria-expanded={open}
              className="relative block w-full py-3 text-start"
            >
              <span
                aria-hidden
                className={cn(
                  "absolute top-[31px] -start-[29px] size-[9px] rounded-full ring-4 ring-background transition-colors",
                  open
                    ? "bg-primary-glow"
                    : isParallel
                      ? "bg-muted-foreground/40"
                      : "bg-primary/50",
                )}
              />
              <span className="flex items-center gap-3">
                <AgentThumb agent={a} size={48} active={open} />
                <span className="flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-0.5">
                  <span className="font-display text-xl font-semibold text-foreground">
                    {a.name}
                  </span>
                  <span className="font-mono text-xs text-primary">{a.role}</span>
                </span>
              </span>
              {open && (
                <span className="animate-fade-up block">
                  <span className="mt-2 block text-sm text-muted-foreground">{a.body}</span>
                  <span className="mt-3 block rounded-lg bg-background/70 p-2.5 font-mono text-[11px] text-foreground ring-1 ring-border">
                    <span className="text-success">›</span> {a.log}
                  </span>
                </span>
              )}
            </button>
          </li>
        );
      })}
    </ol>
  );
}

/** Round crop of an agent image centred on the robot; floats, grows when active. */
function AgentThumb({ agent, size, active }: { agent: Agent; size: number; active: boolean }) {
  const img = agentImage(agent.name);
  if (!img) return null;
  const w = size / ROBOT_SPAN;
  return (
    <span
      aria-hidden
      className="animate-float relative shrink-0 overflow-hidden rounded-full bg-navy ring-1 ring-primary/30"
      style={{ width: size, height: size, animationDelay: `${floatDelay(agent.name)}s` }}
    >
      <img
        src={img.src}
        width={img.width}
        height={img.height}
        alt=""
        loading="lazy"
        decoding="async"
        draggable={false}
        className={cn(
          "absolute max-w-none transition-transform duration-300",
          active && "scale-110",
        )}
        style={{
          width: w,
          height: w,
          left: size / 2 - w * ROBOT_CX,
          top: size / 2 - w * ROBOT_CY,
        }}
      />
    </span>
  );
}

/** Full roster: one row per agent — role, what it does, what it produces. */
function Roster() {
  const ordered = [...pipeline.map((p) => p.agent), ...orbiters.map((o) => o.agent)];
  const rosterImages = ordered.map((a) => agentImage(a.name));
  return (
    <ol className="mt-20 border-t border-border">
      {ordered.map((a, i) => (
        <li
          key={a.name}
          className="group grid gap-3 border-b border-border py-7 transition-colors hover:bg-primary/[0.03] md:grid-cols-[112px_1.1fr_1.4fr_1.4fr] md:items-center md:gap-8 md:px-2"
        >
          <div className="flex items-center gap-4 md:contents">
            <div className="relative w-20 shrink-0 transition-transform duration-300 group-hover:scale-105 md:w-28">
              {rosterImages[i] && (
                <MascotImage
                  image={rosterImages[i]}
                  float
                  floatDelay={floatDelay(a.name)}
                  sizes="112px"
                  className="w-full"
                />
              )}
              <span className="absolute top-0 start-0 font-mono text-xs text-primary">
                {i < pipeline.length ? String(i + 1).padStart(2, "0") : "∞"}
              </span>
            </div>
            <div>
              <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground">
                {a.name}
              </h3>
              <p className="mt-1 font-mono text-xs text-primary">{a.role}</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">{a.body}</p>
          <p className="text-sm leading-relaxed text-foreground/90">
            <span className="mb-1 block font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
              {agents.outputLabel}
            </span>
            {a.output}
          </p>
        </li>
      ))}
    </ol>
  );
}
