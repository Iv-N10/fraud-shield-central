
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
    
    console.log(`Processing action: ${action}`);
    
    if (action === "health_check") {
      return await handleHealthCheck(corsHeaders);
    } else if (action === "analyze_transaction") {
      return await analyzeTransaction(openaiApiKey, data, corsHeaders);
    } else if (action === "ai_chat") {
      return await handleAIChat(openaiApiKey, data, corsHeaders);
    } else {
      throw new Error('Invalid action specified');
    }
  } catch (error) {
    console.error('Error:', error.message);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        timestamp: new Date().toISOString(),
        status: 'error'
      }),
      { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

async function handleHealthCheck(corsHeaders: HeadersInit) {
  console.log('Health check requested');
  
  try {
    // Test OpenAI API connectivity
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Simple test call to OpenAI
    const response = await fetch('https://api.openai.com/v1/models', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`OpenAI API test failed: ${response.status}`);
    }

    return new Response(
      JSON.stringify({ 
        status: 'healthy',
        timestamp: new Date().toISOString(),
        services: {
          openai: 'connected',
          supabase: 'connected'
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Health check failed:', error);
    return new Response(
      JSON.stringify({ 
        status: 'unhealthy',
        error: error.message,
        timestamp: new Date().toISOString()
      }),
      { 
        status: 503,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
}

async function analyzeTransaction(apiKey: string, transactionData: any, corsHeaders: HeadersInit) {
  console.log('Analyzing transaction:', transactionData?.id || 'unknown');
  
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

  try {
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
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenAI API Error: ${errorData.error?.message || response.statusText}`);
    }

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
        error: "Failed to parse structured data from AI response",
        riskScore: 50,
        riskAssessment: "medium",
        riskFactors: ["Unable to parse detailed analysis"],
        recommendations: ["Manual review recommended"]
      };
    }

    console.log('Transaction analysis completed successfully');
    
    return new Response(
      JSON.stringify({ 
        analysis,
        timestamp: new Date().toISOString(),
        status: 'success'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Transaction analysis error:', error);
    throw error;
  }
}

async function handleAIChat(apiKey: string, chatData: any, corsHeaders: HeadersInit) {
  const { messages, previousContext, messageId } = chatData;
  
  console.log(`Processing AI chat request, messageId: ${messageId || 'unknown'}`);
  
  const systemMessage = {
    role: "system",
    content: `You are FraudShield AI, an expert assistant in financial fraud detection and prevention.
    You help financial institutions and compliance teams with:
    
    1. Understanding fraud patterns and trends
    2. Analyzing suspicious transactions
    3. Providing guidance on regulatory compliance (AML, KYC, GDPR, PCI DSS)
    4. Suggesting risk mitigation strategies
    5. Explaining money laundering techniques and countermeasures
    6. Cybersecurity best practices for financial institutions
    7. Real-time threat detection and response
    
    You are designed for enterprise-level financial institutions and should provide:
    - Specific, actionable advice
    - Industry best practices and regulatory compliance guidance
    - Clear explanations with practical examples
    - Professional, authoritative responses
    
    Base your responses on current financial regulations and industry standards.
    If you don't know something specific, say so rather than providing incorrect information.
    Always prioritize security and compliance in your recommendations.`
  };
  
  const allMessages = [systemMessage];
  
  // Add previous context if available
  if (previousContext && Array.isArray(previousContext)) {
    allMessages.push(...previousContext);
  }
  
  // Add new messages
  allMessages.push(...messages);

  try {
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
        max_tokens: 2000,
        presence_penalty: 0.1,
        frequency_penalty: 0.1,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenAI API Error: ${errorData.error?.message || response.statusText}`);
    }

    const result = await response.json();
    
    if (result.error) {
      throw new Error(`OpenAI API Error: ${result.error.message}`);
    }

    console.log('AI chat response generated successfully');

    return new Response(
      JSON.stringify({ 
        response: result.choices[0].message.content,
        usage: result.usage,
        messageId: messageId,
        timestamp: new Date().toISOString(),
        status: 'success'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('AI chat error:', error);
    throw error;
  }
}
