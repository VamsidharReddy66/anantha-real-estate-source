import React from "react";
import { ArrowRight, BadgeCheck, CalendarCheck, MapPin, Ruler } from "lucide-react";
import { Link } from "react-router-dom";
import type { Property } from "@/data/properties";

const formatStatus = (status: Property["status"]) =>
  status.replace("-", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());

const formatDate = (date?: string) => {
  if (!date) return undefined;
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return undefined;
  return parsed.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
};

const PropertyListingCard: React.FC<{ property: Property }> = ({ property }) => {
  const verificationDate = formatDate(property.lastVerifiedAt);

  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm hover:shadow-elevated transition-shadow">
      <div className="relative aspect-[16/9] bg-gradient-to-br from-brand-dark to-brand-purple overflow-hidden">
        {property.image ? (
          <img
            src={property.image}
            alt={property.imageAlt || `${property.name} in ${property.location}`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : null}
        <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/60 to-transparent">
          <div className="flex w-full items-center justify-between gap-3">
            <span className="rounded-full bg-background/95 px-3 py-1 text-xs font-semibold capitalize text-foreground">
              {formatStatus(property.status)}
            </span>
            {property.verified && (
              <span className="inline-flex items-center gap-1 rounded-full bg-background/95 px-3 py-1 text-xs font-semibold text-foreground">
                <BadgeCheck size={14} className="text-accent" /> Listing details checked
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin size={15} /> {property.location}, {property.city}
        </div>
        <h2 className="font-display text-2xl font-bold mt-3">{property.name}</h2>
        <p className="text-muted-foreground mt-2 line-clamp-2">{property.shortDescription}</p>

        <div className="grid grid-cols-2 gap-3 mt-5 text-sm">
          {property.area && (
            <div className="rounded-xl bg-muted/50 p-3">
              <span className="block text-muted-foreground">Area</span>
              <span className="font-semibold inline-flex items-center gap-1 mt-1">
                <Ruler size={14} /> {property.area}
              </span>
            </div>
          )}
          {property.priceLabel && (
            <div className="rounded-xl bg-muted/50 p-3">
              <span className="block text-muted-foreground">Price</span>
              <span className="font-semibold mt-1 block">{property.priceLabel}</span>
            </div>
          )}
        </div>

        {property.projectName && (
          <p className="text-sm text-muted-foreground mt-4">
            Project: <span className="font-medium text-foreground">{property.projectName}</span>
          </p>
        )}

        {verificationDate && (
          <p className="mt-3 inline-flex items-center gap-2 text-xs text-muted-foreground">
            <CalendarCheck size={14} /> Listing details checked {verificationDate}
          </p>
        )}

        <Link to={`/property/${property.slug}`} className="mt-6 inline-flex items-center gap-2 font-semibold text-accent hover:underline">
          View property <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
};

export default PropertyListingCard;
