// // src/auth/ProtectedRoute.tsx
// import { Navigate, useLocation } from "react-router-dom";
// import { useAuth } from "./AuthProvider";

// export default function ProtectedRoute({ children }: { children: JSX.Element }) {
//   const { user, loading } = useAuth();
//   const location = useLocation();

//   if (loading) return null; // or a spinner

//   if (!user) {
//     const redirect = encodeURIComponent(location.pathname + location.search);
//     return <Navigate to={`/login?redirect=${redirect}`} replace />;
//   }

//   return children;
// }
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="p-6">Loading…</div>;
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
  return children;
}
