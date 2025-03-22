'use client';
import React from 'react';
import SistemaGuatemala from '@/components/menu-interactivo';
// import PrologSystem from '@/components/prolog-system';
// import ProyectoGuatemala from '@/components/prolog-integration';

export default function Home() {
  return (
    <main className="min-h-screen p-4">
      <SistemaGuatemala />
      {/* <PrologSystem /> */}
      {/* <ProyectoGuatemala /> */}
    </main>
  );
}

