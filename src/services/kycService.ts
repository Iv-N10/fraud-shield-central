
import { supabase } from "@/integrations/supabase/client";

export interface KYCDocument {
  id: string;
  name: string;
  type: string;
  status: 'pending' | 'verified' | 'rejected';
  dateUploaded: string;
  filePath?: string;
}

export const fetchUserDocuments = async (): Promise<KYCDocument[]> => {
  const { data, error } = await supabase
    .from('kyc_documents')
    .select('*')
    .order('uploaded_at', { ascending: false });

  if (error) {
    console.error("Error fetching documents:", error);
    throw error;
  }

  // Transform the data to match the expected format
  return data.map(doc => ({
    id: doc.id,
    name: doc.original_name,
    type: doc.document_type,
    status: doc.status as 'pending' | 'verified' | 'rejected',
    dateUploaded: new Date(doc.uploaded_at).toISOString().split('T')[0],
    filePath: doc.file_path
  }));
};

export const downloadDocument = async (filePath: string): Promise<string> => {
  const { data, error } = await supabase.storage
    .from('kyc_documents')
    .createSignedUrl(filePath, 60); // URL valid for 60 seconds

  if (error) {
    console.error("Error creating download URL:", error);
    throw error;
  }

  return data.signedUrl;
};
