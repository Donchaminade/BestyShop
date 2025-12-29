import { Product } from '@/types/product';
import { CartItem } from '@/hooks/useCart';

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'decimal',
    minimumFractionDigits: 0,
  }).format(price) + ' FCFA';
}

export function generateWhatsAppLink(whatsappNumber: string, product: Product): string {
  const price = product.promo_active && product.promo_price 
    ? product.promo_price 
    : product.price;
  
  const message = encodeURIComponent(
    `🏆 Bonjour! Je suis intéressé(e) par:\n\n` +
    `📦 *${product.name}*\n` +
    `💰 Prix: ${formatPrice(price)}\n\n` +
    `Pouvez-vous me donner plus d'informations?`
  );
  
  return `https://wa.me/${whatsappNumber}?text=${message}`;
}

export function generateWhatsAppCartLink(whatsappNumber: string, items: CartItem[], total: number): string {
  const header = `🎉 *Nouvelle Commande BESTYSHOP* 🎉\n\nBonjour! Je souhaite valider ma commande:\n\n`;
  
  const itemsList = items.map(item => 
    `*${item.name}*\n` +
    `  - Quantité: ${item.quantity}\n` +
    `  - Prix unitaire: ${formatPrice(item.promo_price || item.price)}\n`
  ).join('\n');

  const footer = `\n----------------------\n` +
                 `*Total de la commande: ${formatPrice(total)}*\n\n` +
                 `Merci de confirmer la disponibilité et la livraison.`;

  const message = encodeURIComponent(header + itemsList + footer);

  return `https://wa.me/${whatsappNumber}?text=${message}`;
}
