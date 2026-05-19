interface PageProps {
  params: Promise<{ id: string }>;
}

async function Page({ params }: PageProps) {
  const { id } = await params;

  return (
    <div>
      <h1>{id}</h1>
    </div>
  );
}

export default Page;
