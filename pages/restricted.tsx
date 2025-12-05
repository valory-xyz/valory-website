import Head from 'next/head';

const RestrictedPage = () => {
  return (
    <>
      <Head>
        <title>Access Denied - Service Not Available</title>
      </Head>
      <div className="bg-color-white h-screen text-center flex justify-center items-center">
        <div className="flex flex-col max-w-[800px] mx-auto gap-4">
          <h3>403 Access Restricted</h3>
          <div className="next-error-desc text-left leading-relaxed">
            Due to applicable legal and regulatory requirements, access to this
            site is not available from your current region. <br /> We use your
            approximate location data (region-level IP information) solely for
            the purpose of enforcing this restriction and do not store this
            information. For more details, please refer to our{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://olas.network/disclaimer"
              className="text-purple-600 hover:text-purple-700"
            >
              Privacy Policy
            </a>
            .
          </div>
        </div>
      </div>
    </>
  );
};

export default RestrictedPage;
