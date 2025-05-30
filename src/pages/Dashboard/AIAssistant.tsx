
import React, { useState, useRef, useEffect } from 'react';
import { User2, Send, Loader2, Bot, AlertCircle, Wifi, WifiOff } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  id: string;
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [sampleQuestions] = useState([
    "What are common signs of transaction fraud?",
    "How can I improve our KYC process?",
    "Explain AML compliance requirements",
    "What risk factors should I look for in cross-border payments?",
    "How to detect synthetic identity fraud?"
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const retryTimeoutRef = useRef<NodeJS.Timeout>();
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Test connection on mount
    testConnection();
    
    // Set up periodic connection health check
    const healthCheckInterval = setInterval(testConnection, 30000);
    
    return () => {
      clearInterval(healthCheckInterval);
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, []);

  const testConnection = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('fraud-ai', {
        body: { 
          action: 'health_check',
          data: {}
        }
      });
      
      if (error) throw error;
      
      setIsConnected(true);
      setConnectionError(null);
      setRetryCount(0);
    } catch (error) {
      console.error('Connection test failed:', error);
      setIsConnected(false);
      setConnectionError(error instanceof Error ? error.message : 'Connection failed');
      
      // Auto-retry with exponential backoff
      if (retryCount < 3) {
        const delay = Math.pow(2, retryCount) * 1000; // 1s, 2s, 4s
        retryTimeoutRef.current = setTimeout(() => {
          setRetryCount(prev => prev + 1);
          testConnection();
        }, delay);
      }
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const generateMessageId = () => {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !isConnected) return;

    const messageId = generateMessageId();
    const userMessage: Message = {
      id: messageId,
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Get previous messages for context (last 10 only)
      const contextMessages = messages
        .slice(-10)
        .map(msg => ({ role: msg.role, content: msg.content }));

      const { data, error } = await supabase.functions.invoke('fraud-ai', {
        body: { 
          action: 'ai_chat',
          data: { 
            messages: [{ role: 'user', content: userMessage.content }],
            previousContext: contextMessages,
            messageId: messageId
          }
        }
      });

      if (error) throw new Error(error.message);

      if (data && data.response) {
        const assistantMessage: Message = {
          id: generateMessageId(),
          role: 'assistant',
          content: data.response,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, assistantMessage]);
        
        // Reset connection state on successful response
        setIsConnected(true);
        setConnectionError(null);
        setRetryCount(0);
      }
    } catch (error) {
      console.error('Error calling AI assistant:', error);
      
      // Update connection state
      setIsConnected(false);
      setConnectionError(error instanceof Error ? error.message : 'Unknown error');
      
      // Add error message to chat
      const errorMessage: Message = {
        id: generateMessageId(),
        role: 'assistant',
        content: 'I apologize, but I\'m experiencing connectivity issues. Please try again in a moment.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: 'Connection Error',
        description: 'Failed to get a response from the AI assistant. Retrying...',
        variant: 'destructive',
      });
      
      // Auto-retry connection
      testConnection();
    } finally {
      setIsLoading(false);
    }
  };

  const handleSampleQuestion = (question: string) => {
    if (!isConnected) {
      toast({
        title: 'Connection Required',
        description: 'Please wait while we restore the connection.',
        variant: 'destructive',
      });
      return;
    }
    setInput(question);
  };

  const handleRetry = () => {
    setRetryCount(0);
    testConnection();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">FraudShield AI Assistant</h1>
        <p className="text-muted-foreground">Get expert insights on fraud prevention and compliance</p>
      </div>

      {/* Connection Status Bar */}
      <div className="flex items-center justify-between p-3 rounded-lg border bg-card">
        <div className="flex items-center gap-2">
          {isConnected ? (
            <>
              <Wifi className="h-4 w-4 text-green-500" />
              <Badge variant="outline" className="border-green-500 text-green-600">
                Connected
              </Badge>
            </>
          ) : (
            <>
              <WifiOff className="h-4 w-4 text-red-500" />
              <Badge variant="destructive">
                Disconnected
              </Badge>
            </>
          )}
          <span className="text-sm text-muted-foreground">
            Real-time AI Assistant
          </span>
        </div>
        
        {!isConnected && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRetry}
            disabled={retryCount >= 3}
          >
            {retryCount > 0 ? `Retrying... (${retryCount}/3)` : 'Retry Connection'}
          </Button>
        )}
      </div>

      {/* Connection Error Alert */}
      {connectionError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Connection Issue</AlertTitle>
          <AlertDescription>
            {connectionError}. The system will automatically retry the connection.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card className="h-[calc(100vh-280px)] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                AI Assistant
                {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              </CardTitle>
              <CardDescription>
                Ask questions about fraud detection, compliance, and risk management
              </CardDescription>
            </CardHeader>
            
            <CardContent className="flex-grow overflow-auto">
              <div className="space-y-4">
                {messages.length === 0 ? (
                  <div className="flex h-32 flex-col items-center justify-center text-center text-muted-foreground">
                    <Bot className="h-12 w-12 mb-2 opacity-50" />
                    <p>No messages yet. Start a conversation with the AI assistant.</p>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'} gap-2`}
                    >
                      <div 
                        className={`flex max-w-[80%] rounded-lg p-3 ${
                          message.role === 'assistant' 
                            ? 'bg-muted text-primary-foreground' 
                            : 'bg-primary text-primary-foreground'
                        }`}
                      >
                        <div className="flex-shrink-0 mr-2">
                          {message.role === 'user' ? 
                            <User2 className="h-5 w-5" /> : 
                            <Bot className="h-5 w-5" />
                          }
                        </div>
                        <div className="space-y-1">
                          <div className="whitespace-pre-wrap">{message.content}</div>
                          <div className="text-xs opacity-70">
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
                {isLoading && (
                  <div className="flex justify-start gap-2">
                    <div className="max-w-[80%] rounded-lg bg-muted p-3 flex items-center">
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      <span>AI is thinking...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>
            
            <CardFooter>
              <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
                <Input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder={isConnected ? "Type your question here..." : "Reconnecting..."}
                  disabled={isLoading || !isConnected}
                  className="flex-grow"
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  disabled={isLoading || !input.trim() || !isConnected}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sample Questions</CardTitle>
              <CardDescription>
                Not sure what to ask? Try one of these questions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {sampleQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-2 px-3"
                  onClick={() => handleSampleQuestion(question)}
                  disabled={!isConnected}
                >
                  {question}
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Capabilities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-green-50">Fraud Analysis</Badge>
                <span className="text-sm">Detect patterns and anomalies</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-blue-50">Compliance</Badge>
                <span className="text-sm">AML/KYC guidance</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-purple-50">Training</Badge>
                <span className="text-sm">Learn about best practices</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-amber-50">Risk Assessment</Badge>
                <span className="text-sm">Transaction risk scoring</span>
              </div>
            </CardContent>
          </Card>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Privacy Notice</AlertTitle>
            <AlertDescription className="text-sm">
              This AI assistant is for informational purposes only. Do not share sensitive customer data or PII.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
}
