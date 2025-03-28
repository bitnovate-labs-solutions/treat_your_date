import { Star } from "lucide-react";

const RecipeCard = ({ title, author, image, rating, time }) => {
  return (
    <div className="relative rounded-2xl overflow-hidden">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
        <h3 className="text-lg font-semibold">{title}</h3>
        {author && <p className="text-sm text-gray-200">By {author}</p>}
        {rating && (
          <div className="flex items-center gap-1 mt-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm">{rating}</span>
          </div>
        )}
        {time && (
          <div className="absolute top-3 right-3 bg-white/90 text-black text-sm px-2 py-1 rounded-full">
            {time}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
