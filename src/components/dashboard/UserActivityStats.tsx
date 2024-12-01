import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useUser } from '../../contexts/UserContext';
import { MessageCircle } from 'lucide-react';

const UserActivityStats = () => {
  const { language } = useLanguage();
  const { users, getTopPerformers } = useUser();

  // Get online users (active in last 5 minutes)
  const onlineUsers = users.filter(user => {
    const lastActive = new Date(user.lastActive);
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    return lastActive > fiveMinutesAgo;
  });

  // Get today's contacts
  const todayContacts = users.reduce((acc, user) => {
    if (user.performance?.actions || 0 > 0) {
      const lastUpdate = new Date(user.performance?.lastUpdated || '');
      const today = new Date();
      if (lastUpdate.toDateString() === today.toDateString()) {
        acc++;
      }
    }
    return acc;
  }, 0);

  // Calculate average weekly response time (mock data for now)
  const avgResponseTime = 5; // minutes

  // Get today's new users
  const todayNewUsers = users.filter(user => {
    const joinDate = new Date(user.joinDate);
    const today = new Date();
    return joinDate.toDateString() === today.toDateString();
  }).length;

  // Get WhatsApp and Messenger contacts (mock data for now)
  const whatsappContacts = 3;
  const messengerContacts = 2;

  return (
    <div className="space-y-6">
      {/* Today's Activity */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {language === 'ar' ? 'نشاط اليوم' : "Today's Activity"}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-500">
              {language === 'ar' ? 'المستخدمين المتصلين' : 'Online Users'}
            </p>
            <p className="text-2xl font-bold text-blue-600">
              {onlineUsers.length}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">
              {language === 'ar' ? 'تم الاتصال اليوم' : 'Contacted Today'}
            </p>
            <p className="text-2xl font-bold text-green-600">
              {todayContacts}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">
              {language === 'ar' ? 'نشأت اليوم' : 'Created Today'}
            </p>
            <p className="text-2xl font-bold text-purple-600">
              {todayNewUsers}
            </p>
          </div>
        </div>
      </div>

      {/* Response Time */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {language === 'ar' ? 'متوسط وقت الاستجابة أسبوعياً' : 'Average Weekly Response Time'}
        </h2>
        <div className="flex items-end gap-2">
          <p className="text-3xl font-bold text-blue-600">{avgResponseTime}</p>
          <p className="text-gray-500 mb-1">
            {language === 'ar' ? 'دقائق' : 'minutes'}
          </p>
        </div>
      </div>

      {/* Communication Methods */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {language === 'ar' ? 'طرق التواصل' : 'Communication Methods'}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">WhatsApp</p>
              <p className="text-xl font-bold text-gray-900">{whatsappContacts}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Messenger</p>
              <p className="text-xl font-bold text-gray-900">{messengerContacts}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserActivityStats;