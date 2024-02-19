import { Link } from "react-router-dom";

const LINKS = [
  { name: "Products", path: "/products" },
  { name: "Price plans", path: "/price-plans" },
  { name: "Pages", path: "/pages" },
];

export function MainPage() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <ul className="flex gap-6">
        {LINKS.map(l => (
          <li key={l.name}>
            <Link
              className="bg-blue-600 text-white font-semibold px-3 py-2 rounded-lg hover:bg-blue-800"
              to={l.path}
            >
              {l.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
