export interface Review {
  quote: string;
  author: string;
  client: string;
  metric: string;
}

export const REVIEWS: Review[] = [
  {
    quote: "A Vexyn não entrega apenas código; eles codificam a intenção do negócio.",
    author: "Ricardo Menezes",
    client: "Fintech Nexus",
    metric: "2024 // 01"
  },
  {
    quote: "Performance que se destaca no mercado. O resultado final é simplesmente arte em movimento.",
    author: "Juliana Costa",
    client: "TechFlow",
    metric: "2024 // 02"
  },
  {
    quote: "O processo foi transparente e a infraestrutura arquitetônica que a Vexyn construiu é de outro nível.",
    author: "Marcos Oliveira",
    client: "Bloom Digital",
    metric: "2024 // 03"
  },
  {
    quote: "Surgical approach to UI/UX. The level of detail in their components is unmatched in the industry.",
    author: "Sarah Jenkins",
    client: "Nexus Global",
    metric: "2024 // 04"
  }
];
