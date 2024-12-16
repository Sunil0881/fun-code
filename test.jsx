import { useEffect, useState } from "react";
import { BASE_URL } from "../Constant";

const LoadingCard = () => (
  <div className="border border-orange-100 p-6 rounded-lg animate-pulse">
    <div className="h-6 bg-orange-100 rounded w-3/4 mb-4"></div>
    <div className="h-4 bg-orange-50 rounded w-full mb-4"></div>
    <div className="space-y-3">
      <div className="h-4 bg-orange-50 rounded w-5/6"></div>
      <div className="h-4 bg-orange-50 rounded w-4/6"></div>
    </div>
  </div>
);

const SiteCard = ({ site }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div className="group relative overflow-hidden border border-orange-100 rounded-xl bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-[#FD7149] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
      
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex-grow">
            <h2 className="text-2xl font-bold text-gray-900 group-hover:text-[#FD7149] transition-colors duration-300">
              {site.siteName}
            </h2>
            <p className="text-gray-600 mt-2 line-clamp-2">{site.description}</p>
          </div>
          
          <div className="ml-4 relative w-16 h-16">
            {!isImageLoaded && (
              <div className="absolute inset-0 bg-orange-50 rounded-lg animate-pulse"></div>
            )}
            <img
              src={site.metadata.logo}
              alt={`${site.siteName} logo`}
              className={`w-16 h-16 object-contain rounded-lg shadow-sm transition-opacity duration-300 ${
                isImageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setIsImageLoaded(true)}
            />
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="bg-orange-50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Meta Description</h3>
            <p className="text-gray-600 text-sm line-clamp-2">
              {site.metadata.description}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <a
              href={site.metadata.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-[#FD7149] hover:text-[#e56642] transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Visit Site
            </a>

            <div className="flex space-x-2">
              <button className="p-2 text-gray-600 hover:text-[#FD7149] transition-colors duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
              <button className="p-2 text-gray-600 hover:text-[#FD7149] transition-colors duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SitesList = () => {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NjAyMDVlMzMyMmI0ZGVhYTY1ZjU2MyIsImlhdCI6MTczNDM1MzAyMywiZXhwIjoxNzM0NDM5NDIzfQ.i73VxprwYeJQ82bIcRUFI4_G95qQqbioW2jerDyJ8lY";

  useEffect(() => {
    const fetchSites = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/sites`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSites(data);
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Failed to fetch sites");
        }
      } catch (error) {
        setError("An error occurred while fetching sites.");
      } finally {
        setLoading(false);
      }
    };

    fetchSites();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-[#FD7149] mb-4">Your Sites</h1>
          <p className="text-gray-600">Manage and monitor all your websites in one place</p>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-lg">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6">
            {[1, 2, 3].map((n) => (
              <LoadingCard key={n} />
            ))}
          </div>
        ) : (
          /* Sites Grid */
          <div className="grid grid-cols-1 gap-6">
            {sites.map((site) => (
              <SiteCard key={site._id} site={site} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && sites.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <p className="text-gray-600">No sites found. Start by creating a new site!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SitesList;