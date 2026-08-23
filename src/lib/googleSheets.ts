/**
 * Google Sheets Auto-Sync Entegrasyonu
 * Approved participant applications are synced to Google Sheets API / Webhook.
 */
export async function syncApplicationToGoogleSheets(applicationData: {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  age?: number;
  grade?: string;
  gender?: string;
  requested_role?: string;
  created_at: string;
}) {
  const webhookUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) {
    console.log('[Google Sheets Sync Mock] Webhook URL not set. Synced locally:', applicationData);
    return { success: true, mode: 'local_logged' };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(applicationData),
    });
    return { success: response.ok, status: response.status };
  } catch (error) {
    console.error('[Google Sheets Sync Error]:', error);
    return { success: false, error };
  }
}
