import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SchemesDashboard } from "@/components/schemes-dashboard";

export default function SchemesPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Government Schemes & Subsidies
          </h1>
          <p className="text-muted-foreground">
            Access and apply for agricultural schemes and subsidies from central
            and state governments
          </p>
        </div>
        <SchemesDashboard />
      </div>
      <Footer />
    </main>
  );
}
