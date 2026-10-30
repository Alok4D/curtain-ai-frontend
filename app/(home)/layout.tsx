import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex flex-col w-full overflow-x-hidden">
      <Navbar />
      <div className="flex-1 w-full">{children}</div>
      <Footer />
    </div>
  );
}

