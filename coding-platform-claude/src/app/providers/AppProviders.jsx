import { ThemeProvider } from '@/shared/theme/model/ThemeContext';
import { I18nProvider } from '@/shared/i18n/model/I18nContext';
import { AuthProvider } from '@/features/auth/model/AuthContext';

export function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <I18nProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}
