
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppointmentForm from '@/components/AppointmentForm';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section id="home" className="gradient-bg py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 text-white text-center md:text-right">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">ابتسامة جميلة تدوم مدى الحياة</h1>
              <p className="text-xl mb-6">نقدم أفضل خدمات طب الأسنان في العيزرية والقدس بأيدي أمهر الأطباء وأحدث التقنيات</p>
              <a href="#appointment" className="inline-block bg-white text-blue-600 font-bold py-3 px-6 rounded-full hover:bg-gray-100 transition duration-300">احجز موعدك الآن</a>
            </div>
            <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
              <div className="rounded-full bg-white p-6 shadow-xl">
                <i className="fas fa-tooth text-blue-600 text-9xl"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">من نحن</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">عيادة جذور لطب الأسنان - مركز متخصص لجميع خدمات طب الأسنان في العيزرية</p>
          </div>
          
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 pr-0 md:pr-10 mb-8 md:mb-0">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">عيادة جذور لطب الأسنان</h3>
              <p className="text-lg text-gray-600 mb-4">تأسست عيادة جذور لطب الأسنان بهدف تقديم أفضل خدمات طب الأسنان في العيزرية والقدس. نسعى لخدمة مرضانا بتوفير رعاية متميزة باستخدام أحدث التقنيات والمعدات الطبية.</p>
              <p className="text-lg text-gray-600 mb-4">فريق عملنا من أطباء متخصصين ذوي خبرة عالية في مختلف مجالات طب الأسنان، يقدمون أفضل خدمة للمرضى في بيئة مريحة وودية.</p>
            </div>
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">لماذا تختار عيادة جذور؟</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 text-xl mt-1 ml-3"></i>
                  <span className="text-lg text-gray-600">نقدم خدمات طبية شاملة لجميع مشاكل الأسنان</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 text-xl mt-1 ml-3"></i>
                  <span className="text-lg text-gray-600">أسعار مناسبة وخيارات دفع متعددة</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 text-xl mt-1 ml-3"></i>
                  <span className="text-lg text-gray-600">عروض وتخفيضات دورية على الخدمات المختلفة</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 text-xl mt-1 ml-3"></i>
                  <span className="text-lg text-gray-600">أحدث التقنيات في مجال علاجات الأسنان التجميلية</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">خدماتنا</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">نقدم مجموعة شاملة من خدمات طب الأسنان العلاجية والوقائية والتجميلية</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="service-card bg-white rounded-lg shadow-md p-6 transition duration-300">
              <div className="w-16 h-16 gradient-bg rounded-lg flex items-center justify-center service-icon mb-4">
                <i className="fas fa-search-plus text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">الفحص والتشخيص</h3>
              <p className="text-gray-600 mb-4">فحص شامل للأسنان وتقييم صحة الفم واللثة وتشخيص المشكلات باستخدام أحدث التقنيات والأجهزة.</p>
            </div>
            
            {/* Service 2 */}
            <div className="service-card bg-white rounded-lg shadow-md p-6 transition duration-300">
              <div className="w-16 h-16 gradient-bg rounded-lg flex items-center justify-center service-icon mb-4">
                <i className="fas fa-teeth text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">علاج تسوس الأسنان</h3>
              <p className="text-gray-600 mb-4">معالجة تسوس الأسنان بطرق حديثة وتقنيات متطورة لضمان نتائج فعالة.</p>
            </div>
            
            {/* Service 3 */}
            <div className="service-card bg-white rounded-lg shadow-md p-6 transition duration-300">
              <div className="w-16 h-16 gradient-bg rounded-lg flex items-center justify-center service-icon mb-4">
                <i className="fas fa-crown text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">تركيبات الأسنان</h3>
              <p className="text-gray-600 mb-4">تركيبات أسنان متنوعة تجمع بين الوظيفة والجمال لاستعادة مظهر أسنانك.</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Link to="/appointments" className="inline-block gradient-bg text-white font-bold py-3 px-6 rounded-md hover:opacity-90 transition duration-300">
              عرض كل المواعيد
            </Link>
          </div>
        </div>
      </section>

      {/* Appointment Section */}
      <section id="appointment" className="py-16 gradient-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">حجز موعد</h2>
            <div className="w-24 h-1 bg-white mx-auto mb-6"></div>
            <p className="text-xl text-white max-w-3xl mx-auto">
              يمكنكم حجز موعد بسهولة من خلال النموذج التالي.
              سيتم إرسال تفاصيل الموعد إلى البريد الإلكتروني 100ggking@gmail.com
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
            <AppointmentForm />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">اتصل بنا</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">يمكنكم التواصل معنا مباشرة أو زيارتنا في العيادة</p>
          </div>
          
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <div className="bg-gray-50 p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">معلومات الاتصال</h3>
                
                <div className="flex items-start mb-6">
                  <div className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center ml-4 flex-shrink-0">
                    <i className="fas fa-map-marker-alt text-white text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-800 mb-1">العنوان</h4>
                    <p className="text-gray-600">العيزرية، بجانب مديرية الصحة، القدس، فلسطين</p>
                  </div>
                </div>
                
                <div className="flex items-start mb-6">
                  <div className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center ml-4 flex-shrink-0">
                    <i className="fas fa-phone-alt text-white text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-800 mb-1">رقم الهاتف</h4>
                    <p className="text-gray-600">0597145474</p>
                  </div>
                </div>
                
                <div className="flex items-start mb-6">
                  <div className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center ml-4 flex-shrink-0">
                    <i className="far fa-clock text-white text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-800 mb-1">ساعات العمل</h4>
                    <p className="text-gray-600">الأحد - الخميس: 9:00 صباحاً - 6:00 مساءً</p>
                    <p className="text-gray-600">السبت: 10:00 صباحاً - 4:00 مساءً</p>
                    <p className="text-gray-600">الجمعة: مغلق</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center ml-4 flex-shrink-0">
                    <i className="fas fa-envelope text-white text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-800 mb-1">البريد الإلكتروني</h4>
                    <p className="text-gray-600">100ggking@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2 md:pr-0 md:pl-8">
              <div className="bg-gray-50 p-8 rounded-lg shadow-md h-full">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">روابط سريعة</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link to="/" className="bg-white p-4 rounded-md shadow-sm flex items-center hover:shadow-md transition duration-300">
                    <i className="fas fa-home text-dental-primary ml-3"></i>
                    <span>الصفحة الرئيسية</span>
                  </Link>
                  <Link to="/appointments" className="bg-white p-4 rounded-md shadow-sm flex items-center hover:shadow-md transition duration-300">
                    <i className="fas fa-calendar text-dental-primary ml-3"></i>
                    <span>قائمة المواعيد</span>
                  </Link>
                  <Link to="/new-appointment" className="bg-white p-4 rounded-md shadow-sm flex items-center hover:shadow-md transition duration-300">
                    <i className="fas fa-calendar-plus text-dental-primary ml-3"></i>
                    <span>حجز موعد جديد</span>
                  </Link>
                  <a href="#services" className="bg-white p-4 rounded-md shadow-sm flex items-center hover:shadow-md transition duration-300">
                    <i className="fas fa-tooth text-dental-primary ml-3"></i>
                    <span>خدماتنا</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
