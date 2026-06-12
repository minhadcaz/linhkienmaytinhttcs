import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

// Định nghĩa kiểu dữ liệu cho User dựa theo CSDL của bạn
interface User {
  idusers: string;
  username: string;
  email: string;
  khachhang?: any;
}

// Định nghĩa các giá trị mà Context sẽ cung cấp
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (token: string, userData: User) => void;
  logout: () => void;
}

// Khởi tạo Context với giá trị mặc định
export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
});

// Tạo Provider để bọc ứng dụng
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  // Tự động kiểm tra trạng thái đăng nhập khi người dùng (F5) reload lại trang
  useEffect(() => {
    const checkAuth = async () => {
      // Lấy token từ localStorage (phương pháp lưu token theo bài giảng)
      const token = localStorage.getItem("access_token");

      if (token) {
        try {
          // Nếu có token, gọi API lên backend để lấy lại thông tin user
          const response = await axios.get(
            "http://localhost:8080/api/auth/me",
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );

          setUser(response.data.user);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Token hết hạn hoặc không hợp lệ", error);
          logout(); // Xóa phiên đăng nhập nếu lỗi
        }
      }
    };

    checkAuth();
  }, []);

  // Hàm gọi khi đăng nhập thành công
  const login = (token: string, userData: User) => {
    localStorage.setItem("access_token", token); // Lưu token vào trình duyệt
    setUser(userData);
    setIsAuthenticated(true);
  };

  // Hàm gọi khi đăng xuất
  const logout = () => {
    localStorage.removeItem("access_token"); // Xóa token
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
