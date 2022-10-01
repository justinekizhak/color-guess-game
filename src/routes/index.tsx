import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import ColorGuess from "~/components/color-guess";

export default component$(() => {
  return <ColorGuess />;
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
};
