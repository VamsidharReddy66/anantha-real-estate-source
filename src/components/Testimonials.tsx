import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "RAVITEJA CHITTETI",
      role: "Home Buyer",
      content:
        "From childhood we have a dream to buy a house. But after visiting Antha real-estate consultancy my dream came true which fulfilled my dreams.",
      rating: 5,
    },
    {
      id: 2,
      name: "Moni Swahith",
      role: "Property Investor",
      content:
        "If you are looking for the properties, and if you don't know how to identify the best properties which will grow in future, this real-estate consultancy really helps you to find it. Definitely give it a try.",
      rating: 5,
    },
    {
      id: 3,
      name: "Rammohan Rao",
      role: "Home Buyer",
      content: "Quiet Good.",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-24 bg-primary">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent font-medium text-sm tracking-wider uppercase mb-4 block">
            Testimonials
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            What Our Clients
            <span className="text-accent block">Say About Us</span>
          </h2>
          <p className="text-primary-foreground/70 text-lg font-body">
            Don't just take our word for it – hear from some of our satisfied clients.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-card rounded-2xl p-8 relative group hover:shadow-elevated transition-all duration-500 hover:-translate-y-1 flex flex-col justify-between"
              style={{ minHeight: "360px" }} // ensures nice spacing
            >
              {/* Quote icon */}
              <Quote
                className="text-accent/20 absolute top-6 right-6"
                size={48}
              />

              {/* TOP — Rating */}
              <div>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="fill-accent text-accent"
                      size={18}
                    />
                  ))}
                </div>

                {/* MIDDLE — Review Text */}
                <p className="text-muted-foreground font-body leading-relaxed mb-6">
                  "{testimonial.content}"
                </p>
              </div>

              {/* BOTTOM — Profile Section */}
              <div className="flex items-center gap-4 mt-auto pt-4">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="font-display font-bold text-accent text-lg">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>

                <div>
                  <h4 className="font-display font-semibold text-foreground">
                    {testimonial.name}
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    {testimonial.role}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
