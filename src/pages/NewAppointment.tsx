
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppointmentForm from '@/components/AppointmentForm';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

const NewAppointment = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">حجز موعد جديد</h1>
          <div className="w-24 h-1 bg-dental-primary mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
            يمكنك حجز موعد جديد في عيادة جذور لطب الأسنان من خلال ملء النموذج التالي.
            سيتم إرسال تفاصيل الموعد إلى البريد الإلكتروني 100ggking@gmail.com
          </p>
          <Alert className="max-w-2xl mx-auto mb-6 bg-blue-50 text-blue-800 border-blue-200">
            <InfoIcon className="h-4 w-4 ml-2" />
            <AlertTitle>إعداد البريد الإلكتروني</AlertTitle>
            <AlertDescription>
              <p>لتفعيل إرسال البريد الإلكتروني الحقيقي، يجب إعداد حساب على <a href="https://www.emailjs.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">EmailJS</a> وتحديث مفاتيح الاتصال في ملف <code>src/services/api.ts</code>:</p>
              <ul className="list-disc list-inside mt-2">
                <li>EMAILJS_SERVICE_ID</li>
                <li>EMAILJS_TEMPLATE_ID</li>
                <li>EMAILJS_USER_ID</li>
              </ul>
            </AlertDescription>
          </Alert>
        </div>
        
        <AppointmentForm />
      </main>
      
      <Footer />
    </div>
  );
};

export default NewAppointment;
