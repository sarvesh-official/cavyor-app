import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:5000';

export async function GET(
  request: NextRequest,
  { params }: { params: { tenantId: string } }
) {
  try {
    const response = await fetch(`${API_BASE_URL}/tenants/${params.tenantId}/branding`);
    
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch branding' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching branding:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { tenantId: string } }
) {
  try {
    const body = await request.json();
    
    const response = await fetch(`${API_BASE_URL}/tenants/${params.tenantId}/branding`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to update branding' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error updating branding:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
