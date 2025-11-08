import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import Header from '@/components/Header'
import { useLanguage } from '@/components/LanguageProvider'
import axios from 'axios'
import toast from 'react-hot-toast'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export default function DataUpload() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { language } = useLanguage()
  const [uploading, setUploading] = useState(false)
  const [file, setFile] = useState<File | null>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/')
    }
  }, [status, router])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) {
      toast.error(language === 'en' ? 'Please select a file' : '请选择文件')
      return
    }

    try {
      setUploading(true)
      const formData = new FormData()
      formData.append('file', file)

      const response = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      toast.success(
        language === 'en'
          ? `File uploaded successfully! ${response.data.rows_processed} rows processed.`
          : `文件上传成功！已处理 ${response.data.rows_processed} 行。`
      )

      // Process the data
      await axios.post(`${API_URL}/process`, {
        file_id: response.data.file_id,
      })

      toast.success(
        language === 'en' ? 'Data processed successfully!' : '数据处理成功！'
      )

      setFile(null)
    } catch (error: any) {
      toast.error(
        error.response?.data?.detail ||
          (language === 'en' ? 'Error uploading file' : '上传文件时出错')
      )
    } finally {
      setUploading(false)
    }
  }

  if (status === 'loading') {
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
        <title>
          {language === 'en' ? 'Upload Data' : '上传数据'} - Mai Shan Yun
        </title>
      </Head>
      <div className="min-h-screen bg-primary-rice dark:bg-primary-navy">
        <Header />

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-primary-navy dark:text-primary-rice mb-8">
              {language === 'en' ? 'Upload Data' : '上传数据'}
            </h1>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {language === 'en' ? 'Select File (CSV or XLSX)' : '选择文件（CSV 或 XLSX）'}
                  </label>
                  <input
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary-jade file:text-white hover:file:bg-opacity-80"
                  />
                </div>

                {file && (
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded">
                    <p className="text-sm">
                      <strong>{language === 'en' ? 'Selected:' : '已选择：'}</strong>{' '}
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                )}

                <button
                  onClick={handleUpload}
                  disabled={!file || uploading}
                  className="w-full px-4 py-2 bg-primary-red text-white rounded-lg hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {uploading
                    ? language === 'en'
                      ? 'Uploading...'
                      : '上传中...'
                    : language === 'en'
                    ? 'Upload & Process'
                    : '上传并处理'}
                </button>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold mb-4">
                  {language === 'en' ? 'Data Schema' : '数据模式'}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {language === 'en'
                    ? 'Supported tables: purchases, shipments, usage, ingredients, sales'
                    : '支持的表：purchases, shipments, usage, ingredients, sales'}
                </p>
                <div className="text-xs font-mono bg-gray-100 dark:bg-gray-900 p-4 rounded overflow-x-auto">
                  <pre>
                    {language === 'en'
                      ? `purchases: purchase_id, vendor, ingredient_id, quantity, unit_cost, purchase_date
shipments: shipment_id, vendor, ingredient_id, quantity, shipped_date, arrived_date, status
usage: usage_id, date, menu_item_id, quantity_sold
ingredients: ingredient_id, ingredient_name, unit, reorder_point, safety_stock
sales: sale_id, date, menu_item_id, units_sold, price, revenue`
                      : `purchases: purchase_id, vendor, ingredient_id, quantity, unit_cost, purchase_date
shipments: shipment_id, vendor, ingredient_id, quantity, shipped_date, arrived_date, status
usage: usage_id, date, menu_item_id, quantity_sold
ingredients: ingredient_id, ingredient_name, unit, reorder_point, safety_stock
sales: sale_id, date, menu_item_id, units_sold, price, revenue`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
