import { useEffect, useRef } from 'react';
import { useAuth } from '../model/AuthContext';
import { loadGoogleScript, renderGoogleButton, CLIENT_ID } from '../lib/googleIdentity';

export function GoogleSignInButton({ width = 280, onSuccess }) {
  const { loginWithCredential, hasClientId } = useAuth();
  const btnRef = useRef(null);

  useEffect(() => {
    if (!hasClientId) return;

    loadGoogleScript().then(() => {
      if (!window.google || !btnRef.current) return;
      window.google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: ({ credential }) => {
          loginWithCredential(credential);
          onSuccess?.();
        },
      });
      window.google.accounts.id.renderButton(btnRef.current, {
        theme: 'outline',
        size: 'large',
        width,
        text: 'continue_with',
        shape: 'rectangular',
        logo_alignment: 'left',
      });
    }).catch(console.error);
  }, [hasClientId]);

  if (!hasClientId) {
    return (
      <div style={{
        padding: '12px 16px',
        background: 'var(--warning-light)',
        border: '1px solid var(--warning)',
        borderRadius: 'var(--radius-md)',
        fontSize: '0.85rem',
        color: '#92400e',
        maxWidth: width,
      }}>
        ⚠️ <strong>VITE_GOOGLE_CLIENT_ID</strong> 환경변수를 설정하면 Google 로그인이 활성화됩니다.
        <br /><br />
        <code style={{ fontSize: '0.8rem', background: 'rgba(0,0,0,0.05)', padding: '2px 6px', borderRadius: 4 }}>
          .env.local 파일에 CLIENT_ID를 추가하세요
        </code>
      </div>
    );
  }

  return <div ref={btnRef} id="google-signin-btn" />;
}
