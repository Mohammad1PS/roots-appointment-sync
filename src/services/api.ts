
import { toast } from "@/components/ui/use-toast";
import emailjs from 'emailjs-com';

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

// مفاتيح EmailJS - يجب تغييرها بالقيم الخاصة بك
const EMAILJS_SERVICE_ID = "service_id"; // قم بتغيير هذا برقم الخدمة الخاصة بك
const EMAILJS_TEMPLATE_ID = "template_id"; // قم بتغيير هذا برقم القالب الخاص بك
const EMAILJS_USER_ID = "user_id"; // قم بتغيير هذا برقم المستخدم الخاص بك

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
    
    // إرسال إشعار بالبريد الإلكتروني (حقيقي)
    sendEmailNotification(newAppointment).then(() => {
      toast({
        title: "تم تسجيل الموعد بنجاح",
        description: `تم إرسال تفاصيل الموعد إلى ${GMAIL_EMAIL}`,
      });
    }).catch(() => {
      toast({
        variant: "destructive",
        title: "تنبيه",
        description: "تم حفظ الموعد ولكن فشل إرسال البريد الإلكتروني. سنقوم بالتواصل معك قريبًا."
      });
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
      
      // إرسال تنبيه بالبريد الإلكتروني عن تغيير الحالة
      const updatedAppointment = appointments[appointmentIndex];
      const statusNote = `تم تغيير حالة الموعد إلى ${getStatusInArabic(status)}`;
      sendStatusUpdateEmail(updatedAppointment, statusNote);
      
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
    const appointment = appointments.find(app => app.id === id);
    const filteredAppointments = appointments.filter(app => app.id !== id);
    
    if (appointments.length !== filteredAppointments.length && appointment) {
      saveAppointments(filteredAppointments);
      
      // إرسال إشعار حذف بالبريد الإلكتروني
      sendDeletionEmail(appointment);
      
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

// تنسيق الموعد للعرض
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

// إرسال إشعار بالبريد الإلكتروني لموعد جديد
export const sendEmailNotification = (appointment: Appointment): Promise<boolean> => {
  // تحضير معلومات البريد الإلكتروني
  const emailParams = {
    to_email: GMAIL_EMAIL,
    to_name: "مسؤول العيادة",
    from_name: "نظام المواعيد - عيادة جذور",
    subject: "موعد جديد في العيادة",
    message: formatAppointmentForEmail(appointment),
    client_name: appointment.name,
    client_phone: appointment.phone,
    appointment_date: formatDate(appointment.date),
    appointment_time: appointment.time,
    appointment_service: getServiceName(appointment.service),
    appointment_notes: appointment.notes || 'لا يوجد',
  };

  console.log("جاري محاولة إرسال بريد إلكتروني:", emailParams);
  
  // في الوضع التجريبي أو إذا لم تكن مفاتيح EmailJS متوفرة، نستخدم المحاكاة
  if (
    EMAILJS_SERVICE_ID === "service_id" || 
    EMAILJS_TEMPLATE_ID === "template_id" || 
    EMAILJS_USER_ID === "user_id"
  ) {
    console.log("تم استخدام محاكاة إرسال البريد الإلكتروني لأن مفاتيح EmailJS غير متوفرة");
    console.log("محاكاة إرسال بريد إلكتروني إلى", GMAIL_EMAIL);
    console.log(formatAppointmentForEmail(appointment));
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 1500);
    });
  }

  // استخدام EmailJS لإرسال بريد إلكتروني حقيقي
  return emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    emailParams,
    EMAILJS_USER_ID
  ).then(() => {
    console.log("تم إرسال البريد الإلكتروني بنجاح");
    return true;
  }).catch((error) => {
    console.error("خطأ في إرسال البريد الإلكتروني:", error);
    throw error;
  });
};

// إرسال بريد إلكتروني لتحديث حالة الموعد
export const sendStatusUpdateEmail = (appointment: Appointment, statusNote: string): Promise<boolean> => {
  // تحضير معلومات تحديث الحالة
  const emailParams = {
    to_email: GMAIL_EMAIL,
    to_name: "مسؤول العيادة",
    from_name: "نظام المواعيد - عيادة جذور",
    subject: "تحديث حالة موعد",
    message: `
      تحديث حالة موعد في عيادة جذور لطب الأسنان
      ----------------------------------
      الاسم: ${appointment.name}
      رقم الهاتف: ${appointment.phone}
      التاريخ: ${formatDate(appointment.date)}
      الوقت: ${appointment.time}
      الخدمة: ${getServiceName(appointment.service)}
      التحديث: ${statusNote}
      ----------------------------------
    `,
    client_name: appointment.name,
    client_phone: appointment.phone,
    appointment_date: formatDate(appointment.date),
    appointment_time: appointment.time,
    appointment_service: getServiceName(appointment.service),
    status_update: statusNote,
  };

  // نفس المنطق السابق للإرسال
  return simulateOrSendEmail(emailParams);
};

// إرسال بريد إلكتروني لحذف موعد
export const sendDeletionEmail = (appointment: Appointment): Promise<boolean> => {
  // تحضير معلومات الحذف
  const emailParams = {
    to_email: GMAIL_EMAIL,
    to_name: "مسؤول العيادة",
    from_name: "نظام المواعيد - عيادة جذور",
    subject: "تم حذف موعد",
    message: `
      تم حذف موعد في عيادة جذور لطب الأسنان
      ----------------------------------
      الاسم: ${appointment.name}
      رقم الهاتف: ${appointment.phone}
      التاريخ: ${formatDate(appointment.date)}
      الوقت: ${appointment.time}
      الخدمة: ${getServiceName(appointment.service)}
      ----------------------------------
    `,
    client_name: appointment.name,
    client_phone: appointment.phone,
    appointment_date: formatDate(appointment.date),
    appointment_time: appointment.time,
    appointment_service: getServiceName(appointment.service),
  };

  // نفس المنطق السابق للإرسال
  return simulateOrSendEmail(emailParams);
};

// دالة مساعدة للتبديل بين المحاكاة والإرسال الحقيقي
const simulateOrSendEmail = (emailParams: Record<string, string>): Promise<boolean> => {
  // إذا كانت مفاتيح EmailJS غير متوفرة، استخدم المحاكاة
  if (
    EMAILJS_SERVICE_ID === "service_id" || 
    EMAILJS_TEMPLATE_ID === "template_id" || 
    EMAILJS_USER_ID === "user_id"
  ) {
    console.log("تم استخدام محاكاة إرسال البريد الإلكتروني لأن مفاتيح EmailJS غير متوفرة");
    console.log("محاكاة إرسال بريد إلكتروني إلى", GMAIL_EMAIL);
    console.log(emailParams.message);
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 1500);
    });
  }

  // استخدام EmailJS لإرسال بريد إلكتروني حقيقي
  return emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    emailParams,
    EMAILJS_USER_ID
  ).then(() => {
    console.log("تم إرسال البريد الإلكتروني بنجاح");
    return true;
  }).catch((error) => {
    console.error("خطأ في إرسال البريد الإلكتروني:", error);
    throw error;
  });
};

