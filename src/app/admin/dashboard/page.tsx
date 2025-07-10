'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { LogOut, Users, CheckCircle, XCircle, Clock, Book, Ban, Trash2, ShieldOff, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

interface User {
  id: string;
  email: string;
  name: string;
  title: string;
  phone: string;
  role: string;
  registrationStatus: string;
  banned: boolean;
  bannedAt: string | null;
  bannedReason: string | null;
  createdAt: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'denied' | 'banned'>('all');
  const [regenerating, setRegenerating] = useState(false);

  useEffect(() => {
    // Check if user is authenticated and is admin
    const token = localStorage.getItem('auth-token');
    const userStr = localStorage.getItem('user');
    
    if (!token || !userStr) {
      router.push('/signin');
      return;
    }
    
    const user = JSON.parse(userStr);
    if (user.role !== 'ADMIN') {
      router.push('/');
      return;
    }
    
    setCurrentUser(user);
    fetchUsers();
  }, [router]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('auth-token');
      const response = await fetch('/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user');
    router.push('/signin');
  };

  const handleRegenerateReport = async () => {
    setRegenerating(true);
    try {
      const token = localStorage.getItem('auth-token');
      const response = await fetch('/api/admin/regenerate-report', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to regenerate report');
      }
      
      toast.success('Report regenerated successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to regenerate report');
    } finally {
      setRegenerating(false);
    }
  };

  const handleStatusUpdate = async (userId: string, status: 'APPROVED' | 'DENIED') => {
    try {
      const token = localStorage.getItem('auth-token');
      const response = await fetch(`/api/admin/users/${userId}/status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update status');
      }
      
      toast.success(`User ${status.toLowerCase()}`);
      fetchUsers();
    } catch (error) {
      toast.error('Failed to update user status');
    }
  };
  
  const handleBan = async (userId: string, currentlyBanned: boolean) => {
    if (currentlyBanned) {
      // Unban
      try {
        const token = localStorage.getItem('auth-token');
        const response = await fetch(`/api/admin/users/${userId}/ban`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to unban user');
        }
        
        toast.success('User unbanned successfully');
        fetchUsers();
      } catch (error) {
        toast.error('Failed to unban user');
      }
    } else {
      // Ban
      const reason = prompt('Ban reason (optional):');
      if (reason === null) return; // User cancelled
      
      try {
        const token = localStorage.getItem('auth-token');
        const response = await fetch(`/api/admin/users/${userId}/ban`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ reason }),
        });
        
        if (!response.ok) {
          throw new Error('Failed to ban user');
        }
        
        toast.success('User banned successfully');
        fetchUsers();
      } catch (error) {
        toast.error('Failed to ban user');
      }
    }
  };
  
  const handleDelete = async (userId: string, email: string) => {
    if (!confirm(`Are you sure you want to permanently delete ${email}? This action cannot be undone.`)) {
      return;
    }
    
    try {
      const token = localStorage.getItem('auth-token');
      const response = await fetch(`/api/admin/users/${userId}/delete`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      
      toast.success('User deleted successfully');
      fetchUsers();
    } catch (error) {
      toast.error('Failed to delete user');
    }
  };

  const filteredUsers = users.filter(user => {
    if (filter === 'all') return true;
    if (filter === 'banned') return user.banned;
    return user.registrationStatus.toLowerCase() === filter;
  });

  const stats = {
    total: users.length,
    pending: users.filter(u => u.registrationStatus === 'PENDING').length,
    approved: users.filter(u => u.registrationStatus === 'APPROVED').length,
    denied: users.filter(u => u.registrationStatus === 'DENIED').length,
    banned: users.filter(u => u.banned).length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-gray-400">Welcome back, {currentUser?.name}</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleRegenerateReport}
                disabled={regenerating}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:opacity-50 rounded-lg transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${regenerating ? 'animate-spin' : ''}`} />
                {regenerating ? 'Regenerating...' : 'Regenerate Report'}
              </button>
              <Link href="/report">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                  <Book className="w-4 h-4" />
                  View Report
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
          >
            <Users className="w-8 h-8 text-blue-400 mb-2" />
            <p className="text-3xl font-bold">{stats.total}</p>
            <p className="text-gray-400">Total Users</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
          >
            <Clock className="w-8 h-8 text-yellow-400 mb-2" />
            <p className="text-3xl font-bold">{stats.pending}</p>
            <p className="text-gray-400">Pending</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
          >
            <CheckCircle className="w-8 h-8 text-green-400 mb-2" />
            <p className="text-3xl font-bold">{stats.approved}</p>
            <p className="text-gray-400">Approved</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
          >
            <XCircle className="w-8 h-8 text-red-400 mb-2" />
            <p className="text-3xl font-bold">{stats.denied}</p>
            <p className="text-gray-400">Denied</p>
          </motion.div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          {(['all', 'pending', 'approved', 'denied', 'banned'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                filter === tab
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/10 text-gray-400 hover:bg-white/20'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Users Table */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-black/20">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium">{user.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">{user.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">{user.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.registrationStatus === 'APPROVED'
                          ? 'bg-green-900/50 text-green-400'
                          : user.registrationStatus === 'DENIED'
                          ? 'bg-red-900/50 text-red-400'
                          : 'bg-yellow-900/50 text-yellow-400'
                      }`}>
                        {user.registrationStatus}
                      </span>
                      {user.banned && (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-900/50 text-red-400">
                          BANNED
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex gap-2 flex-wrap">
                      {user.registrationStatus === 'PENDING' && (
                        <>
                          <button
                            onClick={() => handleStatusUpdate(user.id, 'APPROVED')}
                            className="text-green-400 hover:text-green-300"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(user.id, 'DENIED')}
                            className="text-red-400 hover:text-red-300"
                          >
                            Deny
                          </button>
                        </>
                      )}
                      {user.id !== currentUser?.id && (
                        <>
                          <button
                            onClick={() => handleBan(user.id, user.banned)}
                            className={`flex items-center gap-1 ${
                              user.banned 
                                ? 'text-green-400 hover:text-green-300' 
                                : 'text-orange-400 hover:text-orange-300'
                            }`}
                            title={user.banned ? 'Unban user' : 'Ban user'}
                          >
                            {user.banned ? <ShieldOff className="w-3 h-3" /> : <Ban className="w-3 h-3" />}
                            {user.banned ? 'Unban' : 'Ban'}
                          </button>
                          <button
                            onClick={() => handleDelete(user.id, user.email)}
                            className="flex items-center gap-1 text-red-400 hover:text-red-300"
                            title="Delete user"
                          >
                            <Trash2 className="w-3 h-3" />
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}