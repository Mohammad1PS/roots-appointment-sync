
import React, { useState } from 'react';
import { addAppointment, sendEmailNotification } from '@/services/api';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const AppointmentForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    service: '',
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.date || !formData.time || !formData.service) {
      toast({
        variant: "destructive",
        title: "خطأ في النموذج",
        description: "يرجى ملء جميع الحقول المطلوبة"
      });
      return;
    }
    
    try {
      setLoading(true);
      
      const newAppointment = addAppointment(formData);
      
      // محاكاة إرسال بريد إلكتروني
      await sendEmailNotification(newAppointment);
      
      toast({
        title: "تم حجز الموعد بنجاح",
        description: "سنقوم بالتواصل معك قريبًا لتأكيد موعدك"
      });
      
      // توجيه المستخدم إلى صفحة قائمة المواعيد
      navigate('/appointments');
    } catch (error) {
      console.error('خطأ في إرسال نموذج الموعد:', error);
      toast({
        variant: "destructive",
        title: "حدث خطأ",
        description: "لم نتمكن من حفظ الموعد، يرجى المحاولة مرة أخرى."
      });
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <Card className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">الاسم الكامل</label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">رقم الهاتف</label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="w-full"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="date" className="block text-gray-700 font-medium mb-2">تاريخ الموعد</label>
              <Input
                id="date"
                name="date"
                type="date"
                min={today}
                value={formData.date}
                onChange={handleChange}
                className="w-full"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="time" className="block text-gray-700 font-medium mb-2">وقت الموعد</label>
              <Select
                value={formData.time}
                onValueChange={(value) => handleSelectChange('time', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="اختر الوقت المناسب" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="09:00">09:00 صباحاً</SelectItem>
                  <SelectItem value="10:00">10:00 صباحاً</SelectItem>
                  <SelectItem value="11:00">11:00 صباحاً</SelectItem>
                  <SelectItem value="12:00">12:00 ظهراً</SelectItem>
                  <SelectItem value="13:00">01:00 مساءً</SelectItem>
                  <SelectItem value="14:00">02:00 مساءً</SelectItem>
                  <SelectItem value="15:00">03:00 مساءً</SelectItem>
                  <SelectItem value="16:00">04:00 مساءً</SelectItem>
                  <SelectItem value="17:00">05:00 مساءً</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="service" className="block text-gray-700 font-medium mb-2">نوع الخدمة</label>
            <Select
              value={formData.service}
              onValueChange={(value) => handleSelectChange('service', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="اختر الخدمة المطلوبة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="consultation">استشارة وفحص</SelectItem>
                <SelectItem value="cleaning">تنظيف الأسنان</SelectItem>
                <SelectItem value="fillings">حشوات الأسنان</SelectItem>
                <SelectItem value="root-canal">علاج جذور</SelectItem>
                <SelectItem value="crown">تركيبات (تيجان وجسور)</SelectItem>
                <SelectItem value="whitening">تبييض الأسنان</SelectItem>
                <SelectItem value="implants">زراعة الأسنان</SelectItem>
                <SelectItem value="braces">تقويم الأسنان</SelectItem>
                <SelectItem value="gum-treatment">علاج اللثة</SelectItem>
                <SelectItem value="other">خدمات أخرى</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="notes" className="block text-gray-700 font-medium mb-2">ملاحظات إضافية</label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full"
              rows={3}
            />
          </div>
          
          <div>
            <Button
              type="submit"
              className="w-full gradient-bg text-white font-bold py-3 px-6 rounded-md hover:opacity-90 transition duration-300"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center">
                  <i className="fas fa-spinner fa-spin ml-2"></i>
                  جاري الحجز...
                </span>
              ) : (
                'تأكيد الحجز'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AppointmentForm;
