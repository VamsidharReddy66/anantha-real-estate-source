export const stockImages = {
  villa: "https://images.pexels.com/photos/29334668/pexels-photo-29334668.png?auto=compress&cs=tinysrgb&w=1600",
  villaPool: "https://images.pexels.com/photos/34378030/pexels-photo-34378030.jpeg?auto=compress&cs=tinysrgb&w=1600",
  apartment: "https://images.pexels.com/photos/18362805/pexels-photo-18362805.jpeg?auto=compress&cs=tinysrgb&w=1600",
  commercial: "https://images.pexels.com/photos/11176809/pexels-photo-11176809.jpeg?auto=compress&cs=tinysrgb&w=1600",
  land: "https://images.pexels.com/photos/3030296/pexels-photo-3030296.jpeg?auto=compress&cs=tinysrgb&w=1600",
  consultation: "https://images.pexels.com/photos/7641869/pexels-photo-7641869.jpeg?auto=compress&cs=tinysrgb&w=1600",
} as const;

export const propertyFallbackImage = (type?: string) => {
  switch (type) {
    case "apartments":
      return stockImages.apartment;
    case "commercial":
      return stockImages.commercial;
    case "land":
    case "plots":
      return stockImages.land;
    case "villas":
      return stockImages.villa;
    default:
      return stockImages.villaPool;
  }
};
