import { notFound } from "next/navigation";

import { parseId } from "@/lib/api/server";
import { builtinChoices } from "../builtins";
import { EditSlide } from "./EditSlide";

export default async function EditSlidePage({ params }: { params: Promise<{ id: string }> }) {
  const id = parseId((await params).id);
  if (id === null) notFound();

  return (
    <>
      <h1 className="text-3xl text-foreground md:text-4xl">
        Edit <span className="text-brand">Slide</span>
      </h1>
      <EditSlide id={id} builtins={builtinChoices()} />
    </>
  );
}
