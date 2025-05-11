
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Appointment, fetchAppointments } from '@/services/api';

const DashboardOverview = () => {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
    todayAppointments: 0
  });

  useEffect(() => {
    const appointments = fetchAppointments();
    
    const today = new Date().toISOString().split('T')[0];
    const todayAppointments = appointments.filter(app => app.date === today);
    
    const pending = appointments.filter(app => app.status === 'pending').length;
    const confirmed = appointments.filter(app => app.status === 'confirmed').length;
    const completed = appointments.filter(app => app.status === 'completed').length;
    const cancelled = appointments.filter(app => app.status === 'cancelled').length;
    
    setStats({
      total: appointments.length,
      pending,
      confirmed,
      completed,
      cancelled,
      todayAppointments: todayAppointments.length
    });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card className="bg-gradient-to-r from-dental-primary to-blue-700 text-white">
        <CardContent className="flex items-center p-6">
          <div className="rounded-full bg-white/20 p-3 ml-4">
            <i className="fas fa-calendar-alt text-2xl"></i>
          </div>
          <div>
            <p className="text-sm font-medium">إجمالي المواعيد</p>
            <h3 className="text-3xl font-bold">{stats.total}</h3>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-r from-amber-400 to-amber-500 text-white">
        <CardContent className="flex items-center p-6">
          <div className="rounded-full bg-white/20 p-3 ml-4">
            <i className="fas fa-clock text-2xl"></i>
          </div>
          <div>
            <p className="text-sm font-medium">في انتظار التأكيد</p>
            <h3 className="text-3xl font-bold">{stats.pending}</h3>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
        <CardContent className="flex items-center p-6">
          <div className="rounded-full bg-white/20 p-3 ml-4">
            <i className="fas fa-check text-2xl"></i>
          </div>
          <div>
            <p className="text-sm font-medium">مواعيد مؤكدة</p>
            <h3 className="text-3xl font-bold">{stats.confirmed}</h3>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-r from-dental-secondary to-blue-400 text-white">
        <CardContent className="flex items-center p-6">
          <div className="rounded-full bg-white/20 p-3 ml-4">
            <i className="fas fa-calendar-day text-2xl"></i>
          </div>
          <div>
            <p className="text-sm font-medium">مواعيد اليوم</p>
            <h3 className="text-3xl font-bold">{stats.todayAppointments}</h3>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
        <CardContent className="flex items-center p-6">
          <div className="rounded-full bg-white/20 p-3 ml-4">
            <i className="fas fa-calendar-check text-2xl"></i>
          </div>
          <div>
            <p className="text-sm font-medium">مواعيد مكتملة</p>
            <h3 className="text-3xl font-bold">{stats.completed}</h3>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
        <CardContent className="flex items-center p-6">
          <div className="rounded-full bg-white/20 p-3 ml-4">
            <i className="fas fa-calendar-times text-2xl"></i>
          </div>
          <div>
            <p className="text-sm font-medium">مواعيد ملغاة</p>
            <h3 className="text-3xl font-bold">{stats.cancelled}</h3>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;
