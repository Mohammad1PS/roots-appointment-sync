
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppointmentForm from '@/components/AppointmentForm';

const NewAppointment = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">حجز موعد جديد</h1>
          <div className="w-24 h-1 bg-dental-primary mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
            يمكنك حجز موعد جديد في عيادة جذور لطب الأسنان من خلال ملء النموذج التالي.
            سيتم إرسال تفاصيل الموعد إلى البريد الإلكتروني 100ggking@gmail.com
          </p>
        </div>
        
        <AppointmentForm />
      </main>
      
      <Footer />
    </div>
  );
};

export default NewAppointment;
