export default function Layout({
    children,
  }: Readonly<{ children: React.ReactNode }>) {
    return (
      <main className="font-outfit">
        {children}
      </main>
    );
  }
  