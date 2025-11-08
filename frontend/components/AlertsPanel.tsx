import { useLanguage } from './LanguageProvider'

interface AlertsPanelProps {
  inventory: any
}

export default function AlertsPanel({ inventory }: AlertsPanelProps) {
  const { language } = useLanguage()

  if (!inventory || !inventory.ingredients) {
    return null
  }

  const lowStockItems = inventory.ingredients.filter(
    (ing: any) => ing.status === 'low_stock' || ing.status === 'critical'
  )

  const overstockedItems = inventory.ingredients.filter(
    (ing: any) => ing.status === 'overstocked'
  )

  if (lowStockItems.length === 0 && overstockedItems.length === 0) {
    return null
  }

  return (
    <div className="mb-6 space-y-4">
      {lowStockItems.length > 0 && (
        <div className="bg-red-50 dark:bg-red-900 border-l-4 border-red-500 p-4 rounded">
          <h3 className="font-bold text-red-800 dark:text-red-200 mb-2">
            {language === 'en' ? '⚠️ Low Stock Alerts' : '⚠️ 低库存警报'}
          </h3>
          <ul className="space-y-1">
            {lowStockItems.slice(0, 5).map((item: any) => (
              <li key={item.ingredient_id} className="text-red-700 dark:text-red-300">
                • {item.ingredient_name}: {item.current_stock.toFixed(2)} {item.unit} 
                ({language === 'en' ? 'Reorder at' : '补货点'} {item.reorder_point.toFixed(2)})
              </li>
            ))}
          </ul>
        </div>
      )}

      {overstockedItems.length > 0 && (
        <div className="bg-yellow-50 dark:bg-yellow-900 border-l-4 border-yellow-500 p-4 rounded">
          <h3 className="font-bold text-yellow-800 dark:text-yellow-200 mb-2">
            {language === 'en' ? '📦 Overstocked Items' : '📦 库存过剩物品'}
          </h3>
          <ul className="space-y-1">
            {overstockedItems.slice(0, 5).map((item: any) => (
              <li key={item.ingredient_id} className="text-yellow-700 dark:text-yellow-300">
                • {item.ingredient_name}: {item.current_stock.toFixed(2)} {item.unit}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

