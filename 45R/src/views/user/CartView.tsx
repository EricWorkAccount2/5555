import { type ImageCell } from '@/core';
import { useUserContext } from '@/hooks/useUserContext';

const parsePrice = (text?: string) => {
  if (!text) return 0;
  const match = text.match(/\$(\d+(?:\.\d+)?)/);
  return match ? Number(match[1]) : 0;
};

const formatPrice = (value: number) => `$${value.toFixed(2)}`;

export const CartView = () => {
  const { cart, toggleCart } = useUserContext();
  const items = Array.from(cart.values());
  const total = items.reduce((sum, item) => sum + parsePrice(item.secondaryText) * 1.13, 0);

  return (
    <section className="mx-auto max-w-4xl space-y-5 p-5">
      <h1 className="text-3xl font-bold">Cart</h1>

      {items.length === 0 ? (
        <p className="mt-10 text-gray-400">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item: ImageCell) => {
              const itemPrice = parsePrice(item.secondaryText);
              const itemTotal = itemPrice * 1.13;

              return (
                <div
                  key={item.id}
                  className="flex items-center gap-4 rounded-xl border border-gray-800 bg-gray-900 px-4 py-4"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.primaryText ?? 'Cart item'}
                    className="h-28 w-20 rounded-lg object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-white">{item.primaryText}</p>
                    {item.secondaryText && (
                      <p className="truncate text-sm text-gray-400">{item.secondaryText}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-white">{formatPrice(itemTotal)}</p>
                    <p className="text-xs text-gray-400">incl. 13% tax</p>
                  </div>
                  <button
                    onClick={() => toggleCart(item)}
                    className="rounded bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-500"
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-900 px-4 py-4 text-right">
            <p className="text-sm text-gray-400">Total (incl. 13% tax)</p>
            <p className="text-2xl font-bold text-white">{formatPrice(total)}</p>
          </div>
        </>
      )}
    </section>
  );
};
