import Index from "@/components/landing-page";

export default function Home() {
  return (
    <div className="container-wrapper">
      <div className="container py-3">
        <section className="overflow-hidden rounded-[0.5rem] border bg-background shadow">
          <Index />
        </section>
      </div>
    </div>
  );
}
