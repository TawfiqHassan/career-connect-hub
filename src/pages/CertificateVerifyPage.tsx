import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Search, AlertCircle } from "lucide-react";

const CertificateVerifyPage = () => {
  const [certificateId, setCertificateId] = useState("");
  const [result, setResult] = useState<"idle" | "not_found" | "found">("idle");

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certificateId.trim()) return;
    // Placeholder — in the future this will query the database
    setResult("not_found");
  };

  return (
    <Layout>
      <div className="container py-12 max-w-xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary mb-4">
            <ShieldCheck className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold font-heading mb-2">Verify Certificate</h1>
          <p className="text-muted-foreground">
            Enter your certificate ID to verify the authenticity of a CarriTiq skills certification.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Certificate Verification</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerify} className="flex gap-2">
              <Input
                placeholder="Enter Certificate ID (e.g., CTQ-2026-XXXXX)"
                value={certificateId}
                onChange={(e) => { setCertificateId(e.target.value); setResult("idle"); }}
              />
              <Button type="submit" className="shrink-0">
                <Search className="h-4 w-4 mr-1" /> Verify
              </Button>
            </form>

            {result === "not_found" && (
              <div className="mt-4 flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
                <AlertCircle className="h-4 w-4 shrink-0" />
                No certificate found with ID "<strong>{certificateId}</strong>". Please check the ID and try again.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CertificateVerifyPage;
