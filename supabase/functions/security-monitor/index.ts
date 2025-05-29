
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
    
    if (action === "threat_analysis") {
      return await analyzeThreat(openaiApiKey, data, corsHeaders);
    } else if (action === "security_assessment") {
      return await assessSecurity(openaiApiKey, data, corsHeaders);
    } else if (action === "compliance_check") {
      return await checkCompliance(openaiApiKey, data, corsHeaders);
    } else if (action === "incident_response") {
      return await respondToIncident(openaiApiKey, data, corsHeaders);
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

async function analyzeThreat(apiKey: string, threatData: any, corsHeaders: HeadersInit) {
  const messages = [
    {
      role: "system",
      content: `You are FraudShield's advanced threat analysis AI, designed with military-grade security expertise.
      Your capabilities include:
      - Real-time threat detection and classification
      - Advanced persistent threat (APT) identification
      - Zero-day vulnerability assessment
      - Nation-state attack pattern recognition
      - Financial sector specific threat analysis
      
      Analyze the provided security data and respond in JSON format with:
      - threatLevel: "low", "medium", "high", "critical", "nation-state"
      - threatType: specific classification
      - severity: number (0-100)
      - confidence: confidence level (0-100)
      - indicators: array of threat indicators
      - countermeasures: recommended immediate actions
      - attribution: possible threat actor classification
      - riskToFinancialSector: specific financial impact assessment
      
      Apply the highest security standards equivalent to national defense systems.`
    },
    {
      role: "user",
      content: `Analyze this security threat data:\n${JSON.stringify(threatData, null, 2)}`
    }
  ];

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages,
      temperature: 0.1,
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

async function assessSecurity(apiKey: string, securityData: any, corsHeaders: HeadersInit) {
  const messages = [
    {
      role: "system",
      content: `You are an elite cybersecurity assessment AI with expertise in:
      - NIST Cybersecurity Framework
      - ISO 27001/27002 standards
      - Financial sector regulations (PCI DSS, SOX, Basel III)
      - Zero-trust architecture principles
      - Defense-in-depth strategies
      
      Assess the security posture and provide recommendations in JSON format:
      - overallScore: security score (0-100)
      - vulnerabilities: array of identified weaknesses
      - strengths: array of security strengths
      - recommendations: prioritized improvement actions
      - complianceGaps: regulatory compliance issues
      - riskAssessment: detailed risk analysis
      - benchmarkComparison: comparison to industry standards`
    },
    {
      role: "user",
      content: `Assess this security configuration:\n${JSON.stringify(securityData, null, 2)}`
    }
  ];

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages,
      temperature: 0.2,
    }),
  });

  const result = await response.json();
  
  if (result.error) {
    throw new Error(`OpenAI API Error: ${result.error.message}`);
  }

  const analysisText = result.choices[0].message.content;
  
  let assessment;
  try {
    const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      assessment = JSON.parse(jsonMatch[0]);
    } else {
      throw new Error("Could not extract JSON from AI response");
    }
  } catch (error) {
    console.error("Error parsing AI response:", error);
    assessment = { 
      rawResponse: analysisText,
      error: "Failed to parse structured data from AI response"
    };
  }

  return new Response(
    JSON.stringify({ assessment }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function checkCompliance(apiKey: string, complianceData: any, corsHeaders: HeadersInit) {
  const messages = [
    {
      role: "system",
      content: `You are a compliance expert AI specializing in financial services regulations:
      - PCI DSS (Payment Card Industry Data Security Standard)
      - SOX (Sarbanes-Oxley Act)
      - GDPR (General Data Protection Regulation)
      - ISO 27001 Information Security Management
      - Basel III banking regulations
      - FFIEC guidelines
      
      Analyze compliance status and respond in JSON format:
      - overallCompliance: percentage (0-100)
      - standardsAssessment: object with each standard's compliance level
      - violations: array of compliance violations
      - recommendations: corrective actions required
      - certificationStatus: current certification levels
      - auditReadiness: assessment of audit preparedness
      - regulatoryRisk: potential regulatory penalties`
    },
    {
      role: "user",
      content: `Check compliance for:\n${JSON.stringify(complianceData, null, 2)}`
    }
  ];

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages,
      temperature: 0.1,
    }),
  });

  const result = await response.json();
  
  if (result.error) {
    throw new Error(`OpenAI API Error: ${result.error.message}`);
  }

  const analysisText = result.choices[0].message.content;
  
  let compliance;
  try {
    const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      compliance = JSON.parse(jsonMatch[0]);
    } else {
      throw new Error("Could not extract JSON from AI response");
    }
  } catch (error) {
    console.error("Error parsing AI response:", error);
    compliance = { 
      rawResponse: analysisText,
      error: "Failed to parse structured data from AI response"
    };
  }

  return new Response(
    JSON.stringify({ compliance }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function respondToIncident(apiKey: string, incidentData: any, corsHeaders: HeadersInit) {
  const messages = [
    {
      role: "system",
      content: `You are FraudShield's emergency incident response AI with expertise in:
      - Cybersecurity incident response (NIST SP 800-61)
      - Financial sector incident management
      - Breach notification requirements
      - Business continuity planning
      - Forensic analysis coordination
      - Regulatory reporting obligations
      
      Provide immediate incident response plan in JSON format:
      - severity: incident severity level
      - responsePhase: current NIST phase (Preparation, Detection, Containment, Eradication, Recovery, Lessons Learned)
      - immediateActions: urgent steps to take
      - containmentStrategy: threat containment plan
      - communicationPlan: stakeholder notification strategy
      - evidencePreservation: forensic preservation steps
      - regulatoryNotifications: required regulatory reports
      - recoveryPlan: system recovery procedures
      - timeEstimate: estimated resolution time`
    },
    {
      role: "user",
      content: `Respond to this security incident:\n${JSON.stringify(incidentData, null, 2)}`
    }
  ];

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages,
      temperature: 0.1,
    }),
  });

  const result = await response.json();
  
  if (result.error) {
    throw new Error(`OpenAI API Error: ${result.error.message}`);
  }

  const analysisText = result.choices[0].message.content;
  
  let response_plan;
  try {
    const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      response_plan = JSON.parse(jsonMatch[0]);
    } else {
      throw new Error("Could not extract JSON from AI response");
    }
  } catch (error) {
    console.error("Error parsing AI response:", error);
    response_plan = { 
      rawResponse: analysisText,
      error: "Failed to parse structured data from AI response"
    };
  }

  return new Response(
    JSON.stringify({ response_plan }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}
