
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 خطأ: المستخدم حاول الوصول إلى مسار غير موجود:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-dental-primary mb-4">404</h1>
        <p className="text-2xl text-gray-600 mb-8">عذرًا، الصفحة غير موجودة</p>
        <Link to="/">
          <Button className="gradient-bg hover:opacity-90 text-lg px-6 py-3">
            <i className="fas fa-home ml-2"></i>
            العودة إلى الصفحة الرئيسية
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
