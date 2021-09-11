import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://vppihpcglplkfpdfrdbq.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMTI0ODk5NywiZXhwIjoxOTQ2ODI0OTk3fQ.EJW6E_SA0GaExpHFYoX_Jr5KAvWWfoFQc1SkWv_LLUk');

export default supabase;