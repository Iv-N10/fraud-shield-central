
import React, { useState, useRef, useEffect } from 'react';
import { User2, Send, Loader2, Bot, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sampleQuestions] = useState([
    "What are common signs of transaction fraud?",
    "How can I improve our KYC process?",
    "Explain AML compliance requirements",
    "What risk factors should I look for in cross-border payments?",
    "How to detect synthetic identity fraud?"
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = {
      role: 'user' as const,
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
            previousContext: contextMessages
          }
        }
      });

      if (error) throw new Error(error.message);

      if (data && data.response) {
        setMessages(prev => [
          ...prev, 
          { 
            role: 'assistant', 
            content: data.response, 
            timestamp: new Date() 
          }
        ]);
      }
    } catch (error) {
      console.error('Error calling AI assistant:', error);
      toast({
        title: 'Error',
        description: 'Failed to get a response from the AI assistant',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSampleQuestion = (question: string) => {
    setInput(question);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">FraudShield AI Assistant</h1>
        <p className="text-muted-foreground">Get expert insights on fraud prevention and compliance</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card className="h-[calc(100vh-220px)] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                AI Assistant
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
                  messages.map((message, index) => (
                    <div 
                      key={index} 
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
                  placeholder="Type your question here..."
                  disabled={isLoading}
                  className="flex-grow"
                />
                <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
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
