import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

  // Verify caller is admin
  const userClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authHeader } },
  });
  const token = authHeader.replace("Bearer ", "");
  const { data: claimsData, error: claimsError } = await userClient.auth.getClaims(token);
  if (claimsError || !claimsData?.claims) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: corsHeaders });
  }
  const userId = claimsData.claims.sub;

  // Check admin role using service client
  const adminClient = createClient(supabaseUrl, serviceRoleKey);
  const { data: roleCheck } = await adminClient.from("user_roles").select("role").eq("user_id", userId).eq("role", "admin").maybeSingle();
  if (!roleCheck) {
    return new Response(JSON.stringify({ error: "Forbidden: admin only" }), { status: 403, headers: corsHeaders });
  }

  const url = new URL(req.url);
  const action = url.searchParams.get("action");

  try {
    if (req.method === "GET" && action === "list") {
      const { data: profiles } = await adminClient.from("profiles").select("*");
      const { data: roles } = await adminClient.from("user_roles").select("*");
      const { data: { users } } = await adminClient.auth.admin.listUsers({ perPage: 1000 });

      const merged = (profiles || []).map((p: any) => {
        const userRole = (roles || []).find((r: any) => r.user_id === p.user_id);
        const authUser = (users || []).find((u: any) => u.id === p.user_id);
        return {
          ...p,
          role: userRole?.role || "candidate",
          email: authUser?.email || "",
        };
      });
      return new Response(JSON.stringify(merged), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (req.method === "POST" && action === "update-role") {
      const { targetUserId, newRole } = await req.json();
      const { error } = await adminClient.from("user_roles").update({ role: newRole }).eq("user_id", targetUserId);
      if (error) throw error;
      return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (req.method === "POST" && action === "delete-user") {
      const { targetUserId } = await req.json();
      await adminClient.from("profiles").delete().eq("user_id", targetUserId);
      await adminClient.from("user_roles").delete().eq("user_id", targetUserId);
      await adminClient.auth.admin.deleteUser(targetUserId);
      return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    return new Response(JSON.stringify({ error: "Unknown action" }), { status: 400, headers: corsHeaders });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: corsHeaders });
  }
});
