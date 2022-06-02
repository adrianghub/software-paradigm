import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getCategories } from "services";

const Categories = () => {
  const [categories, setCategories] = useState<
    { name: string; slug: string }[] | undefined
  >();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    getCategories().then((cat) => setCategories(cat));
  }, []);

  useEffect(() => {
    if (selectedCategory && selectedCategory !== "All") {
      router.push(`/category/${selectedCategory}`);
    }

    if (selectedCategory === "All") {
      router.push("/");
    }
  }, [selectedCategory]);

  return (
    <div className="pt-4 pb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Categories</h3>
      <select
        className="form-select form-select-lg appearance-none w-full px-4 py-2 border border-solid rounded focus:outline-none"
        onChange={(e) => setSelectedCategory(e.target.value)}
        defaultValue={"All"}
      >
        <option disabled>All</option>
        {categories?.map((category) => (
          <option key={category.slug} className="block pb-3 mb-3">
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Categories;
