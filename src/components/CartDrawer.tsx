import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { formatPrice, generateWhatsAppCartLink } from "@/lib/whatsapp";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Trash2, Loader2 } from "lucide-react"; // Import Loader2
import { useSettings } from '@/hooks/useSettings'; // Import useSettings

export function CartDrawer({ children }: { children: React.ReactNode }) {
  const { items, removeFromCart, updateQuantity, clearCart } = useCart();
  const { data: settings, isLoading: settingsLoading, isError: settingsError } = useSettings(); // Fetch settings
  const whatsappNumber = settings?.whatsapp_number || ''; // Default to empty string

  const total = items.reduce(
    (sum, item) => sum + (item.promo_price || item.price) * item.quantity,
    0
  );

  const handleValidation = () => {
    clearCart();
  }

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] flex flex-col">
        <SheetHeader>
          <SheetTitle>Votre Panier</SheetTitle>
        </SheetHeader>
        {items.length > 0 ? (
          <>
            <ScrollArea className="flex-grow pr-6 -mr-6 my-4">
              <div className="flex flex-col gap-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <img
                      src={item.image_url || "/placeholder.svg"}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-grow">
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {formatPrice(item.promo_price || item.price)}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => {
                            const quantity = parseInt(e.target.value);
                            if (quantity > 0) {
                              updateQuantity(item.id, quantity)
                            }
                          }}
                          className="w-16 text-center bg-transparent border rounded-md"
                        />
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <SheetFooter className="mt-auto pt-6">
                <div className="w-full">
                    <div className="flex justify-between items-center font-bold text-lg mb-4">
                        <span>Total</span>
                        <span>{formatPrice(total)}</span>
                    </div>
                    {settingsLoading ? (
                        <Button className="w-full" size="lg" disabled>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Chargement...
                        </Button>
                    ) : settingsError || !whatsappNumber ? (
                        <Button className="w-full" size="lg" disabled>
                            <MessageCircle className="w-5 h-5 mr-2" />
                            WhatsApp non disponible
                        </Button>
                    ) : (
                        <SheetClose asChild>
                            <a 
                                href={generateWhatsAppCartLink(whatsappNumber, items, total)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block"
                                onClick={handleValidation}
                            >
                                <Button className="w-full bg-primary hover:bg-[#22c55e] text-white" size="lg">
                                    <MessageCircle className="w-5 h-5 mr-2" />
                                    Valider via WhatsApp
                                </Button>
                            </a>
                        </SheetClose>
                    )}
                </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center text-center">
            <p className="text-muted-foreground">Votre panier est vide.</p>
            <SheetClose asChild>
              <Button variant="outline" className="mt-4">
                Continuer les achats
              </Button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
