import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = process.env.SUPABASE_URL
const supabaseUrl = "https://hxvloruvdgwljekxwqwh.supabase.co"
// const supabaseKey = process.env.SUPABASE_KEY
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4dmxvcnV2ZGd3bGpla3h3cXdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc5OTE4NDEsImV4cCI6MjAxMzU2Nzg0MX0.0GKNK-i7lszlopu2MSIkWtsiV3nFo4Kd2x_ryPzHeTw"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase