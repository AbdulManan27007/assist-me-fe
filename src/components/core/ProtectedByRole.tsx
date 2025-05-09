import { useGlobalContext, UserRole } from "@/globalContext/globalContext";

interface Props {
  children: React.ReactNode;
  role: UserRole | UserRole[];
}

export function ProtectedByRole({ children, role }: Props) {
  // const userData = useGlobalContext(({ userData }) => userData);
  const {userData, user} = useGlobalContext();
  // if (
  //   !userData || typeof role === "string"
  //     ? userData?.role !== role
  //     : !role.some((r) => r === userData?.role)
  // )
  //   return null;
  if (
    !user || typeof role === "string"
      ? user?.role !== role
      : !role.some((r) => r === user?.role)
  )
    return null;
  return children;
}
