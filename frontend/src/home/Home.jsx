import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'

import { useEffect, useState } from 'react'

// const API = import.meta.env.VITE_API_URL || 'https://react-shiksak-sarthi-d-bcib.vercel.app'
const API = import.meta.env.VITE_API_URL || 'https://react-shiksak-sarthi-d-bcib.vercel.app'

export default function Home() {

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
  fetchList()
}, [])

// async function fetchList() {
//     try {
//       setLoading(true)
//       const res = await fetch(`${API}/api/media/cloudinary`)
//       const data = await res.json()

//       const resources = data.resources || []

//       const normalized = resources.map((r) => ({
//         _id: r.asset_id || r.public_id,
//         url: r.secure_url || r.url || '',
//         public_id: r.public_id,
//         resource_type: r.resource_type || 'unknown',
//         format: r.format,
//         createdAt: r.created_at
//       }))

//       setItems(normalized)
//     } catch (err) {
//       console.error(err)
//       setMessage('Failed to load uploaded items')
//     } finally {
//       setLoading(false)
//     }
// }
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <p className="read-the-docs">
        Use the Upload link to upload files to the backend and view the uploaded list.
      </p>
      {/* <section>
        <h3>Uploaded items</h3>
        {loading && <div>Loading list...</div>}
        {!loading && items.length === 0 && <div>No uploaded items found.</div>}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, 160px)', gap: 12 }}>
          {items.map((it) => (
            <div key={it._id} style={{ border: '1px solid #eee', padding: 8 }}>
              {it.resource_type && it.resource_type.startsWith('image') ? (
                <img src={it.url} alt={it.public_id || it._id} style={{ width: '100%', height: 100, objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '100%', height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{it.format || it.resource_type}</div>
              )}
              <div style={{ fontSize: 12, marginTop: 6 }}>{new Date(it.createdAt).toLocaleString()}</div>
            </div>
          ))}
        </div>
      </section> */}
    </>
  )
}
