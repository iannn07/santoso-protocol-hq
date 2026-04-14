import { NextResponse } from 'next/server';
import { z } from 'zod';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { SYSTEM_PROMPT } from '@/lib/products';
import { getFallbackRecommendation } from '@/lib/fallback';
import type { RecommendationResponse, RecommendRequest } from '@/lib/types';

const RequestSchema = z.object({
  industry: z.string().min(1),
  industryLabel: z.string().min(1),
  companySize: z.enum(['small', 'medium', 'large_sme', 'enterprise']),
  companySizeLabel: z.string().min(1),
  primaryNeeds: z.array(z.string().min(1)).min(1).max(2),
  primaryNeedsLabels: z.array(z.string().min(1)).min(1).max(2),
});

function buildUserMessage(req: RecommendRequest): string {
  return `Saya adalah pemilik usaha di industri: ${req.industryLabel}
Ukuran perusahaan saya: ${req.companySizeLabel}
Kebutuhan utama bisnis saya: ${req.primaryNeedsLabels.join(' dan ')}

Rekomendasikan paket XLSMART yang paling sesuai untuk saya.`;
}

export async function POST(request: Request): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = RequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request', details: parsed.error.issues }, { status: 400 });
  }

  const req = parsed.data;
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: 'gemini-2.5-flash',
        systemInstruction: SYSTEM_PROMPT,
      });
      const response = await model.generateContent(buildUserMessage(req));
      const text = response.response.text();
      // Strip markdown code fences if present
      const cleaned = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
      const result = JSON.parse(cleaned) as RecommendationResponse;
      return NextResponse.json(result);
    } catch (err) {
      console.error('Gemini API error, using fallback:', err);
    }
  }

  // Fallback to rule-based matrix
  const fallback = getFallbackRecommendation(req);
  return NextResponse.json(fallback);
}
