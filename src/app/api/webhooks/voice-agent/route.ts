import { NextRequest, NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

// CORS headers needed for external voice agent platforms (ElevenLabs, etc.)
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
};

// Handle CORS preflight requests
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Log incoming data for debugging
    console.log('Incoming Voice Agent Data:', JSON.stringify(body, null, 2));

    // ElevenLabs sends tool parameters directly as flat JSON body
    // e.g. { "name": "John", "location": "Kondapur", ... }
    // But some configs may nest them — handle both cases
    const data = body.parameters || body.data || body;

    const {
      name,
      location,
      bhk,
      furnished_status,
      tenant_type,
      move_in_date,
      occupants,
      profession,
      budget,
      car_parking,
      phone_number
    } = data;

    // Check for required env variables
    const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;
    const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;

    if (!GOOGLE_SHEET_ID) {
      console.error('Missing GOOGLE_SHEET_ID');
      return NextResponse.json({ error: 'Server configuration error: missing sheet ID' }, { status: 500, headers: corsHeaders });
    }
    if (!GOOGLE_SERVICE_ACCOUNT_EMAIL) {
      console.error('Missing GOOGLE_SERVICE_ACCOUNT_EMAIL');
      return NextResponse.json({ error: 'Server configuration error: missing service account email' }, { status: 500, headers: corsHeaders });
    }
    if (!GOOGLE_PRIVATE_KEY) {
      console.error('Missing GOOGLE_PRIVATE_KEY');
      return NextResponse.json({ error: 'Server configuration error: missing private key' }, { status: 500, headers: corsHeaders });
    }

    // Initialize auth - handle escaped newlines in private key
    // Vercel may store the key with literal \n (two chars) or actual newlines
    // This handles both: \\n -> \n AND already-correct \n stays \n
    let privateKey = GOOGLE_PRIVATE_KEY;
    if (privateKey.includes('\\n')) {
      privateKey = privateKey.replace(/\\n/g, '\n');
    }
    
    const serviceAccountAuth = new JWT({
      email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: privateKey,
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    });

    const doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID, serviceAccountAuth);
    
    // Load document properties and worksheets
    await doc.loadInfo();
    
    // Get the first sheet
    const sheet = doc.sheetsByIndex[0];
    
    // Ensure header row exists (if it doesn't, this won't do anything destructive)
    try {
      await sheet.setHeaderRow([
        'Date',
        'Phone Number',
        'Name',
        'Location',
        'BHK',
        'Furnished Status',
        'Tenant Type',
        'Move-in Date',
        'Occupants',
        'Profession/Working In',
        'Budget',
        'Car Parking'
      ]);
    } catch (e) {
      // Header row might already exist, ignore this error
      console.log('Header row setup skipped/already exists');
    }

    // Append the row
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    
    await sheet.addRow({
      'Date': timestamp,
      'Phone Number': phone_number || 'N/A',
      'Name': name || 'N/A',
      'Location': location || 'N/A',
      'BHK': bhk || 'N/A',
      'Furnished Status': furnished_status || 'N/A',
      'Tenant Type': tenant_type || 'N/A',
      'Move-in Date': move_in_date || 'N/A',
      'Occupants': occupants || 'N/A',
      'Profession/Working In': profession || 'N/A',
      'Budget': budget || 'N/A',
      'Car Parking': car_parking || 'N/A'
    });

    console.log('Lead saved successfully for:', name || 'Unknown');

    return NextResponse.json(
      { success: true, message: 'Lead saved successfully' },
      { status: 200, headers: corsHeaders }
    );

  } catch (error) {
    console.error('Webhook Error:', error instanceof Error ? error.message : error);
    console.error('Full error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500, headers: corsHeaders }
    );
  }
}
