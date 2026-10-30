import { useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BRAND } from "@/components/brand/Logo";
import { useLoop, useTicker } from "@/components/fx/hooks";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { agents } from "@/content/home";
import { cn } from "@/lib/utils";

type Agent = (typeof agents.list)[number];

const CX = 320;
const CY = 290;
const PIPE_R = 215;
const ORBIT_R = 118;
/** Pipeline nodes sweep over the top arc, left to right (degrees, SVG y-down). */
const PIPE_ANGLES = [160, 215, 270, 325, 20];

const byName = new Map(agents.list.map((a) => [a.name, a]));
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

export function Agents() {
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
    <section id={agents.id} className="relative overflow-hidden py-28 lg:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/3 size-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.681_0.147_238.6/0.14),transparent_60%)]"
      />
      <div ref={ref} data-run={run} className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
        <SectionHeader
          index={agents.index}
          label={agents.label}
          title={agents.title}
          highlight={agents.highlight}
        >
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">{agents.note}</p>
        </SectionHeader>

        <div className="mt-12 hidden items-center gap-10 lg:grid lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Orbital activeName={current?.name ?? ""} onSelect={select} />
          </div>
          <div className="lg:col-span-5">
            {current && <AgentPanel agent={current} index={active} />}
          </div>
        </div>

        <MobilePipeline activeName={current?.name ?? ""} onSelect={select} />
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
  const r = small ? 22 : 30;
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
      className="cursor-pointer outline-none [&:focus-visible>circle:nth-child(2)]:stroke-[oklch(0.9_0.08_230)]"
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
      <circle
        r={r}
        fill="oklch(0.2 0.04 258.3)"
        stroke="url(#node-stroke)"
        strokeWidth={active ? 2 : 1}
      />
      <text
        textAnchor="middle"
        dy="0.35em"
        className="font-mono"
        fontSize={small ? 10 : 12}
        fill={active ? "oklch(0.945 0.014 248)" : "oklch(0.741 0.138 234.8)"}
      >
        {step ? String(step).padStart(2, "0") : "∞"}
      </text>
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
          <p className="section-label">
            Agent {String(index + 1).padStart(2, "0")}/{String(agents.list.length).padStart(2, "0")}
          </p>
          <h3 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground">
            {agent.name}
          </h3>
          <p className="mt-1 font-mono text-sm text-primary">{agent.role}</p>
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
        <span className="text-success">›</span> {agents.logs[name]}
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
                  "absolute top-[18px] -start-[29px] size-[9px] rounded-full ring-4 ring-background transition-colors",
                  open
                    ? "bg-primary-glow"
                    : isParallel
                      ? "bg-muted-foreground/40"
                      : "bg-primary/50",
                )}
              />
              <span className="flex items-baseline gap-3">
                <span className="font-display text-xl font-semibold text-foreground">{a.name}</span>
                <span className="font-mono text-xs text-primary">{a.role}</span>
              </span>
              {open && (
                <span className="animate-fade-up block">
                  <span className="mt-2 block text-sm text-muted-foreground">{a.body}</span>
                  <span className="mt-3 block rounded-lg bg-background/70 p-2.5 font-mono text-[11px] text-foreground ring-1 ring-border">
                    <span className="text-success">›</span> {agents.logs[a.name]}
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
