import { useEffect, useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";

export default function withAuth(Component: any) {
  return function ProtectedComponent(props: any) {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (!user) {
          router.push("/login");
        } else {
          setLoading(false);
        }
      });
      return () => unsubscribe();
    }, [router]);

    if (loading) {
      return <div className="text-center mt-20 text-lg">로딩 중...</div>;
    }

    return <Component {...props} />;
  };
}