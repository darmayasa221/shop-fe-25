const ContactMap = () => {
  return (
    <div className="mt-8 w-full overflow-hidden rounded-lg border border-gray-200 shadow-sm">
      {/* In a real app, you would integrate Google Maps or another mapping service here */}
      {/* For simplicity, we'll use an iframe with OpenStreetMap */}
      <iframe
        src="https://www.openstreetmap.org/export/embed.html?bbox=-74.01209831237793%2C40.70002215396928%2C-73.97712707519533%2C40.719148874257635&amp;layer=mapnik"
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        title="Store Location"
      ></iframe>
    </div>
  );
};

export default ContactMap;
