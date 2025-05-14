
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
    
    if (action === "analyze_transaction") {
      return await analyzeTransaction(openaiApiKey, data, corsHeaders);
    } else if (action === "ai_chat") {
      return await handleAIChat(openaiApiKey, data, corsHeaders);
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

async function analyzeTransaction(apiKey: string, transactionData: any, corsHeaders: HeadersInit) {
  // Craft a specific prompt for fraud analysis
  const messages = [
    {
      role: "system",
      content: `You are FraudShield AI, an expert fraud detection system. 
      Your task is to analyze transaction data and identify potential fraud indicators.
      Provide your analysis in JSON format with these fields:
      - riskScore: number between 0-100
      - riskAssessment: "low", "medium", or "high"
      - riskFactors: array of identified risk factors
      - recommendations: array of recommended actions
      Be precise and concise. Base your analysis on known fraud patterns.`
    },
    {
      role: "user",
      content: `Analyze this transaction for potential fraud:\n${JSON.stringify(transactionData, null, 2)}`
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

  // Extract the AI's analysis
  const analysisText = result.choices[0].message.content;
  
  // Parse the JSON response from the AI
  let analysis;
  try {
    // Find JSON in the response (in case the model adds explanatory text)
    const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      analysis = JSON.parse(jsonMatch[0]);
    } else {
      throw new Error("Could not extract JSON from AI response");
    }
  } catch (error) {
    console.error("Error parsing AI response:", error);
    // Fallback to returning the raw text
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

async function handleAIChat(apiKey: string, chatData: any, corsHeaders: HeadersInit) {
  const { messages, previousContext } = chatData;
  
  const systemMessage = {
    role: "system",
    content: `You are FraudShield AI, an expert assistant in financial fraud detection and prevention.
    You help financial institutions and compliance teams with:
    
    1. Understanding fraud patterns and trends
    2. Analyzing suspicious transactions
    3. Providing guidance on regulatory compliance
    4. Suggesting risk mitigation strategies
    5. Explaining money laundering techniques and countermeasures
    
    Base your responses on industry best practices and regulations like AML, KYC, and fraud prevention standards.
    Be specific, concise, and practical. When relevant, cite specific regulations or standards.
    If you don't know something, say so rather than providing incorrect information.`
  };
  
  const allMessages = [systemMessage];
  
  // Add previous context if available
  if (previousContext && Array.isArray(previousContext)) {
    allMessages.push(...previousContext);
  }
  
  // Add new messages
  allMessages.push(...messages);

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: allMessages,
      temperature: 0.7,
    }),
  });

  const result = await response.json();
  
  if (result.error) {
    throw new Error(`OpenAI API Error: ${result.error.message}`);
  }

  return new Response(
    JSON.stringify({ 
      response: result.choices[0].message.content,
      usage: result.usage
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}
