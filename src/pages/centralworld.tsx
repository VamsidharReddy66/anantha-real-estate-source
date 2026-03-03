import { useEffect, useState } from 'react';
import { Helmet } from "react-helmet-async";
import { Button } from '@/components/ui/button';
import { Phone, MapPin, Award, Users, Home as HomeIcon, Zap } from 'lucide-react';

/**
 * Design Philosophy: Sophisticated Luxury Minimalism
 * - Premium real estate demands understated elegance through careful typography and spacing
 * - Asymmetric layouts with strategic whitespace guide user attention
 * - Warm gold accents (#d4a574) with deep navy foundation (#1a2332)
 * - Serif headlines (Playfair Display) paired with clean sans-serif body (Poppins)
 */

export default function CentralWorld() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [animateCounters, setAnimateCounters] = useState(false);

  useEffect(() => {
  document.title =
    "Central World Nellore | 125 Acres Premium Township | Anantha Real Estate";

  const metaDescription = document.querySelector(
    "meta[name='description']"
  );

  if (metaDescription) {
    metaDescription.setAttribute(
      "content",
      "Central World is a 125-acre premium township in Nellore with 31,000 sq ft clubhouse. NUDA & RERA approved. Book your site visit today."
    );
  }
}, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
    <Helmet>
      <title>
        Central World Nellore | 125 Acres Premium Township | Anantha Real Estate
      </title>

      <meta
        name="description"
        content="Central World is a 125-acre premium township in Nellore with 31,000 sq ft clubhouse. NUDA & RERA approved. Book your site visit today."
      />

      <link
        rel="canonical"
        href="https://www.anantharealestate.in/centralworld"
      />
    </Helmet>

    <div className="min-h-screen bg-white text-foreground">
      {/* NAVIGATION */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
        <div className="container flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-accent to-secondary rounded-lg flex items-center justify-center">
              <HomeIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-lg text-foreground">CENTRAL WORLD</div>
              <div className="text-xs text-muted-foreground">By Green Home</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:+919391675372" className="hidden md:flex items-center gap-2 text-foreground hover:text-accent transition-colors">
              <Phone className="w-5 h-5" />
              <span className="font-medium">93916 75372</span>
            </a>
            <Button className="btn-premium">Book Site Visit</Button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="relative pt-20 pb-20 md:pt-32 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663391327299/ezyUrnvCDk6bwBeavQtnC9/hero-township-aerial-dgMKxYh3fwo5fy9XupPNnh.webp"
            alt="Central World Township"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
        </div>

        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="reveal">
                <div className="inline-block px-4 py-2 bg-accent/10 rounded-full mb-4">
                  <span className="text-accent font-semibold text-sm">NUDA & RERA Approved • NMC Limits</span>
                </div>
                <h1 className="text-white">
                  <em className="text-accent">Central</em><br />
                  <strong>World</strong>
                </h1>
              </div>

              <div className="reveal delay-1">
                <p className="text-xl text-white/90 font-medium">Premium Township by Green Home Developers</p>
              </div>

              <div className="reveal delay-2">
                <p className="text-lg text-white/80 leading-relaxed">
                  125 acres of masterplanned living at Kanaparthi Padu, Nellore. A landmark 31,000 sq ft clubhouse. International schools at your doorstep. Where visionaries choose to invest.
                </p>
              </div>

              <div className="reveal delay-3 flex flex-wrap gap-3">
                <div className="px-4 py-2 bg-white/10 backdrop-blur rounded-lg text-white text-sm font-medium">
                  🏘️ 125 Acres
                </div>
                <div className="px-4 py-2 bg-white/10 backdrop-blur rounded-lg text-white text-sm font-medium">
                  🏆 31K Sq Ft Club
                </div>
                <div className="px-4 py-2 bg-white/10 backdrop-blur rounded-lg text-white text-sm font-medium">
                  🛣️ 4-Lane Highway
                </div>
              </div>

              <div className="reveal delay-4 flex flex-wrap gap-4 pt-4">
                <Button className="btn-premium">Download Brochure</Button>
                <a href="https://wa.me/916302966604" target="_blank" rel="noopener noreferrer">
                  <Button className="btn-outline-premium">💬 WhatsApp</Button>
                </a>
              </div>
            </div>

            <div className="hidden lg:grid grid-cols-1 gap-4 reveal delay-4">
              <div className="stat-card">
                <div className="stat-value">125</div>
                <div className="stat-label">Acres Township</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">31K</div>
                <div className="stat-label">Sq Ft Clubhouse</div>
              </div>
              <div className="stat-card bg-accent/5 border-accent/30">
                <div className="text-sm font-semibold text-accent mb-2">Marketed By</div>
                <div className="text-lg font-bold text-foreground">Anantha Real Estate</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* QUICK STATS */}
      <section className="bg-gradient-to-r from-foreground to-foreground/90 text-white py-16">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">125</div>
              <div className="text-sm md:text-base text-white/80">Acres Township</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">31K</div>
              <div className="text-sm md:text-base text-white/80">Sq Ft Clubhouse</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">600+</div>
              <div className="text-sm md:text-base text-white/80">Premium Plots</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">15+</div>
              <div className="text-sm md:text-base text-white/80">Years Legacy</div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="section-spacing">
        <div className="container">
          <div className="mb-12">
            <div className="inline-block px-4 py-2 bg-accent/10 rounded-full mb-4">
              <span className="text-accent font-semibold text-sm">About Central World</span>
            </div>
            <h2 className="text-4xl md:text-5xl">
              Nellore's <em>Most Prestigious</em><br />
              Township Address
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <p className="text-lg text-foreground/80 leading-relaxed">
                Central World is a 125-acre masterplanned township by Green Home Developers, strategically located at Kanaparthi Padu, Nellore. Designed for those who demand the finest in modern living.
              </p>
              <p className="text-lg text-foreground/80 leading-relaxed">
                A landmark 31,000 sq ft clubhouse featuring a function hall, coffee shop, gymnasium, and swimming pool. Fully approved by NUDA & RERA, and incorporated within NMC limits.
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                    <Award className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Clear Title</div>
                    <div className="text-sm text-muted-foreground">Zero disputes</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Bank Approved</div>
                    <div className="text-sm text-muted-foreground">All leading banks</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Vastu Compliant</div>
                    <div className="text-sm text-muted-foreground">Perfect orientation</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                    <Users className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Wide Roads</div>
                    <div className="text-sm text-muted-foreground">Fully motorable BT</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663391327299/ezyUrnvCDk6bwBeavQtnC9/entrance-gateway-ks4yPE96hAb7UAgFqhQqzJ.webp"
                alt="Grand Entrance"
                className="rounded-xl shadow-lg hover-lift"
              />
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663391327299/ezyUrnvCDk6bwBeavQtnC9/clubhouse-luxury-bvkgioVZmLV4ZoS5BxBLHS.webp"
                  alt="Clubhouse"
                  className="rounded-xl shadow-lg hover-lift"
                />
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663391327299/ezyUrnvCDk6bwBeavQtnC9/amenities-lifestyle-jCTWKcEkwkTfynPRnjviA9.webp"
                  alt="Amenities"
                  className="rounded-xl shadow-lg hover-lift"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AMENITIES SECTION */}
      <section className="section-spacing bg-muted/50">
        <div className="container">
          <div className="mb-12">
            <div className="inline-block px-4 py-2 bg-accent/10 rounded-full mb-4">
              <span className="text-accent font-semibold text-sm">World Class Amenities</span>
            </div>
            <h2 className="text-4xl md:text-5xl">
              31,000 Sq Ft of <em>Pure</em><br />
              Luxury Amenities
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🎭', title: 'Function Hall', desc: 'Events & celebrations' },
              { icon: '☕', title: 'Coffee Shop', desc: 'Premium lounge' },
              { icon: '🏋️', title: 'Gymnasium', desc: 'State-of-the-art fitness' },
              { icon: '🏊', title: 'Swimming Pool', desc: 'Leisure & lap pool' },
              { icon: '🎓', title: 'Global Schools', desc: 'Education nearby' },
              { icon: '👮', title: '24x7 Security', desc: 'Guards & CCTV' },
              { icon: '💧', title: 'Water Tank', desc: 'Continuous supply' },
              { icon: '☀️', title: 'Solar Lighting', desc: 'Avenues illuminated' },
            ].map((amenity, idx) => (
              <div key={idx} className="feature-item hover-lift">
                <div className="text-4xl mb-4">{amenity.icon}</div>
                <h3 className="feature-title">{amenity.title}</h3>
                <p className="feature-description">{amenity.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section className="section-spacing">
        <div className="container">
          <div className="mb-12">
            <div className="inline-block px-4 py-2 bg-accent/10 rounded-full mb-4">
              <span className="text-accent font-semibold text-sm">Site Gallery</span>
            </div>
            <h2 className="text-4xl md:text-5xl mb-4">
              See <em>Central World</em><br />
              As It Stands Today
            </h2>
            <p className="text-lg text-muted-foreground">Real photos. Real progress. The actual project you're investing in.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 rounded-xl overflow-hidden shadow-lg hover-lift">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663391327299/ezyUrnvCDk6bwBeavQtnC9/hero-township-aerial-dgMKxYh3fwo5fy9XupPNnh.webp"
                alt="Aerial View"
                className="w-full h-80 object-cover"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg hover-lift">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663391327299/ezyUrnvCDk6bwBeavQtnC9/township-evening-b2agdpwW66W62rKASntCEc.webp"
                alt="Evening View"
                className="w-full h-80 object-cover"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg hover-lift">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663391327299/ezyUrnvCDk6bwBeavQtnC9/clubhouse-luxury-bvkgioVZmLV4ZoS5BxBLHS.webp"
                alt="Clubhouse"
                className="w-full h-80 object-cover"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg hover-lift">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663391327299/ezyUrnvCDk6bwBeavQtnC9/amenities-lifestyle-jCTWKcEkwkTfynPRnjviA9.webp"
                alt="Amenities"
                className="w-full h-80 object-cover"
              />
            </div>
            <div className="lg:col-span-2 rounded-xl overflow-hidden shadow-lg hover-lift">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663391327299/ezyUrnvCDk6bwBeavQtnC9/entrance-gateway-ks4yPE96hAb7UAgFqhQqzJ.webp"
                alt="Entrance"
                className="w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* LOCATION SECTION */}
      <section className="section-spacing bg-foreground text-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-accent/20 rounded-full mb-4">
                <span className="text-accent font-semibold text-sm">Prime Location</span>
              </div>
              <h2 className="text-4xl md:text-5xl text-white mb-6">
                Strategically Located<br />
                <em className="text-accent">In Nellore's Heart</em>
              </h2>
              <p className="text-lg text-white/80 mb-6 leading-relaxed">
                Kanaparthi Padu, Nellore - a location that combines accessibility with exclusivity. Close to international schools, shopping centers, and major highways.
              </p>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="text-accent font-bold">✓</span>
                  <span>4-Lane Highway to Sarvepally</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">✓</span>
                  <span>International Schools Nearby</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">✓</span>
                  <span>Shopping & Entertainment Hub</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">✓</span>
                  <span>NMC Limits - Best Infrastructure</span>
                </li>
              </ul>
            </div>
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663391327299/ezyUrnvCDk6bwBeavQtnC9/township-evening-b2agdpwW66W62rKASntCEc.webp"
                alt="Location"
                className="w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="section-spacing bg-gradient-to-r from-accent to-secondary">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl text-white mb-6">
            Ready to Invest in<br />
            Your Dream Home?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied investors who have chosen Central World as their premium investment destination.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="px-8 py-3 bg-white text-accent hover:bg-white/90 font-semibold rounded-lg">
              Download Brochure
            </Button>
            <a href="tel:+919391675372">
              <Button className="px-8 py-3 border-2 border-white text-white hover:bg-white/10 font-semibold rounded-lg">
                📞 Call Now
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-foreground text-white py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="font-bold text-lg mb-2">CENTRAL WORLD</div>
              <p className="text-white/70 text-sm">Premium Township by Green Home Developers</p>
            </div>
            <div>
              <div className="font-semibold mb-4">Quick Links</div>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#" className="hover:text-accent transition-colors">About</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Amenities</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Gallery</a></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold mb-4">Contact</div>
              <p className="text-white/70 text-sm mb-2">📞 93916 75372</p>
              <p className="text-white/70 text-sm">📍 Kanaparthi Padu, Nellore</p>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-white/60 text-sm">
            <p>&copy; 2026 Central World. All rights reserved. | Marketed by Anantha Real Estate</p>
          </div>
        </div>
      </footer>
    </div>
      </>
  );
}
