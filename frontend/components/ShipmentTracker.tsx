import { useLanguage } from './LanguageProvider'
import { format } from 'date-fns'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface ShipmentTrackerProps {
  shipments: any
}

export default function ShipmentTracker({ shipments }: ShipmentTrackerProps) {
  const { language } = useLanguage()

  if (!shipments) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <p>{language === 'en' ? 'No shipment data available' : '无运输数据'}</p>
      </div>
    )
  }

  const chartData = shipments.shipments?.map((shipment: any) => ({
    name: shipment.ingredient_id?.substring(0, 10) || 'N/A',
    leadTime: shipment.lead_time_days || 0,
    status: shipment.status,
  })) || []

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-primary-navy dark:text-primary-rice mb-4">
        {language === 'en' ? 'Shipment Tracker' : '运输追踪'}
      </h2>
      
      {shipments.statistics && (
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {language === 'en' ? 'Total Shipments' : '总运输数'}
            </p>
            <p className="text-2xl font-bold">{shipments.statistics.total_shipments}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {language === 'en' ? 'Average Lead Time' : '平均交货时间'}
            </p>
            <p className="text-2xl font-bold">
              {shipments.statistics.average_lead_time?.toFixed(1) || 0} days
            </p>
          </div>
        </div>
      )}

      {chartData.length > 0 && (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="leadTime" fill="#00A878" name={language === 'en' ? 'Lead Time (days)' : '交货时间（天）'} />
          </BarChart>
        </ResponsiveContainer>
      )}

      <div className="mt-4 space-y-2">
        {shipments.shipments?.slice(0, 5).map((shipment: any) => (
          <div
            key={shipment.shipment_id}
            className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded"
          >
            <div>
              <p className="font-medium">{shipment.ingredient_id}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {shipment.vendor}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold">{shipment.status}</p>
              {shipment.lead_time_days && (
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {shipment.lead_time_days} days
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

