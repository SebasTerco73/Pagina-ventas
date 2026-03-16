import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const productos = JSON.parse(readFileSync('./public/data/products.json', 'utf-8'))

const supabase = createClient(
  'https://oboeyxvpcplodguqobpw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ib2V5eHZwY3Bsb2RndXFvYnB3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2MDY3OTUsImV4cCI6MjA4OTE4Mjc5NX0.6idfkr8bpEzZZUeeq4eHSJM3L23ynaXDQozIhazhxNA'
)

const BASE_URL = 'https://oboeyxvpcplodguqobpw.supabase.co/storage/v1/object/public/productos'

const productosAdaptados = productos.map(p => ({
  name: p.name,
  list_price: p.listPrice,
  price: p.price,
  category: p.category,
  description: p.description,
  image_url: `${BASE_URL}/${p.imageUrl.replace('/images/', '')}`
}))

const { error } = await supabase.from('productos').insert(productosAdaptados)

if (error) console.error('Error:', error)
else console.log('✅ Productos migrados correctamente')