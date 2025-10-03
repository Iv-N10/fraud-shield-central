import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, data } = await req.json();
    const HUGGINGFACE_API_KEY = Deno.env.get('HUGGINGFACE_API_KEY');

    if (!HUGGINGFACE_API_KEY) {
      throw new Error('HUGGINGFACE_API_KEY is not configured');
    }

    switch (action) {
      case 'analyze-transaction':
        return await analyzeTransaction(HUGGINGFACE_API_KEY, data, corsHeaders);
      case 'detect-fraud':
        return await detectFraud(HUGGINGFACE_API_KEY, data, corsHeaders);
      case 'risk-assessment':
        return await riskAssessment(HUGGINGFACE_API_KEY, data, corsHeaders);
      default:
        throw new Error(`Unknown action: ${action}`);
    }
  } catch (error) {
    console.error('Error in apertus-ai function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});

async function analyzeTransaction(apiKey: string, transactionData: any, corsHeaders: any) {
  const prompt = `You are a financial fraud detection expert using the Apertus model. Analyze this transaction for fraud indicators:

Transaction Details:
- Amount: ${transactionData.amount}
- Merchant: ${transactionData.merchant || 'Unknown'}
- Location: ${transactionData.location || 'Unknown'}
- Time: ${transactionData.timestamp || 'Unknown'}
- User History: ${transactionData.userHistory || 'No history available'}

Provide a detailed fraud risk assessment with:
1. Risk Score (0-100)
2. Risk Level (Low/Medium/High/Critical)
3. Key Risk Factors
4. Recommendations

Format your response as JSON with: riskScore, riskLevel, factors (array), recommendations (array)`;

  const response = await fetch(
    "https://api-inference.huggingface.co/models/swiss-ai/Apertus-8B-2509",
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 1000,
          temperature: 0.8,
          top_p: 0.9,
          return_full_text: false,
        }
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Hugging Face API error:', response.status, errorText);
    throw new Error(`Hugging Face API error: ${response.status}`);
  }

  const result = await response.json();
  const generatedText = Array.isArray(result) ? result[0].generated_text : result.generated_text;

  // Try to parse JSON from the response
  let analysis;
  try {
    const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      analysis = JSON.parse(jsonMatch[0]);
    } else {
      // Fallback if JSON parsing fails
      analysis = {
        riskScore: 50,
        riskLevel: 'Medium',
        factors: ['Unable to parse detailed analysis'],
        recommendations: ['Review transaction manually'],
        rawResponse: generatedText
      };
    }
  } catch (parseError) {
    console.error('JSON parse error:', parseError);
    analysis = {
      riskScore: 50,
      riskLevel: 'Medium',
      factors: ['Analysis completed but formatting issue occurred'],
      recommendations: ['Review transaction manually'],
      rawResponse: generatedText
    };
  }

  return new Response(
    JSON.stringify({ analysis }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function detectFraud(apiKey: string, data: any, corsHeaders: any) {
  const prompt = `As a financial fraud detection expert using Apertus, analyze these patterns for fraud:

Data: ${JSON.stringify(data, null, 2)}

Identify:
1. Fraud patterns detected
2. Anomalies in behavior
3. Risk indicators
4. Prevention recommendations

Respond in JSON format with: patterns (array), anomalies (array), riskIndicators (array), preventionSteps (array)`;

  const response = await fetch(
    "https://api-inference.huggingface.co/models/swiss-ai/Apertus-8B-2509",
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 1200,
          temperature: 0.8,
          top_p: 0.9,
          return_full_text: false,
        }
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Hugging Face API error: ${response.status}`);
  }

  const result = await response.json();
  const generatedText = Array.isArray(result) ? result[0].generated_text : result.generated_text;

  let detection;
  try {
    const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
    detection = jsonMatch ? JSON.parse(jsonMatch[0]) : {
      patterns: [],
      anomalies: [],
      riskIndicators: [],
      preventionSteps: [],
      rawResponse: generatedText
    };
  } catch {
    detection = { rawResponse: generatedText };
  }

  return new Response(
    JSON.stringify({ detection }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function riskAssessment(apiKey: string, data: any, corsHeaders: any) {
  const prompt = `As a financial risk assessment expert using Apertus, evaluate this customer/transaction profile:

Profile Data: ${JSON.stringify(data, null, 2)}

Provide comprehensive risk assessment:
1. Overall Risk Score (0-100)
2. Risk Category (Very Low/Low/Medium/High/Very High)
3. Contributing Risk Factors
4. Mitigation Strategies
5. Monitoring Recommendations

Format as JSON: riskScore, category, factors (array), mitigationStrategies (array), monitoringRecommendations (array)`;

  const response = await fetch(
    "https://api-inference.huggingface.co/models/swiss-ai/Apertus-8B-2509",
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 1500,
          temperature: 0.8,
          top_p: 0.9,
          return_full_text: false,
        }
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Hugging Face API error: ${response.status}`);
  }

  const result = await response.json();
  const generatedText = Array.isArray(result) ? result[0].generated_text : result.generated_text;

  let assessment;
  try {
    const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
    assessment = jsonMatch ? JSON.parse(jsonMatch[0]) : {
      riskScore: 50,
      category: 'Medium',
      factors: [],
      mitigationStrategies: [],
      monitoringRecommendations: [],
      rawResponse: generatedText
    };
  } catch {
    assessment = { rawResponse: generatedText };
  }

  return new Response(
    JSON.stringify({ assessment }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}
