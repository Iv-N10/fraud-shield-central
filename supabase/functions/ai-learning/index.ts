
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiApiKey) {
      throw new Error('OpenAI API key not found');
    }

    const { action, data } = await req.json();
    
    if (action === "learn_patterns") {
      return await learnFromPatterns(openaiApiKey, data, corsHeaders);
    } else if (action === "analyze_platform_activity") {
      return await analyzePlatformActivity(openaiApiKey, data, corsHeaders);
    } else if (action === "adapt_models") {
      return await adaptModels(openaiApiKey, data, corsHeaders);
    } else {
      throw new Error('Invalid action specified');
    }
  } catch (error) {
    console.error('Error:', error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

async function learnFromPatterns(apiKey: string, patternData: any, corsHeaders: HeadersInit) {
  const messages = [
    {
      role: "system",
      content: `You are an advanced ML fraud detection system that learns from new patterns.
      Analyze the provided fraud patterns and determine:
      1. Pattern significance and novelty
      2. Risk level assessment
      3. Recommended model adaptations
      4. Learning confidence score (0-100)
      
      Respond in JSON format with these fields:
      - significance: "low", "medium", "high"
      - novelty: boolean
      - riskLevel: number (0-100)
      - adaptations: array of recommended changes
      - confidence: number (0-100)
      - learningInsights: array of key insights`
    },
    {
      role: "user",
      content: `Learn from these fraud patterns:\n${JSON.stringify(patternData, null, 2)}`
    }
  ];

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages,
      temperature: 0.3,
    }),
  });

  const result = await response.json();
  
  if (result.error) {
    throw new Error(`OpenAI API Error: ${result.error.message}`);
  }

  const analysisText = result.choices[0].message.content;
  
  let learning;
  try {
    const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      learning = JSON.parse(jsonMatch[0]);
    } else {
      throw new Error("Could not extract JSON from AI response");
    }
  } catch (error) {
    console.error("Error parsing AI response:", error);
    learning = { 
      rawResponse: analysisText,
      error: "Failed to parse structured data from AI response"
    };
  }

  return new Response(
    JSON.stringify({ learning }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function analyzePlatformActivity(apiKey: string, activityData: any, corsHeaders: HeadersInit) {
  const messages = [
    {
      role: "system",
      content: `You are a platform activity analyzer that identifies trends and anomalies.
      Analyze user behavior, transaction patterns, and system interactions to:
      1. Identify behavioral anomalies
      2. Detect emerging fraud patterns
      3. Assess overall platform health
      4. Recommend proactive measures
      
      Respond in JSON format with:
      - anomalies: array of detected anomalies
      - trends: array of behavioral trends
      - healthScore: number (0-100)
      - recommendations: array of actions
      - riskIndicators: array of risk factors`
    },
    {
      role: "user",
      content: `Analyze this platform activity data:\n${JSON.stringify(activityData, null, 2)}`
    }
  ];

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages,
      temperature: 0.2,
    }),
  });

  const result = await response.json();
  
  if (result.error) {
    throw new Error(`OpenAI API Error: ${result.error.message}`);
  }

  const analysisText = result.choices[0].message.content;
  
  let analysis;
  try {
    const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      analysis = JSON.parse(jsonMatch[0]);
    } else {
      throw new Error("Could not extract JSON from AI response");
    }
  } catch (error) {
    console.error("Error parsing AI response:", error);
    analysis = { 
      rawResponse: analysisText,
      error: "Failed to parse structured data from AI response"
    };
  }

  return new Response(
    JSON.stringify({ analysis }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function adaptModels(apiKey: string, adaptationData: any, corsHeaders: HeadersInit) {
  const messages = [
    {
      role: "system",
      content: `You are an ML model adaptation engine that optimizes fraud detection models.
      Based on new data and patterns, determine how to adapt existing models:
      1. Model parameter adjustments
      2. New feature importance weights
      3. Threshold optimizations
      4. Training data recommendations
      
      Respond in JSON format with:
      - adaptations: array of specific model changes
      - newFeatures: array of features to add/modify
      - thresholds: object with recommended threshold changes
      - trainingNeeds: array of additional training requirements
      - expectedImprovement: number (0-100) percentage improvement`
    },
    {
      role: "user",
      content: `Adapt models based on this data:\n${JSON.stringify(adaptationData, null, 2)}`
    }
  ];

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages,
      temperature: 0.1,
    }),
  });

  const result = await response.json();
  
  if (result.error) {
    throw new Error(`OpenAI API Error: ${result.error.message}`);
  }

  const analysisText = result.choices[0].message.content;
  
  let adaptation;
  try {
    const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      adaptation = JSON.parse(jsonMatch[0]);
    } else {
      throw new Error("Could not extract JSON from AI response");
    }
  } catch (error) {
    console.error("Error parsing AI response:", error);
    adaptation = { 
      rawResponse: analysisText,
      error: "Failed to parse structured data from AI response"
    };
  }

  return new Response(
    JSON.stringify({ adaptation }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}
