import { useState } from 'react'
import { useLanguage } from './LanguageProvider'

interface InventoryTableProps {
  inventory: any
}

export default function InventoryTable({ inventory }: InventoryTableProps) {
  const { language } = useLanguage()
  const [sortField, setSortField] = useState<string>('ingredient_name')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  if (!inventory || !inventory.ingredients) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <p>{language === 'en' ? 'No inventory data available' : '无库存数据'}</p>
      </div>
    )
  }

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const sortedIngredients = [...inventory.ingredients].sort((a, b) => {
    const aVal = a[sortField]
    const bVal = b[sortField]
    
    if (sortDirection === 'asc') {
      return aVal > bVal ? 1 : -1
    } else {
      return aVal < bVal ? 1 : -1
    }
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'low_stock':
      case 'critical':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'overstocked':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      default:
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    }
  }

  const getStatusText = (status: string) => {
    if (language === 'zh') {
      switch (status) {
        case 'low_stock':
          return '低库存'
        case 'critical':
          return '紧急'
        case 'overstocked':
          return '过剩'
        default:
          return '充足'
      }
    } else {
      switch (status) {
        case 'low_stock':
          return 'Low Stock'
        case 'critical':
          return 'Critical'
        case 'overstocked':
          return 'Overstocked'
        default:
          return 'Adequate'
      }
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-primary-navy dark:text-primary-rice mb-4">
        {language === 'en' ? 'Inventory Overview' : '库存概览'}
      </h2>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th
                className="text-left py-3 px-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => handleSort('ingredient_name')}
              >
                {language === 'en' ? 'Ingredient' : '配料'}
              </th>
              <th
                className="text-left py-3 px-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => handleSort('current_stock')}
              >
                {language === 'en' ? 'Current Stock' : '当前库存'}
              </th>
              <th className="text-left py-3 px-4">
                {language === 'en' ? 'Reorder Point' : '补货点'}
              </th>
              <th className="text-left py-3 px-4">
                {language === 'en' ? 'Status' : '状态'}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedIngredients.map((ingredient: any) => (
              <tr
                key={ingredient.ingredient_id}
                className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="py-3 px-4 font-medium">
                  {ingredient.ingredient_name}
                </td>
                <td className="py-3 px-4">
                  {ingredient.current_stock.toFixed(2)} {ingredient.unit}
                </td>
                <td className="py-3 px-4">
                  {ingredient.reorder_point.toFixed(2)} {ingredient.unit}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(
                      ingredient.status
                    )}`}
                  >
                    {getStatusText(ingredient.status)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

