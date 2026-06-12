import React, { createContext, useState, useContext, ReactNode } from "react";

// Định nghĩa kiểu dữ liệu cho Sản phẩm trong giỏ
export interface CartItem {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number | null;
  quantity: number;
}

// Định nghĩa các hàm có trong Context
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, delta: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Hàm Thêm vào giỏ (Mô phỏng logic Upsert của Backend)
  const addToCart = (product: Omit<CartItem, "quantity">) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        // Nếu đã có, tăng số lượng
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      // Nếu chưa có, thêm mới với quantity = 1
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + delta;
          return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
        }
        return item;
      }),
    );
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook tùy chỉnh để sử dụng dễ dàng hơn
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart phải được bọc bên trong CartProvider");
  return context;
};
