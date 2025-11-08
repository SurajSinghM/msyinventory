import { useLanguage } from './LanguageProvider'
import { format } from 'date-fns'

interface ForecastCardProps {
  forecast: any
}

export default function ForecastCard({ forecast }: ForecastCardProps) {
  const { language } = useLanguage()

  if (!forecast) {
    return null
  }

  const reorderDate = forecast.reorder_date
    ? new Date(forecast.reorder_date)
    : null

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-primary-navy dark:text-primary-rice mb-2">
        {forecast.ingredient_id.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
      </h3>
      
      <div className="space-y-2">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {language === 'en' ? 'Reorder Date:' : '补货日期：'}
          </p>
          <p className="font-semibold">
            {reorderDate
              ? format(reorderDate, 'MMM dd, yyyy')
              : language === 'en' ? 'N/A' : '无'}
          </p>
        </div>
        
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {language === 'en' ? 'Reorder Quantity:' : '补货数量：'}
          </p>
          <p className="font-semibold text-primary-jade">
            {forecast.reorder_quantity?.toFixed(2) || 'N/A'}
          </p>
        </div>
        
        {forecast.forecast && forecast.forecast.length > 0 && (
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {language === 'en' ? 'Next 7 Days:' : '未来7天：'}
            </p>
            <p className="font-semibold">
              {forecast.forecast
                .slice(0, 7)
                .reduce((sum: number, f: any) => sum + (f.predicted_demand || 0), 0)
                .toFixed(2)}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

