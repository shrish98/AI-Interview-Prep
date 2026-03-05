'use client'

import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Briefcase,
  LineChart,
  Lightbulb
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const DashboardView = ({ insights }) => {
  const {
    salaryRange,
    growthRate,
    demandLevel,
    topSkills,
    marketOutlook,
    keyTrends,
    recommendedSkills
  } = insights

  // Formatting salary data for the chart
  const salaryData = salaryRange.map(item => ({
    name: item.role,
    min: item.min,
    max: item.max,
    median: item.median
  }))

  const getOutlookDetails = outlook => {
    switch (outlook) {
      case 'Positive':
        return {
          color: 'bg-green-100 text-green-800',
          icon: <TrendingUp className='h-4 w-4' />
        }
      case 'Neutral':
        return {
          color: 'bg-yellow-100 text-yellow-800',
          icon: <LineChart className='h-4 w-4' />
        }
      case 'Negative':
        return {
          color: 'bg-red-100 text-red-800',
          icon: <TrendingDown className='h-4 w-4' />
        }
      default:
        return { color: 'bg-gray-100 text-gray-800', icon: null }
    }
  }

  const getDemandColor = level => {
    switch (level) {
      case 'High':
        return 'bg-green-100 text-green-800'
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'Low':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const outlook = getOutlookDetails(marketOutlook)

  return (
    <div className='space-y-6 py-8'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>
            Industry Insights
          </h1>
          <p className='text-muted-foreground'>
            Latest trends and data for your industry
          </p>
        </div>
        <div className='flex flex-wrap gap-2'>
          <Badge
            className={`flex items-center gap-1 px-3 py-1 ${outlook.color}`}
          >
            {outlook.icon}
            {marketOutlook} Outlook
          </Badge>
          <Badge className={`px-3 py-1 ${getDemandColor(demandLevel)}`}>
            {demandLevel} Demand
          </Badge>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Growth Rate</CardTitle>
            <TrendingUp className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{growthRate}%</div>
            <p className='text-xs text-muted-foreground'>Annual projection</p>
          </CardContent>
        </Card>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <Card className='lg:col-span-2'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <DollarSign className='h-5 w-5 text-primary' />
              Salary Ranges by Role
            </CardTitle>
            <CardDescription>
              Annual salary data (Min, Median, Max) for top industry roles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='h-[350px] w-full'>
              <ResponsiveContainer width='100%' height='100%'>
                <BarChart data={salaryData}>
                  <CartesianGrid strokeDasharray='3 3' vertical={false} />
                  <XAxis
                    dataKey='name'
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={value => `$${value / 1000}k`}
                  />
                  <Tooltip
                    formatter={value => [`$${value.toLocaleString()}`, '']}
                    contentStyle={{
                      borderRadius: '8px',
                      border: 'none',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Bar
                    dataKey='min'
                    fill='var(--color-primary)'
                    opacity={0.3}
                    name='Min Salary'
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey='median'
                    fill='var(--color-primary)'
                    name='Median Salary'
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey='max'
                    fill='var(--color-primary)'
                    opacity={0.6}
                    name='Max Salary'
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Briefcase className='h-5 w-5 text-primary' />
              Key Industry Trends
            </CardTitle>
            <CardDescription>What's shaping the landscape</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className='space-y-4'>
              {keyTrends.map((trend, index) => (
                <li key={index} className='flex items-start gap-3'>
                  <div className='mt-1 h-2 w-2 rounded-full bg-primary shrink-0' />
                  <span className='text-sm'>{trend}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <TrendingUp className='h-5 w-5 text-primary' />
              Top Skills
            </CardTitle>
            <CardDescription>Currently in high demand</CardDescription>
          </CardHeader>
          <CardContent className='flex flex-wrap gap-2'>
            {topSkills.map((skill, index) => (
              <Badge key={index} variant='secondary'>
                {skill}
              </Badge>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Lightbulb className='h-5 w-5 text-primary' />
              Recommended Skills
            </CardTitle>
            <CardDescription>To stay competitive</CardDescription>
          </CardHeader>
          <CardContent className='flex flex-wrap gap-2'>
            {recommendedSkills.map((skill, index) => (
              <Badge key={index} variant='outline'>
                {skill}
              </Badge>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DashboardView
