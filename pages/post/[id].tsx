import { Layout } from 'components/Layout';
import { Meta } from 'components/Meta';
import { useRouter } from 'next/router';

import React, { useState, useRef } from 'react';
import { usePdf } from '@mikecousins/react-pdf';
import { News } from 'components/Content/News';
import Link from 'next/link';
import { NewsSocials } from 'components/NewsSocials';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const PdfContent = ({ id }: { id: string | string[] }) => {
  const [page, setPage] = useState(1);
  const canvasRef = useRef(null);

  const { pdfDocument } = usePdf({
    file: `/news-posts/${id}.pdf`,
    page,
    canvasRef,
  });

  return (
    <div className="w-full py-4 sm:px-4 lg:p-[50px] border-y sm:border sm:border-gray-300">
      {!pdfDocument && <span>Loading...</span>}
      <canvas ref={canvasRef} className="w-full" />
      {pdfDocument && pdfDocument.numPages && (
        <div className="flex justify-end gap-4 mt-4 mr-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((prevPage) => prevPage - 1)}
          >
            <ArrowLeft
              className={`max-md:w-4 ${page === 1 ? 'opacity-50' : ''}`}
            />
          </button>
          <button
            disabled={page >= pdfDocument.numPages}
            onClick={() => setPage((prevPage) => prevPage + 1)}
          >
            <ArrowRight
              className={`max-md:w-4 ${page >= pdfDocument.numPages ? 'opacity-50' : ''}`}
            />
          </button>
        </div>
      )}
      <NewsSocials />
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
      <section className="max-w-screen-lg mx-auto">
        <div className="pt-32 pb-12 sm:px-8 lg:px-20 flex justify-center w-full">
          <PdfContent id={id} />
        </div>
        <div className="sm:mx-20 place-content-center mb-8">
          <div className="px-8 mb-4 flex justify-between">
            <span>Recent Posts</span>
            <Link href="/post">See all</Link>
          </div>
          <News limit={3} showDescriptions={false} />
        </div>
      </section>
    </Layout>
  );
};

export default Post;
