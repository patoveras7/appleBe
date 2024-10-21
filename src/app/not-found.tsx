export default function PageNotFound() {
    return (
        <div className="relative flex items-center justify-center h-screen overflow-hidden">
      <div
        className="bg-cover bg-center w-full min-h-full top-0 left-0 right-0 bottom-0 fixed -z-10"
        style={{
          backgroundImage: "url('https://i.pinimg.com/originals/05/64/47/056447175f803e2b9943d1dac22681d0.gif')",
        }}
      />
      <div className="relative z-10 bg-white bg-opacity-80 p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-600">Page not found</h2>
        <p className="mt-2 text-gray-500">
          Sorry, the page you are looking for doesn't exist.
        </p>
        <a
          href="/"
          className="mt-6 inline-block px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition"
        >
          Back to home
        </a>
      </div>
    </div>
    );
}