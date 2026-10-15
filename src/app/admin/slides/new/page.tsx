import { builtinChoices } from "../builtins";
import { SlideForm } from "../SlideForm";

export default function NewSlidePage() {
  return (
    <>
      <h1 className="text-3xl text-foreground md:text-4xl">
        Add <span className="text-brand">Slide</span>
      </h1>
      <SlideForm slide={null} builtins={builtinChoices()} />
    </>
  );
}
