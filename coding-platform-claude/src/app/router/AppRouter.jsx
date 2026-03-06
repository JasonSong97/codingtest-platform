import { Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from '@/app/layouts/AppShell';

import LandingPage from '@/pages/LandingPage';
import DashboardPage from '@/pages/DashboardPage';
import CurriculumPage from '@/pages/CurriculumPage';
import TrackPage from '@/pages/TrackPage';
import UnitPage from '@/pages/UnitPage';
import ProblemPage from '@/pages/ProblemPage';
import ReviewsPage from '@/pages/ReviewsPage';
import PricingPage from '@/pages/PricingPage';
import InvitePage from '@/pages/InvitePage';
import ProfilePage from '@/pages/ProfilePage';

export function AppRouter() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/curriculum" element={<CurriculumPage />} />
        <Route path="/track/:trackSlug" element={<TrackPage />} />
        <Route path="/unit/:unitSlug" element={<UnitPage />} />
        <Route path="/problem/:problemSlug" element={<ProblemPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/invite" element={<InvitePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  );
}
