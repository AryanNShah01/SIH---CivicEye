import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { 
  BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';
import { 
  TrendingUp, FileText, CheckCircle, Clock, Award, Target, BarChart as BarChartIcon 
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const monthlyData = [
  { month: 'Jan', submitted: 8, resolved: 6 },
  { month: 'Feb', submitted: 12, resolved: 10 },
  { month: 'Mar', submitted: 15, resolved: 12 },
  { month: 'Apr', submitted: 18, resolved: 16 },
  { month: 'May', submitted: 22, resolved: 18 },
  { month: 'Jun', submitted: 25, resolved: 23 }
];

const issueTypes = [
  { name: 'Infrastructure', value: 35, color: '#3B82F6' },
  { name: 'Sanitation', value: 25, color: '#8B5CF6' },
  { name: 'Traffic', value: 20, color: '#10B981' },
  { name: 'Environment', value: 15, color: '#F59E0B' },
  { name: 'Others', value: 5, color: '#EF4444' }
];

const contributionData = [
  { week: 'Week 1', points: 20 },
  { week: 'Week 2', points: 35 },
  { week: 'Week 3', points: 28 },
  { week: 'Week 4', points: 45 },
  { week: 'Week 5', points: 52 },
  { week: 'Week 6', points: 38 }
];

// Constant data values
const STATS_DATA = {
  totalReports: 89, // Sum of resolved (78) + pending (11)
  resolved: 78,
  pending: 11, // 89 total - 78 resolved = 11 pending
  points: 2840,
  rank: 1
};

export function UserAnalytics() {
  const { t } = useLanguage();

  // Remove animation and use constant values directly
  const [animatedValues] = useState(STATS_DATA);

  // Remove the useEffect animation completely

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-black/20 backdrop-blur-xl border border-white/10 hover:border-blue-500/30 transition-all duration-300 group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{t.totalReports}</p>
                <p className="text-3xl font-bold text-white group-hover:text-blue-400 transition-colors">{animatedValues.totalReports}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                <FileText className="h-6 w-6 text-blue-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
              <span className="text-green-400">+12%</span>
              <span className="text-gray-400 ml-1">{t.fromLastMonth}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/20 backdrop-blur-xl border border-white/10 hover:border-green-500/30 transition-all duration-300 group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{t.resolved}</p>
                <p className="text-3xl font-bold text-white group-hover:text-green-400 transition-colors">{animatedValues.resolved}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-green-500/20 flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                <CheckCircle className="h-6 w-6 text-green-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-400">87.6%</span>
              <span className="text-gray-400 ml-1">{t.resolutionRate}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/20 backdrop-blur-xl border border-white/10 hover:border-yellow-500/30 transition-all duration-300 group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{t.pending}</p>
                <p className="text-3xl font-bold text-white group-hover:text-yellow-400 transition-colors">{animatedValues.pending}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-yellow-500/20 flex items-center justify-center group-hover:bg-yellow-500/30 transition-colors">
                <Clock className="h-6 w-6 text-yellow-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-yellow-400">12.4%</span>
              <span className="text-gray-400 ml-1">{t.pendingReview}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/20 backdrop-blur-xl border border-white/10 hover:border-purple-500/30 transition-all duration-300 group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{t.totalPoints}</p>
                <p className="text-3xl font-bold text-white group-hover:text-purple-400 transition-colors">{animatedValues.points.toLocaleString()}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                <Award className="h-6 w-6 text-purple-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <Target className="h-4 w-4 text-purple-400 mr-1" />
              <span className="text-purple-400">{t.rank} #{animatedValues.rank}</span>
              <span className="text-gray-400 ml-1">{t.thisMonth}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Reports Chart */}
        <Card className="bg-black/20 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <BarChartIcon className="h-5 w-5 mr-2 text-blue-400" />
              {t.monthlyReportActivity}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ReBarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    backdropFilter: 'blur(12px)'
                  }} 
                />
                <Bar dataKey="submitted" fill="#3B82F6" name={t.submitted} radius={[4, 4, 0, 0]} />
                <Bar dataKey="resolved" fill="#10B981" name={t.resolved} radius={[4, 4, 0, 0]} />
              </ReBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Issue Types Pie Chart */}
        <Card className="bg-black/20 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Target className="h-5 w-5 mr-2 text-purple-400" />
              {t.issueCategories}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={issueTypes}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {issueTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    backdropFilter: 'blur(12px)'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Contribution Trend */}
      <Card className="bg-black/20 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-green-400" />
            {t.weeklyContributionTrend}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={contributionData}>
              <defs>
                <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="week" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  backdropFilter: 'blur(12px)'
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="points" 
                stroke="#8B5CF6" 
                fillOpacity={1} 
                fill="url(#colorPoints)" 
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}