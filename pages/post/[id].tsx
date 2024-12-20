import { Layout } from 'components/Layout';
import { Meta } from 'components/Meta';
import { useRouter } from 'next/router';

import React, { useState, useRef } from 'react';
import { usePdf } from '@mikecousins/react-pdf';

const PdfContent = ({ id }: { id: string | string[] }) => {
  const [page, setPage] = useState(1);
  const canvasRef = useRef(null);

  const { pdfDocument } = usePdf({
    file: `/news-posts/${id}.pdf`,
    page,
    canvasRef,
  });

  return (
    <div className="max-w-[900px] w-full p-[50px] border border-gray-300">
      {!pdfDocument && <span>Loading...</span>}
      <canvas ref={canvasRef} className="max-w-[800px]" />
      {pdfDocument && pdfDocument.numPages && (
        <div className="flex justify-end gap-4 mt-4">
          <button
            className="btn btn-sm"
            disabled={page === 1}
            onClick={() => setPage((prevPage) => prevPage - 1)}
          >
            Previous
          </button>
          <button
            className="btn btn-sm"
            disabled={page >= pdfDocument.numPages}
            onClick={() => setPage((prevPage) => prevPage + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

const Post = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <Meta />
      <section className="pt-40 p-20 flex justify-center">
        <PdfContent id={id} />
      </section>
    </Layout>
  );
};

export default Post;
