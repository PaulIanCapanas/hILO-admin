import React from "react";
import Layout from "@/components/Layout";
import MembersTable from "@/components/MembersTable";

export default function MembersPage() {
  return (
    <Layout>
      <h1 className="text-4xl text-center text-black pb-10">
        Members Page
      </h1>
      <div>
        <MembersTable />
      </div>
    </Layout>
  );
}