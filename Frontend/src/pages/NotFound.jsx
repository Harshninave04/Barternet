import React from 'react'

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-violet-50 pt-4">
      <img src="Notfound.png" alt="Person with a map" className="w-96 h-96 mb-4" />
      <h1 className="text-3xl font-bold text-gray-800 mb-4">This Page is Not on the Map</h1>
      <p className="text-md text-gray-600 text-center max-w-6xl">
        You told your friends you weren’t bringing your phone, to try and experience what travel was
        like back in the day. You bought a map and a bottle of water and carried your camera for the
        money shot. But the map was from 2005 and the landscape had changed. So here you are, in the
        middle of a large field, that the map continues to claim is a local grocer.
      </p>
    </div>
  );
}

export default NotFound