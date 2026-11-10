import { HeroWindow, type HeroData } from "@/components/sections/Hero";
import { MascotImage } from "@/components/shared/Mascot";
import { Reveal } from "@/components/shared/Reveal";
import { botImages } from "@/config/images";

type AgentAtWorkProps = {
  /** Same data as the hero: the window replays the agent reading a tender. */
  hero: HeroData;
  line: string;
};

/**
 * The "after" to the Problem's "before": the waving agent, one short line, and
 * the animated product window (moved here from the hero, where the duo
 * illustration now lives).
 */
export function AgentAtWork({ hero, line }: AgentAtWorkProps) {
  return (
    <div className="mx-auto mt-14 grid w-full max-w-7xl items-center gap-10 px-4 sm:px-6 lg:mt-20 lg:grid-cols-12 lg:gap-12">
      <Reveal className="flex items-center gap-4 sm:gap-6 lg:col-span-5 lg:flex-col lg:items-start">
        <MascotImage
          image={botImages.salut}
          float
          sizes="(min-width: 1024px) 208px, 128px"
          className="w-28 shrink-0 sm:w-36 lg:-ms-6 lg:w-52"
        />
        <p className="font-display text-2xl leading-tight font-semibold tracking-tight text-balance text-foreground sm:text-3xl lg:text-4xl">
          {line}
        </p>
      </Reveal>
      <div className="lg:col-span-7">
        <HeroWindow hero={hero} />
      </div>
    </div>
  );
}
