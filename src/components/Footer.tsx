
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/3 mb-8 md:mb-0">
            <div className="flex items-center mb-4">
              <i className="fas fa-tooth text-3xl text-dental-secondary ml-3"></i>
              <h2 className="text-2xl font-bold">عيادة جذور لطب الأسنان</h2>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              نقدم أفضل خدمات طب الأسنان في العيزرية بأيدي أمهر الأطباء وأحدث التقنيات 
              لنمنحك ابتسامة جميلة تدوم مدى الحياة.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-dental-primary transition duration-300">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-green-600 transition duration-300">
                <i className="fab fa-whatsapp"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition duration-300">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          
          <div className="w-full md:w-1/3 mb-8 md:mb-0">
            <h3 className="text-xl font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition duration-300">الرئيسية</Link>
              </li>
              <li>
                <Link to="/appointments" className="text-gray-400 hover:text-white transition duration-300">المواعيد</Link>
              </li>
              <li>
                <Link to="/new-appointment" className="text-gray-400 hover:text-white transition duration-300">حجز موعد</Link>
              </li>
            </ul>
          </div>
          
          <div className="w-full md:w-1/3">
            <h3 className="text-xl font-bold mb-4">معلومات الاتصال</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt text-dental-secondary text-lg mt-1 ml-3"></i>
                <span className="text-gray-400">العيزرية، بجانب مديرية الصحة، القدس، فلسطين</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-phone-alt text-dental-secondary text-lg mt-1 ml-3"></i>
                <span className="text-gray-400">0597145474</span>
              </li>
              <li className="flex items-start">
                <i className="far fa-clock text-dental-secondary text-lg mt-1 ml-3"></i>
                <span className="text-gray-400">الأحد - الخميس: 9:00 صباحاً - 6:00 مساءً</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-envelope text-dental-secondary text-lg mt-1 ml-3"></i>
                <span className="text-gray-400">100ggking@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-500">جميع الحقوق محفوظة &copy; {new Date().getFullYear()} - عيادة جذور لطب الأسنان</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
