export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ai_learning_sessions: {
        Row: {
          ai_response: Json
          created_at: string | null
          id: string
          input_data: Json
          learning_outcome: Json | null
          performance_impact: Json | null
          session_duration_ms: number | null
          session_type: Database["public"]["Enums"]["session_type"]
        }
        Insert: {
          ai_response: Json
          created_at?: string | null
          id?: string
          input_data: Json
          learning_outcome?: Json | null
          performance_impact?: Json | null
          session_duration_ms?: number | null
          session_type: Database["public"]["Enums"]["session_type"]
        }
        Update: {
          ai_response?: Json
          created_at?: string | null
          id?: string
          input_data?: Json
          learning_outcome?: Json | null
          performance_impact?: Json | null
          session_duration_ms?: number | null
          session_type?: Database["public"]["Enums"]["session_type"]
        }
        Relationships: []
      }
      ai_model_metrics: {
        Row: {
          accuracy: number
          created_at: string | null
          f1_score: number
          id: string
          model_type: Database["public"]["Enums"]["model_type"]
          model_version: string
          precision_score: number
          recall_score: number
          training_data_size: number
        }
        Insert: {
          accuracy: number
          created_at?: string | null
          f1_score: number
          id?: string
          model_type: Database["public"]["Enums"]["model_type"]
          model_version: string
          precision_score: number
          recall_score: number
          training_data_size: number
        }
        Update: {
          accuracy?: number
          created_at?: string | null
          f1_score?: number
          id?: string
          model_type?: Database["public"]["Enums"]["model_type"]
          model_version?: string
          precision_score?: number
          recall_score?: number
          training_data_size?: number
        }
        Relationships: []
      }
      bank_connections: {
        Row: {
          api_endpoint: string | null
          bank_code: string | null
          bank_name: string
          connected_at: string
          connection_config: Json | null
          created_at: string
          id: string
          integration_type: string
          last_sync_at: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          api_endpoint?: string | null
          bank_code?: string | null
          bank_name: string
          connected_at?: string
          connection_config?: Json | null
          created_at?: string
          id?: string
          integration_type: string
          last_sync_at?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          api_endpoint?: string | null
          bank_code?: string | null
          bank_name?: string
          connected_at?: string
          connection_config?: Json | null
          created_at?: string
          id?: string
          integration_type?: string
          last_sync_at?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      bank_transaction_feed: {
        Row: {
          amount: number
          bank_connection_id: string
          created_at: string
          currency: string
          description: string | null
          external_transaction_id: string
          fraud_score: number | null
          fraud_status: string | null
          id: string
          processed_at: string
          recipient_account: string | null
          sender_account: string | null
          transaction_type: string
        }
        Insert: {
          amount: number
          bank_connection_id: string
          created_at?: string
          currency?: string
          description?: string | null
          external_transaction_id: string
          fraud_score?: number | null
          fraud_status?: string | null
          id?: string
          processed_at?: string
          recipient_account?: string | null
          sender_account?: string | null
          transaction_type: string
        }
        Update: {
          amount?: number
          bank_connection_id?: string
          created_at?: string
          currency?: string
          description?: string | null
          external_transaction_id?: string
          fraud_score?: number | null
          fraud_status?: string | null
          id?: string
          processed_at?: string
          recipient_account?: string | null
          sender_account?: string | null
          transaction_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "bank_transaction_feed_bank_connection_id_fkey"
            columns: ["bank_connection_id"]
            isOneToOne: false
            referencedRelation: "bank_connections"
            referencedColumns: ["id"]
          },
        ]
      }
      fraud_patterns: {
        Row: {
          confidence_level: number
          created_at: string | null
          id: string
          is_active: boolean | null
          learned_from: string
          pattern_data: Json
          pattern_type: string
          risk_score: number
          updated_at: string | null
        }
        Insert: {
          confidence_level: number
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          learned_from: string
          pattern_data: Json
          pattern_type: string
          risk_score: number
          updated_at?: string | null
        }
        Update: {
          confidence_level?: number
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          learned_from?: string
          pattern_data?: Json
          pattern_type?: string
          risk_score?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      kyc_documents: {
        Row: {
          document_type: string
          file_path: string
          id: string
          original_name: string
          rejected_at: string | null
          rejection_reason: string | null
          status: string
          uploaded_at: string
          user_id: string
          verified_at: string | null
        }
        Insert: {
          document_type: string
          file_path: string
          id?: string
          original_name: string
          rejected_at?: string | null
          rejection_reason?: string | null
          status?: string
          uploaded_at?: string
          user_id: string
          verified_at?: string | null
        }
        Update: {
          document_type?: string
          file_path?: string
          id?: string
          original_name?: string
          rejected_at?: string | null
          rejection_reason?: string | null
          status?: string
          uploaded_at?: string
          user_id?: string
          verified_at?: string | null
        }
        Relationships: []
      }
      kyc_verifications: {
        Row: {
          ai_confidence: number
          created_at: string | null
          document_id: string | null
          extracted_data: Json | null
          id: string
          risk_factors: Json | null
          updated_at: string | null
          verification_notes: string | null
          verification_result: Database["public"]["Enums"]["verification_result"]
          verification_type: string
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          ai_confidence: number
          created_at?: string | null
          document_id?: string | null
          extracted_data?: Json | null
          id?: string
          risk_factors?: Json | null
          updated_at?: string | null
          verification_notes?: string | null
          verification_result: Database["public"]["Enums"]["verification_result"]
          verification_type: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          ai_confidence?: number
          created_at?: string | null
          document_id?: string | null
          extracted_data?: Json | null
          id?: string
          risk_factors?: Json | null
          updated_at?: string | null
          verification_notes?: string | null
          verification_result?: Database["public"]["Enums"]["verification_result"]
          verification_type?: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "kyc_verifications_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "kyc_documents"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_settings: {
        Row: {
          created_at: string
          email: string | null
          email_notifications: Json | null
          id: string
          phone: string | null
          sms_notifications: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          email_notifications?: Json | null
          id?: string
          phone?: string | null
          sms_notifications?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string | null
          email_notifications?: Json | null
          id?: string
          phone?: string | null
          sms_notifications?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          company: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          company?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          company?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      security_incidents: {
        Row: {
          ai_analysis: Json | null
          attack_vector: string | null
          blocked: boolean | null
          created_at: string | null
          detected_at: string | null
          detection_method:
            | Database["public"]["Enums"]["detection_method"]
            | null
          id: string
          incident_type: Database["public"]["Enums"]["incident_type"]
          raw_data: Json | null
          resolution_status:
            | Database["public"]["Enums"]["resolution_status"]
            | null
          resolved_at: string | null
          severity: Database["public"]["Enums"]["incident_severity"]
          source_ip: unknown | null
          target_endpoint: string | null
          updated_at: string | null
        }
        Insert: {
          ai_analysis?: Json | null
          attack_vector?: string | null
          blocked?: boolean | null
          created_at?: string | null
          detected_at?: string | null
          detection_method?:
            | Database["public"]["Enums"]["detection_method"]
            | null
          id?: string
          incident_type: Database["public"]["Enums"]["incident_type"]
          raw_data?: Json | null
          resolution_status?:
            | Database["public"]["Enums"]["resolution_status"]
            | null
          resolved_at?: string | null
          severity: Database["public"]["Enums"]["incident_severity"]
          source_ip?: unknown | null
          target_endpoint?: string | null
          updated_at?: string | null
        }
        Update: {
          ai_analysis?: Json | null
          attack_vector?: string | null
          blocked?: boolean | null
          created_at?: string | null
          detected_at?: string | null
          detection_method?:
            | Database["public"]["Enums"]["detection_method"]
            | null
          id?: string
          incident_type?: Database["public"]["Enums"]["incident_type"]
          raw_data?: Json | null
          resolution_status?:
            | Database["public"]["Enums"]["resolution_status"]
            | null
          resolved_at?: string | null
          severity?: Database["public"]["Enums"]["incident_severity"]
          source_ip?: unknown | null
          target_endpoint?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      transactions: {
        Row: {
          ai_analysis: Json | null
          amount: number
          card_last_four: string | null
          created_at: string | null
          currency: string
          device_fingerprint: string | null
          fraud_status: Database["public"]["Enums"]["fraud_status"] | null
          id: string
          ip_address: unknown | null
          location_city: string | null
          location_country: string | null
          manual_review_notes: string | null
          merchant_category: string | null
          merchant_name: string | null
          payment_method: Database["public"]["Enums"]["payment_method"] | null
          risk_score: number | null
          transaction_time: string | null
          transaction_type: Database["public"]["Enums"]["transaction_type"]
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          ai_analysis?: Json | null
          amount: number
          card_last_four?: string | null
          created_at?: string | null
          currency?: string
          device_fingerprint?: string | null
          fraud_status?: Database["public"]["Enums"]["fraud_status"] | null
          id?: string
          ip_address?: unknown | null
          location_city?: string | null
          location_country?: string | null
          manual_review_notes?: string | null
          merchant_category?: string | null
          merchant_name?: string | null
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          risk_score?: number | null
          transaction_time?: string | null
          transaction_type: Database["public"]["Enums"]["transaction_type"]
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          ai_analysis?: Json | null
          amount?: number
          card_last_four?: string | null
          created_at?: string | null
          currency?: string
          device_fingerprint?: string | null
          fraud_status?: Database["public"]["Enums"]["fraud_status"] | null
          id?: string
          ip_address?: unknown | null
          location_city?: string | null
          location_country?: string | null
          manual_review_notes?: string | null
          merchant_category?: string | null
          merchant_name?: string | null
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          risk_score?: number | null
          transaction_time?: string | null
          transaction_type?: Database["public"]["Enums"]["transaction_type"]
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      detection_method: "ai" | "rule_based" | "manual"
      fraud_status:
        | "pending"
        | "approved"
        | "flagged"
        | "blocked"
        | "confirmed_fraud"
      incident_severity: "low" | "medium" | "high" | "critical"
      incident_type: "ddos" | "injection" | "intrusion" | "malware" | "phishing"
      model_type: "fraud_detection" | "kyc_verification" | "security_analysis"
      payment_method: "card" | "bank_transfer" | "crypto" | "wallet"
      resolution_status:
        | "open"
        | "investigating"
        | "resolved"
        | "false_positive"
      session_type: "fraud_analysis" | "kyc_processing" | "security_monitoring"
      transaction_type: "payment" | "transfer" | "withdrawal" | "deposit"
      verification_result: "passed" | "failed" | "manual_review"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      detection_method: ["ai", "rule_based", "manual"],
      fraud_status: [
        "pending",
        "approved",
        "flagged",
        "blocked",
        "confirmed_fraud",
      ],
      incident_severity: ["low", "medium", "high", "critical"],
      incident_type: ["ddos", "injection", "intrusion", "malware", "phishing"],
      model_type: ["fraud_detection", "kyc_verification", "security_analysis"],
      payment_method: ["card", "bank_transfer", "crypto", "wallet"],
      resolution_status: [
        "open",
        "investigating",
        "resolved",
        "false_positive",
      ],
      session_type: ["fraud_analysis", "kyc_processing", "security_monitoring"],
      transaction_type: ["payment", "transfer", "withdrawal", "deposit"],
      verification_result: ["passed", "failed", "manual_review"],
    },
  },
} as const
