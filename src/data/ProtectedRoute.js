import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../data/supabaseClient";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };

    getSession();
  }, []);

  if (loading) return <div>Cargando...</div>;

  if (!session) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;