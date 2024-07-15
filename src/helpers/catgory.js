import { getApi } from "../helpers/General"
let getCatId = async () => {
    let res = await getApi('/post-category')
    console.log(res)
}
const tags = [
    { title: "Technology" },
    { title: "Science" },
    { title: "Design" },
    { title: "Books" },
    { title: "Travel" },
    { title: "Health" },
    { title: "Career" },
    { title: "Food" },
    { title: "Cricket" },
    { title: "Engineering" },
    { title: "Movies" },
    { title: "Vacation" },
    { title: "Sports" },
    { title: "Mathematics" }
];

module.exports = {
    tags,
    getCatId
}