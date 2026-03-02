import type { VercelRequest, VercelResponse } from '@vercel/node'
import { put } from '@vercel/blob'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { filename, file } = req.body

  if (!filename || !file) {
    return res.status(400).json({ error: 'Missing data' })
  }

  const buffer = Buffer.from(file, 'base64')

  const blob = await put(`previews/${filename}`, buffer, {
    access: 'public'
  })

  return res.status(200).json({ url: blob.url })
}
