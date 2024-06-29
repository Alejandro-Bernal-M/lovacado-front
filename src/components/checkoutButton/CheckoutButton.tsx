import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { clearCart, clearCartDB  } from "@/lib/features/cart/cartSlice";
import apiEndPoints from "@/utils/routes";

export default function CheckoutButton(){
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.cart);

  const handleCheckout = async () => {
    console.log('Checkout button clicked');
    console.log(items)
    let productsToCheckout = items.map((item) => {
      return {
        _id: item._id,
        quantity: item.quantity,
      }
    });
    try {
      const response = await fetch(apiEndPoints.checkoutSession, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({items: productsToCheckout}),
      });
      if(response.status === 200){
        const result = await response.json();
        console.log('result', result);
        window.location.href = result.session.url;
      }else {
        console.log('error', response)
      }

    } catch (error) {
      console.error(error);
    };
  }
  return (
    <button className="checkout-button" onClick={handleCheckout} >
      Checkout
    </button>
  )
}