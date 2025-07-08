import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-200">404 - Page Not Found</h1>
      <p className="text-xl mb-8 text-gray-600 dark:text-gray-400">Oops! The page you're looking for doesn't exist.</p>
      <Link href="/" className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-md hover:from-red-600 hover:to-orange-600 transition-colors">
        Go back home
      </Link>
    </div>
  )
}
