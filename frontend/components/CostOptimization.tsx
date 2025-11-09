import { useLanguage } from './LanguageProvider'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

interface CostOptimizationProps {
  inventory: any
}

const COLORS = ['#E10600', '#FFC72C', '#00A878', '#0B2747', '#FFF8F0']

// Color mapping by product name
const PRODUCT_COLORS: Record<string, string> = {
  'Rice': '#E10600', // red
  'Braised Chicken': '#FFC72C', // yellow
  'Braised Beef': '#00A878', // green
  'Braised Pork': '#0B2747', // blue
  'Egg': '#FFF8F0', // white
}

// Fixed product order for color and display
const PRODUCT_ORDER = ['Rice', 'Braised Chicken', 'Braised Beef', 'Braised Pork', 'Egg']

export default function CostOptimization({ inventory }: CostOptimizationProps) {
  const { language } = useLanguage()

  if (!inventory || !inventory.ingredients) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <p>{language === 'en' ? 'No cost data available' : '无成本数据'}</p>
      </div>
    )
  }

  // Build costData in fixed product order
  const costData = PRODUCT_ORDER
    .map((prod) => {
      const ing = inventory.ingredients.find((i: any) => i.ingredient_name === prod)
      return ing
        ? {
            name: prod,
            value: ing.current_stock * (10 + PRODUCT_ORDER.indexOf(prod) * 2), // Simulated cost
          }
        : null
    })
    .filter(Boolean)

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
        <>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={costData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {costData.map((entry: any) => (
                  <Cell key={entry.name} fill={PRODUCT_COLORS[entry.name] || '#CCCCCC'} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          {/* Color-coded table for pie chart data */}
          <div className="overflow-x-auto mt-6">
            <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 dark:text-gray-200">Color</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 dark:text-gray-200">{language === 'en' ? 'Product' : '产品'}</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 dark:text-gray-200">%</th>
                </tr>
              </thead>
              <tbody>
                {costData.map((item: any) => {
                  const color = PRODUCT_COLORS[item.name] || '#CCCCCC';
                  const percent = totalCost > 0 ? ((item.value / totalCost) * 100).toFixed(1) : '0.0';
                  return (
                    <tr key={item.name} className="border-t border-gray-200 dark:border-gray-700">
                      <td className="px-4 py-2">
                        <span className="inline-block w-4 h-4 rounded-full" style={{ backgroundColor: color }}></span>
                      </td>
                      <td className="px-4 py-2 font-medium text-black dark:text-white">{item.name}</td>
                      <td className="px-4 py-2">{percent}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
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

