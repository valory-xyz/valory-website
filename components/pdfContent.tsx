import { usePdf } from '@mikecousins/react-pdf';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRef, useState } from 'react';
import { NewsSocials } from './NewsSocials';

export const PdfContent = ({
  id,
  showSocials = false,
}: {
  id: string | string[];
  showSocials?: boolean;
}) => {
  const [page, setPage] = useState(1);
  const canvasRef = useRef(null);

  const { pdfDocument } = usePdf({
    file: `/${id}.pdf`,
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
      {showSocials && <NewsSocials />}
    </div>
  );
};
