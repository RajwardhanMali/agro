import { Button } from "@/components/ui/button";
import { getServerUser } from "@/lib/session";
import Link from "next/link";

export async function HeroSection() {
  const user = await getServerUser();
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-yellow-50 dark:from-green-950 dark:to-yellow-950 -z-10" />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
              Empowering Indian Farmers with Digital Solutions
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              A unified platform connecting farmers to markets, resources, and
              support systems to enhance agricultural productivity and income.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              {!user ? (
                <Button size="lg" asChild>
                  <Link href="/register">Get Started</Link>
                </Button>
              ) : (
                <Button asChild>
                  <Link href="/marketplace">Market Place</Link>
                </Button>
              )}
              <Button size="lg" variant="outline" asChild>
                <Link href="/insights">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-yellow-500/20 z-10" />
            <img
              src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Indian farmers using digital technology"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
