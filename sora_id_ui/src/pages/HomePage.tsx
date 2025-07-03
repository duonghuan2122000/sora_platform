import { RouterConst } from "@/routers/RouterConst";
import { useNavigate } from "@solidjs/router";
import { onMount } from "solid-js";

export default function HomePage() {
  const navigate = useNavigate();

  onMount(() => {
    navigate(RouterConst.SelectTenant);
  });

  return <></>;
}
