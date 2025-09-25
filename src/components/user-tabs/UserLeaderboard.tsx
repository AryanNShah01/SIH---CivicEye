import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Progress } from '../ui/progress';
import { 
  Trophy, 
  Crown, 
  Award, 
  Star, 
  Medal, 
  Zap, 
  Target, 
  TrendingUp,
  Users,
  Calendar
} from 'lucide-react';

const leaderboardData = [
  {
    rank: 1,
    name: 'Aryan Shah',
    points: 2840,
    reports: 89,
    resolved: 78,
    streak: 15,
    avatar: '/api/placeholder/40/40',
    badges: ['Civic Hero', 'Problem Solver', 'Community Champion'],
    isCurrentUser: true
  },
  {
    rank: 2,
    name: 'Tanvi Sheth',
    points: 2650,
    reports: 76,
    resolved: 71,
    streak: 12,
    avatar: '/api/placeholder/40/40',
    badges: ['Reporter Pro', 'Consistency King', 'Local Guardian'],
    isCurrentUser: false
  },
  {
    rank: 3,
    name: 'Vidhaan Shah',
    points: 2420,
    reports: 68,
    resolved: 60,
    streak: 8,
    avatar: '/api/placeholder/40/40',
    badges: ['Issue Hunter', 'Quick Responder'],
    isCurrentUser: false
  },
  {
    rank: 4,
    name: 'Arav Khetwani',
    points: 2180,
    reports: 62,
    resolved: 55,
    streak: 6,
    avatar: '/api/placeholder/40/40',
    badges: ['Community Helper', 'Rising Star'],
    isCurrentUser: false
  },
  {
    rank: 23,
    name: 'Gaurang Satone',
    points: 1240,
    reports: 42,
    resolved: 35,
    streak: 4,
    avatar: '/api/placeholder/40/40',
    badges: ['New Contributor', 'First Report'],
    isCurrentUser: false
  }
];

const achievements = [
  {
    id: 'civic_hero',
    name: 'Civic Hero',
    description: 'Submit 100 reports',
    icon: Trophy,
    progress: 42,
    target: 100,
    unlocked: false,
    color: 'text-yellow-400'
  },
  {
    id: 'problem_solver',
    name: 'Problem Solver',
    description: 'Get 50 reports resolved',
    icon: Target,
    progress: 35,
    target: 50,
    unlocked: false,
    color: 'text-green-400'
  },
  {
    id: 'community_champion',
    name: 'Community Champion',
    description: 'Receive 100 upvotes',
    icon: Star,
    progress: 67,
    target: 100,
    unlocked: false,
    color: 'text-purple-400'
  },
  {
    id: 'streak_master',
    name: 'Streak Master',
    description: 'Maintain 30-day streak',
    icon: Zap,
    progress: 4,
    target: 30,
    unlocked: false,
    color: 'text-blue-400'
  },
  {
    id: 'first_report',
    name: 'First Report',
    description: 'Submit your first report',
    icon: Medal,
    progress: 1,
    target: 1,
    unlocked: true,
    color: 'text-green-400'
  },
  {
    id: 'new_contributor',
    name: 'New Contributor',
    description: 'Submit 10 reports',
    icon: Award,
    progress: 10,
    target: 10,
    unlocked: true,
    color: 'text-blue-400'
  }
];

const weeklyStats = [
  { period: 'This Week', reports: 3, points: 120, position: '+2' },
  { period: 'Last Week', reports: 5, points: 200, position: '+5' },
  { period: 'This Month', reports: 12, points: 480, position: '+8' },
  { period: 'All Time', reports: 42, points: 1240, position: '23rd' }
];

