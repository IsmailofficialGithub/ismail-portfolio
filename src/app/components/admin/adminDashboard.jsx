'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart3, FileText, FolderOpen, Database, Users, TrendingUp, Calendar, Settings } from 'lucide-react';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/admin/dashboard');
        
        if (response.data.success) {
          setDashboardData(response.data.data);
          setError(null);
        } else {
          setError(response.data.error || 'Failed to fetch dashboard data');
        }
      } catch (err) {
        console.error('Dashboard fetch error:', err);
        setError('Network error: ' + (err.response?.data?.error || err.message));
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Skeleton Components
  const StatCardSkeleton = () => (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-gray-700 rounded-lg"></div>
        <div className="text-right">
          <div className="w-16 h-8 bg-gray-700 rounded mb-2"></div>
          <div className="w-20 h-4 bg-gray-700 rounded"></div>
        </div>
      </div>
      <div className="w-24 h-6 bg-gray-700 rounded"></div>
    </div>
  );

  const ActivityItemSkeleton = () => (
    <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 bg-gray-700 rounded-full"></div>
        <div>
          <div className="w-48 h-5 bg-gray-700 rounded mb-2"></div>
          <div className="w-32 h-4 bg-gray-700 rounded"></div>
        </div>
      </div>
      <div className="w-16 h-4 bg-gray-700 rounded"></div>
    </div>
  );

  const QuickActionSkeleton = () => (
    <div className="w-full p-4 bg-gray-700 rounded-lg animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-5 h-5 bg-gray-600 rounded"></div>
        <div className="w-32 h-5 bg-gray-600 rounded"></div>
      </div>
    </div>
  );

  const StatCard = ({ icon: Icon, title, count, subtitle, color, href }) => (
    <div 
      className="group bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-xl border border-gray-700 hover:border-gray-600"
      onClick={() => window.location.href = href}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-gradient-to-r ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-white">{count}</div>
          <div className="text-sm text-gray-400">{subtitle}</div>
        </div>
      </div>
      <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
        {title}
      </h3>
    </div>
  );

  const QuickAction = ({ icon: Icon, label, href, color }) => (
    <button 
      className={`flex items-center gap-3 w-full p-4 rounded-lg bg-gradient-to-r ${color} hover:opacity-90 transition-all duration-300 text-white font-medium hover:scale-105 hover:shadow-lg`}
      onClick={() => window.location.href = href}
    >
      <Icon className="w-5 h-5" />
      {label}
    </button>
  );

  const RecentActivity = ({ type, title, time, status, category }) => (
    <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors">
      <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full ${
          status === 'published' ? 'bg-green-500' : 
          status === 'draft' ? 'bg-yellow-500' : 
          status === 'archived' ? 'bg-red-500' : 'bg-blue-500'
        }`}></div>
        <div>
          <div className="text-white font-medium">{title}</div>
          <div className="text-gray-400 text-sm">
            {type} {category && `• ${category}`}
          </div>
        </div>
      </div>
      <div className="text-gray-400 text-sm">{time}</div>
    </div>
  );

  // Helper function to format time ago
  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return `${Math.floor(diffInSeconds / 2592000)}mo ago`;
  };

  // Safe data access with fallbacks
  const safeData = {
    overview: {
      blogs: {
        total: dashboardData?.overview?.blogs?.total || 0,
        thisMonth: dashboardData?.overview?.blogs?.thisMonth || 0,
        thisWeek: dashboardData?.overview?.blogs?.thisWeek || 0
      },
      projects: {
        total: dashboardData?.overview?.projects?.total || 0,
        published: dashboardData?.overview?.projects?.published || 0,
        draft: dashboardData?.overview?.projects?.draft || 0,
        archived: dashboardData?.overview?.projects?.archived || 0,
        featured: dashboardData?.overview?.projects?.featured || 0
      },
      categories: {
        total: dashboardData?.overview?.categories?.total || 0
      },
      schemas: {
        total: dashboardData?.overview?.schemas?.total || 0,
        relations: dashboardData?.overview?.schemas?.relations || 0
      }
    },
    recentActivity: dashboardData?.recentActivity || []
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center bg-gray-800 p-8 rounded-xl border border-gray-700">
          <div className="text-red-500 mb-4 text-lg">⚠️ Error Loading Dashboard</div>
          <p className="text-gray-400 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Welcome back! Here&apos;s what&apos;s happening with your content.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {loading ? (
            <>
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
            </>
          ) : (
            <>
              <StatCard 
                icon={FileText}
                title="Blogs"
                count={safeData.overview.blogs.total}
                subtitle={`${safeData.overview.blogs.thisMonth} This Month`}
                color="from-blue-500 to-blue-600"
                href="/admin/dashboard/blog"
              />
              <StatCard 
                icon={FolderOpen}
                title="Projects"
                count={safeData.overview.projects.total}
                subtitle={`${safeData.overview.projects.published} Published`}
                color="from-purple-500 to-purple-600"
                href="/admin/dashboard/projects"
              />
              <StatCard 
                icon={BarChart3}
                title="Categories"
                count={safeData.overview.categories.total}
                subtitle="Content Categories"
                color="from-green-500 to-green-600"
                href="/admin/dashboard/category"
              />
              <StatCard 
                icon={Database}
                title="Schemas"
                count={safeData.overview.schemas.total}
                subtitle={`${safeData.overview.schemas.relations} Relations`}
                color="from-orange-500 to-orange-600"
                href="/admin/dashboard/schema"
              />
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
              <div className="space-y-3">
                {loading ? (
                  <>
                    <QuickActionSkeleton />
                    <QuickActionSkeleton />
                    <QuickActionSkeleton />
                    <QuickActionSkeleton />
                  </>
                ) : (
                  <>
                    <QuickAction 
                      icon={FileText}
                      label="Blog"
                      href="/admin/dashboard/blog"
                      color="from-blue-500 to-blue-600"
                    />
                    <QuickAction 
                      icon={FolderOpen}
                      label="Project"
                      href="/admin/dashboard/projects"
                      color="from-purple-500 to-purple-600"
                    />
                    <QuickAction 
                      icon={BarChart3}
                      label="Manage Categories"
                      href="/admin/dashboard/category"
                      color="from-green-500 to-green-600"
                    />
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
              <div className="space-y-3">
                {loading ? (
                  <>
                    <ActivityItemSkeleton />
                    <ActivityItemSkeleton />
                    <ActivityItemSkeleton />
                    <ActivityItemSkeleton />
                    <ActivityItemSkeleton />
                  </>
                ) : safeData.recentActivity.length > 0 ? (
                  safeData.recentActivity.slice(0, 6).map((item, index) => (
                    <RecentActivity 
                      key={`${item.type}-${item.id}-${index}`}
                      type={item.type === 'blog' ? 'Blog Post' : 'Project'}
                      title={item.title}
                      time={formatTimeAgo(item.createdAt)}
                      status={item.status}
                      category={item.category || (item.techStack ? item.techStack.join(', ') : '')}
                    />
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No recent activity found</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {loading ? (
            <>
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 animate-pulse">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-5 h-5 bg-gray-700 rounded"></div>
                  <div className="w-20 h-6 bg-gray-700 rounded"></div>
                </div>
                <div className="w-16 h-8 bg-gray-700 rounded mb-1"></div>
                <div className="w-32 h-4 bg-gray-700 rounded"></div>
              </div>
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 animate-pulse">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-5 h-5 bg-gray-700 rounded"></div>
                  <div className="w-24 h-6 bg-gray-700 rounded"></div>
                </div>
                <div className="w-12 h-8 bg-gray-700 rounded mb-1"></div>
                <div className="w-28 h-4 bg-gray-700 rounded"></div>
              </div>
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 animate-pulse">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-5 h-5 bg-gray-700 rounded"></div>
                  <div className="w-20 h-6 bg-gray-700 rounded"></div>
                </div>
                <div className="w-8 h-8 bg-gray-700 rounded mb-1"></div>
                <div className="w-24 h-4 bg-gray-700 rounded"></div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <h3 className="text-lg font-semibold text-white">Growth</h3>
                </div>
                <div className="text-2xl font-bold text-green-500 mb-1">+{safeData.overview.blogs.thisWeek}</div>
                <div className="text-gray-400 text-sm">New blogs this week</div>
              </div>

              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center gap-3 mb-3">
                  <Users className="w-5 h-5 text-blue-500" />
                  <h3 className="text-lg font-semibold text-white">Featured</h3>
                </div>
                <div className="text-2xl font-bold text-blue-500 mb-1">{safeData.overview.projects.featured}</div>
                <div className="text-gray-400 text-sm">Featured projects</div>
              </div>

              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center gap-3 mb-3">
                  <Calendar className="w-5 h-5 text-purple-500" />
                  <h3 className="text-lg font-semibold text-white">Drafts</h3>
                </div>
                <div className="text-2xl font-bold text-purple-500 mb-1">{safeData.overview.projects.draft}</div>
                <div className="text-gray-400 text-sm">Draft projects</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;