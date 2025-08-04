export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container-wrapper">
      <div className="container py-3">
        <section className="overflow-hidden rounded-[0.5rem] border bg-background shadow">
          {children}
        </section>
      </div>
    </div>
  );
}