export function UserLeaderboard() {
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'achievements'>('leaderboard');

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />;
      case 2: return <Medal className="h-5 w-5 sm:h-6 sm:w-6 text-gray-300" />;
      case 3: return <Award className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600" />;
      default: return <span className="text-base sm:text-lg font-bold text-gray-400">#{rank}</span>;
    }
  };

  const getRankBackground = (rank: number, isCurrentUser: boolean) => {
    if (isCurrentUser) return 'bg-blue-500/20 border-blue-500/50';
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/50';
      case 2: return 'bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400/50';
      case 3: return 'bg-gradient-to-r from-amber-600/20 to-amber-700/20 border-amber-600/50';
      default: return 'bg-black/30 border-white/10';
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 p-2 sm:p-0">
      {/* Header with Tabs */}
      <Card className="bg-black/20 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
        <CardHeader className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
            <CardTitle className="text-white flex items-center text-lg sm:text-xl">
              <Trophy className="h-5 w-5 mr-2 text-yellow-400" />
              Community Leaderboard
            </CardTitle>
            <div className="flex space-x-2">
              <Button
                variant={activeTab === 'leaderboard' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('leaderboard')}
                className={`text-xs sm:text-sm ${
                  activeTab === 'leaderboard' 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                    : 'bg-black/30 border-white/20 text-gray-300 hover:bg-white/10'
                }`}
              >
                <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                Rankings
              </Button>
              <Button
                variant={activeTab === 'achievements' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('achievements')}
                className={`text-xs sm:text-sm ${
                  activeTab === 'achievements' 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                    : 'bg-black/30 border-white/20 text-gray-300 hover:bg-white/10'
                }`}
              >
                <Award className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                Achievements
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {activeTab === 'leaderboard' && (
        <>
          {/* Top 3 Podium - Mobile Optimized */}
          <Card className="bg-black/20 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-white text-center text-lg sm:text-xl">Top Contributors</CardTitle>
            </CardHeader>
            <CardContent className="p-2 sm:p-6">
              <div className="flex items-end justify-center space-x-2 sm:space-x-8">
                {/* 2nd Place */}
                <div className="text-center flex-1 max-w-[100px] sm:max-w-none">
                  <div className="relative">
                    <div className="w-12 h-16 sm:w-16 sm:h-20 bg-gradient-to-t from-gray-400 to-gray-300 rounded-t-lg flex items-end justify-center pb-1 sm:pb-2">
                      <span className="text-white font-bold text-sm">2</span>
                    </div>
                    <Avatar className="absolute -top-6 sm:-top-8 left-1/2 transform -translate-x-1/2 w-10 h-10 sm:w-16 sm:h-16 border-2 sm:border-4 border-gray-400">
                      <AvatarImage src={leaderboardData[1].avatar} />
                      <AvatarFallback className="text-xs">
                        {leaderboardData[1].name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="mt-3 sm:mt-4">
                    <p className="text-white font-semibold text-xs sm:text-sm truncate">{leaderboardData[1].name}</p>
                    <p className="text-gray-400 text-xs">{leaderboardData[1].points} pts</p>
                  </div>
                </div>

                {/* 1st Place */}
                <div className="text-center flex-1 max-w-[100px] sm:max-w-none">
                  <div className="relative">
                    <div className="w-12 h-20 sm:w-16 sm:h-24 bg-gradient-to-t from-yellow-400 to-yellow-300 rounded-t-lg flex items-end justify-center pb-1 sm:pb-2">
                      <Crown className="h-4 w-4 sm:h-6 sm:w-6 text-yellow-800" />
                    </div>
                    <Avatar className="absolute -top-6 sm:-top-8 left-1/2 transform -translate-x-1/2 w-10 h-10 sm:w-16 sm:h-16 border-2 sm:border-4 border-yellow-400">
                      <AvatarImage src={leaderboardData[0].avatar} />
                      <AvatarFallback className="text-xs">
                        {leaderboardData[0].name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="mt-3 sm:mt-4">
                    <p className="text-white font-semibold text-xs sm:text-sm truncate">{leaderboardData[0].name}</p>
                    <p className="text-yellow-400 text-xs">{leaderboardData[0].points} pts</p>
                  </div>
                </div>

                {/* 3rd Place */}
                <div className="text-center flex-1 max-w-[100px] sm:max-w-none">
                  <div className="relative">
                    <div className="w-12 h-14 sm:w-16 sm:h-16 bg-gradient-to-t from-amber-600 to-amber-500 rounded-t-lg flex items-end justify-center pb-1 sm:pb-2">
                      <span className="text-white font-bold text-sm">3</span>
                    </div>
                    <Avatar className="absolute -top-6 sm:-top-8 left-1/2 transform -translate-x-1/2 w-10 h-10 sm:w-16 sm:h-16 border-2 sm:border-4 border-amber-600">
                      <AvatarImage src={leaderboardData[2].avatar} />
                      <AvatarFallback className="text-xs">
                        {leaderboardData[2].name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="mt-3 sm:mt-4">
                    <p className="text-white font-semibold text-xs sm:text-sm truncate">{leaderboardData[2].name}</p>
                    <p className="text-gray-400 text-xs">{leaderboardData[2].points} pts</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Full Leaderboard - Mobile Optimized */}
          <Card className="bg-black/20 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-white text-lg sm:text-xl">Full Rankings</CardTitle>
            </CardHeader>
            <CardContent className="p-2 sm:p-6 space-y-2 sm:space-y-3">
              {leaderboardData.map((user) => (
                <div
                  key={user.rank}
                  className={`p-3 sm:p-4 rounded-lg border transition-all duration-300 hover:bg-black/40 ${getRankBackground(user.rank, user.isCurrentUser)}`}
                >
                  <div className="flex items-center justify-between space-x-2 sm:space-x-4">
                    <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
                      <div className="flex items-center justify-center w-8 h-8 sm:w-12 sm:h-12 flex-shrink-0">
                        {getRankIcon(user.rank)}
                      </div>
                      <Avatar className="w-8 h-8 sm:w-12 sm:h-12 flex-shrink-0">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback className="text-xs">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center space-x-1 sm:space-x-2 mb-1">
                          <h3 className="text-white font-semibold text-sm sm:text-base truncate">
                            {user.name}
                          </h3>
                          {user.isCurrentUser && (
                            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-[10px] sm:text-xs px-1 sm:px-2 py-0 flex-shrink-0">
                              You
                            </Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {user.badges.slice(0, 1).map((badge) => (
                            <Badge 
                              key={badge} 
                              variant="secondary" 
                              className="text-[10px] sm:text-xs bg-purple-500/20 text-purple-300 border-purple-500/30 px-1 sm:px-2 py-0 truncate max-w-[80px] sm:max-w-none"
                            >
                              {badge}
                            </Badge>
                          ))}
                          {user.badges.length > 1 && (
                            <Badge variant="secondary" className="text-[10px] sm:text-xs bg-gray-500/20 text-gray-300 border-gray-500/30 px-1 sm:px-2 py-0">
                              +{user.badges.length - 1}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right flex-shrink-0 min-w-[80px] sm:min-w-[100px]">
                      <div className="text-lg sm:text-2xl font-bold text-white whitespace-nowrap">
                        {user.points.toLocaleString()}
                      </div>
                      <div className="text-[10px] sm:text-sm text-gray-400 whitespace-nowrap">
                        {user.reports} • {user.resolved}
                      </div>
                      <div className="flex items-center justify-end text-[10px] sm:text-xs text-orange-400 mt-0.5 sm:mt-1">
                        <Zap className="h-2 w-2 sm:h-3 sm:w-3 mr-0.5 sm:mr-1 flex-shrink-0" />
                        {user.streak}d
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Your Stats - Mobile Optimized */}
          <Card className="bg-black/20 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-white flex items-center text-lg sm:text-xl">
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-green-400" />
                Your Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="p-2 sm:p-6">
              <div className="grid grid-cols-2 gap-2 sm:gap-4 sm:grid-cols-4">
                {weeklyStats.map((stat) => (
                  <div key={stat.period} className="text-center p-2 sm:p-4 bg-black/30 rounded-lg border border-white/10">
                    <div className="text-lg sm:text-2xl font-bold text-white">{stat.reports}</div>
                    <div className="text-[10px] sm:text-sm text-gray-400 mb-1">Reports</div>
                    <div className="text-sm sm:text-lg text-blue-400">{stat.points}</div>
                    <div className="text-[10px] sm:text-xs text-gray-400 mb-1 sm:mb-2">Points</div>
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-[10px] sm:text-xs px-1 sm:px-2 py-0">
                      {stat.position}
                    </Badge>
                    <div className="text-[10px] sm:text-xs text-gray-500 mt-1">{stat.period}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {activeTab === 'achievements' && (
        <Card className="bg-black/20 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-white text-lg sm:text-xl">Achievements & Badges</CardTitle>
            <p className="text-gray-400 text-sm">Unlock badges by contributing to your community</p>
          </CardHeader>
          <CardContent className="p-2 sm:p-6">
            <div className="grid grid-cols-1 gap-3 sm:gap-6 sm:grid-cols-2">
              {achievements.map((achievement) => {
                const Icon = achievement.icon;
                const progressPercent = Math.min((achievement.progress / achievement.target) * 100, 100);
                
                return (
                  <div
                    key={achievement.id}
                    className={`p-3 sm:p-6 rounded-lg border transition-all duration-300 ${
                      achievement.unlocked
                        ? 'bg-gradient-to-br from-green-500/20 to-blue-500/20 border-green-500/50 shadow-lg'
                        : 'bg-black/30 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <div className={`p-2 sm:p-3 rounded-lg flex-shrink-0 ${
                        achievement.unlocked ? 'bg-green-500/20' : 'bg-gray-500/20'
                      }`}>
                        <Icon className={`h-4 w-4 sm:h-6 sm:w-6 ${
                          achievement.unlocked ? achievement.color : 'text-gray-400'
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-1 sm:space-x-2 mb-1 sm:mb-2">
                          <h3 className="text-white font-semibold text-sm sm:text-base truncate">
                            {achievement.name}
                          </h3>
                          {achievement.unlocked && (
                            <Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-[10px] sm:text-xs px-1 sm:px-2 py-0 flex-shrink-0">
                              <Award className="h-2 w-2 sm:h-3 sm:w-3 mr-0.5 sm:mr-1" />
                              Unlocked
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-400 text-xs sm:text-sm mb-2 sm:mb-3 truncate">
                          {achievement.description}
                        </p>
                        <div className="space-y-1 sm:space-y-2">
                          <div className="flex justify-between text-xs sm:text-sm">
                            <span className="text-gray-400">Progress</span>
                            <span className="text-white">
                              {achievement.progress}/{achievement.target}
                            </span>
                          </div>
                          <Progress 
                            value={progressPercent} 
                            className={`h-1 sm:h-2 ${
                              achievement.unlocked ? 'bg-green-900' : 'bg-gray-700'
                            }`} 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}