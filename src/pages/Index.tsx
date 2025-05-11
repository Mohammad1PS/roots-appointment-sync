
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DashboardOverview from '@/components/DashboardOverview';
import AppointmentList from '@/components/AppointmentList';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">لوحة تحكم المواعيد</h1>
          <p className="text-lg text-gray-600 mb-8">
            مرحبًا بك في نظام إدارة مواعيد عيادة جذور لطب الأسنان. هنا يمكنك متابعة جميع المواعيد المرتبطة بالبريد الإلكتروني
            <span className="font-bold text-dental-primary"> 100ggking@gmail.com</span>
          </p>
          
          <DashboardOverview />
        </div>
        
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">آخر المواعيد</h2>
          <AppointmentList />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
