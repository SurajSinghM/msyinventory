import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import Header from '@/components/Header'
import InventoryTable from '@/components/InventoryTable'
import ForecastCard from '@/components/ForecastCard'
import ShipmentTracker from '@/components/ShipmentTracker'
import CostOptimization from '@/components/CostOptimization'
import AlertsPanel from '@/components/AlertsPanel'
import { useLanguage } from '@/components/LanguageProvider'
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { language, t } = useLanguage()
  const [inventory, setInventory] = useState<any>(null)
  const [forecasts, setForecasts] = useState<any[]>([])
  const [shipments, setShipments] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/')
    }
  }, [status, router])

  useEffect(() => {
    if (session) {
      fetchData()
    }
  }, [session])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [inventoryRes, forecastsRes, shipmentsRes] = await Promise.all([
        axios.get(`${API_URL}/inventory/levels`),
        axios.post(`${API_URL}/forecast/bulk`, { horizon: 30 }),
        axios.get(`${API_URL}/shipments`),
      ])

      setInventory(inventoryRes.data)
      setForecasts(forecastsRes.data.forecasts || [])
      setShipments(shipmentsRes.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-primary-rice dark:bg-primary-navy flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <>
      <Head>
        <title>{t('inventory.overview')} - Mai Shan Yun</title>
      </Head>
      <div className="min-h-screen bg-primary-rice dark:bg-primary-navy">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          {/* KPIs */}
          {inventory && inventory.kpis && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {language === 'en' ? 'Total Ingredients' : '总配料数'}
                </h3>
                <p className="text-3xl font-bold text-primary-navy dark:text-primary-rice">
                  {inventory.kpis.total_ingredients}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {language === 'en' ? 'Low Stock' : '低库存'}
                </h3>
                <p className="text-3xl font-bold text-primary-red">
                  {inventory.kpis.low_stock_count}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {language === 'en' ? 'Overstocked' : '库存过剩'}
                </h3>
                <p className="text-3xl font-bold text-primary-gold">
                  {inventory.kpis.overstocked_count}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {language === 'en' ? 'Adequate' : '充足'}
                </h3>
                <p className="text-3xl font-bold text-primary-jade">
                  {inventory.kpis.adequate_count}
                </p>
              </div>
            </div>
          )}

          {/* Alerts Panel */}
          <AlertsPanel inventory={inventory} />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Inventory Table */}
            <div className="lg:col-span-2">
              <InventoryTable inventory={inventory} />
            </div>

            {/* Forecast Cards */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-primary-navy dark:text-primary-rice mb-4">
                {t('forecast')}
              </h2>
              {forecasts.slice(0, 3).map((forecast) => (
                <ForecastCard key={forecast.ingredient_id} forecast={forecast} />
              ))}
            </div>
          </div>

          {/* Shipment Tracker and Cost Optimization */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ShipmentTracker shipments={shipments} />
            <CostOptimization inventory={inventory} />
          </div>
        </main>
      </div>
    </>
  )
}

