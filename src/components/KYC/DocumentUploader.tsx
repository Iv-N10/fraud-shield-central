
import React, { useState } from 'react';
import { FileUp, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface DocumentUploaderProps {
  onUploadSuccess: (documentData: {
    id: string;
    name: string;
    type: string;
    status: 'pending';
    dateUploaded: string;
    filePath: string;
  }) => void;
  documentType: string;
}

export function DocumentUploader({ onUploadSuccess, documentType }: DocumentUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };
  
  const clearFile = () => {
    setFile(null);
    const input = document.getElementById('documentFile') as HTMLInputElement;
    if (input) input.value = '';
  };
  
  const handleUpload = async () => {
    if (!file || !user) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      // Create file path with user ID to ensure RLS works correctly
      const filePath = `${user.id}/${documentType}_${Date.now()}_${file.name}`;
      
      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('kyc_documents')
        .upload(filePath, file, {
          onUploadProgress: (progress) => {
            const percent = Math.round((progress.loaded / progress.total) * 100);
            setUploadProgress(percent);
          },
          cacheControl: '3600',
          contentType: file.type,
        });
      
      if (error) throw error;
      
      // Save metadata to kyc_documents table
      const { error: dbError } = await supabase.from('kyc_documents').insert({
        user_id: user.id,
        document_type: documentType,
        file_path: filePath,
        original_name: file.name,
      });
      
      if (dbError) throw dbError;
      
      // Get document ID (for display purposes)
      const { data: docData } = await supabase
        .from('kyc_documents')
        .select('id')
        .eq('file_path', filePath)
        .single();
      
      toast({
        title: 'Document uploaded successfully',
        description: 'Your document has been uploaded and is pending verification.',
      });
      
      onUploadSuccess({
        id: docData?.id || Date.now().toString(),
        name: file.name,
        type: documentType,
        status: 'pending',
        dateUploaded: new Date().toISOString().split('T')[0],
        filePath: filePath
      });
      
      clearFile();
    } catch (error: any) {
      toast({
        title: 'Upload failed',
        description: error.message || 'An error occurred during upload',
        variant: 'destructive',
      });
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
      setUploadProgress(null);
    }
  };
  
  return (
    <div>
      <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center bg-muted/30">
        {!file && (
          <>
            <FileUp className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="mb-1 font-medium">Drag and drop or click to upload</p>
            <p className="text-xs text-muted-foreground mb-4">
              Supported formats: JPG, PNG, PDF, max 10MB
            </p>
            <input 
              id="documentFile" 
              type="file" 
              className="hidden" 
              onChange={handleFileChange}
              accept=".jpg,.jpeg,.png,.pdf"
            />
            <Button 
              onClick={() => document.getElementById('documentFile')?.click()}
              disabled={isUploading}
            >
              Select File
            </Button>
          </>
        )}
        
        {file && (
          <div className="w-full space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileUp className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium truncate max-w-[200px]">{file.name}</span>
                <span className="text-xs text-muted-foreground">
                  ({Math.round(file.size / 1024)}KB)
                </span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearFile}
                disabled={isUploading}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {uploadProgress !== null && (
              <div className="w-full space-y-2">
                <Progress value={uploadProgress} className="h-1" />
                <div className="flex justify-between text-xs">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
              </div>
            )}
            
            <div className="flex justify-end">
              <Button 
                onClick={handleUpload}
                disabled={isUploading}
              >
                {isUploading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Uploading
                  </>
                ) : (
                  'Upload Document'
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
