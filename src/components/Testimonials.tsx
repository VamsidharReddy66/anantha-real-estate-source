import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "RAVITEJA CHITTETI",
      role: "Home Buyer",
      content: "From childhood we have a dream to buy a house. But after visiting Anantha Real Estate Consultancy my dream came true.",
      rating: 5,
    },
    {
      id: 2,
      name: "Moni Swahith",
      role: "Property Investor",
      content: "If you are looking for properties and don't know how to identify good opportunities, this consultancy helps you understand what to look for.",
      rating: 5,
    },
    {
      id: 3,
      name: "Rammohan Rao",
      role: "Home Buyer",
      content: "Good experience.",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-[0.75fr_1.25fr] gap-10 lg:gap-20">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-primary-foreground/60 mb-5">Client feedback</p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold leading-[1.1] max-w-lg">
              The relationship matters as much as the transaction.
            </h2>
          </div>

          <div className="border-t border-primary-foreground/20">
            {testimonials.map((testimonial) => (
              <article key={testimonial.id} className="py-7 md:py-8 border-b border-primary-foreground/20">
                <div className="flex gap-1 text-accent mb-4" aria-label={`${testimonial.rating} out of 5 stars`}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-current" />
                  ))}
                </div>
                <blockquote className="font-display text-xl md:text-2xl leading-relaxed text-primary-foreground/95 max-w-3xl">
                  “{testimonial.content}”
                </blockquote>
                <div className="mt-5 flex items-center gap-3 text-sm">
                  <span className="font-medium">{testimonial.name}</span>
                  <span className="text-primary-foreground/45">—</span>
                  <span className="text-primary-foreground/60">{testimonial.role}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
