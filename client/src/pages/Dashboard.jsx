import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, PackageCheck, UserCircle2, Bell, BarChart3 } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 text-white">
      <motion.h1
        className="text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        🎛️ Your Warranty Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white/10 backdrop-blur-sm shadow-xl rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <PackageCheck className="text-purple-400" size={36} />
              <div>
                <h2 className="text-xl font-semibold">Add New Product</h2>
                <p className="text-sm text-gray-300">Register your purchased items</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm shadow-xl rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Calendar className="text-yellow-400" size={36} />
              <div>
                <h2 className="text-xl font-semibold">Expiry Calendar</h2>
                <p className="text-sm text-gray-300">See upcoming warranty expirations</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm shadow-xl rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <UserCircle2 className="text-green-400" size={36} />
              <div>
                <h2 className="text-xl font-semibold">Profile Settings</h2>
                <p className="text-sm text-gray-300">Manage your account and preferences</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm shadow-xl rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Bell className="text-pink-400" size={36} />
              <div>
                <h2 className="text-xl font-semibold">Reminders</h2>
                <p className="text-sm text-gray-300">Notification settings and upcoming alerts</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm shadow-xl rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <BarChart3 className="text-blue-400" size={36} />
              <div>
                <h2 className="text-xl font-semibold">Analytics</h2>
                <p className="text-sm text-gray-300">Visualize your warranty history</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <p className="text-sm text-gray-400 mt-8 text-center">More analytics, notifications, and product insights coming soon!</p>
    </div>
  );
}
