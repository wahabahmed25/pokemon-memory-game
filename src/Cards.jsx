import PropTypes from "prop-types";

const Cards = ({ name = "Unknown Pokemon", image, onClick}) => {
    console.log("rendering cards", name);
  return (
    <div
      onClick={onClick}
      style={{ border: '2px solid gray', padding: '1rem', borderRadius: '8px' }} // Inline styles for debugging

      className={"border-2 border-gray-400 rounded-md flex flex-col items-center justify-center cursor-pointer bg-white p-4 shadow-lg transition-transform transform hover:scale-105"} // Add border width and color
    >
      <img
        src={image}
        alt={name}
        className="w-[120px] h-[120px]" // Use specific width and height
      />
      <h3 className="text-center text-xl font-semibold mt-2">{name}</h3> {/* Added margin-top for spacing */}
    </div>
  );
};

Cards.propTypes = {
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  className: PropTypes.string,
};


export default Cards;
