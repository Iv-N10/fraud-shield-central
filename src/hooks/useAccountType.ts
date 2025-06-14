
import { useAuth } from '@/contexts/AuthContext';

export const useAccountType = () => {
  const { userProfile, user } = useAuth();
  
  const accountType = userProfile?.account_type || user?.user_metadata?.account_type || 'individual';
  
  const isIndividual = accountType === 'individual';
  const isFinancialInstitution = accountType === 'financial_institution';
  
  return {
    accountType,
    isIndividual,
    isFinancialInstitution,
  };
};
