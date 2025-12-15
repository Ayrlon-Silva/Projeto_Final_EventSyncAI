export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function formatPrice(price: number): string {
  if (price === 0) return "Gratuito"
  return price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
}
