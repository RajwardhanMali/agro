import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-muted py-12 mt-auto">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">KisaanSaathi</h3>
            <p className="text-sm text-muted-foreground">
              Empowering Indian farmers with digital solutions to enhance
              agricultural productivity and income.
            </p>
          </div>
          <div>
            <h4 className="text-base font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-base font-medium mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/market"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Market Prices
                </Link>
              </li>
              <li>
                <Link
                  href="/weather"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Weather Advisory
                </Link>
              </li>
              <li>
                <Link
                  href="/schemes"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Government Schemes
                </Link>
              </li>
              <li>
                <Link
                  href="/marketplace"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Marketplace
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-base font-medium mb-4">Contact</h4>
            <address className="not-italic text-sm text-muted-foreground space-y-2">
              <p>KisaanSaathi Headquarters</p>
              <p>123 Rural Innovation Hub</p>
              <p>New Delhi, India</p>
              <p className="mt-4">
                <a
                  href="mailto:info@KisaanSaathi.in"
                  className="hover:text-foreground"
                >
                  info@KisaanSaathi.in
                </a>
              </p>
              <p>
                <a href="tel:+911234567890" className="hover:text-foreground">
                  +91 123 456 7890
                </a>
              </p>
            </address>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} KisaanSaathi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
