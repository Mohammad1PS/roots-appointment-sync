
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppointmentList from '@/components/AppointmentList';

const Appointments = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">إدارة المواعيد</h1>
          <p className="text-lg text-gray-600 mb-8">
            قائمة كاملة بجميع مواعيد عيادة جذور لطب الأسنان المرتبطة بالبريد الإلكتروني
            <span className="font-bold text-dental-primary"> 100ggking@gmail.com</span>
          </p>
        </div>
        
        <AppointmentList />
      </main>
      
      <Footer />
    </div>
  );
};

export default Appointments;
