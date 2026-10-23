import { PageShell } from "@/components/layout/PageShell";
import { Contact, Frictions, Hero, Method, Projects, Solutions } from "@/components/sections/HomeSections";

export default function Home() {
  return <PageShell><Hero /><Frictions /><Solutions /><Projects /><Method /><Contact /></PageShell>;
}
