import React from 'react';
import Layout from '@/components/Layout';
import CreateColor from '@/components/CreateColor';
import CreateBrand from '@/components/CreateBrand';

export default function ColorsPage() {
  return (
    <Layout>
      <div className="pl-6 pt-8">
        <CreateColor />
      </div>
      <div className="pl-6 pt-8">
        <CreateBrand />
      </div>
    </Layout>
  );
}
