
import React, { useState, useEffect } from 'react';
import { Appointment, fetchAppointments, updateAppointmentStatus, deleteAppointment, sendEmailNotification, getStatusInArabic, getServiceName, formatDate } from '@/services/api';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";

const AppointmentList = () => {
  const { toast } = useToast();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string | null>(null);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = () => {
    try {
      const data = fetchAppointments();
      // ترتيب المواعيد حسب التاريخ (الأحدث أولاً)
      const sortedAppointments = [...data].sort((a, b) => 
        new Date(b.date + 'T' + b.time).getTime() - new Date(a.date + 'T' + a.time).getTime()
      );
      setAppointments(sortedAppointments);
    } catch (error) {
      console.error('خطأ في تحميل المواعيد:', error);
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "لم نتمكن من تحميل المواعيد"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, status: 'pending' | 'confirmed' | 'completed' | 'cancelled') => {
    try {
      const updatedAppointment = updateAppointmentStatus(id, status);
      if (updatedAppointment) {
        // تحديث حالة المواعيد في واجهة المستخدم
        setAppointments(prev => prev.map(app => app.id === id ? { ...app, status } : app));
        
        // محاكاة إرسال بريد إلكتروني بالتحديث
        await sendEmailNotification({
          ...updatedAppointment,
          notes: `تم تغيير حالة الموعد إلى ${getStatusInArabic(status)}`
        });
      }
    } catch (error) {
      console.error('خطأ في تغيير حالة الموعد:', error);
    }
  };

  const openDeleteDialog = (id: string) => {
    setSelectedAppointmentId(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedAppointmentId) {
      try {
        const success = deleteAppointment(selectedAppointmentId);
        if (success) {
          setAppointments(prev => prev.filter(app => app.id !== selectedAppointmentId));
        }
      } catch (error) {
        console.error('خطأ في حذف الموعد:', error);
      } finally {
        setDeleteDialogOpen(false);
        setSelectedAppointmentId(null);
      }
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="flex flex-col items-center">
          <i className="fas fa-spinner fa-spin text-4xl text-dental-primary mb-4"></i>
          <span className="text-xl">جاري تحميل المواعيد...</span>
        </div>
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="py-8">
          <div className="text-center">
            <i className="fas fa-calendar-times text-5xl text-gray-400 mb-4"></i>
            <h3 className="text-2xl text-gray-600 mb-2">لا توجد مواعيد</h3>
            <p className="text-gray-500 mb-6">لم يتم العثور على أي مواعيد مسجلة.</p>
            <Button 
              onClick={() => window.location.href = '/new-appointment'}
              className="gradient-bg hover:opacity-90"
            >
              حجز موعد جديد
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6 w-full">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold">قائمة المواعيد</CardTitle>
            <Button 
              onClick={() => window.location.href = '/new-appointment'} 
              className="gradient-bg hover:opacity-90"
            >
              <i className="fas fa-plus ml-2"></i>
              إضافة موعد جديد
            </Button>
          </div>
          <p className="text-gray-500 mt-2 text-sm">
            إجمالي المواعيد: {appointments.length}
          </p>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">المريض</TableHead>
                <TableHead className="text-right">الخدمة</TableHead>
                <TableHead className="text-right">التاريخ</TableHead>
                <TableHead className="text-right">الوقت</TableHead>
                <TableHead className="text-right">الحالة</TableHead>
                <TableHead className="text-right">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>
                    <div className="font-medium">{appointment.name}</div>
                    <div className="text-sm text-gray-500">{appointment.phone}</div>
                  </TableCell>
                  <TableCell>{getServiceName(appointment.service)}</TableCell>
                  <TableCell>{formatDate(appointment.date)}</TableCell>
                  <TableCell>
                    {appointment.time.substring(0, 5)}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`${getStatusBadgeColor(appointment.status)}`}>
                      {getStatusInArabic(appointment.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <i className="fas fa-ellipsis-h"></i>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleStatusChange(appointment.id!, 'confirmed')}>
                          <i className="fas fa-check text-green-600 ml-2"></i>
                          تأكيد الموعد
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(appointment.id!, 'completed')}>
                          <i className="fas fa-calendar-check text-blue-600 ml-2"></i>
                          إكمال الموعد
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(appointment.id!, 'cancelled')}>
                          <i className="fas fa-times text-amber-600 ml-2"></i>
                          إلغاء الموعد
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openDeleteDialog(appointment.id!)}>
                          <i className="fas fa-trash text-red-600 ml-2"></i>
                          حذف
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>هل أنت متأكد من حذف هذا الموعد؟</AlertDialogTitle>
            <AlertDialogDescription>
              هذا الإجراء لا يمكن التراجع عنه. سيؤدي إلى حذف الموعد نهائياً من النظام.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              نعم، قم بالحذف
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AppointmentList;
