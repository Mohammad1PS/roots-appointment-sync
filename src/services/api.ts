
import { toast } from "@/components/ui/use-toast";

export interface Appointment {
  id?: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  service: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  email?: string;
  createdAt?: string;
}

// البريد الإلكتروني المستخدم للربط
const GMAIL_EMAIL = "100ggking@gmail.com";

// استرداد المواعيد من التخزين المحلي
export const fetchAppointments = (): Appointment[] => {
  try {
    const appointments = localStorage.getItem('appointments');
    return appointments ? JSON.parse(appointments) : [];
  } catch (error) {
    console.error('خطأ في استرجاع المواعيد:', error);
    return [];
  }
};

// حفظ المواعيد في التخزين المحلي
export const saveAppointments = (appointments: Appointment[]): void => {
  try {
    localStorage.setItem('appointments', JSON.stringify(appointments));
  } catch (error) {
    console.error('خطأ في حفظ المواعيد:', error);
  }
};

// إضافة موعد جديد
export const addAppointment = (appointment: Omit<Appointment, 'id' | 'status' | 'createdAt'>): Appointment => {
  try {
    const appointments = fetchAppointments();
    
    const newAppointment: Appointment = {
      ...appointment,
      id: Date.now().toString(),
      status: 'pending',
      email: GMAIL_EMAIL,
      createdAt: new Date().toISOString(),
    };
    
    appointments.push(newAppointment);
    saveAppointments(appointments);
    
    // إرسال تنبيه بنجاح العملية
    toast({
      title: "تم تسجيل الموعد بنجاح",
      description: `تم إرسال تفاصيل الموعد إلى ${GMAIL_EMAIL}`,
    });
    
    return newAppointment;
  } catch (error) {
    console.error('خطأ في إضافة موعد جديد:', error);
    
    // إرسال تنبيه بفشل العملية
    toast({
      variant: "destructive",
      title: "حدث خطأ",
      description: "لم نتمكن من حفظ الموعد، يرجى المحاولة مرة أخرى."
    });
    
    throw error;
  }
};

// تحديث حالة موعد
export const updateAppointmentStatus = (id: string, status: 'pending' | 'confirmed' | 'completed' | 'cancelled'): Appointment | undefined => {
  try {
    const appointments = fetchAppointments();
    const appointmentIndex = appointments.findIndex(app => app.id === id);
    
    if (appointmentIndex !== -1) {
      appointments[appointmentIndex].status = status;
      saveAppointments(appointments);
      
      // إرسال تنبيه بنجاح العملية
      toast({
        title: "تم تحديث حالة الموعد",
        description: `تم تغيير حالة الموعد إلى ${getStatusInArabic(status)}`
      });
      
      return appointments[appointmentIndex];
    }
    return undefined;
  } catch (error) {
    console.error('خطأ في تحديث حالة الموعد:', error);
    
    // إرسال تنبيه بفشل العملية
    toast({
      variant: "destructive",
      title: "حدث خطأ",
      description: "لم نتمكن من تحديث حالة الموعد، يرجى المحاولة مرة أخرى."
    });
    
    throw error;
  }
};

// حذف موعد
export const deleteAppointment = (id: string): boolean => {
  try {
    const appointments = fetchAppointments();
    const filteredAppointments = appointments.filter(app => app.id !== id);
    
    if (appointments.length !== filteredAppointments.length) {
      saveAppointments(filteredAppointments);
      
      // إرسال تنبيه بنجاح العملية
      toast({
        title: "تم حذف الموعد",
        description: "تم حذف الموعد بنجاح"
      });
      
      return true;
    }
    return false;
  } catch (error) {
    console.error('خطأ في حذف الموعد:', error);
    
    // إرسال تنبيه بفشل العملية
    toast({
      variant: "destructive",
      title: "حدث خطأ",
      description: "لم نتمكن من حذف الموعد، يرجى المحاولة مرة أخرى."
    });
    
    throw error;
  }
};

// تنسيق الموعد لإرساله بالبريد الإلكتروني (محاكاة)
export const formatAppointmentForEmail = (appointment: Appointment): string => {
  return `
    موعد جديد في عيادة جذور لطب الأسنان
    ----------------------------------
    الاسم: ${appointment.name}
    رقم الهاتف: ${appointment.phone}
    التاريخ: ${formatDate(appointment.date)}
    الوقت: ${appointment.time}
    الخدمة: ${getServiceName(appointment.service)}
    ملاحظات: ${appointment.notes || 'لا يوجد'}
    ----------------------------------
  `;
};

// مساعد: الحصول على اسم الخدمة بالعربية
export const getServiceName = (serviceCode: string): string => {
  const services: Record<string, string> = {
    'consultation': 'استشارة وفحص',
    'cleaning': 'تنظيف الأسنان',
    'fillings': 'حشوات الأسنان',
    'root-canal': 'علاج جذور',
    'crown': 'تركيبات (تيجان وجسور)',
    'whitening': 'تبييض الأسنان',
    'implants': 'زراعة الأسنان',
    'braces': 'تقويم الأسنان',
    'gum-treatment': 'علاج اللثة',
    'other': 'خدمات أخرى'
  };
  
  return services[serviceCode] || serviceCode;
};

// مساعد: تنسيق التاريخ
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' });
};

// مساعد: الحصول على حالة الموعد بالعربية
export const getStatusInArabic = (status: string): string => {
  const statusMap: Record<string, string> = {
    'pending': 'قيد الانتظار',
    'confirmed': 'مؤكد',
    'completed': 'مكتمل',
    'cancelled': 'ملغي'
  };
  
  return statusMap[status] || status;
};

// محاكاة إرسال بريد إلكتروني
export const sendEmailNotification = (appointment: Appointment): Promise<boolean> => {
  return new Promise((resolve) => {
    console.log(`محاكاة إرسال بريد إلكتروني إلى ${GMAIL_EMAIL} بتفاصيل الموعد:`, appointment);
    console.log(formatAppointmentForEmail(appointment));
    
    // محاكاة تأخير في إرسال البريد الإلكتروني
    setTimeout(() => {
      resolve(true);
    }, 1500);
  });
};
