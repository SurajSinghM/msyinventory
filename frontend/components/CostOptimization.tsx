import { useLanguage } from './LanguageProvider'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

interface CostOptimizationProps {
  inventory: any
}

const COLORS = ['#E10600', '#FFC72C', '#00A878', '#0B2747', '#8B5CF6']

export default function CostOptimization({ inventory }: CostOptimizationProps) {
  const { language } = useLanguage()

  if (!inventory || !inventory.ingredients) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <p>{language === 'en' ? 'No cost data available' : '无成本数据'}</p>
      </div>
    )
  }

  // Calculate cost distribution (simplified - would use actual cost data)
  const costData = inventory.ingredients
    .slice(0, 5)
    .map((ing: any, index: number) => ({
      name: ing.ingredient_name,
      value: ing.current_stock * (10 + index * 2), // Simulated cost
    }))

  const totalCost = costData.reduce((sum: number, item: any) => sum + item.value, 0)

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-primary-navy dark:text-primary-rice mb-4">
        {language === 'en' ? 'Cost Optimization' : '成本优化'}
      </h2>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {language === 'en' ? 'Total Inventory Value' : '总库存价值'}
        </p>
        <p className="text-3xl font-bold text-primary-gold">
          ${totalCost.toFixed(2)}
        </p>
      </div>

      {costData.length > 0 && (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={costData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {costData.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}

      <div className="mt-4">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          {language === 'en' ? 'Top Cost Drivers (80/20 Rule)' : '主要成本驱动因素（80/20规则）'}
        </p>
        <div className="space-y-2">
          {costData
            .sort((a: any, b: any) => b.value - a.value)
            .slice(0, 3)
            .map((item: any, index: number) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm">{item.name}</span>
                <span className="font-semibold">${item.value.toFixed(2)}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

