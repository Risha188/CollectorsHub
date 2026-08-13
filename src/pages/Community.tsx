import { useMemo, useState } from "react"
import { communityPosts } from "../data/communityPosts.ts";
import { Search } from "lucide-react";
import PostCard from "../components/community/PostCard";


const Community = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(communityPosts.map((post)=> post.category))
  ];

  const filteredPosts = useMemo(()=>{
    return communityPosts.filter((post)=>{
      const searchText = search.toLowerCase();

      const matchesSearch = post.caption.toLowerCase().includes(searchText) ||
      post.userName.toLowerCase().includes(searchText) ||
      post.category.toLowerCase().includes(searchText);

      const matchesCategory = category === "All" || post.category === category;

      return (
        matchesSearch &&
        matchesCategory
      )
    })
  },[search, category])

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8">

          <h1 className="text-3xl font-bold text-gray-900">
            Community
          </h1>

          <p className="mt-2 text-gray-600">
            Discover collectibles shared by fellow
            collectors.
          </p>

        </div>

        {/* Search & Filter */}
        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-4">

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            {/* Search */}
            <div className="relative">

              <Search 
              size={19}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
              type="text"
              placeholder="Search community posts..."
              value={search}
              onChange={(e)=> setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Category */}
            <select
            value={category}
            onChange={(e)=> setCategory(e.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              {categories.map((item)=>(
                <option
                 key={item}
                  value={item}
                >
                  {item === "All" ? "All Categories" : item}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Posts */}
        {filteredPosts.length > 0 ? (
          <div className="space-y-6">

            {filteredPosts.map((post)=> (
              <PostCard
              key={post.id}
              post={post} 
              />
            ))}

          </div>
        ): (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">

            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">

              <Search 
              size={25}
              className="text-gray-400"
              />

            </div>

            <h2 className="text-xl font-semibold text-gray-900">
              No posts found
            </h2>

            <p className="mt-2 text-gray-500">
              Try changing your search or category
              filter.
            </p>

          </div>

        )}
      </div>

    </main>
  )
}

export default Community
